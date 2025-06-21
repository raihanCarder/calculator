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

let currExpression = "";

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
    currExpression += numberConverter[id];
    console.log(currExpression);
}

function addOperatorToExpression(id) {

    if (currExpression.length === 0) {
        currExpression = "0";
    }

    const operators = /[+\-*/%]/;
    const end = currExpression.length - 1;

    // Lets you change operations if second number hasnt been added to expression
    // Its end-1 since the last char if operation included is a space

    if (operators.test(currExpression[end - 1]) && currExpression[end] === " ") {
        currExpression = currExpression.slice(0, end - 2) + ` ${operationsConverter[id]} `;

        // test

        console.log(currExpression);
        console.log("changed sign");
        return;
    }

    if (operators.test(currExpression)) {
        if (/ [+\-*/%] /.test(currExpression)) {
            return;
            //later on check if valid input if so then evaluate
        }
    }

    currExpression += ` ${operationsConverter[id]} `;

    // testing
    console.log(currExpression);
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
        alert("Cannot Divide By Zero!")
        currExpression = "";
        return;
    }
    return a / b;
}

function modulo(a, b) {
    return a % b;
}

function isValidOperation() {

    if (currExpression.length === 0) {
        return false;
    }

    const fullExpression = currExpression.split(" ");

    if (fullExpression.includes("") || fullExpression.length < 3) {
        return false;
    }

    return true;
}

function operate() {

    if (!isValidOperation()) {
        return;
    }

    const fullExpression = currExpression.split(" ");

    console.log(fullExpression);

    const num1 = Number(fullExpression[0]);
    const operation = fullExpression[1];
    const num2 = Number(fullExpression[2]);

    switch (operation) {
        case "+":
            currExpression = String(add(num1, num2));
            break;
        case "-":
            currExpression = String(subtract(num1, num2));
            break;
        case "/":
            currExpression = String(divide(num1, num2));
            break;
        case "*":
            currExpression = String(multiply(num1, num2));
            break;
        case "%":
            currExpression = String(modulo(num1, num2));
            break;
        default:
            console.log("ERROR");
            break;
    }

    // if (operation === "/") {
    //     currExpression = String(divie(num1, num2));
    // }
    // else uf(operation === "*"){
    //     currExpression = String
    // }

    console.log(currExpression);
}


// Calculator helpers

function clearExpression() {
    currExpression = "";

    //testing

    console.log(currExpression);
}

function deleteChar() {

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



    //test
    console.log(currExpression);
}



// Event Listeners
numberBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => addNumberToExpression(e.target.id));
})

operationBtns.forEach((btn) => btn.addEventListener("click", (e) => addOperatorToExpression(e.target.id)));

clearBtn.addEventListener("click", clearExpression);
deleteBtn.addEventListener("click", deleteChar);
equalsBtn.addEventListener("click", () => operate());