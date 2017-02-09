---
layout: page
title: "Introducing Media Match"
code_view: false
---

I am proud to present Media Match, an app for rating news articles true or false. "Fake News" are news articles that are either completely false, based on half-truths or exhibit an overt bias. They're compelling to click on and can be shocking to read. Media Match aims to train your critical thinking skills in a fun and social way!

I made Media Match in the evenings and weekends over the course of a few weeks. Development started on a whim based on an idea by [Sam Nissinen](https://twitter.com/SamNissinen). It is built with React-Native and uses Firebase for its database and authentication. It is a very simple app and I want to keep it that way! Future plans include a listing of the articles you've rated and what you rated them as well as the ability to see what your friend rated each article (if you log in with Facebook that is). This is why the app requires you to log in; I am collecting the rating data for future features.

I also plan to build a companion website that lists all the articles people have rated with this app and how they have been rated. This will of course not contain any information on who has rated the articles.

Media Match pulls news articles from Reddit. You can see the subreddits that are included [here](https://github.com/danieldunderfelt/media-match/blob/master/subreddits.js). The source code is open and readable in the [github repository](https://github.com/danieldunderfelt/media-match)! If you want to suggest a subreddit to pull news from, please send a PR. The subreddits should only allow links to news articles, which has limited the selection of subreddits somewhat and left out parts of the spectrum that does not have a dedicated subreddit for news articles.

In order to allow the articles some time to collect ratings, the "top - day" ordering of Reddit is used. This may change in the future, but it should be a good balance and ensure that the news feed really is never-ending. If you do run out of articles please try re-opening the app.

This app is not biased towards or against any opinion, position or publication, political or otherwise, and anyone can confirm this by viewing all of the source code.

Have fun and enjoy!
