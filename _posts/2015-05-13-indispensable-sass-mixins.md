---
layout: post
title: Indispensable sass mixins
categories:
  - sass
tags:
  - css
  - snippets
published: true
code_view: true
---

Over the years I've accumulated some very useful Sass mixins and snippets. And here they are! Copypaste them into a `_mixins.scss` file and style away.

### Super easy media queries

If you're not using mixins for you media queries... well, you really should. This combo makes responsive layouts laughably easy to achieve:

{% include code_caption.html text="_responsive.scss" %}

{% highlight scss %}

$tablet: 768px;
$desktop: 1024px;
$wide: 1280px;

@mixin r($value, $operator: "min-width", $query: 'screen') {
    @media only #{$query} and (#{$operator}: #{$value}) {
        @content;
    }
}

@mixin bp($media, $limit: false) {
  @if $media == mobile {
    @include r($tablet - 1, "max-width") { @content; }
  }
  @else if $media == tablet {
    @if $limit == false {
      @include r($tablet) { @content; }
    }
    @else {
      @media only screen and (min-width: $tablet) and (max-width: $desktop - 1) { @content; }
    }
  }
  @else if $media == desktop {
      @include r($desktop) { @content; }
  }
  @else if $media == wide {
      @include r($wide) { @content; }
  }
  @else {
    @warn "Unsupported breakpoint supplied!"
  }
}

{% endhighlight %}

Let's quickly review them: first, declare your breakpoints as variables so you can easily adjust them. Then we have the general media query mixin, named `r()`. It is very simple on purpose, just supply a breakpoint value and ta-da, it works. Then we get to the main attraction. The `bp()` mixin takes a breakpoint name and applies the appropriate media query to your styles.

The mixins have very short names because I'm typing them all the time. Keystroke optimization!

You might have noticed the `limit` argument for the `bp()` mixin. It only has an effect when using the `tablet` breakpoint and that effect is limiting the styles to only apply within the tablet size.

Also, these mixins make **mobile-first** breakpoints by default. You can override that in the `r()` mixin, but I really don't recommend doing so. The only place where `max-width` is used is for the mobile breakpoint, but you should only use that sparingly. One example would be when you want a mixin to only apply to the mobile view and it would be a hassle to unset it from the wider views.

On to the next one!

### Background-size: cover for normal elements

This mixin will make a normal element behave like it is a background with `background-size: cover` set on it:

{% include code_caption.html text="_mixins.scss" %}

{% highlight scss %}

@mixin coverify {
  position: absolute;
  width: auto;
  height: auto;
  min-width: 100%;
  min-height: 100%;
  top: -9999px;
  left: -9999px;
  right: -9999px;
  bottom: -9999px;
  margin: auto;
  @content;
}

{% endhighlight %}

Pop that onto an `<img>` and it'll become the background of its parent. And retain the aspect ratio of the image. And center it. And did I mention it works in just about any browser? It is my favourite mixin for a reason.

You do need the following styles for the parent for this to work correctly:

{% include code_caption.html text="_mixins.scss" %}

{% highlight scss %}

@mixin coverify-parent {
  position: relative;
  overflow: hidden;
}

{% endhighlight %}

As this mix' is basically a browser hack, there are caveats:

The image (I assume you'll use this for images, I do that exclusively) will probably overflow more than necessary. You can remedy this by adding some `max-height` and `max-width` rules. For example, a `max-height: 100%` rule for landscape images works nicely to keep it from overflowing in the top and bottom directions. Experiment in your dev tools to find the sweet spot! I've added a `@content` statement to the mixin so you can add adjustment styling right into the mixin.

This trick really shines when you have some sort of CMS where editors are inputting images in various sizes and aspect ratios and you want to present them nicely.

### EasyClear™

The clearfix. You need this for every site you make, and a mixin is by far the best way to apply it (please don't use classes in your html for this. Really. Don't.). This is a mixin version of the most compact clearfix I've seen:

{% include code_caption.html text="_mixins.scss" %}

{% highlight scss %}

@mixin clear {
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}

{% endhighlight %}

That works in IE 8 and above. There are other, more verbose versions out there with more esoteric browser support, but if you need to support anything older than IE 8 I feel sorry for you.

### CSS triangles

Do you remember how to make CSS triangles off the top of your head? No? That's okay. You don't need to. Just use this:

{% include code_caption.html text="_mixins.scss" %}

{% highlight scss %}

@mixin triangle($dir, $color, $width: 20px, $height: 20px, $pseudo: before) {
  &:#{$pseudo} {
    content: "";
    width: 0;
    height: 0;
    border-style: solid;

    @if($dir == up) {
      border-width: 0 ($width / 2) $height ($width / 2);
      border-color: transparent transparent $color transparent;
    }
    @if($dir == left) {
      border-width: ($height / 2) $width ($height / 2) 0;
      border-color: transparent $color transparent transparent;
    }
    @if($dir == right) {
      border-width: ($height / 2) 0 ($height / 2) $width;
      border-color: transparent transparent transparent $color;
    }
    @if($dir == down) {
      border-width: $height ($width / 2) 0 ($width / 2);
      border-color: $color transparent transparent transparent;
    }

    @content;
  }
}

{% endhighlight %}

This will create a pseudo-element formed like a triangle. Not all of the arguments are mandatory, but there should be a sufficient amount of customization options in there. Just add more styles into the mixin when you use it, like positioning.

A quick usage example:

{% include code_caption.html text="style.scss" %}

{% highlight scss %}

.triangle-parent {
  position: relative;

  @include triangle(up, black, 30px, 15px) {
    position: absolute;
    top: -15px;
    left: 50%;
    margin-left: -15px;
  }
}

{% endhighlight %}

Couldn't be easier!

### @include post-ending

Hopefully your mixin library is a bit more complete now. If you have a favourite mixin you depend on, feel free to tweet it to me! I'm [@ddunderfelt](https://twitter.com/ddunderfelt) on Twitter.

Thanks for reading. See you next week!