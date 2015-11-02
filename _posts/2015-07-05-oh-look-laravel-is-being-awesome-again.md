---
layout: post
title: "Oh look, Laravel is being awesome again"
categories:
  - Laravel
tags:
  - php
  - backend
published: true
code_view: true
---

I'm on holiday right now, so what better time to embark on a new project! As this one is backend-heavy, I have a chance to brush up on my Laravel skills. Sadly, I haven't used Laravel in a while up until now, as my projects have been frontend-oriented as of late. That has all changed now, and I have a few Laravel tricks to share with you!

I use the newest version of Laravel when I can. Consider Laravel 5.1 to be a requirement for this blogpost, but these might work in older versions.

## Bind arbitrary strings in the service container

Laravel's service container, also known as the IoC container, is the glue that connects the whole framework together. But it is not a mystical thing that works behind the scenes. The service container is available throughout your application and its use is very much encouraged.

It works pretty much like an array. When you feed it a fully-qualified classname, ie a classname *with* its full namespace path, it searches through its index for that class. If it knows about it, it'll give you a new instance of it and inject all of the class' dependencies automatically. This is what happens when you type-hint classes in your constructors and controller methods.

You can also bind interfaces to implementations using the service container. An example straight from the documentation:

{% include code_caption.html text="Serviceprovider.php" %}

{% highlight php %}

$this->app->bind('App\Contracts\EventPusher', 'App\Services\RedisEventPusher');

{% endhighlight %}

Each time your app wants an EventPusher, it will be provided with an instance of the the RedisEventPusher.

See how the interface is bound using a string? As the service container is simply a glorified array, we can bind *any* class to *any* string and dynamically instantiate it whenever we need it!

Which means this will work:

{% include code_caption.html text="Serviceprovider.php" %}

{% highlight php %}

// Let's pretend we have two similar classes that retrieve
// resources from the Youtube API. In a service provider:

$this->app->bind('playlists', 'App\Services\PlaylistService');
$this->app->bind('videos', 'App\Services\VideoService');

// Elsewhere, we can dynamically request whichever we need:
$VideoService = \App::make('videos');

{% endhighlight %}

Very important: The ability to bind an interface to an implementation is awesome, as it means we can just type-hint the interface and get a full implementation. This arbitrary string binding is *not* an alternative to that. It is just an additional way to utilize the service container.

## Collect everything

Collections are not just objects you get from an Eloquent model. The collection class is actually an extremely comfortable way to work with all arrays! [The updated Laravel documentation](http://laravel.com/docs/5.1/collections) has the scoop.

Any array can be made into a collection. To collectionize an array, simply use the `collect()` helper:

{% include code_caption.html text="CollectionExample.php" %}

{% highlight php %}

$array = [1, 2, 3];
$collection = collect($array);

{% endhighlight %}

Once that incredibly difficult operation is done, we can operate on the array by chaining collection methods after one another. I have found copious use of collections to result in much cleaner and simpler code. Again, refer to the documentation for the available methods on your shiny new collection object.

## No need to die

So you know about Laravel's venerable `dd()` helper, also known as the best thing Taylor Otwell has ever given us. 'dd', in addition to being my initials, stands for 'die and dump'. Using it will end the execution of your code right then and there, spitting out the result of the expression you feed it.

But what if you don't want to die?

For example, debugging loops is difficult with `dd()` since the problem you're experiencing might show itself only in later iterations. If you die, you'll never see those and rip your hair out wondering why the bug appears while everything seems to be in order. That is the reason I'm bald!

Since version 5.0 of Laravel, the `dd()` function uses Symfony's VarDumper component to enable pretty printouts of your arrays and objects. VarDumper brings with it the `dump()` helper function which, you guessed correctly, just prints out the value without dying afterwards. And you get to keep all that fancy formatting.

## And that's not all!

Well it *is* all for this blogpost, but Laravel contains a lot more goodness to make your life easier. I will blog about more in the future! If you know of any awesome Laravel tips & tricks, feel free to tweet me at [@ddunderfelt](https://twitter.com/ddunderfelt).

And if you are coming to Laracon EU, see you there!