let operatorCalled = false; //initialize operator switch
let midEquation = false; //lets operators/calc button know if they should calculate answer if user is mid equation
let x, y, currentOperator, baseLength, isExponent;
const maxDigits = 7; //display caps at 7 characters (then rounds decimals or goes to scientific notation)

const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');

function add(x,y) {return +x + +y}; //turn strings into numbers so they don't concat
function subtract(x,y) {return x-y};
function multiply(x,y) {return x*y};
function divide(x,y) {return (y==='0') ? 'Error':x/y;}; //can't divide by 0
function operate(x,operator,y) {return window[operator.id](x,y)};

buttons.forEach(btn => btn.addEventListener('click', e => updateDisplay(e.target)));

window.addEventListener('keydown', e => {
    let btn = document.getElementById(e.key); //gets button with matching id
    if (btn) updateDisplay(btn); //updateDisplay function requires the button's DOM element as the input (if btn isn't null)
});

function calc() {
    y = display.textContent;
    x = operate(x,currentOperator,y);
    if (x==='Error') {
        display.textContent = x;
        return; //end the calc if there's an error
    }
    baseLength = Math.floor(x).toString().length; //length of main number (without decimals)

    x = (baseLength > maxDigits) ? x.toExponential(2):x = Number(x.toFixed(maxDigits-baseLength));
    //caps number of digits on screen at 7, deletes trailing zeros, or makes result scientific notation

    display.textContent = x;
    operatorCalled = false;
    midEquation = false;
}

function setOperator(btn) {
    operatorCalled = true;
    currentOperator = btn;
    btn.classList.add('activated');
}

function updateDisplay(btn) {
    if (btn.classList.contains('number')) {
        if (!operatorCalled) {
            if (display.textContent.toString().length >= maxDigits) return; //can't type more than 7 characters
            if (display.textContent === '0') {
                display.textContent = btn.textContent; //if display shows only a 0 then it gets replaced by next digit
            } else {
                display.textContent += btn.textContent; //concat next digit to display if not 0
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
            setOperator(btn);
        } else {
            if (operatorCalled) {
                currentOperator.classList.remove('activated');
                setOperator(btn);
            } else {
                setOperator(btn);
            }
        }
    }
    if (btn.classList.contains('equals')) {
        if (midEquation) calc();
    }
    if (btn.classList.contains('clear')) {
        if (currentOperator) currentOperator.classList.remove('activated');
        x = y = currentOperator = undefined;
        operatorCalled = midEquation = false;
        display.textContent = '0';
    }
    if (btn.classList.contains('plusminus')) {
        if (display.textContent.includes('e')) isExponent = true;
        display.textContent *= -1;
        if (isExponent) {
            display.textContent = Number(display.textContent).toExponential(2);
            isExponent = false;
        }
    }
    if (btn.classList.contains('decimal')) {
        if (!display.textContent.includes('.')) display.textContent += '.';
    }
};