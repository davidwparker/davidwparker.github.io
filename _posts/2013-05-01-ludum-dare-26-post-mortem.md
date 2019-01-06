---
layout: post
title:  "Ludum Dare 26 Post Mortem - Minimalist Moe"
categories: [posts, code]
---
tldr; I did Ludum Dare 26 last weekend with the theme [Minimalism](http://www.ludumdare.com/compo/2013/04/24/welcome-to-ludum-dare-26/). This time I made a game called Minimalist Moe. I didn't learn a new framework this time, but used an old framework in a way that's it's not meant to be used and was slightly frustrated because of it: I used Three.js to make a 2D game. I also had issues with HTML5's audio API and GLSL ES shaders.

[My Ludum Dare Entry](http://www.ludumdare.com/compo/ludum-dare-26/?action=preview&uid=7737)

[The Game (see entry above for how to play)](/ludumdare/ld26/)

### Thoughts

Well, another Ludum Dare is over and done. Friday night, as always was mainly used for ideation and sketching out characters and game mechanics. I came up with a bunch of ideas...

#### Ideas

* single guy (circleman) tower defense type - ended up being similar-ish to what I did
* eraser - erase all the things!
* furniture thing - moving stuff around to be minimalistic
* closet - shoe matching to get rid of wives' shoes
* puzzle thing - clearing certain types away to a minimum
* dots to fill up an area
* dots to make things
* shapes put together to make bigger shapes
* wrecking ball to destroy towers

I decided to go with the character of Moe, a circle who relentlessly hates anything that isn't minimalistic like he is... a flawless circle with no angles or corners. The neighborly shapes of Shapeland have decided to invade Moe's home to attack him because of his hatred against them.

Originally, I wasn't going to use any frameworks or libraries and was going to code directly in WebGL. I had a few frustrations initially, so due to the time constraints I decided to fallback onto Three.js. I had already decided to go with a 2D game again because I wanted to make sure that I had time to work on some art: making 2D art is a lot easier than making 3D art. So, here I was, using a 3D framework to make a 2D game.

As I started to build out my basic objects (Moe, the bullets, and the enemies), I figured I would leverage Three.js as much as possible in order to avoid rewriting the wheel if I could help it. The main two areas that Three.js and I argued were 1) with the ability to determine where a mouse click was in order to determine the vector from Moe's point of origin and the mouse and 2) with it's ability to use Raycasts in order to determine if there was an intersection between two objects.

For the mouse position, I think a lot of the issues that I had were due to the fact that I was programming based on widths and heights of the overall screen, but I wasn't making the entire screen playable, as most of the Three.js examples are. If I made the entire thing playable, then I think some of the issues may have gone away... either way, I ended up with something that works really well for my screen size and resolution, but I'm pretty sure (I know) it doesn't work great for other sizes.

For the Raycasts, the main issue was due to the fact that I was using 2D geometries (circles) as opposed to spheres. Even though I was placing everything on the Z access with zero as the Z-value, using the built-in functionality didn't work in finding intersections. So I had to code my own version of intersecting that was far from perfect. I was a little disappointed in the results, especially after spending hours trying to fix the issue with Three.js' abilities.

Another issue I had didn't deal with Three.js, but with the audio APIs provided by HTML5. Long story short, I spent a good amount of time trying to deal with the fact that my audio files wouldn't always load, so my sound wasn't always working. I didn't spend a ton of time making sound effects, but I figured a few different sounds for the collisions would be nice. Whenever the game is created, it's supposed to preload the sound effects, but they don't get loaded every single time. Ultimately, it does work... but just not all the time. I think for future reference, I'm going to see how others' make their preload screens to preload assets so I don't mess it up next time.

My final issue dealt with putting a shader on Moe, rather than a static image. I had spent some time starting to create a nice shader with eyeballs that followed the mouse (see [here](http://glsl.heroku.com/e#8379.0)), but it didn't work with a very time resolution for the shader on a circle. I'm thinking I could have built it with a basic canvas drawing instead of trying shaders, but I wanted to learn/do more with shaders. Sadly, this didn't work out either.

In all, I'm pleased with the overall code and I'm glad I completed another Ludum Dare, but the product itself was only about a third of what I wanted it to be. Next time, I'm going to familiarize myself entirely with any framework/libraries that I want to use on the warmup weekend- I always wait to do anything until Saturday morning with code, so I don't really get as far as I want overall. This time, I used Three.js for the second time, but I haven't used it in a year, and for something it's not intended.

Until next time!
