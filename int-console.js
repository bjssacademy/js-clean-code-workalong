function cI(p, r, y) {
    let a = p * Math.pow((1 + r / 100), y);
    let i = a - p;
    return parseFloat(i.toFixed(2));
}

let p = 1000;
let r = 5;
let y = 10;
let i = cI(p, r, y);
console.log("The interest earned on $" + p + " at an annual rate of " + r + "% for " + y + " years is $" + i);