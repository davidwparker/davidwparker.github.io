---
layout: post
title: "Android: fixing window resizing and scrolling"
categories: [posts, android]
---
Recently, when I was working on an my forthcoming Exercise Android App, I was having an issue. When I clicked into a EditText box, then the soft keyboard would come up. So far, so good. But what was happening was the keyboard was covering a good portion of the EditText box until the user began to type.

Basically, it looked like this:

<img src="/media/android_bad_scroll.png" alt="Android Bad Scroll" title="Android Bad Scroll" />

Obviously, this wasn't what I wanted. After scouring the Internet, I found out about the property <code>android:windowSoftInputMode</code> that you put into an <code>application</code> tag in your Manifest file. This has a few options. The ultimately correct one was <code>adjustResize</code>. However, that wasn't the end of it.

Next, I needed to add an actual scrollable area, as a <code>TableLayout</code> is not scrollable by default. This was easy enough, as I surrounded my TableLayout with a <code>ScrollView</code> tag and gave it the property <code>android:isScrollContainer="true"</code>.

This fixed my layout to look like this:

<img src="/media/android_good_scroll.png" alt="Android Good Scroll" title="Android Good Scroll" />

Which was what I wanted. Good times.

Some code:

<script src="https://gist.github.com/1172700.js"></script>

Hopes this helps.