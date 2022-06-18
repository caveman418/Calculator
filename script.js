let operatorCalled = false; //initialize operator switch
let midEquation = false; //lets operators/calc button know if they should calculate answer if user is mid equation
let x, y, currentOperator, baseLength; //initialize both sides of equation and current operator and baselength of number
const maxDigits = 7; //display caps at 7 characters (then rounds decimals or goes to scientific notation)

const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');

function add(x,y) {return +x + +y}; //turn strings into numbers so they don't concat
function subtract(x,y) {return x-y};
function multiply(x,y) {return x*y};
function divide(x,y) {return (y==='0') ? 'Error':x/y;};
function operate(x,operator,y) {return window[operator.id](x,y)};

buttons.forEach(btn => btn.addEventListener('click', e => updateDisplay(e.target)));

function calc() {
    y = display.textContent;
    x = operate(x,currentOperator,y);
    baseLength = Math.floor(x).toString().length; //length of main number (without decimals)

    x = (baseLength > maxDigits) ? x.toExponential(2):x = Number(x.toFixed(maxDigits-baseLength));
    //caps number of digits on screen at 7, deletes trailing zeros, or makes result scientific notation

    display.textContent = x;
    operatorCalled = false;
    midEquation = false;
}

function updateDisplay(btn) {
    if (btn.classList.contains('number')) {
        if (!operatorCalled) {
            if (display.textContent.toString().length >= maxDigits) return;
            if (display.textContent === '0') {
                display.textContent = btn.textContent;
            } else {
                display.textContent += btn.textContent;
            }
        } else {
            operatorCalled = false;
            midEquation = true;
            currentOperator.classList.remove('activated');
            x = display.textContent;
            display.textContent = btn.textContent;
        }
    }
    if (btn.classList.contains('operator')) {
        if (midEquation) {
            calc();
            operatorCalled = true;
            currentOperator = btn;
            btn.classList.add('activated');
        } else {
            if (operatorCalled) {
                currentOperator.classList.remove('activated');
                currentOperator = btn;
                btn.classList.add('activated');
            } else {
                operatorCalled = true;
                currentOperator = btn;
                btn.classList.add('activated');
            }
        }
    }
    if (btn.classList.contains('equals')) {
        if (midEquation) {
            calc();
        }
    }
    if (btn.classList.contains('clear')) {
        currentOperator.classList.remove('activated');
        x = y = currentOperator = undefined;
        operatorCalled = midEquation = false;
        display.textContent = '0';
    }
    if (btn.classList.contains('plusminus')) {
        display.textContent *= -1;
    }
    if (btn.classList.contains('decimal')) {
        if (!display.textContent.includes('.')) {
            display.textContent += '.';
        }
    }
};