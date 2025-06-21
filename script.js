// Grab Elements

const calculatorText = document.getElementById("calculator-text");
const clearBtn = document.getElementById("clear");
const deleteBtn = document.getElementById("delete");
const moduloBtn = document.getElementById("modulo");
const addBtn = document.getElementById("add");
const minusBtn = document.getElementById("minus");
const multiplyBtn = document.getElementById("multiply");
const divideBtn = document.getElementById("divide");
const equalsBtn = document.getElementById("equals");
const decimalBtn = document.getElementById("decimal");
const zeroBtn = document.getElementById("zero");
const oneBtn = document.getElementById("one");
const twoBtn = document.getElementById("two");
const threeBtn = document.getElementById("three");
const fourBtn = document.getElementById("four");
const fiveBtn = document.getElementById("five");
const sixBtn = document.getElementById("six");
const sevenBtn = document.getElementById("seven");
const eightBtn = document.getElementById("eight");
const nineBtn = document.getElementById("nine");

// Intializations

let currExpression = "0";
let resultText = false;

const numberConverter = {
    zero: "0",
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
}

const operationsConverter = {
    add: "+",
    minus: "-",
    multiply: "*",
    divide: "/",
    modulo: "%",
}

const numberBtns = [zeroBtn, oneBtn, twoBtn, threeBtn, fourBtn, fiveBtn, sixBtn,
    sevenBtn, eightBtn, nineBtn];
const operationBtns = [addBtn, minusBtn, multiplyBtn, divideBtn, moduloBtn];

// Add to Expression functions

function addNumberToExpression(id) {

    if (resultText) {
        currExpression = `${numberConverter[id]}`;
        resultText = false;
        updateText();
        return;
    }

    if (currExpression === "0" && numberConverter[id] === "0") {
        return;
    }

    if (currExpression === "0" && numberConverter[id] !== "0") {
        currExpression = numberConverter[id];
    }
    else {
        currExpression += numberConverter[id];
    }
    updateText();
}

function addOperatorToExpression(id) {

    resultText = false;

    if (currExpression.length === 0) {
        currExpression = "0";
    }

    const operators = /[+\-*/%]/;
    const end = currExpression.length - 1;

    // Lets you change operations if second number hasnt been added to expression
    // Its end-1 since the last char if operation included is a space

    if (operators.test(currExpression[end - 1]) && currExpression[end] === " ") {
        currExpression = currExpression.slice(0, end - 2) + ` ${operationsConverter[id]} `;
        updateText();
        return;
    }

    if (isValidOperation()) {
        operate();
    }

    if (operators.test(currExpression)) {
        if (/ [+\-*/%] /.test(currExpression)) {
            return;
        }
    }

    currExpression += ` ${operationsConverter[id]} `;
    updateText();
}

function addDecimal() {

    if (resultText) {
        currExpression = "0";
        resultText = false;
    }

    const operator = / [+\-*/%] /;

    if (operator.test(currExpression)) {
        let searchSection = currExpression;

        if (currExpression[0] === "-") {
            searchSection = currExpression.substring(1);
        }

        let operator = searchSection.search(/[+\-*/%]/);
        let sub2 = searchSection.substring(operator, currExpression.length);

        if (sub2.includes(".")) {
            return;
        }
        else {
            currExpression += "."
        }
    }
    else if (currExpression.includes(".")) {
        return;
    }
    else {

        if (currExpression === "0") {
            currExpression = "0."
        } else {
            currExpression += "."
        }
    }
    updateText();
}

// Operations 

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
        return;
    }
    return a / b;
}

function modulo(a, b) {
    if (b === 0) {
        return;
    }
    return a % b;
}

function isValidOperation() {

    // resultText = false;

    if (currExpression.length === 0) {
        return false;
    }

    const fullExpression = currExpression.split(" ");

    if (fullExpression.includes("") || fullExpression.length < 3 || fullExpression.includes(".")) {
        return false;
    }

    return true;
}

function operate() {

    if (!isValidOperation()) {
        return;
    }

    const fullExpression = currExpression.split(" ");
    const num1 = Number(fullExpression[0]);
    const operation = fullExpression[1];
    const num2 = Number(fullExpression[2]);

    switch (operation) {
        case "+":
            currExpression = String(parseFloat(add(num1, num2).toFixed(8)));
            break;
        case "-":
            currExpression = String(parseFloat(subtract(num1, num2).toFixed(8)));
            break;
        case "/":
            if (num2 === 0) {
                alert("Cannot Divide By Zero!")
                currExpression = "";
                updateText();
            }
            currExpression = String(parseFloat(divide(num1, num2).toFixed(8)));
            break;
        case "*":
            currExpression = String(parseFloat(multiply(num1, num2).toFixed(8)));
            break;
        case "%":
            if (num2 === 0) {
                alert("Cannot Modulo By Zero!")
                currExpression = "";
                updateText();
            }
            currExpression = String(parseFloat(modulo(num1, num2).toFixed(8)));
            break;
        default:
            console.log("ERROR");
            break;
    }
    updateText();
}

// Calculator helpers

function updateText() {
    if (currExpression === "") {
        calculatorText.textContent = 0;
    }
    else {
        calculatorText.textContent = `${currExpression}`;
    }
}

function clearExpression() {
    currExpression = "";
    resultText = false;
    updateText();
}

function deleteChar() {
    resultText = false;
    if (currExpression.length === 0) {
        return;
    }

    const end = currExpression.length - 1;


    if (currExpression[end] === " ") {
        currExpression = currExpression.slice(0, end - 2); // deletes operation
    }
    else if (currExpression[0] === "-" && currExpression.length === 2) {
        currExpression = ""; // gets rid of -ve number
    }
    else {
        currExpression = currExpression.slice(0, end); // deletes char
    }

    updateText();
}



// Event Listeners

numberBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => addNumberToExpression(e.target.id));
})

document.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") {
        const numberConverterFlipped = {
            "0": "zero",
            "1": "one",
            "2": "two",
            "3": "three",
            "4": "four",
            "5": "five",
            "6": "six",
            "7": "seven",
            "8": "eight",
            "9": "nine",
        };
        addNumberToExpression(numberConverterFlipped[e.key]);
    }
});

operationBtns.forEach((btn) => btn.addEventListener("click", (e) => addOperatorToExpression(e.target.id)));
clearBtn.addEventListener("click", clearExpression);
deleteBtn.addEventListener("click", deleteChar);
equalsBtn.addEventListener("click", () => {
    resultText = true;
    operate();
});
decimalBtn.addEventListener("click", addDecimal);