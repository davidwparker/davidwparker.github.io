---
layout: post
title: Facebook style, unobtrusive ajax pagination for will_paginate with jQuery
categories: [posts, hascode]
oldurl: http://davidwparker.com/2008/09/30/facebook-style-unobrusive-ajax-pagination-for-will_paginate-with-jquery/
---
I really like the 'pagination' that Facebook provides on their status tab.  It's not true 'pagination' in that the result set is changed, but it does add additional results to the bottom of the set.

<img src="/media/fb_bottomless_pagination.png" alt="Facebook Bottomless Pagination" title="Facebook Bottomless Pagination" />

If you want to just change the result set and not add to it (with will_paginate), then I suggest checking out Chris' solution [here](http://ozmm.org/posts/ajax_will_paginate_jq_style.html), otherwise, read on...

Anyway, I went ahead and created a plugin for jQuery based on the wonder Rails plugin [will_paginate](http://github.com/mislav/will_paginate/tree/master).  Introducing, jquery-bottomless-pagination.

Usage:
You should already be using the will_paginate plugin.
Then, be sure to include the javascript plugin:

{% highlight ruby %}
= javascript_include_tag 'jquery.bottomlesspagination.js'
{% endhighlight %}

Here are the optional settings (displayed below are the defaults):

{% highlight javascript %}
ajaxLoaderPath:'../images/ajax-loader.gif',
results:'.results',
objName:'',
callback:null
{% endhighlight %}

* **ajaxLoaderPath** is the path to your image which will be displayed while the ajax call is being made.
* **results** is the CSS selector that jQuery will use to append the results of the ajax call to.
* **objName** is the name of the object that you would like displayed in the phrase "Show more (objName)..." and "There are no more (objName) to add..."
* **callback** is a function which you can provide to perform extra functions after the objects are appended, such as adding highlight or zebra effects.

All of these settings can be utilized similarly to the following (this would be in your application.js file or something):

{% highlight javascript %}
$.bottomlessPagination({objName:'rows', callback:function(){
  //highlight current row
  $(".results li").hover(function() {
    $(this).addClass("hover");
  }, function() {
    $(this).removeClass("hover");
  });
}});
{% endhighlight %}

You may need to provide something like the following for Rails.

{% highlight javascript %}
$.ajaxSetup({
  'beforeSend': function(xhr) {
    xhr.setRequestHeader("Accept","text/javascript")}
});
{% endhighlight %}

On the rails side of things, in your controller, just return the partial which iterates through your returned objects:

{% highlight ruby %}
def index
  @objects = Object.paginate :page => params[:page]
  respond_to do |format|
    format.html
    #ajax response
    format.js { render :template => 'objects/_index_objects.html.haml'}
  end
end
{% endhighlight %}

and the partial:

{% highlight ruby %}
- for object in @object
  %li.result_row
    Your stuff here
{% endhighlight %}

That's it.  Be sure to check out the plugin in its entirety on [Github](http://github.com/davidwparker/jquery-bottomless-pagination/tree/master).  Feedback is always welcome.  Enjoy!
