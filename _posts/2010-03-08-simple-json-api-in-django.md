---
layout: post
title: Simple JSON API in Django
categories: [posts, hascode]
---
For the Bible API, I made the decision early on that I was going to be using [JSON](http://www.json.org/) for the API.

Creating a JSON API in Django is extremely simple.

{% highlight python %}
views.py

from django.core import serializers
from django.http import HttpResponse

def verses(request, version, book, chapter, verse, verse2):
  '''Returns a list of verses for a given version, book, chapter, and optional verses'''
  verses = Verse().get_verses(version, book, chapter, verse, verse2)
  if 'application/json' in request.META.get('HTTP_ACCEPT'):
    return HttpResponse(serializers.serialize("json", verses), mimetype='application/json')
  else:
    #do some non-json stuff here
    return...
{% endhighlight %}

First, we make sure to import serializers from <code>django.core</code>.

In the verses method, we get the verses from the model.  Next, we check if the <code>HTTP_ACCEPT</code> header contains <code>application/json</code>.  If so, then we return an HttpResponsewith the verses serialized to "json" with a <code>mimetype</code> of <code>application/json</code>.

You can then test your API using [curl](http://curl.haxx.se/).

{% highlight python %}
curl --header "Accept: application/json" http://url/path/to/your/api/
{% endhighlight %}

And that's it.  You can also do the same with XML if you so choose.
