---
layout: post
title: "Getting rid of Ruby"
categories:
    - frontend
tags:
    - ruby
    - libsass
    - sass
    - gulp
    - guide
published: true
code_view: true
---

Good news everyone! [Libsass](https://github.com/sass/libsass) version 3.2.0 was released a few days ago, bringing 97% feature parity with Ruby Sass! For anyone lamenting the need to have Ruby in their stack just to compile styles, now is as good a time as any to get rid of it. Read about the release and the major updates [here](https://github.com/sass/libsass/releases/tag/3.2.0).

Libsass is a Sass compiler written in C by Sass' original creator, [Hampton Catlin](https://twitter.com/hcatlin). Ruby is a relatively slow language, whereas C is about as fast as you can get, so compile times between these two compare noticeably in Libsass' favor.

In this blog post I'll highlight some alternatives to your Ruby gems and compass plugins in the context of migrating a current project from Ruby Sass and Compass to Libsass. Compass itself isn't yet compatible with Libsass, as it has some features that are implemented directly with Ruby. A Libsass version of Compass is under development, and there are some solutions to make the wait easier to bear.

I use Gulp in this guide, as it is fast and easy to get started with. [Here's](http://www.smashingmagazine.com/2014/06/11/building-with-gulp/) a nice primer for the curious. I should also point out that if you do **not** want to get rid of Ruby... well, why are you reading this blog post?

### Let's dive in

So what's the plan here? We'll check out alternatives and quick bootstrapping for the following:

- [Susy](http://susy.oddbird.net/)
- [Sass globbing](https://github.com/chriseppstein/sass-globbing)
- [Compass](http://compass-style.org/)
- [Sass Toolkit](https://github.com/at-import/toolkit)
- [Breakpoint](http://breakpoint-sass.com/)

The specific dependencies for your project may differ. If you don't need it, don't do it! That said, the libraries covered here are from the popular end of the spectrum and genuinely useful, so you may want to take a look anyway.

### Time to dust off Bower

Ah, Bower. Until now, I wasn't a Bower user. I saw no point in it as NPM handled everything I needed. Turns out it's pretty handy for Sass libraries!

Susy, Sass Toolkit and Breakpoint are all available on Bower. They do not depend on Compass and do not use any Ruby code. So let's install them!

In case you aren't familiar with Bower, [go read this](http://code.tutsplus.com/tutorials/meet-bower-a-package-manager-for-the-web--net-27774).

Install our libraries using Bower:

{% include code_caption.html text="terminal" %}

```
bower install breakpoint-sass sass-toolkit susy --save
```

The `--save` flag records your dependencies into a bower.json file that Bower creates in the root of your project. Don't ask why it's not the default.

Great! Now we have some of our dependencies. Next, let's start building our gulpfile.

### Sipping Sass

First off, we need some Gulp plugins. Install `gulp-sass`, `gulp-autoprefixer`, `gulp-sourcemaps` and `glob`. `glob`? We'll need that in a little bit. Here's the full command for your copy-pasting pleasure:

{% include code_caption.html text="terminal" %}

```
npm install --save-dev gulp gulp-sass gulp-autoprefixer gulp-sourcemaps glob
```

[Gulp-sass](https://github.com/dlmanning/gulp-sass) is a wrapper around [Node-sass](https://github.com/sass/node-sass) which in turn provides bindings to Libsass from Node.js. It is the easiest way to get started with Libsass. [Autoprefixer](https://github.com/postcss/autoprefixer) (through [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer)) is a tool that automatically inserts vendor prefixes where needed. If you've been relying on Compass mixins for this, Autoprefixer will be a breath of fresh air. Finally, [Gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps) generates sourcemaps for easy debugging in the browser. As you can see, these three Gulp plugins provide much of the basic Compass functionality. I recommend skimming each plugin's readme for information about options and configuration.

Now create a `gulpfile` and use the following to start it off:

{% include code_caption.html text="gulpfile.js" %}

{% highlight javascript %}

var gulp = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var sourcemaps = require('gulp-sourcemaps')

var fs = require('fs')
var path = require('path')
var glob = require('glob')

{% endhighlight %}

`Path` and `fs` are part of Node.js's standard library, so we do not need to get them through NPM spearately.

And then, the mighty Sass task:

{% include code_caption.html text="gulpfile.js" %}

{% highlight javascript %}

gulp.task('sass', function() {
  return gulp.src('sass/*.scss')
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sass({
          errLogToConsole: true,
      }))
      .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('css'))
})

{% endhighlight %}

If you have existing sourcemaps, it might be beneficial to enable the `loadMaps` option. Keep in mind that all tasks between `sourcemaps.init()` and `sourcemaps.write()` need to be sourcemaps-compliant. `gulp-sass` and `gulp-autoprefixer` are, so we can use them freely. Check out a list of sourcemaps-enabled gulp-plugins [here](https://github.com/floridoo/gulp-sourcemaps/wiki/Plugins-with-gulp-sourcemaps-support).

I always pass in `errLogToConsole: true` to the Sass plugin, because otherwise the watch loop will halt immediately on an error. I don't want my watch loop to stop if I forget a semicolon in the Sass! That option makes errors display in your terminal instead, without stopping the watch process.

If you don't provide `sourcemaps.write()` with a path, it will put the sourcemaps inline in the Sass files. This is up to you, but keep in mind that the path you provide is relative to the path you give to `gulp.dest()`.

To finalize the gulpfile, a `default` task that kicks off the filewatch is needed:

{% include code_caption.html text="gulpfile.js" %}

{% highlight javascript %}

gulp.task('default', ['browser-sync'], function () {
    gulp.watch(["sass/**/*.scss"], ['sass'])
});

{% endhighlight %}

And done! As it is now, this gulpfile will compile your styles, add vendor prefixes as needed and create sourcemaps. Because Libsass is used instead of Ruby, all of that is lightning-quick. Sorry to ruin your "sass is compiling" coffee breaks.

Now it is time to put those Sass libraries to good use.

### Susy your toolkit at the breakpoint

This part is trivial. As we already installed these libraries, importing them is simple:

{% include code_caption.html text="style.scss" %}

{% highlight sass %}

@import '../bower_components/breakpoint-sass/stylesheets/breakpoint';
@import '../bower_components/sass-toolkit/stylesheets/toolkit';
@import '../bower_components/susy/sass/susy';

{% endhighlight %}

Paste that into your master Sass file and you'll have your familiar Compass-related tools back. They are Libsass compatible, free of Ruby and work just like you're used to.

### What's the globbing problem

Globbing. Generally discouraged with styles, but oh so useful. If you are confronted with a large set of styles that use globbing extensively, and you don't feel like writing out all the imports by hand when you switch to Libsass, you'll be glad to hear that I've got a solution. It's not **quite** the same as the widely-used [sass-globbing](https://github.com/chriseppstein/sass-globbing) library that you probably have in your Ruby Sass-based project, but it is kinda cool.

I searched high and low for a gulp plugin that would accomplish the same, but only found [this](https://github.com/jsahlen/gulp-css-globbing). It promises much, but as hard as I tried, I couldn't get it to work. Oh well. There's also a [plugin for Grunt](https://github.com/DennisBecker/grunt-sass-globbing), but I use Gulp and I don't want to mix them.

Then I found [this blog post](http://nateeagle.com/2014/05/22/sass-directory-imports-with-gulp/). Read that blog post for the particulars, but the gist is this gulp task. Here's that `glob` package we installed earlier put to good use:

{% include code_caption.html text="gulpfile.js" %}

{% highlight javascript %}

gulp.task('sass-includes', function (callback) {
  var all = '_all.scss'
  glob('sass/**/' + all, function (error, files) {
    files.forEach(function (allFile) {
      // Add a banner to warn users
      fs.writeFileSync(allFile, '/** This is a dynamically generated file **/\n\n')

      var directory = path.dirname(allFile)
      var partials = fs.readdirSync(directory).filter(function (file) {
        return (
          // Exclude the dynamically generated file
          file !== all &&
          // Only include _*.scss files
          path.basename(file).substring(0, 1) === '_' &&
          path.extname(file) === '.scss'
        )
      })

      // Append import statements for each partial
      partials.forEach(function (partial) {
        fs.appendFileSync(allFile, '@import "' + partial + '";\n')
      })
    })
  })

  callback()
})

{% endhighlight %}

When you have subfolders containing lots of Sass partials, `@import`ing them with this weapon in your arsenal is simple. Just create an empty Sass file in all the directories you want to import called `_all.scss` and `@import` **that** in your master Sass file. The `sass-includes` task will make sure the `_all.scss`-file contains imports to the rest of the partials in its folder. Sure, you could modify that task to just import **everything**, but I feel the `all`-file gives us a little bit of control.

To wrap up this part, we still need to **run** the `sass-includes` task. I did it by simply modifying the `default` gulp-task like so:

{% include code_caption.html text="gulpfile.js" %}

{% highlight javascript %}

gulp.task('default', ['browser-sync'], function () {
    gulp.watch(["sass/**/*.scss", "!**/_all.scss"], ['sass-includes', 'sass'])
});

{% endhighlight %}

Make sure to exclude the `_all.scss`file, otherwise you'll end up in a watch-compile loop.

Now that we have that taken care of, it is time to navigate the treacherous Compass-without-Ruby waters.

### Finding your way without Compass

There's a few things we can do here. For one, ask yourself if you can use [Bourbon](http://bourbon.io/) instead? Although not mentioned on the site, you can install Bourbon with Bower. It does not depend on Ruby. If you have an existing project that has used Compass mixins extensively you might not want to, but it is an option.

Okay, so Bourbon was a long shot. I get it. Luckily a guy who calls himself [Guillaume Balaine](https://twitter.com/Igosuki) has made the Compass stylesheets available on Bower! If you don't use any Compass stuff that is implemented with Ruby, your current Compass-dependent styles will work as-is after you install `compass-mixins` with Bower:

{% include code_caption.html text="terminal" %}

```
bower install compass-mixins --save
```

Easy!

I also have a solution for your spritesheets! It's called [Wellington](https://github.com/wellington/wellington) and it promises to be a drop-in replacement for Compass' spritesheet generation facilities. A few caveats: I haven't tried it so I can't tell you if it actually works or if it's good. It is also Mac-only.

You use [Homebrew](http://brew.sh/) to install it and then you use it from the command line. Setting up a gulp-task for it should be trivial but I don't have one up my sleeve. This is a push in the right direction: [gulp-exec](https://github.com/robrich/gulp-exec).

### Live long and Libsass

So that were the things I used to purge Ruby from the stack of a site I'm working on. Hopefully I helped you in your endeavour towards that same goal. For further reading, check out [this post](http://www.sitepoint.com/switching-ruby-sass-libsass/) on Sitepoint by [James Steinbach](https://twitter.com/jdsteinbach) on some of the differences between Ruby Sass and Libsass. Keep in mind though that Libsass has improved rapidly since that one was written, so not all of it is up-to-date (like the part about Susy not being Libsass compatible).

See you next time!