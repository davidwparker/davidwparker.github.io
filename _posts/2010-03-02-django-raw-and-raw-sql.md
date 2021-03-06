---
layout: post
title: Django Raw and Raw SQL
categories: [posts, hascode]
---
[Django Raw](http://djangoadvent.com/1.2/smoothing-curve/) is pretty sweet.  Basically, you use it like so:

{% highlight python %}
from models import Model

query = "SELECT * FROM model"
models = Model.objects.raw(query)
{% endhighlight %}

This is fan-freaking-tastic for most scenarios.  However, it does have a limitations: first, it can only use SELECT statements, and second (and more importantly for me), the ID column must be apart of the SELECT statement.  This second limitation wasn't listed on Django Advent, so I wanted to share this for all of you in Google-land.  The reason that it requires the ID column is because raw is meant to get back working model instances, as Sean told me on [Twitter](http://twitter.com/theSeanOC/status/9020160524).  It really make sense.  You have a model, you want to get the data back for them, modify it in some shape or fashion, then commit back to the database.

Unfortunately, this doesn't allow for SELECT statements such as <code>SELECT DISTINCT field FROM model</code>.  On my current project, I have several fields where there may be repeated data, but I want to get the distinct values of those fields.  Unfortunately, I can't use the new hotness in Django Raw, so I've had to work on a different solution:

{% highlight python %}
models.py

def get_chapter_numbers(self, book):
  '''Returns a list of unique chapter numbers'''
  chapters = Model().get_array(params=[book], query="SELECT DISTINCT chapter FROM models WHERE book = %s ORDER BY chapter")
  return Model().get_first_col(chapters)

def get_array(self, *args, **kwargs):
  '''Returns an array based on the keyword arguments'''
  from django.db import connection, transaction
  cursor = connection.cursor()
  cursor.execute(kwargs["query"], kwargs["params"])
  return cursor.fetchall()

def get_first_col(self, rows):
  results = []
  for row in rows:
    results.append(row[0])
  return results

{% endhighlight %}

It might not be the best example (as chapter numbers are _normally_ unique, but bear with me).  Basically, the method <code>get_array</code> is the meat of the example.  In the example, <code>get_array</code> will run any query given to it (UPDATE, SELECT, etc), binding the params array to the parameters in the query.  This won't return Model Objects, but rather an array of rows, which contains an array of columns.  Any manipulation that I want to do on the results happens in another method: in my example, I'm creating a new array with the actual column value in the method <code>get_first_col</code>.

If you want to work more with "real raw SQL", see the [django docs](http://docs.djangoproject.com/en/1.1/topics/db/sql/#topics-db-sql)
