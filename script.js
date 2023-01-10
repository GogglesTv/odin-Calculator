"use strict";

const numbers = document.querySelectorAll(".number");
const display = document.querySelector(".input");

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
