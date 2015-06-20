---
layout: post
title: "React: what you need to know to get started right away"
categories:
  - react
tags:
  - es6
  - frontend
published: true
code_view: true
---

React has been taking the frontend world by storm, and not by accident. It is quite an intuitive way to create user interfaces, also known as the `View`. I have recently started using it and I can tell you it feels amazing; it's like the Tesla Model S of Javascript tools. While it is easy to use once you get going, there's a few concepts, patterns and technicalities you need to understand in order to use it. If you're reading this you are on the right path, as this very blog post is dedicated to explaining those!

If you've never heard of React and you're wondering what the hell I'm on about, here's a super-quick introduction:

> React does one thing, and one thing only: it renders your DOM. React is only the 'view' portion of MVC and utilizes a virtual DOM which it diffs the new state of your app against, when your UI changes. This enables React to make the minimum required modifications to the DOM. Because React is built around minimizing DOM manipulation, the updates it does make are super fast and solves the problem of layout thrashing.

> As a side-effect, React is also great at handling the state of various parts of your application. With React, you build your UI using `components` - small, to-the-point blocks of UI with their own functionality totally encapsulated in themselves. This makes your layout easy to reason about and compose. Create the components you need and snap them together.

With that out of the way, let's get on with it.

## Overview of the concepts

With React, you build your UI using components, separate files that describe each part of your application interface. Let's see a simple component, to give you a picture of what I'm talking about. After that, I'll go through everything you need to know to get started with React.

{% include code_caption.html text="component.jsx" %}

{% highlight javascript %}

import React from 'react'

class Component extends React.Component {

  constructor() {
    this.state = {
      name: 'Daniel'
    }
  }

  handleInput(e) {
    this.setState({ name: e.target.value })
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.name} onChange={this.handleInput.bind(this)} />
        <NameDisplay name={this.state.name} />
      </div>
    )
  }
}

class NameDisplay extends React.Component {

  render() {
    return (
      <span>{this.props.name}</span>
    )
  }
}

{% endhighlight %}

Okay, well, that was actually TWO components. They illustrate the topics I want to touch on in this post. The topics are:

- React components and JSX
- Properties
- State
- Event handling and user actions
- Component lifecycle
- Using the underlying DOM

When you have grasped those, you will be able to utilize React right away.

## Setting up your project

We won't dwell too much on this subject, but you do need some kind of Ecmascript 6 environment to follow along and work with React. If you're already using Babel, through Webpack, Browserify or JSPM, you're good to go. Otherwise, [read my blogpost about JSPM](http://blog.developsuperpowers.com/jspm-superpowered-es6-development/) to get yourself set up, and then [read this](http://blog.developsuperpowers.com/react-with-jspm/) to enable React's JSX syntax in JSPM. It's really easy, you'll love it.

All set? Good.

## Components and JSX

A React component represents a distinct piece of the user interface of your application and has all its logic contained in it. We saw two of them up above. They're just Javascript classes, you already know how to use them! Actually, in the beginning, React had its own way of creating Javascript classes. We won't cover that here, as the new native ES6 class syntax is the way of the future.

To make a component, you create a normal Javascript class that extends the `React.Component` superclass. The only thing you need to include in the class for it to work is a `render()` method, everything else is optional! From the render method you return a *description* of a piece of the DOM. This is important: The elements you create in a component are *not* real HTML elements, they're just a description of how you want your DOM to look at some point in time.

React maintains a virtual DOM in the background, and every time something changes in your components, React compares the new state of the DOM to the previous one and works out what parts it needs to adjust for the real DOM to look the way you want it to. If the new state of the DOM isn't visibly different from the old one, then great, nothing needs to change. If there are differences, React makes the changes in as few moves as it can to reduce ["layout thrashing"](https://blog.idrsolutions.com/2014/08/beware-javascript-layout-thrashing/). Since layout thrashing can happen even when you *read* a value from the DOM, having a virtual DOM to read the values from decreases thrashing even further.

In other words, you describe how you want the DOM to look, and React makes sure it happens as efficiently as possible.

### "... so we put HTML in your Javascript!"

And that's why there's HTML in your Javascript. The people at Facebook, who are responsible for React, came up with a convenient abstraction to make it easy to write DOM descriptions in Javascript. That's what we call `JSX`, and it is really quite nice to have! JSX is just Javascript. You don't have to use it if you don't want to, but the choice is between these two forms of syntax:

