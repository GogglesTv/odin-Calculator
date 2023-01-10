"use strict";

const numbers = document.querySelectorAll(".number");
const decimal = document.querySelector(".decimal");
const plusMinus = document.querySelector(".plusMinus");
const percentage = document.querySelector(".percentage");
const display = document.querySelector(".input");
const del = document.querySelector(".delete");
const clear = document.querySelector(".clear");

let displayValue = "0";

numbers.forEach(function (number) {
  number.addEventListener("click", function (e) {
    if (displayValue === "0") {
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
});

function moveDecimal(n) {
  let x = parseInt(n);
  displayValue = (x / 100).toString();
  display.innerText = displayValue;
}
