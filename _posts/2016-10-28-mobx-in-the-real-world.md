---
title: "MobX in the real world"
published: false
layout: post
categories: 
  - Javascript
tags:
  - mobx
  - libraries
  - frontend
code_view: true
---

**!This blogpost is WIP!**

MobX has been surging in popularity during the last year. It is being used as a state container for apps of all shapes and sizes. Redux vs MobX comparisons are made constantly, with MobX being praised for its simplicity and ease of use. People are replacing Redux with MobX in their apps and reporting HUGE LoC savings! But MobX is very unopinionated about the structure of your app; the only thing MobX does is guarantee that your view stays in sync with your state. So what does it mean to "replace Redux with MobX"? What does using MobX look like in a real app?

I am writing this in an Embraer ERJ-190 on my way back to Helsinki from ReactiveConf 2016, where I had the pleasure to watch [Michel Weststrate](https://twitter.com/mweststrate) present a talk that touched on this very topic. He presented [MobX State Tree](https://github.com/mobx/mobx-state-tree), a library that brings some structure to MobX apps (he also made it rain stickers!). I haven't had the opportunity to test-drive this library yet, but I believe `mobx-state-tree` to be very applicable to the ideas I want to present in this blog post.

I have also made my own experimental MobX structure library that borrows some ideas from Redux and is based on a functional programming style. It is called [mobx-app](https://github.com/danieldunderfelt/mobx-app). Feedback appreciated! I am planning to use `mobx-state-tree` in `mobx-app` if applicable.

## What we want to accomplish

The biggest blessing and the harshest curse of MobX is how unopinionated about your state structure it is. This means that you can use MobX as a complete Redux replacement in your app, or just for one feature where the usage of MobX doesn't look like Redux or even Flux at all. You may want to use it on the server for something! MobX doesn't care. MobX only keeps your state consumer in sync with your state.

The flip side is that, if you do not plan your app structure carefully, you might end up with hard to maintain state spaghetti. Even if MobX allows you to mutate your state anytime, anywhere (except views or render functions) that does not mean you should. I recommend turning MobX strict mode on to only allow state mutations in actions.

This blog post concerns MobX usage as a Redux replacement, which is probably how a vast majority of users will use it. What follows is roughly how `mobx-app` evolved and the ideas behind it.

## The start line

You probably think Redux's reducers are pretty nifty. You're right! They (usually) focus on one slice of the state, enabling you to build it without minding the rest of your app. Let's steal that idea!

```javascript
const Store = () => {
  return observable({
    key: 'value'
  })
}
```

Cool, we have our first store. This is actually a *store factory* that returns a new state object every time it is called.

We can pass in some initial data, in case you serialize this store and want to hydrate it later:

```javascript
const Store = (initialData) => {
  return extendObservable({
    key: 'value'
  }, initialData)
}
```

Notice that I now use the `extendObservable` function to create the observable object. This works very much like `Object.assign` in that it allows you to add observable properties onto an object. `extendObservable` is actually an integral part of this state structure, which you will see as it evolves.

So far we have one simple store, a far cry from the granular reducer-based approach of Redux.

## One store for each facet of the state

We'll continue by defining how we want the singular state tree to look. An app of even moderate size has a few discrete sides to the state and it'll get cumbersome to manage it all from one huge file. What we want is close to how you combine reducers in Redux:

```javascript
const stores = {
  store: Store // The Store from above
  things: ThingStore
}
```

Now we have an index of all the stores in our app. This constitutes the top-most level of our state tree.
Now we want to call these store factories and pass in relevant `initialData`:

```javascript
const initialData = {
  store: {
    key: 'value from localstorage'
  },
  things: {
    thingsCollection: ['thing1 from localstorage']
  }
}

// Using lodash to map over the `stores` object
const state = _.mapValues(stores, (store, key) => store(initialData[key]))
```

This will result in `state` containing observable properties that describe your app's whole state! We're done, right?

## Not so fast

We're missing two critical parts: actions and state shared between stores. That's right: MobX encourages that you share state between stores! This ties into the MobX mantra that you should always strive to minimalize state. For example, if one store has data on if the user is logged in or not, another store may want to use that data in a `computed` value. It makes no sense to have this piece of information in multiple stores. Thus each store needs access to the whole state at all times.

We also need a way to mutate the state in a controlled way. MobX actions are perfect for this, and a must if you use MobX strict mode (which you definitely should). When using MobX, it makes no sense to fire off actions like you do in Redux, you just call a function that mutates the state directly. You will retain trackability of all actions since they can be tracked with MobX spies.

Both of these need to be baked into our state structure.

Let's first review how we can use composition to create objects:

```javascript
const myFactory = (data) => {
  /* This is the "constructor". Do setup stuff here. */
  
  return {
    myMethod1: (arg) => { /* All methods have access to `data` */ },
    myMethod2: (arg) => { /* All methods have access to `data` */ }
  }
}
```

An important part to realize is that we can now import functions from other modules and use them as methods of this object that the above factory returns:

```javascript
const functionsForASpecificThing = (data) => {
  function method1() { /* Operate on data */ }
  function method2() { /* Operate on data */ }
  
  return { method1, method2 }
}

const myFactory = (data) => {
  /* This is the "constructor". Do setup stuff here. */
  
  function method1() { /* Operate on data */ }
  
  const composedMethods = functionsForASpecificThing(data)
  
  return {
    method1,
    ..composedMethods
  }
}
```

This is basically object-oriented inheritance on steroids. We are not limited to inheriting from one class, we can mix in any number we want. This also solves a lot of problems where your client requests functionality from `XYZ` be included in `WTF`.

If you use ES6 classes with MobX, you may be familiar with this pattern where the class methods are the actions. I like this pattern too. We're not getting rid of it.
 
The keen-eyed will notice that, using the composition approach, we no longer return the state object from the store factory. Instead we would return actions, like this:
 
```javascript
const Store = (initialData) => {
  // Oops, this is now private state :<
  const storeState = extendObservable({
    key: 'value'
  }, initialData)
   
  return {
    action1, action2, actionN
  }
}
```
 
We could certainly include the state in the object that the factory returns, but that gets very messy very fast. And we still haven't solved the problem of a single, shared state tree!
 
## The state field

What I aim to do is construct a "field" or "pool" of state that you can just reach into and grab what you need. Each store will hook into this state field and add its own properties to it. We need to rewrite our store like this:
 
```javascript
const Store = (state, initialData) => {

  extendObservable(state, {
    key: 'value'
  }, initialData)

  return {
    action1, action2, actionN
  }
}
```
 
We also need to refactor our combination function from before:
 
```javascript
const stores = (stores, initialData) => {
  const state = observable({})
  const actions = {}
  
  _.forOwn(stores, (store, key) => {
    actions[key] => store(state, initialData, key)
  })
  
  return { state, actions }
}
```

What we end up with is a bit different from what we started this journey with. In this model, store factories only operate on the global state, adding what they need to. They do not return a state object, but an object containing actions relevant to the slice of state that the store handles. The actions, as we'll soon see, are composed with the same global state field as the stores are.