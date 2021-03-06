---
layout: post
title: Simple filterered search using drop downs with Thinking Sphinx
categories: [posts, hascode]
oldurl: http://davidwparker.com/2008/09/27/simple-multi-form-field-search-with-thinking-sphinx/
---
Sometimes you may need to offer your users the ability to perform a filtered search using drop down selects.  I had already settled on using Thinking Sphinx based on past experience, so I just needed to figure out how to offer 'filters'.

For the sake of this tutorial I'll be using a very basic example.  Let's start with the index that is defined for Thinking Sphinx in the model:

{% highlight ruby %}
define_index do
  indexes city
  indexes state
end
{% endhighlight %}

Not too much going on here.  The city will provide a textbox for the user to perform basic searches on, and the state will be drop down list, or one of many 'filters' in a real world app.

Onto my routes.rb file, I have defined a search path:

{% highlight ruby %}
map.search '/search', :controller => 'search', :action => 'search'
{% endhighlight %}

My haml template looks like so:

{% highlight ruby %}
%h2 Search
-form_tag search_path, :method => 'get' do
  .refine
    = label_tag :c, "city"
    %br
    = text_field_tag :c, params[:c]
  .refine
    = label_tag :st, "State"
    %br
    = select_tag "st", (options_from_collection_for_select STATE_LIST, "to_s", "to_s", params[:st])
  .refine
    = label_tag :p, "Results Per Page"
    %br
    = select_tag :p, (options_from_collection_for_select PER_PAGE_LIST, "to_s", "to_s", params[:p])
  .refine
    = submit_tag "Search", :name => nil
{% endhighlight %}

Nothing out of the ordinary here.  For this demonstration, suppose that I have previously defined STATE_LIST and PER_PAGE_LIST to be the list of states and the numbers for results per page that I want to offer my users the ability to select from.  In general your application will probably store the information for the drop downs in the database but if you just want to try something really quick, this will do the trick.  The PER_PAGE_LIST is only required if you're using the wonderful [will_paginate](http://github.com/mislav/will_paginate/tree/master) plugin.

Anyway, onto the controller:

{% highlight ruby %}
# GET /search
def search
  @models = Model.search_page params
  respond_to do |format|
    format.html
  end
end
{% endhighlight %}

Very basic search here.  I've declared a search_page method in my model and I pass it the params.  Then I simply do a respond_to.

Here is the search_page method in the model:

{% highlight ruby %}
  def self.search_page(params)
    Model.search params[:c], :conditions => {
      :state       => params[:st]
    },
    :per_page => (params[:p].to_i unless params[:p].to_i == 0),
    :page => params[:page]
  end
{% endhighlight %}

I use the text field for the city as what I'm actually searching.  The state gets assigned to a condition.  This allows us to add several drop downs in the future as long as we know what values from which the user can select.  Next, you'll note that we assign the :per_page and :page which are used for will_paginate.  If you want to give your users a very easy way to define how many results they want per page, then this is an easy way to do just that.

That's it!  You can now define several drop down select filters!

Required additional reading/watching:

* Pat Allan's concise [guide](http://freelancing-gods.com/posts/a_concise_guide_to_using_thinking_sphinx) to Thinking Sphinx.
* Ryan Bate's Railscasts [episode](http://railscasts.com/episodes/120-thinking-sphinx on Thinking Sphinx).
* Rein's [comparison](http://reinh.com/blog/2008/07/14/a-thinking-mans-sphinx.html) of UltraSphinx and Thinking Sphinx.