{% highlight javascript %}

// JSX code
render() {
  return <div>Hello {this.props.name}</div>
}

// What the above JSX compiles to
render() {
  return React.createElement("div", null, "Hello ", this.props.name)
}

{% endhighlight %}

It's pretty clear to me what I want to use. Can you bother to learn what the arguments for `React.createElement` are? I haven't bothered. So the first argument is the element you want to create. Then... what's that `null`? No idea. Don't care. I just use JSX.

There's a few ways you can use to compile your JSX components to Javascript, but by far the easiest and most well-rounded is Babel, the ES6 -> ES5 transpiler. It includes a JSX transformer by default, so if you throw Babel into your project, you can write both ES6 and JSX without giving the matter a second thought.

### JSX in action

JSX works like the good old HTML you're used to. You can nest elements, give them attributes, classes and ID's just like before. That said, there are some differences you should be aware of! Here's a piece of JSX with some "weird" stuff highlighted:

{% include code_caption.html text="jsx-example.jsx" %}

{% highlight javascript %}

render() {

  return (
    // All components should return ONE root element.
    // If you want many elements in your component,
    // be sure to wrap them all in something like a div.
    <div>
      // As 'class' is a reserved word in Javascript,
      // we give CSS classes to elements using the
      // 'className' attribute.
      <header className="app-header">
        <nav id="main-nav">
          // Other HTML attrbutes work like you're used to.
          // Event handlers are defined inline, and usually
          // point to a method in the component class.
          <a href="http://example.com" onClick={this.handleClick.bind(this)}>Click me!</a>
        </nav>
        // Custom components are used like this. Import the component class,
        // in this case 'LoginLogout', and use it like an HTML element!
        // A rule of thumb is that vanilla HTML elements are lowercase,
        // and custom components are CamelCase.
        <LoginLogout user={this.props.username} />
        // React properties, like 'user' above, are used to provide data
        // to your components. Just write them like a normal HTML attribute!
        // Like all attributes you write in React, they can take "strings"
        // or {javascript expressions}.
      </header>
      // The 'children' property is a special one, and contains any React
      // elements you nest into your components. Then, you can spit out
      // the nested children like this.
      {this.props.children}

      // Here's the 'children' in action. Inside the Page component,
      // you would put {this.props.children} to display the PageContent
      // component where you want it to go.
      <Page>
        <PageContent />
      </Page>
      // This way, your components can be reusable and decoupled
      // from other components, as they don't even need to
      // know anything about their own children!
    </div>
  )
}
{% endhighlight %}

As you can see, JSX is a lot like a template language. You can mix and match HTML elements, custom components and third-party components in an intuitive way. I like to compare this to building with Lego. You just snap them together and wire them up to compose your application.

There are some gotcha's, which are described in [React's documentation](http://facebook.github.io/react/docs/jsx-gotchas.html).

Here are some additional tricks you can perform with JSX:

{% include code_caption.html text="jsx-example.jsx" %}

{% highlight javascript %}

/**
 * Create elements in a loop
 */
render() {

  return (
    <div>
      <ul>
        // Loop through an array of data and give each item
        // in its own React component:
        {this.props.arrayOfData.map( item => {
          // React elements created in a loop require a 'key' property
          // so React can keep track of it in the virtual DOM.
          // React WILL shout at you if you omit it. Use the array index
          // if you don't have anything else, but a unique identifier is
          // recommended.
          return <ListItem link={item.url} label={item.label} key={item.id} />
        })}
      </ul>
    </div>
  )
}

/**
 * Use the 'spread' feature to give multiple props at once
 */
render() {

  let data = {
    name: "Daniel",
    occupation: "Developer",
    likes: "React"
  }

  return (
    <div>
      // MyCustomComponent receives 'name', 'occupation' and
      // 'likes' as keys on its 'this.props' object.
      <MyCustomComponent {... data} />
    </div>
  )
}
{% endhighlight %}

There are of course a lot more to JSX. It is a versatile toolset that you can use to compose any UI. After reading this post, I'm confident that you can figure out amazing ways to use it!

### So... how do you USE your components?

Ah, good question! Writing a bunch of cool components without having a way to mount them on your site would be a waste of time! Luckily it's quite simple.

Usually you would create one top-level component that imports and puts together the other components of your app. Let's call this top-level guy the `AppView`.

{% include code_caption.html text="AppView.jsx" %}

{% highlight javascript %}
import React from 'react'
import Header from './HeaderComponent.jsx'
import Page from './PageComponent.jsx'
... Other components

class AppView extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <Page />
        ... other
      </div>
    )
  }
}

