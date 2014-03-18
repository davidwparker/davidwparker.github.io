---
layout: post
title: Where are the Django Standards?
categories: posts
---
I guess the title is my question.  Really not more to say than that.  I'm really trying to find a standard way that Django does things: specifically, I'd like to know where the majority of my business/domain logic goes?

So far, I've read and looked at [Django Book](http://djangobook.com), [Pinax Project](http://pinaxproject.com), and [The Django Documentation](http://docs.djangoproject.com/en/1.1/), and to my dismay, they've all been a little bit different.  I also tried posting to the [Django Google Group](http://groups.google.com/group/django-users) and I didn't receive any help there either.  I really just want to conform to the standard here...

As I come from a [Rails](http://rubyonrails.org) background, I've decided to use that as my standard until I find something in the Django realm.  I've been placing as much business logic as possible in the models, to maintain a [skinny controller](http://weblog.jamisbuck.org/2006/10/18/skinny-controller-fat-model) (Views in Django).  It's worked out extremely well and I feel the code is a lot more "Testable" as well.

Anyway, if anyone who's a stellar Django developer wants to let me know that I'm doing it wrong, feel free to e-mail me or message me on [Twitter](http://twitter.com/davidwparker).
