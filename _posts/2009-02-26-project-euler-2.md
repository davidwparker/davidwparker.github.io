---
layout: post
title: "Project Euler #2"
categories: [posts, hascode]
oldurl: http://davidwparker.com/2009/02/26/project-euler-2/
---
In JavaScript:

{% highlight javascript %}
var sum = 0, one = 1, two = 2, high = 0, fibNums = [2];
while (high < 4000000){
  sum = one + two;

  if (sum % 2 === 0){
    var len = fibNums.length;
    fibNums[len] = sum;
    high = sum;
  }
  one = two;
  two = sum;
}
sum = 0;
for (var count = 0; count < fibNums.length; count++){
  sum += fibNums[count];
}
document.write("total= ", sum, "<br />");
{% endhighlight %}

on [GitHub](http://github.com/davidwparker/project_euler/blob/b1206536f8c25af9f18a7010ff49d89606f68e06/javascript/0002.html)