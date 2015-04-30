---
layout: post
title: "Purging Ruby from your stack"
categories:
    - frontend
tags:
    - ruby
    - gulp
    - tutorial
published: true
---

Good news everyone! [Libsass](https://github.com/sass/libsass) version 3.2.0 was released a few days ago, bringing 97% feature parity with Ruby-sass! For anyone lamenting the need to have Ruby in your front end development stack, now is as good a time as any to get rid of it. Read about the release and the major updates [here](https://github.com/sass/libsass/releases/tag/3.2.0).

In this blog post I'll guide you through alternatives to some of your Ruby gems and compass plugins in the context of migrating a current project from Ruby sass and Compass to Libsass. Compass itself isn't yet compatible with Libsass, as it has some features that are implemented in straight Ruby code. A Libsass version of Compass is under heavy development, and there are some solutions to make the wait easier to bear.

As I exclusively use Gulp for my building needs, this guide will naturally be for Gulp and features Gulp-y solutions. I should also point out that if you do not want to get rid of Ruby... well, why are you reading this blog post?

### Let's dive in

So what's the plan here? We'll check out alternatives and how-to's for the following:

- Susy
- Sass globbing
- Compass (the pure Sass parts)
- Sass Toolkit
- Breakpoint
- ... and other small tidbits I'm gonna sneak in

Since this guide was born from what I did today in a project and what that project already used, the specific dependencies for your project may differ. If you don't need it, don't do it! That said, the libraries covered in this guide are from the popular end of the spectrum and genuinely useful, so you may want to take a look anyway.

### Time to dust off Bower

Ah, Bower. Until today, before I did the conversion I am detailing in this very blog post, I wasn't a Bower user. I saw no point in it. NPM handled everyhting I needed. But it turns out it's pretty handy for Sass libraries!

Susy, Sass Toolkit and Breakpoint are all available on Bower. They do not depend on Compass and do not use any Ruby code. So let's install them!

In case you aren't familiar with Bower, [check this out](http://code.tutsplus.com/tutorials/meet-bower-a-package-manager-for-the-web--net-27774) (or use google).

If you don't have Bower, like I didn't, start off with installing it:

```
npm install -g bower
```

Then, install what we can using Bower:

```
bower install breakpoint-sass sass-toolkit susy --save
```

The `--save` flag records your dependencies into a bower.json file that Bower creates in the root of your project. Don't ask why it's not the default.

Great! Now we have some of our dependencies. Next, let's start sketching out our gulpfile.

### Sipping Sass

First off, we need some Gulp plugins. Install `gulp-sass`, `gulp-autoprefixer`, `gulp-sourcemaps` and `glob`. I also like to throw in Browser-sync, which means we'll also need `gulp-filter` to remove the sourcemaps from the stream. And `glob`? We'll need that in a little bit. Here's the full command for your copy-pasting pleasure:

```
npm install --save-dev gulp gulp-sass gulp-autoprefixer gulp-sourcemaps gulp-filter browser-sync glob
```

Cool! Now create a `gulpfile` and use the following EasyPaste™ box to start off your gulpfile:

{% highlight javascript %}

var gulp = require('gulp')
var browserSync = require('browser-sync')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var sourcemaps = require('gulp-sourcemaps')
var filter = require('gulp-filter')

var fs = require('fs')
var path = require('path')
var glob = require('glob')

var reload = browserSync.reload

{% endhighlight %}

And let's kick off the cavalcade of tasks with BrowserSync (feel free to omit this if you want to):

{% highlight javascript %}

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  })
})

// Useful for reloading html and Javascript, not used in this guide
gulp.task('bs-reload', function () {
  browserSync.reload()
})

{% endhighlight %}

And then, the mighty Sass task. The plugin we installed, `gulp-sass`, uses Libsass. The gulp plugin that uses Ruby-sass is clearly labeled `gulp-ruby-sass`. We'll steer clear of it in this guide. On to the task!

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
    .pipe(filter('**/*.css'))
    .pipe(reload({stream: true}))
})

{% endhighlight %}

This is a pretty standard Sass gulp task. If you're following along, make sure to replace the paths to suit your project. Starting off with all top-level sass-files in our `sass` folder, we then initialize the `gulp-sourcemaps` plugin. If you have existing sourcemaps, it might be beneficial to enable the `loadMaps` option. Keep in mind that all tasks between `sourcemaps.init()` and `sourcemaps.write()` need to be sourcemaps-compliant. `gulp-sass` and `gulp-autoprefixer` are, so well done to those guys. Check out a list of sourcemaps-enabled gulp-plugins [here](https://github.com/floridoo/gulp-sourcemaps/wiki/Plugins-with-gulp-sourcemaps-support).

I always pass in `errLogToConsole: true` to the Sass plugin, because who wants the filewatch to halt on errors? Not me! That option makes errors display in your terminal instead, without stopping the watch process.

If you don't provide `sourcemaps.write()` with a path, it will put the sourcemaps inline in the files. This is up to you, but keep in mind that the path you provide is relative to the path you give to `gulp.dest()`.

Because we have sourcemaps in the stream now, and we want to live-inject the styles with BrowserSync, we need to apply a filter to remove the sourcemaps. They are saved already and if we don't do this, BrowserSync will do a hard reload. After the filter, we execute BrowserSync's reload method. Nice!

To finalize the gulpfile, a `default` task that kicks off the filewatch is needed. Copy-paste time!

{% highlight javascript %}

gulp.task('default', ['browser-sync'], function () {
    gulp.watch(["sass/**/*.scss"], ['sass']);
});

