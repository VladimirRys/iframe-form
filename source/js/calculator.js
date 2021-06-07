import { formatNumber } from "./formatNumbers.js";
// INIT VALUES
let platform = "mobile";
let traffic = 100000;
let geo = {
	desktop: {
		CR: 1.4,
		CPS: 0.01,
	},
	mobile: { CR: 11.6, CPS: 0.015 },
};

// ____ Radio buttons
const platformsRadios = document.querySelectorAll(".radio-button__native");
const output = document.querySelector("output");
platformsRadios.forEach((radio) => {
	updateByPlatform(radio);
	radio.addEventListener("change", (evt) => {
		updateByPlatform(evt.target);
	});
});
function updateByPlatform(radio) {
	if (radio.checked) {
		platform = radio.value;
		calcOutput();
	}
}

// Parse JSON
let DATA;

fetch("../data/countries.json")
	.then((response) => response.json())
	.then((data) => {
		DATA = data;
	});

export function updateByCountry(country) {
	geo = DATA.countries[country];
	calcOutput();
}

export function updateByTraffic(value) {
	traffic = value;
	calcOutput();
}

export function calcOutput() {
	const result = (traffic / geo[platform].CR) * geo[platform].CPS;

	output.textContent =
		formatNumber(result.toFixed(2).toString().replace(".", ",")) + " ";
}
