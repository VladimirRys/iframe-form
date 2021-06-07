import IMask from "imask";
import { updateByTraffic } from "./calculator.js";

const rangeWrapper = document.querySelector(".range-slider");
const range = rangeWrapper.querySelector("input");
const inputNumber = document.getElementById("traffic");


updateByTraffic(range.value);

const numberMask = IMask(inputNumber, {
	mask: Number,
	min: rangeWrapper.style.getPropertyValue("--min"),
	max: rangeWrapper.style.getPropertyValue("--max"),
	thousandsSeparator: " ",
});

range.addEventListener("input", () => {
	rangeWrapper.style.setProperty("--value", range.value);
});

range.addEventListener("change", () => {
	inputNumber.value = range.value;
	numberMask.updateValue(range.value);
	inputNumber.value = numberMask.value;
	updateByTraffic(range.value);
});

inputNumber.addEventListener("input", () => {
	range.value = numberMask.unmaskedValue;
	rangeWrapper.style.setProperty("--value", range.value);
	updateByTraffic(range.value);
});
