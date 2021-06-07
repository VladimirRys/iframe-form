import { updateByCountry } from "./calculator.js";

/* Features needed to make the selectCustom work for mouse users.

- Toggle custom select visibility when clicking the "box"
- Update custom select value when clicking in a option
- Navigate through options when using keyboard up/down
- Pressing Enter or Space selects the current hovered option
- Close the select when clicking outside of it
- Sync both selects values when selecting a option. (native or custom)

*/

const selectWrapper = document.querySelector(".custom-select");

const native = selectWrapper.querySelector(".custom-select__native");

const custom = selectWrapper.querySelector(".custom-select__custom");
const customTrigger = custom.querySelector(".custom-select__trigger");
const customOptionsWrapper = custom.querySelector(".custom-select__options");
const customOptions = Array.from(
	customOptionsWrapper.querySelectorAll(".custom-select__option")
);
const optionsCount = customOptions.length;
// const defaultLabel = customTrigger.getAttribute("data-value");

let optionChecked = "";
let optionHoveredIndex = -1;

const activeClass = "custom-select__custom--active";

// Toggle custom select visibility when clicking the box
custom.addEventListener("click", () => {
	const isClosed = !custom.classList.contains(activeClass);

	if (isClosed) {
		openSelectCustom();
	} else {
		closeSelectCustom();
	}
});

function openSelectCustom() {
	custom.classList.add(activeClass);
	// Remove aria-hidden in case this was opened by a user
	// who uses AT (e.g. Screen Reader) and a mouse at the same time.
	custom.setAttribute("aria-hidden", false);

	if (optionChecked) {
		const optionCheckedIndex = customOptions.findIndex(
			(el) => el.getAttribute("data-value") === optionChecked
		);
		updateCustomSelectHovered(optionCheckedIndex);
	}

	// Add related event listeners
	document.addEventListener("click", watchClickOutside);
	document.addEventListener("keydown", supportKeyboardNavigation);
}

function closeSelectCustom() {
	custom.classList.remove(activeClass);

	custom.setAttribute("aria-hidden", true);

	updateCustomSelectHovered(-1);

	// Remove related event listeners
	document.removeEventListener("click", watchClickOutside);
	document.removeEventListener("keydown", supportKeyboardNavigation);
}

function updateCustomSelectHovered(newIndex) {
	const prevOption = customOptionsWrapper.children[optionHoveredIndex];
	const option = customOptionsWrapper.children[newIndex];

	if (prevOption) {
		prevOption.classList.remove("isHover");
	}
	if (option) {
		option.classList.add("isHover");
	}

	optionHoveredIndex = newIndex;
}

function updateCustomSelectChecked(value, text) {
	const prevValue = optionChecked;

	updateByCountry(value);

	const elPrevOption = customOptionsWrapper.querySelector(
		`[data-value="${prevValue}"`
	);
	const elOption = customOptionsWrapper.querySelector(
		`[data-value="${value}"`
	);

	const selectedClass = "custom-select__option--selected";

	if (elPrevOption) {
		elPrevOption.classList.remove(selectedClass);
	}

	if (elOption) {
		elOption.classList.add(selectedClass);
	}

	customTrigger.textContent = text;
	optionChecked = value;
}

function watchClickOutside() {
	const didClickedOutside = !custom.contains(event.target);
	if (didClickedOutside) {
		closeSelectCustom();
	}
}

function supportKeyboardNavigation(e) {
	// press down -> go next
	if (event.keyCode === 40 && optionHoveredIndex < optionsCount - 1) {
		// let index = optionHoveredIndex;
		e.preventDefault(); // prevent page scrolling
		updateCustomSelectHovered(optionHoveredIndex + 1);
	}

	// press up -> go previous
	if (event.keyCode === 38 && optionHoveredIndex > 0) {
		e.preventDefault(); // prevent page scrolling
		updateCustomSelectHovered(optionHoveredIndex - 1);
	}

	// press Enter or space -> select the option
	if (event.keyCode === 13 || event.keyCode === 32) {
		e.preventDefault();

		const option = customOptionsWrapper.children[optionHoveredIndex];
		const value = option && option.getAttribute("data-value");

		if (value) {
			native.value = value;
			updateCustomSelectChecked(value, option.textContent);
		}
		closeSelectCustom();
	}

	// press ESC -> close selectCustom
	if (event.keyCode === 27) {
		closeSelectCustom();
	}
}

// Update selectCustom value when selectNative is changed.
native.addEventListener("change", (e) => {
	const value = e.target.value;
	const elRespectiveCustomOption = customOptionsWrapper.querySelectorAll(
		`[data-value="${value}"]`
	)[0];

	updateCustomSelectChecked(value, elRespectiveCustomOption.textContent);
});

// Update selectCustom value when an option is clicked or hovered
customOptions.forEach(function (elOption, index) {
	elOption.addEventListener("click", (e) => {
		const value = e.target.getAttribute("data-value");

		// Sync native select to have the same value
		native.value = value;
		updateCustomSelectChecked(value, e.target.textContent);
		closeSelectCustom();
	});

	elOption.addEventListener("mouseenter", () => {
		updateCustomSelectHovered(index);
	});

	// TODO: Toggle these event listeners based on selectCustom visibility
});
