function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Division by zero!";
    }
    return a / b;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        case '*': return multiply(num1, num2);
        case '/': return divide(num1, num2);
        default: return null;
    }
}

let currentInput = ""; // Current value being typed
let firstNumber = null; // First number of the operation
let secondNumber = null; // Second number of the operation
let operator = null; // Operator chosen
let isResultDisplayed = false; // Check if result is displayed

const display = document.querySelector(".display");

function updateDisplay(value) {
    display.textContent = value;
}

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        handleButtonClick(button.textContent);
    });
});

function handleButtonClick(buttonValue) {
    if (!isNaN(buttonValue)) { 
        // If it's a number
        if (isResultDisplayed) {
            currentInput = buttonValue;
            isResultDisplayed = false;
        } else {
            currentInput += buttonValue;
        }
        updateDisplay(currentInput);
    } else if (buttonValue === ".") {
        // Decimal point logic
        if (!currentInput.includes(".")) {
            currentInput += ".";
            updateDisplay(currentInput);
        }
    } else if (buttonValue === "C") {
        // Clear button logic
        currentInput = "";
        firstNumber = null;
        secondNumber = null;
        operator = null;
        updateDisplay("0");
    } else if (buttonValue === "←") {
        // Backspace button logic
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput || "0");
    } else if (["+", "-", "*", "/"].includes(buttonValue)) {
        // Operator button logic
        if (firstNumber === null) {
            firstNumber = parseFloat(currentInput);
            operator = buttonValue;
            currentInput = "";
        } else if (currentInput) {
            secondNumber = parseFloat(currentInput);
            firstNumber = operate(operator, firstNumber, secondNumber);
            operator = buttonValue;
            currentInput = "";
            updateDisplay(firstNumber);
        }
    } else if (buttonValue === "=") {
        // Equals button logic
        if (operator && currentInput) {
            secondNumber = parseFloat(currentInput);
            const result = operate(operator, firstNumber, secondNumber);
            updateDisplay(result);
            firstNumber = result;
            secondNumber = null;
            operator = null;
            currentInput = "";
            isResultDisplayed = true;
        }
    }
}

function roundResult(num) {
    return Math.round(num * 1000) / 1000;
}

function divide(a, b) {
    if (b === 0) {
        updateDisplay("Nice try! No dividing by 0!");
        return null;
    }
    return a / b;
}

document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (!isNaN(key)) {
        handleButtonClick(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
        handleButtonClick(key);
    } else if (key === "Enter" || key === "=") {
        handleButtonClick("=");
    } else if (key === "Backspace") {
        handleButtonClick("←");
    } else if (key === "Escape") {
        handleButtonClick("C");
    } else if (key === ".") {
        handleButtonClick(".");
    }
});