---
layout: post
title: "Project Euler #1"
categories: [posts, hascode]
oldurl: http://davidwparker.com/2009/02/25/project-euler-1/
---
In JavaScript:

{% highlight javascript %}
var total = 0;
for (var i = 0; i < 1000; i++){
  if ((i % 3 === 0) || (i % 5 === 0)){
    total += i;
  }
}
document.write(total);
{% endhighlight %}

on [GitHub](http://github.com/davidwparker/project_euler/blob/b1206536f8c25af9f18a7010ff49d89606f68e06/javascript/0001.html)
