"use strict";

const btn = document.querySelectorAll(".btn");

const inputs = document.querySelectorAll("input");
const error = document.querySelector(".error");
const inputPeople = document.querySelector(".people");
const inputBill = document.querySelector(".bill");
const inputTip = document.querySelector(".tip");
const inputAmount = document.querySelector(".amount");
const inputTotal = document.querySelector(".total");
const reset = document.querySelector(".reset");
let tipAmount;
let tipTotal;
let tip;
let bill;
let people;
inputAmount.textContent = "$0.00";
inputTotal.textContent = "$0.00";

class App {
  constructor() {
    this._changeButton();

    inputs.forEach((input) => {
      input.addEventListener("change", this._calculateTip);
    });
    inputTip.addEventListener("click", this._disableBtn);
    reset.addEventListener("click", this._reset);
  }
  //calculate tip with select tip input
  _changeButton() {
    btn.forEach((btnSelect) => {
      btnSelect.addEventListener("click", function () {
        btn.forEach((btnSelected) => {
          btnSelected.classList.remove("selected-btn");
          btnSelected.classList.add("btn");
        });
        inputTip.value = "";
        tip = btnSelect.textContent.trim().replace("%", "") / 100;
        btnSelect.classList.remove("btn");
        btnSelect.classList.add("selected-btn");

        if (bill && tip && people) {
          tipAmount = (bill * tip) / people;

          tipTotal = tipAmount + bill / people;
          inputAmount.textContent = `$${tipAmount.toFixed(2)}`;
          inputTotal.textContent = `$${tipTotal.toFixed(2)}`;
        }
      });
    });
  }
  //calculate tip with custom tip input
  _calculateTip() {
    if (!isFinite(inputPeople.value) || inputPeople.value <= 0) {
      error.classList.remove("hidden");
    } else {
      error.classList.add("hidden");
    }

    bill = +inputBill.value;
    people = +inputPeople.value;
    if (inputTip.value) {
      tip = +inputTip.value / 100;
    }

    if (bill && tip && people) {
      tipAmount = (bill * tip) / people;
      tipTotal = tipAmount + bill / people;
      inputAmount.textContent = `$${tipAmount.toFixed(2)}`;
      inputTotal.textContent = `$${tipTotal.toFixed(2)}`;
    }
  }
  //reset values
  _reset() {
    bill = "";
    people = "";
    tip = "";
    inputBill.value = "";
    inputPeople.value = "";
    inputTip.value = "";
    inputAmount.textContent = "$0.00";
    inputTotal.textContent = "$0.00";
    btn.forEach((btnSelected) => {
      btnSelected.classList.remove("selected-btn");
      btnSelected.classList.add("btn");
    });
  }
  //method for selecting custom input
  _disableBtn() {
    btn.forEach((btnSelected) => {
      btnSelected.classList.remove("selected-btn");
      btnSelected.classList.add("btn");
    });
  }
}

const app = new App();
