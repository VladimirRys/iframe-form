import IMask from "imask";

const rangeWrapper = document.querySelector(".range-slider");
const inputNumber = document.getElementById("traffic");

const numberMask = IMask(inputNumber, {
	mask: Number,
	min: rangeWrapper.style.getPropertyValue("--min"),
	max: rangeWrapper.style.getPropertyValue("--max"),
	thousandsSeparator: " ",
});

rangeWrapper.addEventListener("input", (evt) => {
	rangeWrapper.style.setProperty("--value", evt.target.value);
});

rangeWrapper.addEventListener("change", (evt) => {
	const newValue = evt.target.value;
	inputNumber.value = newValue;
	numberMask.updateValue(newValue);
	inputNumber.value = numberMask.value;
});
