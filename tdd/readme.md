# Clean Code TDD Style

In this slightly more advanced version, we are protected by tests. If we refactor code without tests then we risk breaking our code and never knowing until runtime. This is considered *bad*.

In this setup we don't have any console output and we rely on our tests to assert that our changes have not broken anything.

Fortunately in this example, our tests act as our executable specification and explain better than the code what is actually happening.

The task remains the same - but after each refactoring we run our tests to ensure we haven't broken anything instead of checking our console output manually.

Refactor the code to be cleaner before moving on.

1. Install Jest `npm install --save-dev jest`
2. Install any other dependencies `npm install`
3. Run tests `npm test`

## Part 2 - Adding Validation

We're going to do this TDD style. We're going to write a test *first*, to explain what we *want* to happen when an invalid `principal` is passed in.

```js
test('A negative principal is rejected with an error', () => {
    //Arrange
    const principal = -5;
    const rate = 5;
    const years = 10;

    //Act & Assert - needed when errors are thrown in Jest

    expect(() => {
        cI(principal, rate, years);
    }).toThrow(‘Principal must be a positive integer’);

});
```

Now we run our test, and we see that we get a failure as we expect. Now we can refactor our code.

```js
function checkPrincipalNotNegative(value) {
    if (value < 0) {
        throw new Error("Principal must be a positive integer")
    }
}
```

And we call this at the top of our `calculateInterest` function:

```js
checkPrincipalNotNegative(principal)
```

When we save all our files and run our tests now, they should all pass!

### Tasks

1. Add tests for `rate` and `years`
2. That might be a lot of repetitive code - how can we make our code cleaner?
3. What other invalid inputs do we need to deal with? Write tests for them!