---
layout: post
title: Simple non-model checkbox in Rails
categories: [posts, hascode]
oldurl: http://davidwparker.com/2008/11/12/simple-non-model-checkbox-in-rails/
---
I recently needed to do search in Rails with several checkboxes.  The search itself was not model backed, so the check_box tag was out.  I decided to use the check_box_tag instead.  The problem I had with that was that the check_box_tag had no real easy way of maintaining the state as to whether or not the boxes were checked from search to search.

If I had params[:a] and params[:b], they may both be set, but I wouldn't know it based off my GET request.  So I came up with a simple check_box_tag modification to retain the state of the checkboxes based on an identifier (in my case, I use the params)

In my application_helper.rb:

{% highlight ruby %}
  def check_box_tag_new(name, value = "1", options = {})
    html_options = { "type" => "checkbox", "name" => name, "id" => name, "value" => value }.update(options.stringify_keys)
    unless html_options["check"].nil?
      html_options["checked"] = "checked" if html_options["check"].to_i == 1
    end
    tag :input, html_options
  end
{% endhighlight %}

Usage in a Haml file:

{% highlight ruby %}
= check_box_tag_new :a, 1, :check => params[:a]
= check_box_tag_new :b, 1, :check => params[:b]
{% endhighlight %}

Here's what I came up with for specs:

{% highlight ruby %}
  describe "should create a check_box tag with the proper checked based on params:" do
    it "if check is nil, it should not be checked" do
      tag = helper.check_box_tag_new("me", nil, {:check => nil})
      tag.should == "<input id=\"me\" name=\"me\" type=\"checkbox\" \/>"
    end
    
    it "if check is not 1, it should not be checked" do
      tag = helper.check_box_tag_new("me", nil, {:check => 0})
      tag.should == "<input check=\"0\" id=\"me\" name=\"me\" type=\"checkbox\" \/>"
    end
    
    it "if check is 1, it should be checked" do
      tag = helper.check_box_tag_new("me", nil, {:check => 1})
      tag.should == "<input check=\"1\" checked=\"checked\" id=\"me\" name=\"me\" type=\"checkbox\" \/>"
    end
  end
{% endhighlight %}
