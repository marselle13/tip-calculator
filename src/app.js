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
inputAmount.textContent = "0.0";
inputTotal.textContent = "0.0";

class App {
  constructor() {
    this._changeButton();

    inputs.forEach((input) => {
      input.addEventListener("change", this._calculateTip);
    });
    inputTip.addEventListener("click", this._disableBtn);
    reset.addEventListener("click", this._reset);
  }

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
          console.log(tipAmount);
          tipTotal = tipAmount + bill;
          inputAmount.textContent = tipAmount.toFixed(2);
          inputTotal.textContent = tipTotal.toFixed(2);
        }
      });
    });
  }
  _disableBtn() {
    btn.forEach((btnSelected) => {
      btnSelected.classList.remove("selected-btn");
      btnSelected.classList.add("btn");
    });
  }

  _calculateTip() {
    bill = +inputBill.value;
    people = +inputPeople.value;
    if (inputTip.value) {
      tip = +inputTip.value / 100;
    }

    if (bill && tip && people) {
      tipAmount = (bill * tip) / people;
      console.log(tipAmount);
      tipTotal = tipAmount + bill;

      inputAmount.textContent = tipAmount.toFixed(2);
      inputTotal.textContent = tipTotal.toFixed(2);
    }
  }

  _reset() {
    inputBill.value = "";
    inputPeople.value = "";
    inputTip.value = "";
    inputAmount.textContent = "0.0";
    inputTotal.textContent = "0.0";
    btn.forEach((btnSelected) => {
      btnSelected.classList.remove("selected-btn");
      btnSelected.classList.add("btn");
    });
  }
}

const app = new App();
