import { updateByTraffic } from "./calculator.js";

import { removeSpacesFromNumber, formatNumber } from "./formatNumbers.js";

const rangeWrapper = document.querySelector(".range-slider");
const range = rangeWrapper.querySelector("input");
const inputNumber = document.getElementById("traffic");

updateByTraffic(range.value);

range.addEventListener("input", () => {
	rangeWrapper.style.setProperty("--value", range.value);
});

range.addEventListener("change", () => {
	inputNumber.value = formatNumber(range.value);
	updateByTraffic(range.value);
});

inputNumber.addEventListener("input", () => {
	let newValue = removeSpacesFromNumber(inputNumber.value);

	if (isNaN(newValue)) {
		newValue = 0;
	}

	if (newValue > range.max) {
		newValue = range.max;
	}

	inputNumber.value = formatNumber(newValue);

	range.value = newValue;
	rangeWrapper.style.setProperty("--value", newValue);
	updateByTraffic(newValue);
});
