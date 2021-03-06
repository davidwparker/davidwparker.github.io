---
layout: post
title: Rails Cross-Cutting Concerns - Filters, Observers, and Aspect-Oriented Programming
categories: [posts, hascode]
oldurl: http://davidwparker.com/2009/02/16/rails-cross-cutting-concerns-filters-observers-and-aspect-oriented-programming/
---
## Background

I’m already a little bit late to the party, as [Giles Bowkett](http://gilesbowkett.blogspot.com/2008/02/rails-aspect-oriented-programming-use.html), [Charlie Savage](http://cfis.savagexi.com/2007/09/05/rails-unusual-architecture), and [Matt Ford](http://blog.new-bamboo.co.uk/2007/10/9/aspects-of-aop) have discussed AOP in Rails previously.

While I enjoy coding Ruby at night, I still code Java during my day job.  So far, every project at work has used Struts.  As there’s a lot of momentum behind Spring in the Java community lately, I decided to do a bit of reading to keep up.  A couple of days ago, I just finished reading Spring in Action (Manning).  Overall, Spring seemed pretty nice, but the one thing that stuck out to me was [Aspect-Oriented Programming](http://en.wikipedia.org/wiki/Aspect-oriented_programming).

I had never seen AOP in use before reading the Spring book, but it seems to make a lot of sense for [separation](http://en.wikipedia.org/wiki/Separation_of_concerns) of [cross-cutting](http://en.wikipedia.org/wiki/Cross-cutting_concern) concerns.  The main concerns that seem to come up in nearly every project I’ve worked on are [security](http://en.wikipedia.org/wiki/Information_security), [transactions](http://en.wikipedia.org/wiki/Transaction_processing), and logging.

## Current Concerns

In Rails, security is generally performed through a before_filter in a controller for certain methods.  So you generally end up with code that looks something like this:

{% highlight ruby %}
someController
  before_filter :login_required

anotherController
  before_filter :login_required, :only=>[:update, :edit, :destroy]

andAnotherController
  before_filter :login_required, :only=>[:new, :create]

adminController
  before_filter :admin_login_required
{% endhighlight %}

While this works, I often feel as though the security is tacked on.   I’m also afraid that if I change my underlying security API (either by changing libraries or if the public API is changed), then I have to update every single controller in my application to reflect those changes.  Finally, the calls to each of the before_filters is a lot of duplicate code.

## Possible Solutions

Note: these solutions don’t use AOP, though I do try to keep to separation of concerns.

#### Filtering earlier

My first thought is that I’d like to pull out all of the security code into one place.  An initial thought of mine would be to use ApplicationController and have a single filter there.

{% highlight ruby %}
Before_filter :perform_security
Private
  def perform_security
    #add case statement or list or something/etc here for controller/action to do login_required
  end
{% endhighlight %}

Another thought would be to pull out this altogether and have a SecurityController that extends Base::Controller and which ApplicationController extends.

{% highlight ruby %}
SecurityController << Base::Controller
  Before_filter :perform_security
  Private
    def perform_security
     #add case statement or list or something/etc here for controller/action to do login_required
    end

ApplicationController << SecurityController
{% endhighlight %}

Of these two solutions, I like the second solution better.  This keeps the security stuff all together and it can be easily changed.  If the API changes then only one controller would have to be updated.

#### Observer Pattern

Rails has a solid Observer Pattern implemented for ActiveRecord.  Just like having observers for the models, we could have observers for the controllers.  This would allow us to call a method before another method is implemented within a controller.  I haven’t done too much research into the Observers within Rails, though I do know that they are specific to ActiveRecord.  If possible, we could extend their base class to be an observer for the controller, like so:

{% highlight ruby %}
SecurityObserver<<SomeBaseObserverClass
  observes :someController, :anotherController, :andAnotherController, :adminController

perform_security,
  :only =>
    [{:someController},
     {:anotherController, :only=>[:update, :edit, :destroy]},
     {:andAnotherController, :only=>[:new, :create]}]

perform_admin_security,
   :only => [{:adminController}]

private
  def perform_security
    login_required
  end

  def perform_admin_security
    admin_login_required
  end
{% endhighlight %}

## New Concerns

The nice thing about leaving code as it is now is that I know that it works pretty quick.  If we change the filter to occur earlier in its own controller, then the code is called for every controller/action, versus a case-by-case check within each controller.  This is a lot of overhead and could definitely impact performance.  This is less than desirable.  Though slightly different, the Observer Pattern still has to check every controller/action that may have been called.

## Final Thoughts

As of right now, I don’t have any plans on implementing anything with AOP yet.  I like the thought, but I don't really had the time.  There does seem to be a pretty good AOP ruby gem [Aquarium](http://aquarium.rubyforge.org/) which I may look into integrating with Rails at a later date.

Until then, what have you tried implementing with AOP?  Do you use AOP on any of your Rails projects?
