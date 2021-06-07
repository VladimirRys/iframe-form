export function formatNumber(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function removeSpacesFromNumber(string) {
	return parseInt(string.replace(/[^0-9.]/g, ""));
}
