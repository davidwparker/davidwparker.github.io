---
layout: post
title:  "Ludum Dare 25 Post Mortem - Doggie Destroyer"
categories: [posts, code]
---
tldr; I did Ludum Dare 25 last weekend with the theme [You are the Villain](http://www.ludumdare.com/compo/2012/12/08/welcome-to-ludum-dare-25/) I made a game called "Doggie Destroyer": where you take on the role of a dog who is attempting to pee on fire hydrants without getting wet. I used Cocos2d-HTML5, CocosBuilder, InkScape, and Audacity.

[My Ludum Dare Entry](http://www.ludumdare.com/compo/ludum-dare-25/?action=preview&uid=7737)

[The Game (see entry above for how to play)](/ludumdare/ld25/)

This past weekend, I just completed my 4th [Ludum Dare](http://www.ludumdare.com/compo/) . As per usual, it was a great, frustrating experience. My usual mission for the past 3 Ludum Dares is to teach myself something new as I go. In general, I like to do something web-based, so that the game I end up making is more accessible to others. This time was no exception.

So the mission for the weekend was to teach myself [Cocos2d-HTML5](http://www.cocos2d-x.org/projects/cocos2d-x/wiki/Html5). I've done quite a bit with [Cocos2d-iPhone](http://www.cocos2d-iphone.org/) before and I didn't feel like it was too bad. In fact, for 2d games, it's a pretty nice framework. The other things that I wanted to do was to not only use Cocos2d-HTML5, but I wanted to use [CocosBuilder](http://cocosbuilder.com/) and to only use the JavaScript API, so that I would be able to reuse all of my code for Android and iOS (or ideally, learn how to do that so I could do it for another game).

The only other tool that I ended up using was [Inkscape](http://inkscape.org/) to make my vector-based art and [Audacity](http://audacity.sourceforge.net/) to record my one and only sound effect. This was also the first Ludum Dare that I had any sound at all, so that was pretty exciting.

### Friday Night

Friday started out great, I was at a party and started brainstorming ideas there. When I got home, I had picked one, dealing with fire hydrants and people, with the fire chief forcing people back into a burning building by hitting them with the fire hydrants. Of course, this ended up being a little more complex than I knew it would be (while learning Cocos2d-HTML5 at the same time). That night, I ended up changing the theme on the fly and went with being a dog instead. I made the fire hydrant, dog, and water that evening.

### Saturday

Saturday started off pretty good. I installed CocosBuilder fine and started getting to work, downloading the example projects and looking at their code. But slowly, just throughout the day, I was discovering a few inconsistencies in what I was attempting to do, and what I actually could do with the program. This is probably when I should have just abandoned CocosBuilder altogether and just used Cocos2d-HTML5 programmatically... but I kept messing with it. By about 4PM, I realized that a lot of functionality was just plain not working. Long-story short, I discovered that CocosBuilder does NOT work with versions of OSX before Lion. I, of course, was still on Snow Leopard. None of the dialogs were working, and none of the documentation worked.

So, I figured I could get by by manually editing the output .ccb file from CocosBuilder. After all, it's just an plist (XML) file, so I could edit it easily enough. Of course, XCode doesn't like .ccb file extensions, so I had to rename it .plist in order for XCode to play well. Moving right along, I made some changes and attempted to work with it here and there for another 2 hours or so.

6PM. An entire day was almost done and I still hadn't done any real programming. Oi vey!

I broke down and went to the App Store and bought Mountain Lion. I backed up what I had (most of my stuff is already backed up), so I went with it. Of course, not really thinking about it, this little stunt ended up costing me another 2 hours- 1 to download, 1 to install.

After the installation was done, I got right back to work with CocosBuilder and, lo and behold, it worked fantastically! Of course, there were a few minor hiccups here and there, but overall, it was a pretty accessible tool that enhanced my productivity somewhat. This is why you always test your toolset before the competition starts! (Or don't try to learn something as you go).

### Sunday

Sunday had a short break due to doing a Google+ Hangout with my family, but other than that, I ended up getting quite a bit of coding done (starting super late Saturday night) until I finished and submitted my game around 4PM. Did it have all that I wanted? Not even close (see the Ludum Dare submission for things that I wanted to do/bugs/etc). But it was still cool- I have yet another tool in my toolchain and I'll probably continue to use this one a good bit more.

### End Thoughts

So I'd definitely recommend for people to check out the Cocos2d-HTML5 project and see if they can't use the JavaScript bindings too. It's pretty cool to be able to push to iOS, Android, Windows Phone, and HTML5 all with the same code base, while still being native.
