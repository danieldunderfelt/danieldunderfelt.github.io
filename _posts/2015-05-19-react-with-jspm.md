---
layout: post
title: React with JSPM
categories:
  - react
tags:
  - jspm
  - es6
published: true
code_view: true
---

I have been playing with [React](https://facebook.github.io/react/) a bit recently, and I am liking a lot. Instant fan! I was also very pleased to find out it works incredibly well with my JSPM setup. Sadly, no one seems to talk about this. In most articles about using React, Webpack or Browserify is used. Time to change that!

There are several reasons why you'd want to use JSPM for not only React, but for any ES6 project:

- No build step! Just write that code and it will run.
- Babel, which comes with JSPM, handles `JSX` out of the box.
- ES6 module loader, which JSPM uses, has no problem with `.jsx`.
- JSPM easily installs any third-party React component.

I have a straight-forward JSPM setup guide [right here](http://blog.developsuperpowers.com/jspm-superpowered-es6-development/) if you are new to JSPM. When you have JSPM up and running in a new or existing project folder, read on.

### Make JSPM React

There is only one thing to set up before we can use React with JSPM. By default, ES6 module loader only loads vanilla `.js` files. It was build to be extended, which we'll accomplish with the following command:

{% include code_caption.html text="terminal" %}

```
jspm install jsx
```

Execute that command in your project folder and you're done. No build step, no Webpack loader config, nothing else.

### Well that was easy...

Yes it was. Let's write a simple `JSX` component to kick the tires!

Pull in React with JSPM:

{% include code_caption.html text="terminal" %}

```
jspm install react
```

Then use it straight away:

{% include code_caption.html text="MyReactComponent.jsx" %}

{% highlight javascript %}
{% raw %}

import React from 'react'

var colors = ['#FF0000', '#00FF00', '#0000FF']

class MyReactComponent extends React.Component {

  constructor() {
    // Always call super() as the first thing you do in an extended constructor!
    super()

    // In ES6, initial state is set as a property of the class
    this.state = {
      colorIndex: 0
    }
  }

  handleClick(e) {
    e.preventDefault()
    let nextColor = this.state.colorIndex + 1
    let setColor = nextColor > colors.length - 1 ? 0 : nextColor

    this.setState({
      colorIndex: setColor
    })
  }

  render() {
    let color = colors[this.state.colorIndex]
    return <a href="#" style={{color: color}} onClick={this.handleClick.bind(this)}>
      Hello there, {this.props.name}!
    </a>
  }
}

export default MyReactComponent

{% endraw %}
{% endhighlight %}

That is a silly module that cycles through an array of colors on every click (it was the simplest example I could think of on the spot). Make sure to save it with a `.jsx` extension! Next, we'll `import` it into an app:

{% include code_caption.html text="index.js" %}

{% highlight javascript %}

import React from 'react'

// Import non-js files like this, with the extension and an exclamation point:
import MyReactComponent from './MyReactComponent.jsx!'

(() => {
  React.render(
    <MyReactComponent name="Daniel" />,
    document.getElementById('react-app')
  )
})()

{% endhighlight %}

And now, as soon as you pop open a local server and a browser, you'll see your new component in the DOM. Remember the special syntax, `import MyReactComponent from './MyReactComponent.jsx!'`, for importing non-js files! The ES6 module loader would look for a `.js` file otherwise. As an aside, we can make JSPM able to import other kinds of files as well, like `.css`!

### Finishing touches

No! No finishing touches needed! Go write some React and have fun. See you all in the next blog post!
