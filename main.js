// Glboal variable for tip
let tip;

// Variables
const billInput = document.querySelector(".bill__input");
const peopleInput = document.querySelector(".people__input");

const individualTip = document.querySelector(".conclusion__tip-person");
const individualTotal = document.querySelector(".conclusion__total-person");

const reset = document.querySelector(".conclusion__reset");
const buttons = document.querySelectorAll(".select-tip__button");

const customInput = document.querySelector(".custom");

// Function to pick percentage value from Custom input
function custom() {
  tip = customInput.value;
  updateBill();
}

// Function to pick percentage values from respective buttons using dataset (data-tip)
function percentage() {
  // tip = this.innerText
  customInput.value = "";
  tip = +this.dataset.tip;
  updateBill();
}

buttons.forEach((button) => {
  button.addEventListener("click", percentage);
});

// Function for calculation and displaying correct result using correct styles
function updateBill() {
  reset.style.backgroundColor = "#26c2ae";

  let tipPerson = ((+billInput.value / 100) * tip) / +peopleInput.value;
  let totalPerson = billInput.value / peopleInput.value + tipPerson;
  if (tip) {
    individualTip.textContent = "$" + tipPerson.toFixed(2);
    individualTotal.textContent = "$" + totalPerson.toFixed(2);
  } else if (!tip) {
    individualTip.textContent = "$0.00";
    individualTotal.textContent =
      "$" + (billInput.value / peopleInput.value).toFixed(2);
  }
  // Setting zero to individualTotal if peopleInput is zero so there is no NaN message in individualTotal textContent and setting error styles
  if (peopleInput.value === "0") {
    individualTotal.textContent = "$0.00";
    document.querySelector(".error-people__msg").style.display = "block";
    document.querySelector(".people__input").style.borderColor = "#e17457";
  }

  // Removing error styles if peopleInput is anything but zero
  else if (peopleInput.value !== "0") {
    document.querySelector(".error-people__msg").style.display = "none";
    document.querySelector(".people__input").style.borderColor = "transparent";

    // If tip amount is picked and peopleInput is empty, results are calculated for just one person
    if (peopleInput.value === "" && tip) {
      individualTip.textContent =
        "$" + ((+billInput.value / 100) * tip).toFixed(2);
      individualTotal.textContent =
        "$" + (+billInput.value + (+billInput.value / 100) * tip).toFixed(2);
    }

    // If peopleInput is empty an there is no tip, only total result is calculated for just one person
    else if (peopleInput.value === "" && !tip) {
      individualTip.textContent = "$0.00";
      individualTotal.textContent = "$" + (+billInput.value).toFixed(2);
    }
  }

  // If either value is less than zero, no results are calculated
  if (parseFloat(peopleInput.value) <= 0 && parseFloat(billInput.value) > 0) {
    individualTip.textContent = "$0.00";
    individualTotal.textContent = "$0.00";
  } else if (parseFloat(billInput.value) < 0) {
    individualTip.textContent = "$0.00";
    individualTotal.textContent = "$0.00";
  }
}

// Simple reset button
function resetCalc() {
  individualTip.textContent = "$0.00";
  individualTotal.textContent = "$0.00";
  billInput.value = "";
  peopleInput.value = "";
  customInput.value = "";
  reset.style.backgroundColor = "#0d686d";
}

reset.addEventListener("click", resetCalc);
