---
layout: post
title: "ELI5: Ecmascript 7 decorators"
categories:
  - eli5
tags:
  - es7
  - decorators
published: true
code_view: true
---

If you've been following the ESNext scene, you might have stumbled upon syntax that includes the `@` character. Weird, right? Following along that code can be diffcult for other reasons too, as it doesn't really behave as you might be accustomed to. That new syntax is `decorators`, which are part of the ES7 spec. Read on for a simple explanation of what they are and how to use them.

ES7 won't be here for a while, but everyone's favourite Javascript transpiler, Babel, is more than up to the task of transpiling our ES7 code. We Javascript developers really are spoiled.

One note: This article aims to illustrate these concepts in a very simple way. I will not cover all use cases and variations, and I will try not to use super-technical language. If you're an expert on the subject, this post is not for you. I'd love to hear your feedback if you read it though!

Basic knowledge about object-oriented programming is good to have before continuing.

## ES7 decorators

What are decorators, you may ask? They are a way to mix in additional parts into your classes. We already got classes with ES6, and while you can extend them, the class system in Ecmascript is quite simplistic. There will be times when you want many classes to share a piece of functionality, but there isn't a good way to distribute that functionality. ES7 decorators are here to help.

If you've heard about `mixins` or `traits`, that's basically what we're going to do here. Decorators simply "decorate" an object with new stuff or metadata. As always, everything is best explained with a code example:

{% include code_caption.html text="es7.js" %}

{% highlight javascript %}

// Here's the decorator in action.
// It is basically an expression that
// returns a function. You apply it
// to your code by prefixing it with an
// @-character and putting it right ON TOP OF
// the thing you want to decorate:

@addCost(200)
class Cellphone {

  constructor() {
    this.model = "Samsung"
    this.storage = 16
  }
}

// This is a simple factory function that
// returns the decorator we want. If you
// decorate a class, the decorator itself
// takes one argument; the class itself.
function addCost(sum) {
  return function decorator(theThingWereDecorating) {
    theThingWereDecorating.prototype.cost = sum
  }
}

var phone = new Cellphone()

console.log(phone.cost) // prints 200

{% endhighlight %}

That's right. Decorators act on the thing they're on top of! Not really what I'm used to in Javascript, but it does the job perfectly. Here, we're simply "decorating" the class with a `cost` property.

Decorators can also be inserted *inside* the class body:

{% include code_caption.html text="es7.js" %}

{% highlight javascript %}

class Cellphone {

  constructor() {
    this.model = "Samsung"
    this.storage = 16
  }

  @hide
  get NSABackdoor() {
    return true
  }
}

// This is not a factory this time, but a direct decorator.
function hide(target, name, theThingWereDecorating) {
  // Setting the enumerable property to false
  // hides the thing from loops. This is metadata.
  theThingWereDecorating.enumerable = false
  return theThingWereDecorating
}

let phone = new Cellphone()

for(let prop in phone) {
  console.log(prop) // prints "model" and "storage", but not "NSABackdoor".
}

{% endhighlight %}

Stupid example aside, this is a good use-case for decorators; adding *metadata*. In this case we're telling the getter that it's not allowed to be *enumerated*, that is, it won't show up in a loop. While it won't be great for hiding evidence of an NSA backdoor, a decorator such as this is good to have when you don't want irrelevant stuff in your loops.

We can also add methods:

{% include code_caption.html text="es7.js" %}

{% highlight javascript %}

// Decorate it to add the "callNumber" method
@makesPhonecalls
class Cellphone {

  constructor() {
    this.model = "Samsung"
    this.storage = 16
  }
}

function makesPhonecalls(target) {
  // Create a function to attach. Of course,
  // you may attach any function, you don't
  // need to create it here. Import one and try!
  let callNumber = function(number) {
    return `calling ${number}`
  }

  // Attach it to the prototype
  target.prototype.callNumber = callNumber
}

let phone = new Cellphone()

console.log(phone.callNumber(12345)) // prints "calling 12345".

{% endhighlight %}

As you can see, mixing something into a class is really easy in ES7. If you've used classic React (with `React.createClass()` and that stuff), and you miss the mixin feature in the ES6 version, this might just be the ticket. There's [discussions](https://discuss.reactjs.org/t/should-es7-decorators-replace-mixins/256) about making decorators a part of React in the future!

## Further resources

That's about all that fits into the "ELI5" scope, but there's more to decorators than what I've highlighted here. Next, you can read [Wycats' summary](https://github.com/wycats/javascript-decorators), and [install a collection of ready-made decorators](https://github.com/mako-taco/DecorateThis) you can use right now!

## Thanks for reading!

That's it for this time! I'll post more about ES6 and 7 in the future, as I get acquainted with the new features myself. I always appreciate feedback and new ideas about blogging topics, you can reach me at [@ddunderfelt](https://twitter.com/ddunderfelt) on twitter. Thanks for reading!