export default AppView
{% endhighlight %}

Alright, we have our top-level component. Let's render it on your page!

To do that, we import it into a "normal" Javascript file, for example your `index.js` or `main.js` or whathaveyou. Then, we use the `React.render` method to output it:

{% include code_caption.html text="index.js" %}

{% highlight javascript %}

import React from 'react'
import AppView from './AppView.jsx'

React.render(<AppView />, document.getElementById('app-container'))

{% endhighlight %}

And that's all there is to it. Tell `render()` what you want to render and where. The first argument is the component, and the second is a DOM element that the component will be rendered into. React will take it from there, you do not need to call `render()` again elsewhere.

Whew, time is getting really ripe for the section on props. Let's get to it!

## React properties

I've used props a lot already in this post, so you're probably an expert by now! But just to compile it all and reiterate, here's the gist.

React components can be given data through a React feature called `props`, or `properties`. This is of course a normal thing in Javascript, but it is integral to working with React. Using props is really simple, you just give your elements attributes, like so: `<MyComponent name="Daniel" />`. Now `MyComponent` has been given the property `name` with the value `"Daniel"`, which is usable from inside the component class through `this.props.name`. You saw an example of this in the very first React example of this blog post!

`this.props` works exactly like a normal Javascript object, and in fact, it is one. There's really nothing special going on here, but the implications for generalised, reusable components are huge. React tries its best to make you write components that do one thing well and know as little as possible about the world around them.

One really, **really** important thing: **DO NOT** change anything on `this.props`! Consider the props immutable. The props are owned by the component who gives them, not the component that uses them through `this.props`. Weird side-effects occur if you reassign any values to properties.

{% include code_caption.html text="BAD.jsx" %}

{% highlight javascript %}
import React from 'react'

class BadComponent extends React.Component {

  render() {

    // DO NOT do this! It will wreak havoc and cause misery.
    this.props.name = "The Joker"

    return (
      <div>{this.props.name}</div>
    )
  }
}
{% endhighlight %}

Hope that's clear!

However, React components are not static. Far from it! They are meant to be dynamic and flashy! So how do we accomplish that, if we're not allowed to mutate the props? With `state` of course! Read on.

## React state

While props are owned by the component who's assigning them, `state` is owned by the component itself. In fact, state is completely encapsulated inside components and is private to each component. Otherwise state works a lot like props.

Like props, state is just a plain old Javascript object. The state of a component usually changes when you interact with it, and it is here that you should store the data for your component. Let's have a look:

{% include code_caption.html text="StatefulComponent.jsx" %}

{% highlight javascript %}
import React from 'react'

class StatefulComponent extends React.Component {

  constructor() {
    // Remember to call super!
    super()

    // Initial state is defined in the constructor of the component class.
    // Nothing weird here, we're just creating a normal Javascript object.
    this.state = {
      firstname: "Daniel",
      lastname: "Dunderfelt"
    }
  }

  handleClick(e) {
    // We can change the state using 'this.setState'. When that is called,
    // React will re-render your component to reflect the updated state.
    this.setState({
      firstname: this.state.lastname,
      lastname: this.state.firstname,
    })
    // Here I switch my first and last name on the click of a button.
  }

  render() {
    // We can use state to create derived data. Here I've used ES6
    // template strings to compose my full name.
    let fullName = `${this.state.firstname} ${this.state.lastname}`

    return (
      <div>
        Hi! My name is {fullName}!
        <button type="button" onClick={this.handleClick.bind(this)}>Switch!</button>
      </div>
    )
  }
}
{% endhighlight %}

That's the basics of it. `this.state` is just an object you use to store data. When `this.setState` is called, React merges the new state data with the old one and re-renders the component (only if needed of course).

When you've read this post and venture out to find more info on React, you may come across the old way of writing React components. They use a method called `getInitialState()`. That is no longer used in the ES6 era, as setting a `state` property in the constructor is used instead to achieve the exact same goal.

