---
layout: post
title: named_scope and Thinking Sphinx gotcha
categories: [posts, hascode]
oldurl: http://davidwparker.com/2008/11/13/named_scope-and-thinking-sphinx-gotcha/
---
I was working with named_scope earlier today and I was have an issue getting it to work properly with a Thinking Sphinx search that I had.  This makes sense, as named_scope is not completely supported yet by Thinking Sphinx.  Read below for the gotcha and a short-term work around.

I had a named_scope something like this:

{% highlight ruby %}
named_scope :not_expired, lambda { {:conditions => ["expiration_date >= ?", Time.now.utc]} }
{% endhighlight %}

I was calling it in a chain to another method which just called a Thinking Sphinx search:

{% highlight ruby %}
@posts = Post.not_expired.search_page(params)
{% endhighlight %}

My problem came from what came back in my @posts:

{% highlight ruby %}
Sphinx Result: [85, 44, 26]
Post Load (0.003232)   SELECT * FROM `posts` WHERE (`posts`.`id` IN (85,44,26)) AND (expiration_date >= '2008-11-14 04:15:08') 
{% endhighlight %}

All looks fine.  But then I would hit a nil object error... huh?

{% highlight ruby %}
ActionView::TemplateError (You have a nil object when you didn't expect it!
The error occurred while evaluating nil.title) on line #5 of posts.html.haml
{% endhighlight %}

Loading up a script/console, I was finally able to see the problem. 

{% highlight ruby %}
>> @posts = Post.not_expired.search_page({:some=>"Param"})
=> some results....
>> @posts.size
=> 3
{% endhighlight %}

Somehow combining named_scope with Thinking Sphinx decided to load three posts into my @posts object even though it only found one.  So I had something like this:

{% highlight ruby %}
[< Post id: 1, title: "something">, nil, nil]
{% endhighlight %}

And here was my fix (after the query):

{% highlight ruby %}
@posts = @posts.compact
{% endhighlight %}

This throws out the nil results.
Hopefully this will help out those out in Google land.
