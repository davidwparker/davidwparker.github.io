---
layout: post
title: "Project Euler #5"
categories: [posts, hascode]
oldurl: http://davidwparker.com/2009/03/01/project-euler-5/
---
In JavaScript:

{% highlight javascript %}
(function(){
  //this is some ugly looking code
  //real number is 232792560
  //js takes forever to find the right answer, so changed num to the answer minus 1.
  //Change low to watch in action
  var num = 232792559, isNotDivisible = true, currentDivisible = false;

  while (isNotDivisible){
    for (var i = 1; i < 21; i++){
      var currentDivisible = testDivisible(num, i);
      if (!currentDivisible)
        break;
    }
    num += 1;
    isNotDivisible = !currentDivisible;
  }

  function testDivisible(num, i){
    if (num % i !== 0)
      return false;
    else
      return true;
  }
  document.write(num - 1);
})();
{% endhighlight %}

on [GitHub](http://github.com/davidwparker/project_euler/blob/b1206536f8c25af9f18a7010ff49d89606f68e06/javascript/0005.html)
