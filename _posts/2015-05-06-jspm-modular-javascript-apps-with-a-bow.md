---
layout: post
title: "JSPM: Modular Javascript apps with a bow"
categories:
    - jspm
tags:
    - es6
    - architecture
published: true
code_view: true
---

Alright alright, yes. NPM handles all kinds of Javascript packages, both backend and frontend, and looks good doing it. JSPM though, has a few tricks up its sleeve when it comes to frontend packages. One, it is not satisfied with only one registry. Oh no! It can pull in that sweet, sweet code from both the NPM registry **and** Github! Two, browsers aren't CommonJS comptatible. If you want to use your NPM packages in them you need a build step facilitated by Browserify or Webpack. With JSPM, you can use your packages straight away with the downright futuristic ES6 module syntax! Let me walk you through these scenarios and more in this blog post.

### Are you watching closely?

In the last (and first) post about JSPM I outlined how to set it up for a project. If you haven't read it, [go do that first](http://blog.developsuperpowers.com/jspm-superpowered-es6-development).

The main, fundamental difference between NPM and JSPM is that, with JSPM, you want your webserver to serve the packages folder. With NPM though, your `npm_modules` folder is not meant to contain any frontend code you would need to serve to your visitors. That is one of the reasons Browserify bundles your code.

JSPM includes bundling, but it's not for the same main reason that Browserify does it. Long story short, JSPM bundles is a stop-gap solution we need until Http2 deployment is wide-spread. I won't babble on about it now, but you can read more about Http2 and why it's awesome right [here](http://readwrite.com/2015/02/18/http-update-http2-what-you-need-to-know) if you're interested.

JSPM is built to take full advantage of Http2 (when it is fully deployed) for fast, concurrent serving of your packages. That's simply out of scope for NPM.

### Let's git some packages

Install time! It's very much like NPM or some other package manager, really. As an example, this is how you would go about installing jQuery:

{% include code_caption.html text="terminal" %}

```
jspm install jquery
```

Huh, that's kind of anti-climactic. This command will pull in the latest version of jQuery from Github and it'll ready to be `import`-ed right way.

Want it from NPM? Specify which registry you want to use by writing either `github:` or `npm:` in front of the name of the package, like this:

{% include code_caption.html text="terminal" %}

```
jspm install npm:jquery
```

One word of caution, directly from the JSPM docs:

> When installing from npm, various build operations are applied to convert Node-style requires into jspm-compatible requires. Sometimes this will break, in which case please post an issue.

I haven't run into any issues though.

But what if you need to support IE 8? jQuery 2 won't do in that case. Specify a version by inserting a `@` character followed by the version you want after the package name, like so:

{% include code_caption.html text="terminal" %}

```
jspm install jquery@1.11.2
```

As long as the version is tagged on Github, it will be available in this fashion.

### For the love of Github

You know NPM already, right? One of JSPM's strengths is being able to install from Github, so that's what we'll look closer at here.

Installing from Github differs slightly from the NPM procedure. Forking is popular among kids these days, so a project might have hundreds of forks. There's also many projects using the same name. Madness! But not too much for JSPM. When we specify `github:` as the source of our package, we have to supply a namespace. Let's take the popular utility library `lo-dash` as an example:

{% include code_caption.html text="terminal" %}

```
jspm install github:lodash/lodash
```

Namespaces are just the username of the developer or organisation who owns the repository, you can find it at the very top of all Github repository pages.

There's just one small problem with that command above. Actually it's more like a small inconvenience: when importing that package in your code you have to use `lodash/lodash`. Yeah. Ugh. That also applies when you want to uninstall it. Luckily we can tell JSPM exactly what we want to refer to a package as, using an alias:

{% include code_caption.html text="terminal" %}

```
jspm install lodash=github:lodash/lodash
```

Now we've saved ourselves some keystrokes whenever we want to deal with this package. I can also tell you that you can still use `lodash/lodash` if you want!

Of course, aliases are not only for Github packages. In fact, the very first code example in this post is actually JSPM-sugar for this:

{% include code_caption.html text="terminal" %}

```
jspm install jquery=github:components/jquery
```

### But how does it know??

How does JSPM decide where jQuery should be installed form, then? Good question! The answer is [the JSPM registry](https://github.com/jspm/registry/blob/master/registry.json). If you open that link you'll see a list of mappings for many popular libraries and frameworks. When you tell it to `jspm install jquery` it'll check that list and resolve your command appropriately.

If your package is not on the list, it'll search for it on NPM and Github. If that is unsuccessful, you have to write it out like the example above.

### Using your packages

By now you've installed some packages. Let's actually use them, shall we?

With JSPM, we use the ES6 module syntax exclusively. Behind the scenes JSPM uses the [ES6 module loader](https://github.com/ModuleLoader/es6-module-loader) to polyfill this functionality, which means that no matter what module format a package uses, JSPM can translate it to ES6 module syntax. **That**, my friends, is cool.

I remember the Browserify days when I passed on packages that weren't written for CommonJS. Those were dark times. Today I can simply `jspm install` anything and use it with one, consistent module syntax. Example time!

In a Javascript file, the simplest way to import a package is this:

{% include code_caption.html text="MyConsumingModule.js" %}

{% highlight javascript %}
import _ from 'lodash'

// For reference, the CommonJS equivalent:

var _ = require('lodash')
{% endhighlight %}

Clean, isn't it?

In ES6, we can export modules in a few different ways. The example above applies to importing a module exported as the **default** for a module. One module can also have multiple exports, in which case we import them like this:

{% include code_caption.html text="MyConsumingModule.js" %}

{% highlight javascript %}
import {function1, variable2} from './MyExportedModule.js'

// Those imports above were exported like this:

export function function1() { ... }
export var variable1
{% endhighlight %}

After importing like that, we can simply use the imported parts as if they were defined in the same scope.

We can also import every export in one go:

{% include code_caption.html text="MyConsumingModule.js" %}

{% highlight javascript %}
import * as MyModule from './MyExportedModule.js'

// And then use them like this:

MyModule.function1(MyModule.variable1) // Don't copy that
{% endhighlight %}

Now they are neatly organised under a module namespace.

Exporting a default is easy:

{% include code_caption.html text="MyExportedModule.js" %}

{% highlight javascript %}
class Foo {}

export default Foo
{% endhighlight %}

If you use a default export, it is up to the consuming module to name it.

That means that if you don't use the `default` keyword, you have to call the export by the same name as you exported it when you import it. Refer again to the `multiple exports` example above. But when you designate the export as a `default`, you can import is as whatever you want:

{% include code_caption.html text="MyConsumingModule.js" %}

{% highlight javascript %}
import Derp from 'lodash'

// And use it by the name "Derp":

let arr = [1, [2, 3], 4]
let flattenedArr = Derp.flatten(arr) // [1, 2, 3, 4]
{% endhighlight %}

Keep in mind that for most of the packages you'll use, JSPM rewrites its exports to ES6 default exports. I say "most" because, while I've never come across one, there might be packages out there that deviate from this assumption. But since you'll be writing your code as modules, you'll also need those other ways to import and export.

That was a very brief look at ES6 modules. I highly recommend [this blog post](http://www.2ality.com/2014/09/es6-modules-final.html) for in-depth information on the ES6 module syntax.

### Cool! Now let me get coding!

Yes, I will! Expect more on ES6 and JSPM in the future, there's still quite a lot to the new package manager on the block that I haven't covered yet, like bundling for production and the JSPM CDN.

You can find the full JSPM docs on installing packages [here](https://github.com/jspm/jspm-cli/wiki/Installing-Packages).

I hope this article was informative! See you next week.