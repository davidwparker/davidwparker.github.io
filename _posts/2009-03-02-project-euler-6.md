---
layout: post
title: "Project Euler #6"
categories: [posts, hascode]
oldurl: http://davidwparker.com/2009/03/02/project-euler-6/
---
In JavaScript:

{% highlight javascript %}
(function(){
  var sumSq = 0, sqSum = 0, total = 0;
  for (var i = 1; i < 101; i++){
       sumSq += Math.pow(i,2);
       total += i;
  }
  sqSum = Math.pow(total, 2);
  document.write("Square of the Sums: ", sqSum, "<br />");
  document.write("Sum of the Squares: ", sumSq, "<br />");
  document.write("Difference: ", sqSum - sumSq);
})();
{% endhighlight %}

on [GitHub](http://github.com/davidwparker/project_euler/blob/b1206536f8c25af9f18a7010ff49d89606f68e06/javascript/0006.html)