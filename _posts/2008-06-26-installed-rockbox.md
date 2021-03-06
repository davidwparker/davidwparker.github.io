---
layout: post
title: Installed Rockbox
categories: [posts, hascode]
oldurl: http://davidwparker.com/2008/06/26/installed-rockbox/
---
Last night I finally got around to installing Rockbox on my iPod.  I've been meaning to do it for a while now, as I'm trying to transition to as many open source alternatives as possible*.  Anyway, it wasn't too much hassle, though it did end up taking a bit more time than I thought it should, and I did run into a few snags.

So I went to Rockbox's [website](http://rockbox.org) and went to the documentation for my 30gb iPod Video.  Reading through the instructions, I thought it would be simple enough, so I decided to try the automated installer (rbutilqt) rather than the manual install.

So I download rbutilqt, throw it in a folder, then I run it.  The user interface was very nice.  I select the autodetect button and it detects my iPod.  So far so good.  Then I click on the complete install and I get the nice *BOOM*  "No iPod could be found" error message.  Excellent.  Except for the fact that it was autodetected and I was able to drag and drop songs to and from it in RhythmBox.  Looking again at the manual, I go the check out the manual route.  I download the bootloader and run it.  Bam, once again, nothing.  Nice "No iPod could be found" error again.

So then I thought about permissions.  I go throw rbutilqt into my $HOME directory and chmod +x it.

{% highlight bash %}
$ chmod +x rbutilqt
{% endhighlight %}

Run the program again, this time using sudo and had no problems detecting and installing.  So now I have Rockbox on my iPod and I can play .ogg files to my heart's content (as well as playing Doom).

Question for all the *nux gurus out there:
Why could I easily transfer files to and from the iPod in RhythmBox but the autoloader wouldn't detect it (without running as root)?  I would think that they're the same user, so it shouldn't matter either way.

Note: if I had the money, then my main computer would probably be a 15" Macbook Pro.  But I don't, so it's not.  Instead, I'm currently running Ubuntu 8.04 (which, so far, has been awesome).