By the way, you may, and usually will, give data from a component's state to subcomponents through props. That's not a 'bad' thing, it is A-OK to write `<SubComponent name={this.state.firstname} />` in your render methods. That will also re-render the subcomponent as the state changes!

## Handling events

We've seen some event handling in this post already, but I want to dig slightly deeper. Forms in React are a little special in regards to how you should utilize events.

You have seen the click event handling a few times already, but here is another example:

{% include code_caption.html text="Clicking.jsx" %}

{% highlight javascript %}
import React from 'react'

class Clicking extends React.Component {

  handleClick(e) {
    // Yes, you can prevent default actions!
    e.preventDefault()

    // Getting the element you clicked
    let clickTarget = e.target
  }

  render() {

    return (
      <div>
        // The handlers are defined inline, using the following syntax:
        <button type="button" onClick={this.handleClick.bind(this)}>Click me!</button>
        // Be sure to 'bind' the context of the method to the class.
        // Earlier versions of React did this automatically, but in ES6
        // the job is yours to complete.
      </div>
    )
  }
}

// You may even pass in a function through props
// to be used as an event handler!

return (
  <div>
    <button type="button" onClick={this.props.clickHandler}>Click me!</button>
  </div>
)
{% endhighlight %}

So that's the click event. All events follow the same pattern, prefix the event name with `on`. We have `onClick`, `onChange`, `onSubmit` and so on. You can use all events that are supported by the underlying HTML element.

On to forms! React advocates that form elements should be "controlled". That means that your component should set the value programmatically; the value should not simply be written into the input element. This gives you the opportunity to transform the input as your user writes it. For example, you can limit characters in textareas or perform validation on the fly. How do we accomplish this? With a combination of event handlers and state!

{% include code_caption.html text="Form.jsx" %}

{% highlight javascript %}
import React from 'react'

// I like to define the state of an empty form in one place
const resetState = {
  firstname: "",
  lastname: ""
}

class Form extends React.Component {

  constructor() {
    super()

    // Initially, we have an empty form. Simply assign the object
    // containing the empty properties to the initial state.
    this.state = resetState
  }

  // Change handler
  handleFirstname(e) {
    this.setState({
      // Get the value from the target element
      firstname: e.target.value
    })
  }

  // Change handler
  handleLastname(e) {
    this.setState({
      lastname: e.target.value
    })
  }

  handleSubmit(e) {
    // Stop the browser from navigating
    e.preventDefault()
    // Simply send the whole state! It contains all the data already.
    // 'sendFormData' is an example function that you would pass down
    // to this component throuh props.
    this.props.sendFormData(this.state)
    // And reset the form using the empty object.
    this.setState(resetState)
  }

  render() {

    return (
      <div>
        // Set the submit handler on the form
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>First name</label>
          <input
            type="text"
            name="firstnameInput"
            // This is what makes the input 'controlled'.
            // The value does not come directly from the user,
            // it comes from the state of the component.
            value={this.state.firstname}
            // When the user writes something, we want to update
            // the state and, by extension, what value the input has.
            onChange={this.handleFirstname.bind(this)} />

          <label>Last name</label>
          <input
            type="text"
            name="lastnameInput"
            value={this.state.lastname}
            onChange={this.handleLastname.bind(this)} />

          <button type="submit">Submit form</button>
        </form>
      </div>
    )
  }
}
{% endhighlight %}

