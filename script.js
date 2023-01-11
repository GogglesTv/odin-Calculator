"use strict";

const display = document.querySelector(".input");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const decimal = document.querySelector(".decimal");
const plusMinus = document.querySelector(".plusMinus");
const percentage = document.querySelector(".percentage");
const del = document.querySelector(".delete");
const clear = document.querySelector(".clear");

let displayValue = "0";
let value1 = "0";
let value2;
let result = 0;
let operate = "";

document.addEventListener("keyup", (e) => {
  if (parseInt(e.key) >= 0 && parseInt(e.key) <= 9) {
    if (typeof value1 === "number") {
      operators.forEach(function (operator) {
        if (operator.style.backgroundColor === "white") {
          operator.style.backgroundColor = "orange";
          operator.style.color = "white";
        }
      });
    }

    if (displayValue === "0") {
      displayValue = "";
      display.innerText = displayValue;
    }

    displayValue += e.key;
    display.innerText = displayValue;
  }

  if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
    if (typeof value1 === "number") {
      value2 = parseFloat(displayValue);
      if (operate === "+") add();
      if (operate === "-") subtract();
      if (operate === "*") multiply();
      if (operate === "/") divide();
    }

    operators.forEach(function (operator) {
      if (operator.dataset.operator === e.key) {
        operate = e.key;
        operator.style.backgroundColor = "white";
        operator.style.color = "orange";
      }
    });

    value1 = parseInt(displayValue);
    displayValue = "";
  }

  if (e.key === "Enter") {
    value2 = parseInt(displayValue);
    if (operate === "+") add();
    if (operate === "-") subtract();
    if (operate === "*") multiply();
    if (operate === "/") divide();

    operators.forEach(function (operator) {
      if (operator.style.backgroundColor === "white") {
        operator.style.backgroundColor = "orange";
        operator.style.color = "white";
      }
    });
  }

  if (e.key === ".") {
    if (display.innerText === "0") {
      displayValue += e.key;
      display.innerText = displayValue;
    } else if (!decimal.disabled) {
      displayValue += e.key;
      display.innerText = displayValue;
    }

    if (parseFloat(display.innerText) !== "0") {
      decimal.disabled = true;
    } else {
      decimal.disabled = false;
    }
  }

  if (e.key === "%") {
    moveDecimal(displayValue);
  }

  if (e.key === "Backspace") {
    if (displayValue !== "0") {
      displayValue = display.innerText.slice(0, -1);
      display.innerText = displayValue;
    }
  }
});

numbers.forEach(function (number) {
  number.addEventListener("click", function (e) {
    if (typeof value1 === "number") {
      operators.forEach(function (operator) {
        if (operator.style.backgroundColor === "white") {
          operator.style.backgroundColor = "orange";
          operator.style.color = "white";
        }
      });
      display.innerText = "";
      displayValue += e.target.dataset.num;
      display.innerText += displayValue;
    } else if (displayValue === "0") {
      displayValue = "";
      display.innerText = displayValue;
      displayValue += e.target.dataset.num;
      display.innerText += displayValue;
    } else {
      display.innerText = "";
      displayValue += e.target.dataset.num;
      display.innerText += displayValue;
    }
  });
});

operators.forEach(function (operator) {
  operator.addEventListener("click", function (e) {
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
    e.target.style.backgroundColor = "white";
    e.target.style.color = "orange";
    operators.forEach(function (operator) {
      if (operator.dataset.operator !== operate) {
        operator.style.backgroundColor = "orange";
        operator.style.color = "white";
      }
    });
  });
});

equals.addEventListener("click", function () {
  value2 = parseFloat(displayValue);
  if (operate === "+") add();
  if (operate === "-") subtract();
  if (operate === "*") multiply();
  if (operate === "/" && !value2 === 0) {
    divide();
  } else if (operate === "/" && value2 === 0) {
    display.innerText = `Are you blind?`;
    display.style.fontSize = "56px";
  }
});

decimal.addEventListener("click", (e) => {
  if (parseFloat(display.innerText) !== "0") {
    decimal.disabled = true;
  } else {
    decimal.disabled = false;
  }

  if (display.innerText === "0") {
    displayValue += 0;
    displayValue += e.target.dataset.decimal;
    display.innerText = displayValue;
  } else {
    displayValue += e.target.dataset.decimal;
    display.innerText = displayValue;
  }
});

plusMinus.addEventListener("click", () => {
  let j = parseFloat(displayValue) * -1;
  displayValue = j.toString();
  display.innerText = displayValue;
});

percentage.addEventListener("click", () => {
  moveDecimal(displayValue);
});

del.addEventListener("click", () => {
  if (displayValue !== "0") {
    displayValue = display.innerText.slice(0, -1);
    display.innerText = displayValue;
  }
});

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

function add() {
  result = value1 + value2;
  displayValue = result;
  display.innerText = displayValue;
}

function subtract() {
  result = value1 - value2;
  displayValue = result;
  display.innerText = displayValue;
}

function divide() {
  result = value1 / value2;
  displayValue = result;
  display.innerText = displayValue;
}

function multiply() {
  result = value1 * value2;
  displayValue = result;
  display.innerText = displayValue;
}

function moveDecimal(n) {
  let x = parseInt(n);
  displayValue = (x / 100).toString();
  display.innerText = displayValue;
}
