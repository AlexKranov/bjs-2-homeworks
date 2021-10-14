class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.timerId = null;
    };
    addClock(time, callback, id) {
        if (id === undefined) {
            throw new Error('error text');
        };
        if (this.alarmCollection.some(alarm => alarm.id === id)) {
            console.error('Идентификатор уже сущесвтует');
        } else {
            this.alarmCollection.push({ id, time, callback });
        };
    };
    removeClock(id) {
        this.alarmCollection = this.alarmCollection.filter(arr => arr.id !== id);
    };
    getCurrentFormattedTime() {
        return new Date().toTimeString().slice(0, 5);
    };
    start() {
        let checkClock = (alarm) => {
            if (alarm.time == this.getCurrentFormattedTime()) {
                alarm.callback();
            }
        }
        if (!this.timerId) {
            let result = setInterval(() => this.alarmCollection.forEach(item => checkClock(item)), 1000);
            this.timerId = result;
        }
    }
    stop() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }
    printAlarms() {
        console.log('Печать всех будильников в количестве: ' + this.alarmCollection.length)
        this.alarmCollection.forEach(function(item) {
            console.log('Будильник №' + item.id + ' заведен на ' + item.time)
        })
    }
    clearAlarms() {
        this.stop();
        this.alarmCollection.splice(0, this.alarmCollection.length);
    }
}

function testCase() {
    let clock = new AlarmClock();
    phoneAlarm.addClock(clock.getCurrentFormattedTime(), () => console.log('Пора вставать'), 1);
    clock.addClock("20:32", () => {
        console.log('Пора вставать!');
        clock.removeClock(2)
    }, 2);
    clock.addClock("20:33", () => console.log('Давай, вставай уже'), 3);
    clock.printAlarms();
    clock.start();
}