---
layout: post
title: "JSPM: Superpowered ES6 development"
categories:
    - es6
tags:
    - es6
    - jspm
    - tutorial
published: true
---

Javascript has come a long way, ladies and gentlemen. It won't be long until the new Ecmascript standard is fully released, bringing a ton of useful new features and syntactic sugar to both browsers and node environments. Who likes waiting though? Thanks to the Javascript community, we have tools to enable ES6 in all current browsers. Effortlessly and free of consequence.

## Starring: JSPM, Babel and SystemJS

[JSPM](http://jspm.io/) is an abbreviation for "Javascript Package Manager". It aims to serve front-end Javascript packages, whereas NPM is meant for Node.js. While NPM does a fine job with all kinds of packages, JSPM includes support for CDN's, all popular module formats and pulling in Github repositories as packages. Cool? Cool.

There is another side to JSPM as well. As it is built upon [SystemJS](https://github.com/systemjs/systemjs) (which enables the universal module loading), which in turn uses an es6 module loader polyfill, JSPM gains all the powers of those packages. SystemJS transparently harnesses the power of either the [Traceur](https://github.com/google/traceur-compiler) or [Babel](https://babeljs.io/) ES6 transpiler, using them to translate your ES6 code on the fly. This is really cool as we can write ES6 code, save, and instantly see the fruits of our labour in the browser, all without the faintest trace of a build step in between.

This article focuses on setting up a JSPM environment. I plan to write more about ES6 in the future, so stay tuned! Note that I assume you have some experience in Javascript and NPM for this tutorial. Also, you shouldn't fear the command line. It is your friend.

## Okay, how do I?

First, install JSPM as a global package through NPM:

```
npm install -g jspm
```

(If it errors with persmission issues and you need to use `sudo`, look into using [Node Version Manager](https://github.com/creationix/nvm). It will make your life easier and you'll become a better person in general.)

Then, we need a project to try it out in! I'll assume you'll create a new folder somewhere, but feel free to follow along in an existing project if you want to. Create a new project folder and `cd` into it from your terminal. After that, tell your computer to `jspm init`. That will result in a series of questions for easy setup:

```
Package.json file does not exist, create it? [yes]:
```

The word in the brackets at the end is the default answer. If you're happy with it, hit enter. If you already use NPM in the project you are in, you won't see this question as you already have a `package.js` file.


Alright, next:

```
Would you like jspm to prefix the jspm package.json properties under jspm? [yes]:
```

This creates a `jspm` section in your package.json file, where jspm will record your dependencies. Answer yes by decisively hitting `enter`.



```
Enter server baseURL (public folder path) [./]:
```

This one is interesting, so pay attention. Since jspm packages can be served as-is, they need to be available to your web server. That means you should have all your jspm stuff AND your own ES6 code in the folder you have designated the docroot. If you use an application framework like Laravel, that folder will be a subfolder inside your project called `public`. You probably know what your docroot folder is, so enter it here. The default is the project root, so if your index file resides here, just hit enter.



```
Enter jspm packages folder [./jspm_packages]:
```

This question concerns the location of your jspm dependencies and jspm's own libraries. Hit enter.



```
Enter config file path [./config.js]:
```

JSPM uses a configuration file to map dependencies, pass parameters to Babel and Traceur and more. It is important. Hit enter.



```
Configuration file config.js doesn't exist, create it? [yes]:
```

And yes, we want to create it.



```
Enter client baseURL (public folder URL) [/]:
```

Sometimes your site lives in a subfolder. If that is the case for you, insert the web path to your docroot here. For example, if I'm writing a game called `maze` that lives on my main site under a subfolder, I'd enter `maze/v1` here.



```
Which ES6 transpiler would you like to use, Traceur or Babel? [traceur]:
```

Hahaa! My favourite question. Here you must choose which transpiler you want to use; Babel or Traceur. I wholly recommend Babel. If you for some reason like Traceur more, hit enter. Otherwise, input `babel` as your answer to this question.

And that's the last of those. Next, JSPM will download es6-module-loader, Babel and SystemJS into your `jspm_packages` folder and set itself up.

Enabling your newfound JSPM powers in your project is simple and reflects how we'll do things in the future. Pop open your main html file (or server-side template), we'll call it `index.html`, and put these lines of code before the closing `</body>` tag:

{% highlight html %}

<script src="jspm_packages/system.js"></script>
<script src="config.js"></script>
<script>
    System.import('src/index').catch(console.error.bind(console))
</script>

{% endhighlight %}

As you can see, we're including systemJS and JSPM's config file in the document. Then comes the futuristic stuff. `System` is a method coming to all ES6-enabled browsers when ES6 is done, but we're polyfilling it here. Using the `ìmport` method we can easily import Javascript modules, asynchronously and dynamically. If you've used Browserify, have you ever wanted to import something conditionally? If you have, you'll have found out that it doesn't work. Browserify's `require()` function is used to traverse the dependency tree of your project and figure out what modules each part of your code needs. This happens in the build step, but what doesn't happen is code execution. That means `require()` will only stare at you blankly if you feed it something like `'module-' + dependecyNameVar`.

With System.import, however, all that is possible!

For now though, we'll settle with importing the entrance into your Javascript application. In the code example above, my `ìndex.js` file lives in the `src` folder. The `ìndex.js` file itself is nothing special, but it in turn imports other modules, which import more modules and so on. The takeaway here is that we're using ES6 modules from the start to import our whole application. Notice how you don't need to include any of your own code in `<script>` tags? As soon as browsers are ES6 ready, say goodbye to the JSPM files as well!

And next, we'll... wait, no! There's no next. Go write some ES6!

## Changing JSPM configuration

If you find that something doesn't work, changing JSPM configuration is easy.

Want to do the questions again? Just ask nicely:

```
jspm init --prompts
```

That'll give you the initialization questions again. If you want to switch between Traceur and Babel, the command is:

```
jspm dl-loader --babel

# or

jspm dl-loader --traceur
```

`jspm dl-loader` by itself will re-download your transpiler, SystemJS and es5-module-loader. It also takes the arguments `--edge` and `--source`. Edge will load the very latest versions of the loader files.

You can also change configuration in `config.js`. JSPM will not overwrite the file, but it may change it. For example, another way to switch transpilers is to find the `transpiler` entry near the top of `config.js` and change that to either `babel` or `traceur`. You will need to hit `jspm dl-loader` afterwards, though.

By the way, switching between transpilers is really easy. You don't have to do anything but change the config. No new `<script>` tags, no nothing.

Also in the `config.js` file, you'll see a `babelOptions` entry (I'll assume you're going with Babel from now on). This passes parameters straight to Babel. While not required, Babel does have a runtime and extra stuff available. This is where you'll enable those in the brave new JSPM world. For example, if you want to enable Babel's experimental Javascript features ([read more here](http://babeljs.io/docs/usage/experimental/)) like the "Stage 0" things, you'd add a `stage` key to the `babelOptions` map and set the value to `0`, like so:

{% highlight javascript %}

"babelOptions": {
    "stage": 0,
    "optional": [
        "runtime"
    ]
}

{% endhighlight %}

Likewise, if you don't need the runtime ([read more here](http://babeljs.io/docs/usage/runtime/)), feel free to remove the `"runtime"` element from the `optional` array.

## Wait, you said JSPM is a package manager?

Yes. We haven't really done any package managing yet, sorry for that. Luckily, I'll have a blog post up this same time next week, where we'll talk exclusively about package management with JSPM! To hold you over, here's the basics:

```
# Installing a package, for example jquery:
jspm install jquery

# Specifying which endpoint to use (npm or github):
jspm install npm:jquery
# or
jspm install github:jquery/jquery

# and removing a package:
jspm remove jquery # or jquery/jquery if you used github

# Setting an alias:
jspm install jquery=github:jquery/jquery

# Then, you can easily use the name 'jquery' to reference the package.
```

## Goooooodbyyyyye!

So that's it for this time, see you next week!