---
layout: post
title: Any Metadata Bookmarklet
categories: posts
---
I spent yesterday creating a bookmarklet that can be used to add metadata to any web domain.  I wanted to learn how to create bookmarklets and I want to learn a little about <code>html5</code> localStorage so this little one-day project was perfect.

## See it in action

Drag the following bookmarklet to you bookmarks and use it whenever you want to save metadata to any web domain you would like.  If you don't like the idea of running a script off someone else's server, then feel free to download it via [github](http://github.com/davidwparker/anymetadata-bookmarklet-js) and put it on your server.

<a href="javascript:(function(){_amd=document.createElement('SCRIPT');_amd.type='text/javascript';_amd.src='http://davidwparker.com/js/anymetadata.bookmarklet.js';document.getElementsByTagName('head')[0].appendChild(_amd);})();">Any Metadata</a>

## Fork it and make it better

The code is on [github](http://github.com/davidwparker/anymetadata-bookmarklet-js).  There are some things which I would like to see changed/added:

1. Load json2, jQuery, and jQuery-ui and theme in a better manner.  
2. Make it so I don't need to use intervals to check that the scripts/css were inserted into the dom before using them.
3. Allow the bookmarklet to save to a specific URL and not just the domain.
4. Allow the bookmarklet to save to a server and not just localStorage (for cross-browser metadata).

I'm sure the list could go on and on.  If you have any comments, questions, etc.  Feel free to ask via [twitter](http://twitter.com/davidwparker) or [github](http://github.com/davidwparker).
