---
layout: post
title: Rails text_field tag with datetime data gotcha
categories: [posts, hascode]
oldurl: http://davidwparker.com/2008/11/15/rails-text_field-tag-with-datetime-data-gotcha/
---
Another quick gotcha that I just discovered.  If you have a model that has a time on the backend, be careful which tags you use.  In my case, I have an app that is outside UTC:

{% highlight ruby %}
config.time_zone = 'Central Time (US & Canada)'
{% endhighlight %}

On my form, when editing the model, everything appears fine.  But when you check out the difference in these two tags, you'll see that text_field renders the incorrect time, whereas datetime_select renders the correct time.

{% highlight ruby %}
= f.datetime_select :posted_at
= f.text_field :posted_at
{% endhighlight %}

I put in a defect ticket for this [here](http://rails.lighthouseapp.com/projects/8994/tickets/1380-text_field-tag-has-incorrect-time#ticket-1380-1).  Hopefully the Rails team will be able to knock that out quick.
