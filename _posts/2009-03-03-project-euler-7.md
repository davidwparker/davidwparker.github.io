---
layout: post
title: "Project Euler #7"
categories: [posts, hascode]
oldurl: http://davidwparker.com/2009/03/03/project-euler-7/
---
In JavaScript:

{% highlight javascript %}
//this takes a long time to run to the 10001, change below for correct answer
(function(){
  var primes = [2], highest = 2;

  //change to primes[10001] and have patience
  while(primes[101] === undefined){
    findNextPrime();
  }

  //similar to euler3
  function findNextPrime(){
    highest += 1;
    var isPrime = determinePrime(highest);
    if (isPrime)
      primes.push(highest);
  }

  function determinePrime(highest){
    for (x in primes){
      if (highest % primes[x] === 0)
        return false;
    }
    return true;
  }

  for (var x in primes){
    document.write(x, " - ", primes[x], "<br />" );
  }
})();
{% endhighlight %}

on [GitHub](http://github.com/davidwparker/project_euler/blob/b1206536f8c25af9f18a7010ff49d89606f68e06/javascript/0007.html)
