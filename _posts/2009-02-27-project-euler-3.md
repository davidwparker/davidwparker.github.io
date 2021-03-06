---
layout: post
title: "Project Euler #3"
categories: [posts, hascode]
oldurl: http://davidwparker.com/2009/02/27/project-euler-3/
---
In JavaScript:

{% highlight javascript %}
//this script takes a long time to run for the real number, and
//you may need to make the browser continue the script several times,
//modified number to make it quicker... change back to see in action
var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37], factors = [], number = 456;
//real num = 600851475143;
//take the first prime number 2, and divide the number by it
//if it is modulus 0, then use it
//if the current value is higher than the largest prime we currently have,
//then find next prime and go again
while (number !== 1){
  var isPrime = findByPrimes();
  if (isPrime === false)
    findNextPrime();
}

function findByPrimes(){
  var isPrime = false;
  for (var i = 0; i < primes.length; i++){
    isPrime = determinePrimeFactor(i);
    if (isPrime)
      break;
  }
  return isPrime;
}

function determinePrimeFactor(i){
  if (number % primes[i] === 0){
    factors[factors.length] = primes[i];
    number = number / primes[i];
    return true;
  }
  return false;
}

function findNextPrime(){
  var highest = primes[primes.length-1];
  highest += 1;
  for (x in primes){
    if (highest % x === 0)
      break;
    else
      primes[primes.length] = highest;
  }
}

for (var i = 0; i < factors.length; i++){
  if (factors[i]) document.write(factors[i], "<br />");
}
document.write("largest prime factor: ", factors[factors.length-1], "<br />");
{% endhighlight %}

on [GitHub](http://github.com/davidwparker/project_euler/blob/b1206536f8c25af9f18a7010ff49d89606f68e06/javascript/0003.html)
