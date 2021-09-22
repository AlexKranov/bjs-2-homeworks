"use strict"

function solveEquation(a, b, c) {
    let arr = [];
    let d = b ** 2 - 4 * a * c;

    if (d < 0) {
        arr.push();
    } else if (d === 0) {
        arr.push(-b / (2 * a));
    } else {
        arr.push((-b + Math.sqrt(d)) / (2 * a));
        arr.push((-b - Math.sqrt(d)) / (2 * a));
    }

    return arr;
}