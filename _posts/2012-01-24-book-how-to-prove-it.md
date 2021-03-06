---
layout: book
title:  "Book: How To Prove It: A Structured Approach"
categories: [posts, books]
---
* Read: January 2012
* Rating: 9/10

[How To Prove It: A Structured Approach](http://www.amazon.com/dp/0521675995?tag=parker08-20) by Daniel Kelleman is a fantastic book on how to write mathematical proofs. It's also a fantastic resource on set theory and general logic. I read this book in preparation for some of my forthcoming grad school computer science classes, but I wish I read it years ago. The level of detail is perfect. The book starts off very simply, and teaches individual things about simple problems. It slowly shows harder and harder proofs and introduces different techniques for writing proofs. Each section has very clear details about how to use that technique as well as several great examples of the technique in action. The book shows a great amount of scratch work, as well as final proofs. This is a must read for any Mathematics or Computer Science or other engineering major, and a must read for those interested in logic.

## My Notes

### Introduction

* Deductive Reasoning: Reduce and Solve a problem
* Conjecture: Guess
  * Once proven, it is a theorem
* Primes of 2^n - 1 = Mersenne Primes

### Chapter 1 - Sequential Logic

Valid argument: premises cannot all be true withot the conclusion being true as well

#### Truth Table:
* Demorgan's Laws
  * &not;(P&and;Q) = &not;P&or;&not;Q
  * &not;(P&or;Q) = &not;P&and;&not;Q
* Commutative Laws
  * P&and;Q = Q&and;P
  * P&or;Q = Q&or;P
* Associate Laws
  * P&and;(Q&and;R) = (P&and;Q)&and;R
  * P&or;(Q&or;R) = (P&or;Q)&or;R
* Idempotent Laws
  * P&and;P = P
  * P&and;P = P
* Distributive Laws
  * P&and;(Q&or;R) = (P&and;Q) &or; (P&and;R)
  * P&or;(Q&and;R) = (P&or;Q) &and; (P&or;R)
* Double Negation Law
  * &not;&not;P = P
* Tautology Laws (always true)
  * P&and;(a tautology) = P
  * P&or;(a tautology) = tautology
  * &not;(a tautology) = contradiction
* Contradiction Laws (always false)
  * P&and;(a contradiction) = contradiction
  * P&or;(a contradiction) = P
  * &not;(a contradiction) = tautology

#### 1.3 - Variables and Sets

* Set = collection of objects {}
* Object are called elements of the set
* &isin; = "is an element of"
* y &isin; { x | x^2 < 9 } => elementhood test
* y = free variable
* x = dummy or bound variable

* Truth set of P(x) = {x | P(x)}
* Common universes of discourse:
  * R = {x | x is a real number}
  * Q = {x | x is a rational number}
  * &Zeta; = {x | x is an integer}
  * &Nu; = {x | x is a natural number}
* &empty; = empty or null set = {}

#### 1.4 - Set Operations

* A &cap; B = {x | x &isin; A and x &isin; B} = intersection of sets A and B
* A &cup; B = {x | x &isin; A or x &isin; B} = union of sets A and B
* A \ B = {x | x &isin; A and x &notin; B} = difference of sets A and B

Often we use Venn Diagrams to represent

* A &sube; B = A is a subset of B = all elements in A are in B
* A &cap; B = &empty; = disjoint = no same elements

#### 1.5 - Conditional and Biconditional Connectives

* P&rarr;Q = If P then Q = conditional
* P = Antecedent
* Q = Consequent

* &not;P&or;Q = P&rarr;Q = &not;P&or;&not;Q = &not;(P&and;&not;Q)
* Q&rarr;P = Converse of P&rarr;Q
* &not;Q&rarr;&not;P = contrapositive of P&rarr;Q = P&rarr;:
* Q&harr;P = biconditional = if and only if (iff) = P&rarr;Q and Q&rarr;P are true = (P&rarr;Q)&and;(Q&rarr;P)

### Chapter 2 - Quantificational Logic

* &forall; xP(x) = "for all x, P(x)" = universal quantifier
* &exist; xP(x) = "there exists an x such that P(x)" = existential quantifier

* Order of quantifiers makes a difference:
  * &not;&exist; xP(x) = &forall; x &not; P(x)
  * &not;&forall; xP(x) = &exist; x &not; P(x)

* Can reorder same types &exist;&exist; &forall;&forall;
  * &exist; y &exist; x or &exist; x &exist; y = "there are objects x and y such that ..."
  * &forall; x &forall; y or &forall; y &forall; x = "for all objects x and y ..."

* &exist;! xP(x) = "there is exactly one value of x such that P is true"

* The universal quantifier distributes over conjunction (the existential quantifier doesn't!)
  * &forall; x (E(x) &and; T(x)) = &forall; xE(x) &and; &forall; xT(x)

* Indexed set
  * Power set of A = &weierp;(A) = {x | x &le; A}

* Intersection of family = &cap;F = {x | &forall; A (A &isin; F &rarr; x &isin; A)}
* Union of family = &cup;F = {x | &exist; A (A &isin; F &and; x &isin; A)}

### Chapter 3 - Proofs

A proof is simply a deductive argument whose premises are the hypothesis of the theorem and whose conclusion is the conclusion of the theorem

* Never assert anything until you can justify it completely
* To prove a conclusion of the form P&rarr;Q
  * assume P is true and then prove Q

* Givens = statements known or assumed true
* Goal = statement that remains to be proven

#### 3.2 - Proofs Involving Negations and Conditionals

* Goal = &not;P
  * instead of a goal that says what shouldn't be true, see if you can rephrase as a goal that says what should be true

* By contradiction, suppose P is true, proof of contradiction, thus P is false
  * assume conclusion is false

#### 3.3 - Proofs Involving Quantifiers

* If you can prove arbitrary P(x), then &forall;P(x)
  * x must be arbitrary (not assumed equal to any other object)
  * don't say "all", "every", etc

When solving &exist;x, then pick an x that solves the equation - it doesn't matter how you find it (the 'how' is not part of the proof)

#### 3.4 - Proofs Involving Conjunctions and Biconditionals

* iff &harr; proofs
  * solve &rarr; then solve &larr; (must do both)

#### 3.5 - Proofs Involving Disjunctions

* P &or; Q = P or Q is true, you're not sure which
  * called "cases" = must solve 2 proofs
  * if proof broken down to cover full proof with 2+ cases, then it called exhaustive
  * they can both be true

#### 3.6 - Existence and Uniqueness Proofs

* &exist;! x P(x)
* Existence = [proof of &exist; x P(x)]
* Uniqueness = [proof of &forall; y &forall; z (P(y) &and; P(z)) &rarr; y = z]

### Chapter 4 - Relations

#### 4.1 - Ordered Pairs and Cartesian Products

P(x,y) = two free variables = pair(a,b)

* Cartesian product
  * AxB = {(a,b) | a &isin;A and b &isin;B}
  * order matters

Truth set of p(x,y) = {(a,b) &isin; AxB | p(a,b)}

#### 4.2 - Relations

* R &sube; AxB is called a relation from A to B
* Domain of R = Dom(R) = {a &isin; A | &exist; b &isin; B ((a,b) &isin; R)}
* Range of R = Ran(R) = {b &isin; B | &exist; a &isin; A ((a,b) &isin; R)}
* Inverse of R = R^-1 = {(b,a) &isin; BxA | (a,b) &isin; R}

* Composition
  * T&ordm;E = {(s,p) &isin; SxP | &exist; c &isin; C ((s,c) &isin; E and (c,p) &isin; T)}
  * Example. If Joe is in Bio 12 and Bio 12 is taught by Prof X, then:
    * (Joe, Bio 12) &isin; E and (Bio 12, Prof X) &isin; T
    * So (Joe, Prof X) &isin; T&ordm;E

#### 4.3 - More about Relations

* R is a relation on A:
  * R is reflexive if &forall; x &isin; A (xRx) = &forall; x &isin; A ((x,x) &isin; R)
    * iff iA &sube; R (note: iA = identity relation on A)
  * R is symmetric if &forall; x &isin; A &forall; y &isin; A (xRy &rarr; yRx)
    * iff R = R^-1
  * R is transitive if &forall; x &isin; A &forall; y &isin; A &forall; z &isin; A ((xRy&and;yRz) &rarr; xRz)
    * iff R&ordm;R &sube; R

#### 4.4 - Ordering Relations

* R is partial order on A if it is reflexive, transitive, and antisymmetrical.
* R is total order if partial order and:
* &forall; x &isin; A &forall; y &isin; A (xRy &or; yRx)

* R minimal element
* R largest and maximal element
* Upp and lower bound

#### 4.5 - Closures

* L is an element of F and it's a subset of every element of F
* Then it (L) is the reflexive closure of M
* L = {(x,y) &isin; RxR | x &le; y }

* Reflexive closure of strict partial order is always partial order
* Reflexive closure of strict total order is always total order

#### 4.6 - Equivalence Relations

* Equivalence relations on A if it is reflexive, symmetric, and transitive.
* Pairwise disjoint = all elements of f are disjoint = &forall; x &isin; f &forall; y &isin; f (x &ne; y &rarr; x &and; y = 0)

* f is a partition of A if:
  * &cup;&fnof; = A
* f is pairwise disjoint if:
  * &forall; x &isin; &fnof;(x &ne; 0)

Facts proven primarily of using them to prove a theorem = lemma

* &exist; k &isin; &Zeta; (x - y = km) = x is congruent to y modulo m
  * x &equiv; y mod m

### Chapter 5 - Functions

Suppose P is the set of all people. Let H = {(p,n) &isin; P X &Nu; | person p has n children}. The H is relation from P to &Nu;. For every p &isin; P, there is exactly one n &isin; &Nu; s.t. (p,n) &isin; H. H is a fuction from P to &Nu;.

* F is a function from A to B:
  * &forall; a &isin; A &exist;! b &isin; B((a,b) &isin; F)
  * represented as &fnof;:A&rarr;B

* Suppose &fnof;:A&rarr;B
  * Unique b = "value of &fnof; at a" = "image of a under &fnof;"
  * f(a) = b

Theorem 5.1.4. Suppose f and g are functions from A to B. If &forall; a &isin; A(f(a) = g(a)), then f=g.

##### 5.1.5

Suppose &fnof;:A&rarr;B and g:B&rarr;C. The g&ordm;f:A&rarr;C for any a &isin; A, the value of g&ordm;f at a is given by the formula (g&ordm;f)(a) = g(f(a))

#### 5.2 - One-to-One and Onto

One-to-one (1-1) "injection": &not;&exist; a1 &isin; A &exist; a2 A(f(a1) = f(a2) &and; a1 &ne; a2)

Onto "surjection": &forall; b &isin; B &exist; a &isin; A(f(a) = b)

If both 1-1 and onto, then called "Bijection" or "1-1 correspondence"

#### 5.3 - Inverses of Functions

* Suppose &fnof;: A&rarr;B. If &fnof; is 1-1 and onto, then &fnof;^-1:B&rarr;A
* &fnof;^-1&ordm;&fnof; = iA and &fnof;&ordm;&fnof;^-1 = iB. (for &fnof;:A&rarr;B and &fnof;^-1:B&rarr;A)

* Suppose &fnof;:A&rarr;B
  * If function g:B&rarr;A s.t. g&ordm;&fnof; = iA then &fnof; is 1-1
  * If function g:B&rarr;A s.t. &fnof;*ordm;g = iB then &fnof; is onto

##### 5.3.4

* Suppose &fnof;:A&rarr;B. Then the following are equal:
  * &fnof; is 1-1 and onto
  * &fnof;^-1:B&rarr;A
  * There is a function g:B&rarr;A s.t. g&ordm;&fnof; = iA and &fnof;&ordm;g = iB

* Example. 10^log x = x = log 10^x (base 10)
  * f(x) = 10^x
  * g(x) = log x
  * g(f(x)) = log 10^x = x ... f(g(x)) = 10^log x = x

So log is the inverse of "raise 10 to the power" function

### Chapter 6 - Mathematical Induction

* Form of proof:
  * Base Case: [Proof of P(0) goes here]
  * Induction step: [Proof of &forall; n &isin; &Nu;(P(n) &rarr; P(n+1) goes here]

#### 6.3 Recursion

* Prove &fnof;(0), then &fnof;(n), therfore &fnof;(n+1)
* If we use "...", then we may be able to use recursion

#### 6.4-6.5 Strong Induction and Closures Again

Some interesting proofs in the book here.

### Chapter 7 - Infinite Sets

* A and B are sets. A is equinumerous w/B if &fnof;: A&rarr;B is 1-1 and onto (shown as A~B)
* Suppose A~B and C~D, then:
  * AxC ~ BxD
  * if A and C are disjoint and B and D are disjoint, then A&cup;C~B&cup;D

* Sets A, B, and C:
  * A~A
  * if A~B, then B~A
  * if A~B and B~C, then A~C

### Summary of Proof Techniques

#### To prove a goal of the form:
1. P &rarr; Q:
  * Assume P is true and prove Q
  * Prove the contrapositive; that is, assume Q is false and prove that P is false
2. &not;Q:
  * Reexpress as a positive statement
  * Use proof by contradiction; that is, assume that P is true and try to reach a contradiction
3. P &and; Q:
  * Prove P and Q separately. In other words, treat this as two separate goals: P and Q.
4. P &or; Q:
  * Use proof by cases. In each case, either prove P or prove Q.
  * Assume P is false and prove Q, or assume Q is false and prove P.
5. P &harr; Q:
  * Prove P &rarr; Q and Q &rarr; P, using methods listed under 1.
6. &forall;x P(x):
  * Let x stand for an arbitrary object and prove P(x).
7. &exist;x P(x):
  * Find a value of x that makes P(x) true. Prove P(x) for this value of x.
8. &exist;!x P(x):
  * Prove &exist;x P(x) (existence) and &forall;y &forall;z ((P(y) &and; P(z)) &rarr; y=z) (uniqueness)
  * Prove the equivalent statement &exist;x (P(x) &and; &forall;y (P(y) &rarr; y = x))
9. &forall;n &isin; &Nu;P(n);
  * Mathematical Induction: Prove P(0) (base case) and &forall;n &isin; &Nu; (P(n) &rarr; P(n+1)) (induction step)
  * Strong induction: Prove &forall;n &isin; &Nu;[(&forall;k < nP(k)) &rarr; P(n)]

#### To use a given of the form:
1. P &rarr; Q:
  * If you are also given P, or you can prove that P is true, then you can conclude that Q is true
  * Use the contrapositive: if you are given or can prove that Q is false, you can conclude that P is false
2. &not;P:
  * Reexpress as a positive statement
  * In a proof by contradiction, you can reach a contradiction by proving P
3. P &and; Q:
  * Treat this as two givens, P, and Q
4. P &or; Q:
  * Use proof by cases. In case 1 assume P is true, and in case 2 assume Q is true
  * If you are also given that P is false, or you can prove that P is false, you can conclude that Q is true. Similarly, if you know that Q is false you can conclude that P is true.
5. P &harr; Q:
  * Treat this as two givens: P &rarr; Q and Q &rarr; P
6. &forall;x P(x):
  * You may plug in any value, say a, for x, and conclude that P(a) is true
7. &exist;x P(x):
  * Introduce a new variable, say x0, into the proof, to stand for a particular object for which P(x0) is true
8. &exist;!x P(x):
  * Introduce a new variable, say x0, into the proof, to stand for a particular object for which P(x0) is true. You may also assume that &forall;y &forall;z ((P(y) &and; P(z)) &rarr; y=z)

#### Techniques that can be used in any proof:
1. Proof by contradiction: assume the goal is false and derive a contradiction.
2. Proof by cases: consider several cases that are exhaustive, that is, that include all possibilities. Prove the goal in each case.
