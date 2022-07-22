"use strict";
const billInput = document.querySelector(".bill-input");
const peopleInput = document.querySelector(".people-input");
const tip = document.querySelectorAll(".tip");
const customInput = document.querySelector(".custom-input");
const resetBtn = document.querySelector(".reset-btn");
const error = document.querySelector(".err");

billInput.value = 0.0;
peopleInput.value = 1;
tip.value = 0.15;
customInput.value = "";

billInput.addEventListener("input", billInputNum);
peopleInput.addEventListener("input", peopleInputNum);
customInput.addEventListener("input", customInputNum);
resetBtn.addEventListener("click", reset);

function billInputNum() {
  parseFloat(billInput.value);
  calculateTip();
}

function peopleInputNum() {
  parseFloat(peopleInput.value);
  calculateTip();

  if (peopleInput.value < 1) {
    $(".err").css("visibility", "visible");
  } else {
    $(".err").css("visibility", "hidden");
  }
}

function customInputNum() {
  parseFloat(customInput.value / 100);
  tip.forEach(function (val) {
    val.classList.remove("active");
    tip.value = customInput.value / 100;
  });
  calculateTip();
}

tip.forEach(function (value) {
  value.addEventListener("click", clickbtn);
});

function clickbtn(e) {
  tip.forEach(function (val) {
    val.classList.remove("active");
    if (e.target.innerHTML == val.innerHTML) {
      val.classList.add("active");
      tip.value = parseFloat(val.innerHTML) / 100;
      customInput.value = "";
    }
  });
  calculateTip();
}

function calculateTip() {
  if (peopleInput.value >= 1) {
    let tipAmount = (billInput.value * tip.value) / peopleInput.value;
    let total = (billInput.value * tipAmount) / peopleInput.value;

    $(".tip-number").text(`$${tipAmount.toFixed(2)}`);
    $(".total-number").text(`$${total.toFixed(2)}`);
  }
}

function reset() {
  billInput.value = 0.0;
  peopleInput.value = 1;
  tip.value = 0.0;
  customInput.value = "";
  $(".tip-number").text(`$0.00`);
  $(".total-number").text(`$0.00`);
  customInputNum();
  peopleInputNum();
}
