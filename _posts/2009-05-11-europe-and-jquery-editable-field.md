---
layout: post
title: Europe and jQuery Editable Field
categories: [posts, hascode]
oldurl: http://davidwparker.com/2009/05/11/europe-and-jquery-editable-field/
---
I'll be in Europe for the next 2.5 weeks, so my awesome blog will continue to be ignored for a while.  Sorry.

In the meantime, check out a plugin I'm working on (of many) for jQuery.  Introducing: jQuery Editable Field.  With this plugin, you can make anything editable.

Demo: [jQuery Editable Field Demo](/demos/editableField-v1.0/jqueryEditableField/)

Usage:

{% highlight javascript %}
$("h2.edit").editableField({onSubmit:function(){alert('Something changed!');}});
$(".edit").editableField();
{% endhighlight %}

It still has a little bit of work, but it mostly does what I need it to... check out the source if you want to explore further.

Hopefully shortly after I get back from Europe, I'll be able to post a couple of the other plugins that I've been working on.
