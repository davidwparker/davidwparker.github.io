---
layout: post
title: "Project Euler #4"
categories: [posts, hascode]
oldurl: http://davidwparker.com/2009/02/28/project-euler-4/
---
In JavaScript:

{% highlight javascript %}
(function(){
  var i = 999, j = 999, highest = 0, palindromes = [];

  while (i > 0) {
    while (j > 0) {
      var pal = determinePalindrome(i * j + "");
      if (pal)
        palindromes.push(i * j);
      j -= 1;
    }
    i -= 1;
    j = 99;
  }

  function determinePalindrome(k) {
  //determine the number of pairs and loop through each pair to compare values
    for (var m = 0; m < k.length; m++){
      var first, last;
      first = k.charAt(m);
      last = k.charAt(k.length - 1 - m);
      if (first !== last)
        return false;
    }
    return true;
  }

  palindromes.sort(function(palindromes,sorted){return palindromes-sorted;});
  document.write(palindromes[palindromes.length - 1]);
})();
{% endhighlight %}

on [GitHub](http://github.com/davidwparker/project_euler/blob/b1206536f8c25af9f18a7010ff49d89606f68e06/javascript/0004.html)
