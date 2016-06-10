---
layout: page
title: "Updating NPM modules to the latest version"
code_view: true
---

So a new version of some of your node libraries came out, and you want to update? No problem! But before you go mashing `npm update` into your terminal, I have something to tell you.

It probably won't help.

**Update 31.3.2016**

And while the information here works, there is an easier way. The `salita` package is made for this exact situation. You simply `npm install -g salita` and run `salita` in your project folder. It will then update the versions recorded in your `package.json` file. After that is done, you need to run `npm update` to actually install the new versions of the packages.

ONLY do this if you are prepared for a potentially hours-long update job since new major versions mean that your code will probably break.

**Update end**

`npm update` respects the version constraints in your `package.json` file. If there's a new major version, or even a minor version, that probably will not be used, depending on how the version constraint was recorded in your `package.json` file. Read about `npm update` [here](https://docs.npmjs.com/cli/update), but do come back as that page doesn't have a solution to what we want to achieve.

Additionally, `npm update` won't update your dependencies dependencies. For example if you use `gulp-sass`, which depends on `node-sass`, and there has just been a new version of Libsass you want to upgrade to, `npm update` won't help you.

First, a caveat:

> If you need to keep a tight lock on your dependency versions, this guide is not for you. But you probably know what to do anyway.

### Step 1

In your `package.json` file, replace the version number of the package you want to update with an asterisk or just an empty string:

{% include code_caption.html text="package.json" %}

{% highlight json %}

"devDependencies": {
  "gulp-sass": "*"
}

{% endhighlight %}

Alternatively, replace it with the version you want to update to. The asterisk or empty string will always get you the latest version.

### Step 2

Delete your `node_modules` folder!

{% include code_caption.html text="terminal" %}

```
cd [your project folder path] &&
rm -rf node_modules/
```

We don't want any old dependencies lying around.

### Step 3

Reinstall your dependencies:

{% include code_caption.html text="terminal" %}

```
npm update --save
```

NPM will now pull in the latest versions of all the packages recorded in your `package.json` file, AND change the asterisks to the new version that was installed!

### Done!

Now you have the latest versions of all your dependencies. If you had any that you had forgot to `--save` when installing... well, let this be a lesson for the future.
