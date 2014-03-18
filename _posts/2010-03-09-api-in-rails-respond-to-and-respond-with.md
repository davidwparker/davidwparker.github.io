---
layout: post
title: Simple API in Rails 3 using respond_to and respond_with
categories: [posts, hascode]
---
[Yesterday](http://davidwparker.com/2010/03/08/simple-json-api-in-django/) I showed you how to create a simple JSON API in [Django](http://www.djangoproject.com/).  Today I'm going to show you how to do the same thing in Rails 3.

Whereas in Django, by default you have to check for the specific <code>HTTP_ACCEPT</code> header you want to work with, in Rails, you don't.  This is known as [Content Negotiation](http://en.wikipedia.org/wiki/Content_negotiation).

## Content Negotiation in Rails

So rather than having an <code>if</code> statement checking for the specific accept header, you just use <code>respond_to</code> and <code>respond_with</code>.  In Rails 2.X, you would do something like so:

{% highlight ruby %}
class UsersController < ApplicationController::Base

  def index
    @users = User.all
    respond_to do |format|
      format.html
      format.xml { render :xml => @users }
      format.json { render :json => @users }
    end
  end

  def create
    @user = User.create(params[:user])
    respond_to do |format|
      format.html { redirect_to users_url }
      format.xml { render :xml => @user }
      format.json { render :json => @user }
    end
  end

end
{% endhighlight %}

Notice the <code>respond_to</code> block.  In it, you just tell Rails which format to use when expecting a certain format.

In Rails 3, it's even easier.  Using <code>respond_with</code>, you can now do:

{% highlight ruby %}
class UsersController < ApplicationController::Base

  respond_to :html, :xml, :json

  def index
    respond_with(@users = User.all)
  end

  def create
    @user = User.create(params[:user])
    respond_with(@user, :location => users_url)
  end
end
{% endhighlight %}

You can read more details on how to use <code>respond_with</code> on Ryan Daigle's [blog](http://ryandaigle.com/articles/2009/8/6/what-s-new-in-edge-rails-cleaner-restful-controllers-w-respond_with) and about ActiveModel on the Engine Yard [blog](http://www.engineyard.com/blog/2010/rails-and-merb-merge-orm-agnosticism-part-5-of-6/).  In detail, Yehuda explains that the "available providable formats are transparently determined by introspecting the object".  To me, this is great as it's one less <code>require</code> or <code>import</code> statement to worry about.

## Content Negotiation in Django

James Bennett wrote an excellent article on doing content negotiation in Django [here](http://www.b-list.org/weblog/2008/nov/29/multiresponse/).  It is based on Daniel Lindsley's work [here](http://toastdriven.com/fresh/multiresponse/), which was "loosely based around similar functionality, called <code>respond_to</code> in Rails".  I haven't tried the code in the articles yet, but the idea looks very good and will probably provide me with what I want in Django without having my code splattered with <code>if</code> statements for the sake of content negotiation.
