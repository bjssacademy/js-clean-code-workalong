# Clean Code Example

You inherit a codebase. Let's assume it's very simple, but legacy, application. Nobody is quite sure what it is or why it works.

You clone the repo and open up the single file:

```js
function cI(p, r, y) {
  let a = p * Math.pow(1 + r / 100, y);
  let i = a - p;
  return parseFloat(i.toFixed(2));
}

let p = 1000;
let r = 5;
let y = 10;
let i = cI(p, r, y);
```

You recoil in horror. What is this mess? What does it do?

Then it gets worse, you look at the codebase and realise the last person to touch this..._was you_.

## What does the code do?

Fortunately, after some digging you find this:

```js
console.log(
  "The interest earned on $" +
    p +
    " at an annual rate of " +
    r +
    "% for " +
    y +
    " years is $" +
    i
);
```

Oh right, so this seems to calculate the interest (`r`) on an amount of money (`p`) over a number of years (`y`). Why doesn't the code make that clear? Why is the only piece of context we have in a `console.log`?

## Clean Code 1 - Naming Things

The first thing we want to do is make our variables related to the domain, in natural English. This means, although we thought we were saving time by using short variable names (and some languages suggest this as their "idiomatic" way of working), we've actually just created a problem for ourselves later on.

We can refactor our code now we have some domain knowledge just renaming the variables:

```js
function cI(principal, rate, years) {
  const amount = principal * Math.pow(1 + rate / 100, years);
  const interest = amount - principal;
  return parseFloat(interest.toFixed(2));
}

let principal = 1000;
let rate = 5;
let years = 10;
let interest = cI(principal, rate, years);
console.log(
  "The interest earned on $" +
    principal +
    " at an annual rate of " +
    rate +
    "% for " +
    years +
    " years is $" +
    interest
);
```

Already this is _much_ easier to read, and, crucially, to _understand_.

Now we can see that our function has a rubbish name. Let's name it after what it _does_ - it _calculates interest_:

```js
function calculateInterest(principal, rate, years) {
  const amount = principal * Math.pow(1 + rate / 100, years);
  const interest = amount - principal;
  return parseFloat(interest.toFixed(2));
}

let principal = 1000;
let rate = 5;
let years = 10;
let interest = calculateInterest(principal, rate, years);
console.log(
  "The interest earned on $" +
    principal +
    " at an annual rate of " +
    rate +
    "% for " +
    years +
    " years is $" +
    interest
);
```

Now we're cooking!

## Clean Code 2 - Increasing Understanding

We've got some magic in our code, and it's not clear what it does. Take as an example this code:

```js
return parseFloat(interest.toFixed(2));
```

I've had to look this one up - it appears to take a `float` and return it to 2 decimal places. This seems important in the context of the _domain_ we are working in - finance in this case.

Let's use a technique called _extract method_ to do that.

```js
function calculateInterest(principal, rate, years) {
  const amount = principal * Math.pow(1 + rate / 100, years);
  const interest = amount - principal;
  return roundedToTwoDecimalPlaces();

  function roundedToTwoDecimalPlaces() {
    return parseFloat(interest.toFixed(2));
  }
}
```

Here we have created a new function inside the function itself, called `roundToTwoDecimalPlaces()`.

### So what? Why does this help?

1. Clarity - breaking down a large function into smaller well-named methods (or functions) means that method does a _single task_.
2. Abstraction - We can understand what will be returned from the function itself without having to actually look at the underlying code.
3. Maintainability - We've isolated logic (encapsulated it in a function). Now changes to that can be made in isolation and minimize the risk of introducing bugs. It's also easier to debug - bonus!
4. Self-documenting code - well-named functions serve as a form of documentation. When you have a comment above a line of code explaining what it _does_ then you have a prime candidate for refactoring. The code should explain itself, not added comments.

## Clean Code 3 - Aiding Understanding Again

Okay, now we've done that, let's look at another candidate:

```js
const amount = principal * Math.pow(1 + rate / 100, years);
```

What's this? After careful examination, an asking our friendly domain expert, they confirm that you first need to calculate the `principal` by the _growth rate_, which is expressed `% * years`.

Hmm, okay, well let's use the domain to explain what is going on and extract that:

```js
function calculateInterest(principal, rate, years) {
  const amount = principal * growthRate(rate, years);
  const interest = amount - principal;
  return roundedToTwoDecimalPlaces();

  function roundedToTwoDecimalPlaces() {
    return parseFloat(interest.toFixed(2));
  }

  function growthRate(rate, years) {
    return Math.pow(1 + rate / 100, years);
  }
}
```

We've still got an odd bit of maths we don't understand though. Hmm.

## Clean Code 4 - Interim variables

We can break up our extracted method `growthRate()` and aid understanding by creating an \*interim variable`. This helps us separate out our calculation, not only to help us understand what is going on, but also for debugging.

> Whilst it's very clever to write a complex mathematical statement on one line, trying to debug it when things go wrong is _very_ difficult. Be nice to yourself instead.

### Our new method

```js
function growthRate(rate, years) {
  const growthAsDecimal = 1 + rate / 100;
  return Math.pow(growthAsDecimal, years);
}
```

Here we have introduced the intermediate variable `growthAsDecimal` and assigned it the value of `rate /100` plus `1`. This turns an _int_ (`5`) into a _decimal_ (`1.05`).

## Clean Code - Moving On

There are lots of other clean code practices, but here we have covered a few - and we're not done yet!

What things could we do to aid understanding now we have more understanding ourselves?

- What does `Math.pow()` do?
- Do the variable names make sense? Could we have better ones?
- What would we do if we needed to validate our inputs were all positive integers?

For more ideas about being kinder to our readers in code, have a look at our
[BJSS Academy guide to clean code](https://github.com/bjssacademy/fundamentals-clean-code)

Remember - clean code helps you in future, helps the team, and impresses hiring managers ;)