{% endhighlight %}

And done! As it is now, this gulpfile will compile your styles, add vendor prefixes as needed, create sourcemaps and live-inject new styles on save. As Libsass is used instead of Ruby, all of that is lightning-quick. Sorry to ruin your "sass is compiling" coffee breaks.

Now it is time to put those Sass libraries to good use.

### Susy your toolkit at the breakpoint

This part is trivial. As we already installed these libraries, importing them is simple. But there's no Ruby gems in sight!

{% highlight sass %}

@import '../bower_components/breakpoint-sass/stylesheets/breakpoint';
@import '../bower_components/sass-toolkit/stylesheets/toolkit';
@import '../bower_components/susy/sass/susy';

{% endhighlight %}

Paste that into your master Sass file and you'll have your familiar Compass-related tools back. They are Libsass compatible, free of Ruby and work just like you're used to.

### The globbing problem

Globbing. Generally discouraged with Sass, but oh so useful. If you are confronted with a large set of styles that use globbing extensively, and you don't feel like writing out all the imports by hand when you switch to Libsass, you'll be glad to hear that I've got a solution. It's not **quite** the same as the widely-used [sass-globbing](https://github.com/chriseppstein/sass-globbing) library that you probably have in your Ruby-based project, but it is cool. Let's talk.

I searched and searched for a gulp plugin that would accomplish the same, but only found [this](https://github.com/jsahlen/gulp-css-globbing). It promises much, but as hard as I tried, I couldn't get it to work. Oh well. There's also a [plugin for Grunt](https://github.com/DennisBecker/grunt-sass-globbing), but I don't want to mix Grunt and Gulp. It feels excessive.

Then I found [this blog post](http://nateeagle.com/2014/05/22/sass-directory-imports-with-gulp/). Nate Eagle, you deserve a truckload of thanks. Feel free to read that blog post for the particulars, but the gist is this gulp task:

{% highlight javascript %}

gulp.task('sass-includes', function (callback) {
  var all = '_all.scss';
  glob('sass/**/' + all, function (error, files) {
    files.forEach(function (allFile) {
      // Add a banner to warn users
      fs.writeFileSync(allFile, '/** This is a dynamically generated file **/\n\n');

      var directory = path.dirname(allFile);
      var partials = fs.readdirSync(directory).filter(function (file) {
        return (
          // Exclude the dynamically generated file
          file !== all &&
          // Only include _*.scss files
          path.basename(file).substring(0, 1) === '_' &&
          path.extname(file) === '.scss'
        );
      });

      // Append import statements for each partial
      partials.forEach(function (partial) {
        fs.appendFileSync(allFile, '@import "' + partial + '";\n');
      });
    });
  });

  callback();
});

{% endhighlight %}

When you have subfolders containing lots of Sass partials, `@import`ing them with this weapon in your arsenal is a breeze. Just create an empty Sass file in all the directories you want to import called `_all.scss` and `@import` THAT in your master Sass file. The `sass-includes` task will make sure the `_all.scss`-file contains imports to the rest of the partials. Sure, you could modify that task to just import **everything**, but I feel the `all`-file gives us some control.

To wrap up this part, we still need to **run** the `sass-includes` task. I did it by simply modifying the `default` gulp-task like so:

{% highlight javascript %}

gulp.task('default', ['browser-sync'], function () {
    gulp.watch(["sass/**/*.scss", "!**/_all.scss"], ['sass-includes', 'sass']);
});

{% endhighlight %}

Make sure to exclude the `_all.scss`file, otherwise you'll en up in a watch-compile loop.

Now that we have that taken care of, it is time to navigate the treacherous Compass-without-Ruby waters.

### Finding your way without Compass

There's a few things we can do here. For one, ask yourself if you can use [Bourbon](http://bourbon.io/) instead? Although not mentioned on the site, you can install Bourbon with Bower. It does not depend on Ruby. If you have an existing project that has used Compass mixins extensively you might not want to, but it is an option.

Okay, so Bourbon was a long shot. I get it. Luckily a sharp guy who calls himself [Guillaume Balaine](https://twitter.com/Igosuki) has made the Compass stylesheets available on Bower! If you don't use any Compass stuff that is implemented with Ruby, your current Compass-dependent styles will work as-is after you install `compass-mixins` with Bower:

```
bower install compass-mixins --save
```

Easy!

But oh no, did you use Compass spritesheets? Damn. Well, throw in the towel now, because- Oh wait, I actually have a solution! It's called [Wellington](https://github.com/wellington/wellington). it promises to be a drop-in replacement for Compass' spritesheet generation facilities. A few caveats: I haven't used it. Sorry, I just haven't needed it! But it seems great. Also it's Mac-only. You use [Homebrew](http://brew.sh/) to install it and then use it from the command line and setting up a gulp-task for it should be trivial. I don't have one up my sleeve, but this is a push in the right direction: [gulp-exec](https://github.com/robrich/gulp-exec).

### Live long and Libsass

So that was the things I used to purge Ruby from the front-end stack of a site I'm working on. Hopefully I helped you in your endeavour towards that same goal. For further reading, check out [this post](http://www.sitepoint.com/switching-ruby-sass-libsass/) on Sitepoint by [James Steinbach](https://twitter.com/jdsteinbach) on some of the differences between Ruby sass and Libsass. Keep in mind though that Libsass has been improved on rapidly since that one was written, so not all of it is up-to-date (like the part about Susy not being Libsass compatible).

See you next time!