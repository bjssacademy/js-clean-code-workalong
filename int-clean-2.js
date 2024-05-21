function calculateInterest(principal, rate, years) {
    const amount = principal * Math.pow((1 + rate / 100), years);
    const interest = amount - principal;
    return roundedToTwoDecimalPlaces();

    function roundedToTwoDecimalPlaces() {
        return parseFloat(interest.toFixed(2));
    }
}

let principal = 1000;
let rate = 5;
let years = 10;
let interest = calculateInterest(principal, rate, years);
console.log("The interest earned on $" + principal + " at an annual rate of " + rate + "% for " + years + " years is $" + interest);