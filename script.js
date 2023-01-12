"use strict";

// Selected display and button elements
const display = document.querySelector(".input");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const decimal = document.querySelector(".decimal");
const plusMinus = document.querySelector(".plusMinus");
const percentage = document.querySelector(".percentage");
const del = document.querySelector(".delete");
const clear = document.querySelector(".clear");

// Initial variable values
let displayValue = "0";
let value1 = "0";
let value2;
let result = 0;
let operate;

document.addEventListener("keyup", (e) => {
  // Checks to see if a number key is pressed
  if (parseInt(e.key) >= 0 && parseInt(e.key) <= 9) {
    // Executed if the first value is locked in
    if (typeof value1 === "number") {
      operators.forEach(function (operator) {
        if (operator.style.backgroundColor === "white") {
          operator.style.backgroundColor = "orange";
          operator.style.color = "white";
        }
      });
    }
    // If displayValue = '0' the zero is removed before adding number selected
    else if (displayValue === "0") {
      displayValue = "";
      display.innerText = displayValue;
    }
    // Adds number to end of displayValue
    displayValue += e.key;
    display.innerText = displayValue;
  }

  // Checks to see if an operator key has been selected
  if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
    // Executed if the first value is locked in
    if (typeof value1 === "number") {
      value2 = parseFloat(displayValue);
      if (operate === "+") add();
      if (operate === "-") subtract();
      if (operate === "*") multiply();
      if (operate === "/") divide();
    }

    // Once operator selected it is highlighted
    operators.forEach(function (operator) {
      // Inverts the colors of the operator selected
      if (operator.dataset.operator === e.key) {
        operate = e.key;
        operator.style.backgroundColor = "white";
        operator.style.color = "orange";
      }
    });

    value1 = parseFloat(displayValue);
    displayValue = "";
  }

  // Executes the operation of the selected operator
  if (e.key === "Enter") {
    value2 = parseFloat(displayValue);
    if (operate === "+") add();
    if (operate === "-") subtract();
    if (operate === "*") multiply();
    if (operate === "/") divide();

    // Resets styling for selected operator
    operators.forEach(function (operator) {
      if (operator.style.backgroundColor === "white") {
        operator.style.backgroundColor = "orange";
        operator.style.color = "white";
      }
    });
  }

  // Inserts a decimal at the end of the displayValue
  if (e.key === ".") {
    // Makes sure that displayValue doesn't already have a decimal
    if (!displayValue.includes(".")) {
      displayValue += e.key;
      display.innerText = displayValue;
    }
  }

  // Executes function that returns the percentage of displayValue out of 100
  if (e.key === "%") {
    moveDecimal(displayValue);
  }

  // Deletes the last digit in the displayValue
  if (e.key === "Backspace") {
    if (displayValue !== "0") {
      displayValue = display.innerText.slice(0, -1);
      display.innerText = displayValue;
    }
  }

  // Clears and resets all data
  if (e.key === "c") {
    displayValue = "0";
    display.innerText = displayValue;
    value1 = "0";
    value2;
    result = 0;
    operate = "";
    decimal.disabled = false;
    operators.forEach(function (operator) {
      operator.style.backgroundColor = "orange";
      operator.style.color = "white";
    });
  }
});

// Executes when a number button has been clicked
numbers.forEach(function (number) {
  number.addEventListener("click", function (e) {
    // Executed if the first value is locked in
    if (typeof value1 === "number") {
      // Resets operator styling if operator is selected
      operators.forEach(function (operator) {
        if (operator.style.backgroundColor === "white") {
          operator.style.backgroundColor = "orange";
          operator.style.color = "white";
        }
      });
      display.innerText = "";
      displayValue += e.target.dataset.num;
      display.innerText += displayValue;
    }
    // If displayValue = '0' the zero is removed before adding number selected
    else if (displayValue === "0") {
      displayValue = "";
      display.innerText = displayValue;
      displayValue += e.target.dataset.num;
      display.innerText += displayValue;
    }
    // Adds number to end of displayValue
    else {
      display.innerText = "";
      displayValue += e.target.dataset.num;
      display.innerText += displayValue;
    }
  });
});

// Executes when a operator button has been clicked
operators.forEach(function (operator) {
  operator.addEventListener("click", function (e) {
    // Executed if the first value is locked in
    if (typeof value1 === "number") {
      value2 = parseFloat(displayValue);
      if (operate === "+") add();
      if (operate === "-") subtract();
      if (operate === "*") multiply();
      if (operate === "/") divide();
    }

    value1 = parseFloat(displayValue);
    operate = e.target.dataset.operator;
    displayValue = "";

    // Inverts the colors of the operator selected
    e.target.style.backgroundColor = "white";
    e.target.style.color = "orange";
  });
});

// Executes the operation of the selected operator
equals.addEventListener("click", function () {
  value2 = parseFloat(displayValue);
  if (operate === "+") add();
  if (operate === "-") subtract();
  if (operate === "*") multiply();
  if (operate === "/" && !value2 === 0) {
    divide();
  }
  // Displays a snarky remark if user tries to divide by zero
  else if (operate === "/" && value2 === 0) {
    display.innerText = `Are you blind?`;
    display.style.fontSize = "56px";
  }
});

// Inserts a decimal at the end of the displayValue
decimal.addEventListener("click", (e) => {
  // Makes sure that displayValue doesn't already have a decimal
  if (!displayValue.includes(".")) {
    displayValue += e.target.dataset.decimal;
    display.innerText = displayValue;
  }
});

// Makes displayValue negative or positive when '+/-' button is clicked
plusMinus.addEventListener("click", () => {
  let j = parseFloat(displayValue) * -1;
  displayValue = j.toString();
  display.innerText = displayValue;
});

// Executes function that returns the percentage of displayValue out of 100
percentage.addEventListener("click", () => {
  moveDecimal(displayValue);
});

// Deletes the last digit in the displayValue unless the last digit is 0
del.addEventListener("click", () => {
  if (displayValue !== "0") {
    displayValue = display.innerText.slice(0, -1);
    display.innerText = displayValue;
  }
});

// Clears and resets all data
clear.addEventListener("click", () => {
  displayValue = "0";
  display.innerText = displayValue;
  value1 = "0";
  value2;
  result = 0;
  operate = "";
  decimal.disabled = false;
  operators.forEach(function (operator) {
    operator.style.backgroundColor = "orange";
    operator.style.color = "white";
  });
});

// Executes when '+' operator has been selected
function add() {
  result = value1 + value2;
  displayValue = result;
  display.innerText = displayValue;
}

// Executes when '-' operator has been selected
function subtract() {
  result = value1 - value2;
  displayValue = result;
  display.innerText = displayValue;
}

// Executes when '/' operator has been selected
function divide() {
  result = value1 / value2;
  displayValue = result;
  display.innerText = displayValue;
}

// Executes when '*' operator has been selected
function multiply() {
  result = value1 * value2;
  displayValue = result;
  display.innerText = displayValue;
}

// Executes when decimal button/key has been clicked/pressed
function moveDecimal(n) {
  let x = parseInt(n);
  displayValue = (x / 100).toString();
  display.innerText = displayValue;
}
