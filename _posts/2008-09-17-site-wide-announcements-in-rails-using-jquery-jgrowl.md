---
layout: post
title: Site wide announcements in Rails using jQuery (jGrowl)
categories: [posts, hascode]
oldurl: http://davidwparker.com/2008/09/17/site-wide-announcements-in-rails-using-jquery-jgrowl/
---
I like it when a site tells me that they're going to do some maintenance, so I wanted to implement similar features for a web application that I'm working on.  I based my announcements on Ryan Bates' [Railscasts episode 103](http://railscasts.com/episodes/103-site-wide-announcements) and updated code based on avarhirion's post on the [Rails Forum](http://railsforum.com/post.php?tid=18705).  The major changes are the added changes for cookie support, graceful degradation, and jQuery (jGrowl).

If you'd rather, check out all the files on [Github](http://gist.github.com/11359).

**announcement.rb:**

{% highlight ruby %}
class Announcement < ActiveRecord::Base
  named_scope :active, lambda { { :conditions => ['starts_at <= ? AND ends_at >= ?', Time.now.utc, Time.now.utc] } }
  named_scope :since, lambda { |hide_time| { :conditions => (hide_time ? ['updated_at > ? OR starts_at > ?', hide_time.utc, hide_time.utc] : nil) } }
  def self.current_announcements(hide_time)
    active.since(hide_time)
  end
end
{% endhighlight %}

**application.html.haml:**

{% highlight ruby %}
- unless current_announcements.empty?
  #announcements_box
    -for announcement in current_announcements
      .announcement{:id => 'announcement_' + announcement.id.to_s}
        =h announcement.message
        = link_to "Hide Announcements", hide_announcements_path, :id => 'hideAnn'
{% endhighlight %}

**routes.rb:**

{% highlight ruby %}
map.hide_announcements '/hide_announcements', :controller => 'javascripts', :action => 'hide_announcements'
{% endhighlight %}

Here's the first of the important ones: **javascripts_controller.rb**.  Note that I'm setting the session and a cookie.  Also see my TODO.  I'd like to set the expiration date of the cookie to the oldest expiring active announcement.

{% highlight ruby %}
class JavascriptsController < ApplicationController
  def hide_announcements
    time = Time.now.utc
    set_session time
    set_cookies time
    respond_to do |format|
      format.html { redirect_to(root_path) }
      format.js { redirect_to(root_path) }
    end
  end

  private
    def set_session(time)
      session[:announcement_hide_time] = time
    end
    #TODO change expiration time to be the expiration
    #date from the list in current_announcements
    def set_cookies(time)
      cookies[:announcement_hide_time] = {
        :value => time.to_datetime.to_s,
        :expires => time.next_week
      }
    end
end
{% endhighlight %}

In the **application_helper.rb**, we check the session first and set the announcements, otherwise, we check the cookies.

{% highlight ruby %}
def current_announcements
  unless session[:announcement_hide_time].nil?
    time = session[:announcement_hide_time]
  else
    time = cookies[:announcement_hide_time].to_datetime unless cookies[:announcement_hide_time].nil?
  end
  @current_announcements ||= Announcement.current_announcements(time)
end
{% endhighlight %}

Finally, to make it with the cool-kids, we need to add some jQuery.  So I decided to use the [jGrowl](http://stanlemon.net/projects/jgrowl.html) plugin because it's awesome.  This code goes in your **application.js** file (somewhere in $(function){ //here })

{% highlight javascript %}
  //jgrowl announcements. ajax GET to hide ann/store cookie
  $.jGrowl.defaults.closer = false;
  $("#announcements_box").css("display","none");
  $("#announcements_box .announcement").each(function(){
    $.jGrowl(this.textContent,{ sticky:true, close:function(e,m,o){hide_announcements();} });
  });

  function hide_announcements(){
    $.get(
      '/hide_announcements'
    );

    $("#announcements_box").fadeOut();
    return false;
  }
{% endhighlight %}

Obviously, you'll need to include jGrowl js and css files.

I like this solution because it provides a great looking way to do site-wide announcements.  The solution degrades gracefully if the user does not have javascript enabled.  Finally, by saving to a cookie, users can leave, close their browsers, and come back as the please and not see the same announcements over and over again.

I'd like to leave you with a couple of specs that I wrote.  I attempted to do TDD/BDD and do the specs first, but it was tough.  I didn't get too far, as I was having some cookie/session problems.  They're in some serious need of help, so if you know cool stuff, help me out in the comments, thanks.

**application_helper_spec.rb:**

{% highlight ruby %}
  #TODO these are weak/inaccurate specs.  These are more-or-less stubs
  describe "should find the current announcements" do
    it "when the session['announcement_hide_time'] is not nil" do
      session['announcement_hide_time'] = Time.now.utc
      current_announcements.should == Announcement.current_announcements(session['announcement_hide_time'])
    end

    it "when the session['announcement_hide_time'] is nil and cookies['announcement_hide_time'] is not nil" do
      session['announcement_hide_time'] = nil
#      cookies['announcement_hide_time'] = CGI::Cookie.new('announcement_hide_time', Time.now.utc.to_datetime.to_s)
      time = Time.now.utc
      request.cookies['announcement_hide_time'] = {:value   => time.to_datetime.to_s,
                                                   :expires => time.next_week}
#      current_announcements.should == Announcement.current_announcements(cookies['announcement_hide_time'].value.first.to_datetime)
    end

    it "when the session['announcement_hide_time'] and cookies['announcement_hide_time'] are not nil" do
      session['announcement_hide_time'] = nil
      cookies['announcement_hide_time'] = nil
      current_announcements.should == Announcement.current_announcements(nil)
    end
  end
{% endhighlight %}

**announcement_spec.rb:**

{% highlight ruby %}
  #TODO these are weak/inaccurate specs.  These are more-or-less stubs
  describe "the current_announcements" do
    it "should return announcements that are active" do
      time = Time.now.utc
      Announcement.active.should == Announcement.find(:all, :conditions => ['starts_at <= ? AND ends_at >= ?', time, time])
    end

    it "should return announcements since a time provided" do
      time = Time.now.utc
      Announcement.since.should == Announcement.find(
            :all,
            :conditions => (time ? ['updated_at > ? OR starts_at > ?', time.utc, time.utc] : nil))
    end

    it "should return announcements since a time provided (nil)" do
      time = nil
      Announcement.since.should == Announcement.find(
            :all,
            :conditions => (time ? ['updated_at > ? OR starts_at > ?', time.utc, time.utc] : nil))
    end
  end
{% endhighlight %}

Any feedback is appreciated.
