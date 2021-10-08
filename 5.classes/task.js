"use strict";

//Задача 1

class PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this.state = 100;
        this.type = null;
    }

    fix() {
        this.state = this.state * 1.5;
        return this.state;
    }

    set state(number) {
        this._state = number;
        if (this.state < 0) {
            this._state = 0;
        } else if (this.state > 100) {
            this._state = 100;
        } else {
            this._state = this.state;
        }
    }

    get state() {
        return this._state;
    }
}

const sherlock = new PrintEditionItem("Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе", 2019, 1008);

console.log(sherlock.releaseDate); //2019
console.log(sherlock.state); //100
sherlock.fix();
console.log(sherlock.state); //100

class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = "magazine";
    }
}

class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.author = author;
        this.type = "book";
    }
}

class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "novel";
    }
}

class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "fantastic";
    }
}

class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "detective";
    }
}

const picknick = new FantasticBook("Аркадий и Борис Стругацкие", "Пикник на обочине", 1972, 168);

console.log(picknick.author); //"Аркадий и Борис Стругацкие"
picknick.state = 10;
console.log(picknick.state); //10
picknick.fix();
console.log(picknick.state); //15

//Задача 2

class Library extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        super(releaseDate, pagesCount);
        this.name = name;
        this.books = [];
    }

    addBook(book) {
        if (this.state > 30) {
            this.books.push(book)
        }
    }

    findBookBy(type, value) {
        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i][type] === value) {
                return this.books[i];
            }
        }
        return null;
    }

    giveBookByName(bookName) {
        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i].name === bookName) {
                return this.books.splice(i, 1)[0];
            }
        }
        return null;
    }
}

const library = new Library("Библиотека имени Ленина");

library.addBook(new DetectiveBook("Артур Конан Дойл", "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе", 2019, 1008));
library.addBook(new FantasticBook("Аркадий и Борис Стругацкие", "Пикник на обочине", 1972, 168));
library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
library.addBook(new Magazine("Мурзилка", 1924, 60));

console.log(library.findBookBy("name", "Властелин колец")); //null
console.log(library.findBookBy("releaseDate", 1924).name); //"Мурзилка"

console.log("Количество книг до выдачи: " + library.books.length); //Количество книг до выдачи: 4
library.giveBookByName("Машина времени");
console.log("Количество книг после выдачи: " + library.books.length); //Количество книг после выдачи: 3


//Задача 3
class Student {
    constructor(name) {
        this.name = name;
        this.marks = {};
    };

    addMark(grade, subject) {
        if ((1 <= grade && grade <= 5) && (typeof grade === 'number')) {
            if (this.marks.hasOwnProperty(subject) === false) {
                this.marks[subject] = [];
                this.marks[subject].push(grade);
            }
        } else {
            console.log(`Ошибка, оценка должна быть числом от 1 до 5`);
        };
    };

    getAverageBySubject(subject) {
        if (this.marks.hasOwnProperty(subject) === false) {
            console.log(`Несуществующий предмет`);
            return 0;
        } else {
            const sum = this.marks[subject].reduce(function(item, value) {
                return item + value;
            });
            console.log(`Средний балл по предмету ${subject} ${sum / this.marks[subject].length}`);
            return sum / this.marks[subject].length;
        };
    };

    getAverage() {
        if (Object.keys(this.marks).length > 0) {
            let sum = 0;
            for (const key in this.marks) {
                let value = this.getAverageBySubject(key);
                sum += value;
            };
            console.log(`Средний балл по всем предметам ${sum / Object.keys(this.marks).length}`);
            return sum / Object.keys(this.marks).length;
        } else {
            return 0;
        };
    };

    exclude(reason) {
        delete this.subject;
        delete this.marks;
        this.excluded = reason;
    };
};

const student = new Student("Олег Никифоров");
student.addMark(5, "algebra");
student.addMark(5, "algebra");
student.addMark(5, "geometry");
student.addMark(4, "geometry");
student.addMark(6, "geometry"); // "Ошибка, оценка должна быть числом от 1 до 5"
student.getAverageBySubject("geometry"); // Средний балл по предмету geometry 4.5
student.getAverageBySubject("biology"); // Несуществующий предмет
student.getAverage(); // Средний балл по всем предметам 4.75