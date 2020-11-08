const numbers = document.querySelectorAll('.number');
const operation = document.querySelectorAll('.operator');
const clearBtns = document.querySelectorAll('.clear-btn');
const btnDecimal = document.getElementById('decimal');
const result = document.getElementById('result');
const display = document.getElementById('display');
let plusMinus = document.getElementById('plus-minus');
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false; 
let MemoryPendingOperation = '';

for (let i=0; i < numbers.length; i++){
    let number = numbers[i];
    number.addEventListener('click', (e) => {
        numberPress(e.target.textContent);
    });
};

for (let i=0; i < operation.length; i++){
    let operationBtn = operation[i];
    operationBtn.addEventListener('click', (e) => {   
        operations(e.target.textContent);
    });
};

for (let i=0; i < clearBtns.length; i++){
    let clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', (e) => {
        clear(e.srcElement.id);
    });
};

btnDecimal.addEventListener('click', decimalPoint);

plusMinus.addEventListener("click", function (e) {
    plusMinusFunc(e.target.outerText);
    console.log(e.target.outerText);
});

function numberPress(number) {
    if (MemoryNewNumber) {
        display.value = number;
        MemoryNewNumber = false;
    } else {
        if (display.value === '0' || display.value ==='Error'){
            if (number !== "0") {
                display.value = number;
            };
        } else {
            display.value += number;
        };
    };
};

function operations(opers) {
    let localOperationMemory = display.value;
    
    if (opers === '√х'){
        if (+localOperationMemory < 0){
            return display.value = 'Error';
        } else {
            return display.value =  +Math.round(Math.sqrt(+display.value) * 1000000) / 1000000; 
        }
    } else {
        if (
            MemoryNewNumber && 
            MemoryPendingOperation !== '=' &&
            MemoryPendingOperation !== "+/-" &&
            opers !== '√х'
        ){
            display.value = +Math.round(MemoryCurrentNumber * 1000000) / 1000000
        } else {
            MemoryNewNumber = true;
            if (MemoryPendingOperation === '+'){
                MemoryCurrentNumber += +localOperationMemory;
            } else if (MemoryPendingOperation === '-') {
                MemoryCurrentNumber -= +localOperationMemory;
            } else if (MemoryPendingOperation === '×') {
                MemoryCurrentNumber *= +localOperationMemory;
            } else if (MemoryPendingOperation === '÷'){
                MemoryCurrentNumber /= +localOperationMemory;
            } else if(MemoryPendingOperation === 'xn'){
                MemoryCurrentNumber **= +localOperationMemory;
            } else {
                MemoryCurrentNumber = +localOperationMemory;
            };
            display.value = MemoryCurrentNumber;
            MemoryPendingOperation = opers;
        };
    };
    display.value = +Math.round(MemoryCurrentNumber * 1000000) / 1000000;
};

function plusMinusFunc(sign) {
    if (+display.value > 0) {
        display.value = +display.value * -1;
    } else {
        display.value = +display.value * -1;
    }
    MemoryNewNumber = false;
};

function decimalPoint() {
    let localDecimalMemory = display.value; 
    if(MemoryNewNumber){
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if(localDecimalMemory.indexOf('.') === -1 ){
            localDecimalMemory += '.';
        };    
    };
    display.value = localDecimalMemory;
};

function clear(id) {
    if(id === 'ce') {
        display.value = '0';
        MemoryNewNumber = true; 
    } else if(id === 'c'){
        display.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    };
};
