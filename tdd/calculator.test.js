const cI = require('./calculator');

test('Five percent over ten years calculates correctly', () => {
    //Arrange
    const principal = 1000;
    const rate = 5;
    const years = 10;

    const expected = 628.89;

    //Act
    const result = cI(principal, rate, years);

    //Assert
    expect(result).toBe(expected);
});

// jest intro - https://jestjs.io/docs/getting-started