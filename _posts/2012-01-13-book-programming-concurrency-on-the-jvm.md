---
layout: book
title:  "Book: Programming Concurrency on the JVM"
categories: [posts, books]
---
* Read: January 2012
* Rating: 8/10

[Programming Concurrency on the JVM](http://www.amazon.com/dp/193435676X?tag=parker08-20) by Venkat Subramaniam is an excellent introduction to exactly what its title says "programming concurrency on the JVM." This book is for people who want to learn a little about concurrency and don't know much. It's for people who are using Java and can't get away from it and want to know how to take advantage of their multicore computers. The book focuses mostly on Java, but also shows a good bit of the Scala equivalent code. It also shows a little Groovy, JRuby, and Clojure, but those languages definitely aren't the focus. Additionally, the book mostly uses the Akka library for a majority of the Software Transactional Memory (STM) and Actors code.

## My Notes

### 3 Forms of concurrency on the JVM:
* "Synchronize and Suffer" model
* Software Transactional Memory (STM) model
* Actor-based model

* A thread is a flow of execution in a process
* A concurrent application makes use of multiple threads or concurrent flows of execution
* Concurrency can make apps responsive, reduce latency, and increase throughput
* Concurrency issues include starvation, deadlocks, and race conditions

The core problem is shared mutability

Generally want at least as many threads as number of available cores:

{% highlight java %}
Runtime.getRuntime().availableProcessors();

{% endhighlight %}

* We want:
* Number of threads = Number of available cores / (1 - blocking coefficient)
* The blocking coefficient (0 to 1) is approximately how often we utilize blocking behavior (such as I/O)

* Use a thread pool
* Use java.util.concurrent, not the older threading APIs

#### Best to:
1. Use shared immutability (pure immutability) where possible
2. Use isolated mutability- ensure only one thread can access a mutable variable

For computationally intensive applications, limit number of threads to number of cores

Immutable and persistent data structures are your friends

* Threads in Java are not reusable
* Use ExecutorService for your thread pool
* Use Exchanger to exchange data between threads
* For a lot of data that needs to switch between threads, using BlockingQueues

Java 7 offers the Fork-Join API, which dynamically manages threads based on available processors and task demand

Use Concurrent Collections, and not just synchronized collections

* Shared mutability is not restricted to public fields
* Don't create threads from within constructors. Use Static factory methods instead
* When working with multiple mutable fields, ensure that the access to these variables is atomic

In the real world, state does not change, identity does

Ensure code within transactions is idempotent

### STM-based concurrency

* STM provides explicit lock-free programming with good thread safety and high concurrent performance
* No explicit lock leads to deadlock free concurrency

* Akka offers Akka Refs which are immutable types that manage mutable identity
* Wrap your transactions in an atomically() {} method and the Atomic class

Set a transaction as readonly to gain performance

* Use the deferred method and the compensating method to pass code block to run when a transaction succeeds or fails
* Deferred is good for completing work
* Compensating is good for logging failures

Akka does not avoid write skew

STM is best for when write collisions are infrequent

### Actor-based concurrency

* Event-based essage passing
* Treat tasks as lightweight processes, internal to application/JVM
* While the application is multithreaded, the actors themselves are single-threaded

An actor is a free-running activity that can receive messages, process requests, and send responses

Actor libraries decouple actors from threads

* Akka library uses ActorRefs which are created via a call to actorOf() and the start() methods
* Send messages in Java using sendOneWay() or in Scala using !

You can coordinate Actors to work together

Think of a typed actor as an active object, which runs in its own single lightweight event-driven thread, with an intercepting proxy to turn normal-looking method calls into asynchronous nonblocking messages

* You can mix Actors and STM
* Actors don't provide a way to manage consensus across tasks= that is, having all of them succeed or all of them fail
* Akka provides Transactors for this purpose
* Transactors are useful, just like STM, when write collisions are infrequent

It's possible to use Remote Actors to different JVMs

* You must ensure to propogate error messages to actors awaiting responses
* Actors don't prevent deadlock
* Make sure to use timeouts to ensure you don't endlessly wait for a response from an actor
