"use strict";

//Задача 1

function parseCount(parseNumber) {
    let number = Number.parseInt(parseNumber, 10);
    
    if (isNaN(number)) {
        throw new Error("Невалидное значение");
    }

    return number;
}

function validateCount (unParseNumber) {
    try {
        return parseCount(unParseNumber);
    } catch (error) {
        return error;
    }
}

// Задача 2

class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
        if (a + b < c || a + c < b || b + c < a) {
            throw new Error("Треугольник с такими сторонами не существует!");
        }    
    }

    getPerimeter() {
        return this.a + this.b + this.c;
    }

    getArea() {
        let halfPerimeter = this.getPerimeter() / 2;
        return Number(Math.sqrt(halfPerimeter * (halfPerimeter - this.a) * (halfPerimeter - this.b) * (halfPerimeter - this.c)).toFixed(3));
    }
}

function getTriangle(aSide, bSide, cSide) {
    try {
        return new Triangle(aSide, bSide, cSide);
    } catch (error) {
        return  new Object ({
            getPerimeter() {
                return "Ошибка! Такой треугольник не существует";
            },
            getArea() {
                return "Ошибка! Такой треугольник не существует";
            }
        });
    }
}
