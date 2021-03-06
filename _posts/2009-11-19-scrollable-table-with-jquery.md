---
layout: post
title: Scrollable Table with jQuery
categories: [posts, hascode]
---
h2. aka jQuery Fixed Table Headers.

I created this jQuery plugin a little while back.  Basically, it's headers that don't move while the table becomes scrollable.

Demo: [jQuery scrollable table](/demos/jqueryScrollableTable/)

Usage:

{% highlight javascript %}
$(function(){
  $("#t1").scrollableTable();
  $("#t2").scrollableTable({type:"th"});
});
{% endhighlight %}



Only two things to note.  First, the default is to make the table scrollable based on the <code>thead</code> tag rather than the <code>th</code>, but the latter is an option (see example above).  Second, thing to note is that the <code>table</code> tag is surrounded by a <code>div</code> tag, which has a fixed height and <code>overflow-y:scroll</code>.

Eventually, I'll go back and add those as options and dynamically create them rather than having to manually do it... but for now it works.