And that is what a form in React looks like. Use the change handlers to perform operations on the input, and once the form is submitted, you can safely ferry off the whole state to where-ever. You could create components for the inputs to automatically insert labels and extra elements around them where they are used. There are a number of libraries that provide ready-made React components, including form elements, for you to use. [React-bootstrap](http://react-bootstrap.github.io/) and [material UI](http://material-ui.com/#/) are examples of well-made component libraries.

## Component lifecycle

In React, components are dynamically mounted, rendered, updated, changed and dismounted. You can hook into these lifecycle events through a bunch of methods that are available on the component classes. These can be used to set state from props, initialize other libraries and perform various actions during each stage of the component lifecycle.

Here's a list:

- `componentWillMount`, called right before a component is mounted.
- It's brother, `componentDidMount`, is called right AFTER a component has mounted.
- `componentWillUnmount` is called before the component is removed from the app.
- `componentWillReceiveProps` is called every time the component is given new props.
- `shouldComponentUpdate` is called before it is updated.
- `componentWillUpdate` and `componentDidUpdate` are called before and after the component is re-rendered.

They are all used the same way, as methods on your component class.

By the way, "mounting" a component means using `React.render(<Component/>, [DOM element])` to render the component, OR including the component in another component. The "mount" happens only once in the component's lifecycle.

{% include code_caption.html text="Lifecycle.jsx" %}

{% highlight javascript %}

class LifecycleExample extends React.Component {

  componentWillMount() {
    This method's phone will ring right before the component is
    mounted using React.render() or included in another component.
    If you need to create initial state from props, this is as good a place
    as any to do that. The component will not re-render
    if you call setState here!
  }

  componentDidMount() {
    And when the mount has happened, this method is called.
    By now the component has a DOM representation, so feel free
    to use jQuery or some other DOM-based library here.
  }

  componentWillUnmount() {
    This is the place to clean up after yourself. Remove jQuery event
    listeners (why did you use those?), image sliders and other widgets.
    React will take care of removing its own stuff, so you do not need
    to worry about that.
  }

  componentWillReceiveProps(newProps) {
    If you need to do anything with eventual new props passed to the
    component, do it here. This method will get the new props as its
    only argument. Calling setState here will not result in a re-render,
    as the component will re-render anyway when it receives new props.
  }

  shouldComponentUpdate(newProps, newState) {
    You can use this method to control if the component should update
    at all. Returning false wil stop the rendering in its tracks!
    As arguments you get new props and the computed next step of the state
    which you can use to compare with the current ones.
  }

  componentWillUpdate(nextProps, nextState) {
    If the re-render gets the green light, this method is called right before
    it happens. As arguments you get the next props and state, but you
    CANNOT call setState in this method. Use 'componentWillReceiveProps'
    instead!
  }

  componentDidUpdate(prevProps, prevState) {
    And when the update and re-render has happened, guess who is called.
    You get the previous state and props as arguments. Use this method
    to perform operations on that jQuery slider you're using.
  }
}
{% endhighlight %}

These methods are great for exercising minute control over your component and integrate it with other libraries. You should use these instead of littering your `render()` method with various logic. In case you didn't notice, React enforces a certain architecture through what you can and can't do in these methods. Take the hints and don't try to hack around those restrictions! Your future self will thank you for the maintainability.

## The underlying DOM

React can be viewed as an abstraction of the real DOM. As such, it is not immediately apparent how to access that real DOM. React's developers have not left you hanging though!

As the things that are returned from the `render()` method of a component are **not** real HTML elements, React has a feature called `refs` that enable you to get to the real deal. To use it, assign a `ref` attribute to a JSX element, which you can then use later to retrieve the underlying HTML element. To get an HTML element from a ref, we use the `React.findDOMNode()` method. An example is in order:

{% include code_caption.html text="Ref.jsx" %}

{% highlight javascript %}
import React from 'react'
import $ from 'jquery'

class RefExample extends React.Component {

  // Once we have an HTMl element for the component...
  componentDidMount() {
    // Use findDOMNode and feed it the ref to get
    // the underlying HTML element. All refs in the
    // component are found on the 'this.refs' object.
    let divRef = React.findDOMNode(this.refs.myDiv)

    // Do something with myDiv using, for example, jQuery:
    $(divRef).fadeIn(200)
  }

  render() {
    return (
      <div ref="myDiv">
        This is my div. There are many other like it, but this is mine.
      </div>
    )
  }
}
{% endhighlight %}

Yeah, that's basically all there is to it. Assign refs, then use `findDOMNode` to access the HTML element repsresented by the React component. Only use this if necessary though, we do not want to circumvent React's virtual DOM too much. Also, only use refs when the renders have completed. `componentDidMount` and `componentDidUpdate` are the two lifecycle methods where you can use refs, because once they run, you are guaranteed to have an up-to-date and rendered DOM element under your React component.

## blogpostWillUnmount

That is all you need to know to get started with React. There's a lot more to it though, make no mistake. The goal with this post is not to teach you everything. It is to give you the basics in one place so you can venture onwards and learn more! If you've read this in its entirety, you will have the mental context required to understand other React resources. A good next step would be [the React documentation](http://facebook.github.io/react/docs/getting-started.html)!

In later blog posts I will continue onwards to Flux, Facebook's cool application architecture specification that pairs extremely well with React. See you then!