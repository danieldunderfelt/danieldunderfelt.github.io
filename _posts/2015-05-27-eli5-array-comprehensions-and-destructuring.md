---
layout: post
title: "ELI5: Comprehensions and destructuring"
categories:
  - eli5
tags:
  - es6
published: true
code_view: true
---

If you've had a look at the new ES6 syntax, you might, like me, find it a bit weird at first. Since most of the new stuff in ES6 is sugar and magic, that's totally understandable. I found that good, practical examples that go straight to the point get the job done in explaining the new and shiny. Fire up your ES6 environment ([I'm partial to JSPM](http://blog.developsuperpowers.com/jspm-superpowered-es6-development/)) and let's break down *array comprehensions* and *destructuring*!

One note: This article aims to illustrate these concepts in a very simple way. I will not cover all use cases and variations, and I will try not to use super-technical language. If you're an expert on the subject, this post is not for you. I'd love to hear your feedback if you read it though!

## Destructuring

Destructuring is simply taking values out of an array or object one by one and declaring them as variables in the current scope, in a single line of code. A block of code says more than a thousand words:

{% include code_caption.html text="script.js" %}

{% highlight javascript %}

// Given an array like this:
var arr = [1, 2, 3]

// Bind values as variables using destructuring:
var [a, b, c] = arr

// It's the same as doing this:
var a = arr[0]
var b = arr[1]
var c = arr[2]

console.log(a, b, c) // Prints "1 2 3" in the console

{% endhighlight %}

As you can see, with only one line we can pluck out values from an array and assign them to variables.

It also works for objects:

{% include code_caption.html text="script.js" %}

{% highlight javascript %}

// Our object:
var obj = {a: 1, b: 2, c: 3}

// Bind values as variables using destructuring:
var {a, b, c} = obj

console.log(a, b, c) // Prints "1 2 3" in the console

// If you want more control:
var {a: d, b: f, c: h} = obj

console.log(d, f, h) // Prints "1 2 3" in the console

{% endhighlight %}

Object destructuring is pretty much the same as array destructuring, but you use curly braces instead. In the example I also wrote up an alternative way, if you want to assign object keys to variables manually. Basically, you take key `a` and assign it to variable `d` and so on.

Okay, that's pretty cool, but what is the use case? How about a function that returns multiple values?

{% include code_caption.html text="script.js" %}

{% highlight javascript %}

// A very simple function:
var fn = () => {
  return ["one", "two", "punch"]
}

// Destruct it:
var [one, two, punch] = fn()

console.log(one, two, punch) // Prints "one two punch" in your console

{% endhighlight %}

Much cleaner than getting the values by array index.

You can't always be sure about how many values an array might have, if any. That's why destructuring is "fail-soft", which means your variables will simply be `undefined` if no values can be mapped to them:

{% include code_caption.html text="script.js" %}

{% highlight javascript %}

var arr = [1, 2]
var [a, b, c] = arr // Less values in the array than we assign variables

console.log(c) // c is undefined :(

// You can also assign defaults:
var [a, b, c = "default"] = arr

console.log(c) // c is now "default"

{% endhighlight %}

So if the API you're using returns an empty array, your app won't blow up. That's nice.

If you don't want all the values from an array or object, feel free to just skip the unneeded ones:

{% include code_caption.html text="script.js" %}

{% highlight javascript %}

var arr = [1, 2, 3]
var [a, ,c] = arr

console.log(a, c) // prints "1 3" in your console

{% endhighlight %}

Cool! Let's move on to *array comprehensions*.

## Comprehensions

Before we continue, be aware that only Babel supports comprehensions, and you need to enable experimental features in Babel. Comprehensions are part of the ES7 spec.

While destructuring is an easy way to retrieve values from an array, *comprehensions* are all about **building** arrays. Again, the concept is simpler than the term: you just declare an array the normal way like so `[]`, but instead of stuffing values into it, you stuff a loop into it! Every iteration of the loop adds one value to the array.

There are gotcha's though: the loop must be a new-fangled `for...of` loop. Any other loop will not do! And the only other thing you are allowed to include in the comprehension are `if` statements.

Array comprehensions are related to `ES6 generators` which we'll not be discussing here. If you want a primer on those, I highly recommend [David Walsh's blog](http://davidwalsh.name/es6-generators).

The `for...of` loop needs a quick explainer: it loops over `iterables`. `generators` are iterables, and so are your basic arrays and objects. You're probably familiar with the `for...in` loop, which you can use to loop over object *keys*. The `for...of` loop simply loops over *values* instead.

Enough chit-chat, let's see some examples!

{% include code_caption.html text="script.js" %}

{% highlight javascript %}

// We want to multiply the values in this array by three:
var arr = [1, 2, 3]

// Easy! We'll use comprehension:
var multiplied = [
  for(value of arr)
    value * 3
]

console.log(multiplied) // Prints [3, 6, 9] in your console

// With conditional statements:
var multipliedIfTwo = [
  for(value of arr)
    if(value === 2)
      value * 3
]

console.log(multipliedIfTwo) // Prints [6]

{% endhighlight %}

You shouldn't use curly brackets for your loops and if's in comprehensions. In fact, those will result in compiler errors!

Being able to just insert a loop in the array makes life so much more comfortable, don't you think? You can compare comprehension to the `.map()` function of ES5 arrays. Here's the above example written using `.map()`:

{% include code_caption.html text="script.js" %}

{% highlight javascript %}

// We want to multiply the values in this array by three:
var arr = [1, 2, 3]

// Easy! We'll use comprehension:
var multiplied = arr.map(function(value) {
  return value * 3
})

console.log(multiplied) // Prints [3, 6, 9] in your console

{% endhighlight %}

`.map()` still comes in handy if you want to use more than `for...of` and `if`, so don't delete it from your memory just yet!

## Further reading

MDN is hands-down the best documentation for Javascript there is, and they have an entry for both destructuring and comprehensions:

- [Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [Comprehensions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Array_comprehensions)

## In a nutshell

That was one of ES6's cooler syntax sweeteners and a ES7's timesaver in a nutshell. I hope I made it clear and... comprehensible!

If you have any feedback, I'd love to hear it. I'm [@ddunderfelt](https://twitter.com/ddunderfelt) on twitter! See you in the next post.