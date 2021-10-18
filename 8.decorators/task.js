function cachingDecoratorNew(func) {
    let cache = [];

    function wrapper(...args) {
        const hash = args.join(',');
        let idx = cache.findIndex((item) => item.hash === hash);
        if (idx !== -1) {
            console.log("Из кэша: " + cache[idx].result);
            return "Из кэша: " + cache[idx].result;
        };
        let result = func(...args);
        cache.push({ hash, result });
        if (cache.length > 5) {
            cache.shift();
        };
        console.log("Вычисляем: " + result);
        return "Вычисляем: " + result;
    };
    return wrapper;
};
const addThree = (a, b, c) => a + b + c;
const upgradedAddThree = cachingDecoratorNew(addThree);
upgradedAddThree(1, 2, 3); // вычисляем: 6
upgradedAddThree(1, 2, 3); // из кэша: 6
upgradedAddThree(2, 2, 3); // вычисляем: 7
upgradedAddThree(3, 2, 3); // вычисляем: 8
upgradedAddThree(4, 2, 3); // вычисляем: 9
upgradedAddThree(5, 2, 3); // вычисляем: 10
upgradedAddThree(6, 2, 3); // вычисляем: 11   (при этом кэш для 1, 2, 3 уничтожается)
upgradedAddThree(1, 2, 3); // вычисляем: 6  (снова вычисляем, кэша нет)

function debounceDecoratorNew(func, ms) {
    let timeout;
    let flag = false;

    function wrapper(...rest) {
        clearTimeout(timeout);
        if (!flag) {
            func.apply(this, rest);
        };
        flag = true;
        timeout = setTimeout(() => {
            func.apply(this, rest);
        }, ms);
    };
    return wrapper;
};

function debounceDecorator2(func, ms) {
    wrapper.count = 0;
    let timeout;
    let flag = false;

    function wrapper(...rest) {
        clearTimeout(timeout);
        if (!flag) {
            func.apply(this, rest);
            wrapper.count++;
        };
        flag = true;
        timeout = setTimeout(() => {
            func.apply(this, rest);
            wrapper.count++;
        }, ms);
    };
    return wrapper;
};

const sendSignal = () => console.log("Сигнал отправлен");
const upgradedSendSignal = debounceDecoratorNew(sendSignal, 2000);
setTimeout(upgradedSendSignal); // Сигнал отправлен
setTimeout(upgradedSendSignal, 300); // проигнорировано так как от последнего вызова прошло менее 2000мс
setTimeout(upgradedSendSignal, 900); // проигнорировано аналогично
setTimeout(upgradedSendSignal, 1200); // проигнорировано аналогично
setTimeout(upgradedSendSignal, 2300); // проигнорировано аналогично
setTimeout(upgradedSendSignal, 4400); // Сигнал отправлен
setTimeout(upgradedSendSignal, 4500); // проигнорировано аналогично