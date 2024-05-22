function cI(p, r, y) {
    let a = p * Math.pow((1 + r / 100), y);
    let i = a - p;
    return parseFloat(i.toFixed(2));
}

module.exports = cI;