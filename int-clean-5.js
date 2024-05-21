function calculateInterest(principal, interestRate, years) {
    const amount = principal * growthRate(interestRate, years);
    const interest = amount - principal;
    return roundedToTwoDecimalPlaces();

    function roundedToTwoDecimalPlaces() {
        return parseFloat(interest.toFixed(2));
    }

    function growthRate(interestRate, years) {
        const growthAsDecimal = 1 + (interestRate / 100)
        return Math.pow(growthAsDecimal, years)
    }
}

let principal = 1000;
let interestRate = 5;
let years = 10;
let interest = calculateInterest(principal, rate, years);
console.log("The interest earned on $" + principal + " at an annual rate of " + rate + "% for " + years + " years is $" + interest);