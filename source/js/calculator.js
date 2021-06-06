let platformCoefficient = 1;
let countryCoefficient = 1;
let traffic = 100000;
const CR = 1000;

const platformsRadios = document.querySelectorAll(".radio-button__native");
const output = document.querySelector("output");

platformsRadios.forEach((radio) => {
	updatePlatformCoefficient(radio);

	radio.addEventListener("change", (evt) => {
		updatePlatformCoefficient(evt.target);
	});
});

function updatePlatformCoefficient(radio) {
	if (radio.checked) {
		platformCoefficient = radio.dataset.coefficient;
		updateOutput();
	}
}

export function updateCountryCoefficient(value) {
	countryCoefficient = value;
	updateOutput();
}

export function updateTraffic(value) {
	traffic = value;
	updateOutput();
}

export function updateOutput() {
	const result = (traffic / CR) * platformCoefficient * countryCoefficient;
	output.textContent = result.toFixed(2).toString().replace(".", ",") + " ";
}
