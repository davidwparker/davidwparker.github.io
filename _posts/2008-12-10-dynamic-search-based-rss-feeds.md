---
layout: post
title: Dynamic, Search-based RSS feeds
categories: [posts, hascode]
oldurl: http://davidwparker.com/2008/12/10/dynamic-search-based-rss-feeds/
---
For the current application I am working on, I needed the ability to generate RSS feeds on the fly.  Users have the ability to search for a lot of different information, and I needed to provide them with a way to save that search via an RSS feed.  To see how I went about performing basic search, see [here](http://davidwparker.com/2008/09/27/simple-multi-form-field-search-with-thinking-sphinx/).

In my controller, I started by adding the ability to respond_to rss:

{% highlight ruby %}
# GET /search
def search
  @models = Model.search_page params

  respond_to do |format|
    format.html
    format.rss { render :layout => false }
  end
end
{% endhighlight %}

Next, in my routes.rb file, I added a specific route for the dynamic search.

{% highlight ruby %}
map.search_rss  '/search.rss',    :controller => 'models', :action => 'search', :format => 'rss'
{% endhighlight %}

This provided me with the method search_rss_path, which I was able to use in my view.  I attempted to use the route that I already had:

{% highlight ruby %}
map.search '/search', :controller => 'search', :action => 'search'
{% endhighlight %}

With something along the lines of search_path(params, :format => 'rss'), and that ended up being a very bad thing.  This was a bit ago, and I can't recall at the moment why that wasn't working, but I do recall that it just ended up being easier and nicer to just add one more route in my routes.rb file.

Continuing on, in my search.html.haml file, I have both a direct link and the auto_discovery link for the search generated RSS:

{% highlight ruby %}
= link_to("RSS for this Search", search_rss_path(params))
- content_for(:extra_header) do
  = auto_discovery_link_tag(:rss, {:controller => 'models' , :action => 'search', :format => 'rss', :params => params}, {:title => 'RSS for Search Result Model Listings'})
{% endhighlight %}

The content_for :extra header is just an "extra header" area in my application.html.haml file:

{% highlight ruby %}
= yield(:extra_header)
{% endhighlight %}

Finally, don't forget to include the search.rss.builder file in your view folder:

{% highlight ruby %}
xml.instruct! :xml, :version=>"1.0"

xml.rss "version" => "2.0" do
  xml.channel do
    xml.title "Search results"
    xml.link search_rss_path(params)
    xml.description("Description here")
    xml.language 'en-us'
    unless @models.empty?
      model = @models.first
      xml.lastBuildDate model.posted_at_rss
    end
    for model in @models
      xml.item do
        xml.title h(model.title)
        xml.description h(model.description)
        xml.pubDate model.posted_at_rss
        xml.author "some author"
        xml.link model_url(model)
        xml.guid model_url(model)
      end
    end
  end
end
{% endhighlight %}

All-in-all, it ended up being very easy to implement dynamic, search-based RSS feeds.
