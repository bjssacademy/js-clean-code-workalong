const cI = require('./calculator');

test('Five percent over ten years calculates correctly', () => {
    //Arrange
    const principal = 1000;
    const rate = 5;
    const years = 10;

    const expectedInterestEarned = 628.89;

    //Act
    const grossInterestEarned = cI(principal, rate, years);

    //Assert
    expect(grossInterestEarned).toBe(expectedInterestEarned);
});

// jest intro - https://jestjs.io/docs/getting-started