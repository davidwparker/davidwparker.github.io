---
layout: post
title: "Android: How to float a row above the soft keyboard"
categories: [posts, code]
---
Last time, I explained how to fix resizing and scrolling on Android (see "blog post here":/2011/08/25/android-fixing-window-resize-and-scrolling/).

Now, I wanted to have a fixed "menu" row on the screen at all times, similar to how the contacts app works:

<img src="/media/android_contacts_app.png" alt="Android Contacts App" title="Android Contacts App" />

Not too hard. I knew that I would want a <code>RelativeLayout</code> with a <code>ScrollView</code> inside as well as another view which would contain my buttons.

When the soft keyboard is closed, I want the app to look like this:

<img src="/media/android_good_closed.png" alt="My App Good Closed" title="My App Good Closed" />

And when an <code>EditText</code> is selected, I want it to look like this:

<img src="/media/android_good_open.png" alt="My App Good Open" title="My App Good Open" />

Well, with my code as it currently is suggested, I would have a <code>RelativeLayout</code> containing a <code>ScrollView</code> and a <code>TableLayout</code>. So far so good. However, this is what it ends up looking like:

<img src="/media/android_bad_both.png" alt="My App Bad" title="My App Bad" />

Searching around, I ultimately discovered that I needed to add two different tags. The first to my <code>ScrollView</code> was <code>android:layout_above="@+id/myID"</code>. The other, on the <code>TableLayout</code> was <code>android:layout_alignParentBottom="true"</code>. Using both of these, you get the correct effect. However, if either are missing, you can end up with some stuff you don't want.

No <code>layout_above</code>:

<img src="/media/android_bad_no_layout_above.png" alt="No layout above" title="No layout above" />

No <code>align_parentBottom</code>:

<img src="/media/android_bad_no_align_parentBottom.png" alt="No align parent bottom" title="No align parent bottom" />

And some code:

<script src="https://gist.github.com/1182279.js"></script>

Hope this helps.