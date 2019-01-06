---
layout: post
title:  "On Shipping Product"
categories: [posts, code, product]
---
### tldr;

I was scared to ship my second Android app. I believe the fear stems from the fact that this is something of my own, as opposed to being written for an employer somewhere. Additionally, the app is something that I want to be used regularly, with real user data, on potentially a bunch of different devices that I don't control.

### Long version

This last week, I shipped my second ever Android app: [Ideal Tracker](https://play.google.com/store/apps/details?id=com.ideallyapps.IdealTracker). I'll tell you the truth: I was scared shitless. What would people think? What happens if it didn't work on all 2100 devices that it supposedly runs on? It's not that I write crappy code (though some of it surely is), or that I'm not confident in my abilities (I've shipped a ton of code before), or even that people won't like it (I practiced Agile|Lean and got feedback early and often). For me, I think it's something deeper.

I've written a lot of code in the past. I've shipped code on six different products for the US Air Force. I've written extremely robust code that's used by entreprise-level operations. It's actually really easy to write code for these organizations because they move so slow, it's incredibly easy to make sure what you ship is actually 'correct' (written to the specs). But this time was different- the only specs I had were the ones I got from doing customer interviews before I even had a product.

The first Android that I wrote was an extremely simple mortgage calculator. It required no permissions and did a very simple thing extremely easily. It didn't really go deep, and I didn't use a lot of features of the phone. In fact, it really doesn't need to be an Android app at all, but I just wanted to learn a little Android as well as ship something of my own. That being said, I wasn't very nervous about shipping such a simple app- it didn't even have ads! So I did. It's had a little over 3,000 downloads and I'm totally okay with that.

My most recent Android app, though, is different. It's a workout tracking application. It's pretty simple at its core: users input their workouts, and the app saves them. Of course, I add a few bells and whistles. For example, in the app, I let users view their recent workouts, add new exercises, and I provide some pretty basic graphs. I use SQLite to keep track of all user input. I have ads view Admob. I use Analytics. I use the Google compatibility library to provide 3.X/4.X themes to 2.X devices. I use ActionBarSherlock. All-in-all, it's a much bigger application than the first.

And I think due to the fact that I'm actually letting users store data- that's a big deal for me. The first version that I published is the 'free' version (with ads). I'm not actually expecting this to be a big money maker for me, but it's more for the experience of shipping actual product that I want people to use on a regular basis. Because this isn't a Rails app or something that I control 100% (Server-wise, versus different Android devices), I have a possible irrational fear that something isn't going to work on some device. This, in turn, freaks me out a little bit. I don't want users to lose their data, so it took me a bit longer than I was hoping to ship the original MVP- so that I could really "work out" (pun intended) the database schema.

But I shipped it. And I've had great feedback so far. Friends and family have enjoyed it. They've given me great suggestions on what they would like to see next.

I've also already done my first point release (1.0.0 -> 1.1.0), where I actually had to change the database schema. And my users didn't freak out or lose any of their data. After I'm comfortable releasing regular updates to the app, I'll be aiming to create my first paid app: the Pro version of Ideal Tracker with a few more features.

So, here's to round 2. I'll be fighting the good fight, continuing to release product, and hopefully I'll learn something valuable that I can share with others in the process.
