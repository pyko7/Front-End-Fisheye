const dropdown = document.querySelector(".dropdown");
const dropdownTrigger = document.querySelector(".dropdown-trigger");
const dropdownMenu = document.querySelector(".dropdown-menu");

dropdownTrigger.addEventListener("click", (e) => {
  toggleDropdown();
  if (e.key === "Escape") {
    closeDropdown();
  }
});

dropdownTrigger.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleDropdown();
  }
});

dropdownMenu.addEventListener("blur", () => {
  closeDropdown();
});

dropdownMenu.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.key === "Escape") {
    dropdownTrigger.focus();
    closeDropdown();
  } else if (e.key === "ArrowUp") {
    navigateOptions(-1);
  } else if (e.key === "ArrowDown") {
    navigateOptions(1);
  } else if (e.key === "Enter") {
    selectItem(e.target.textContent.toLowerCase().trim());
  }
});

dropdownMenu.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    selectItem(e.target.textContent.toLowerCase().trim());
  }
});

function toggleDropdown() {
  dropdown.classList.toggle("active");
  const isOpen = dropdown.classList.contains("active");
  dropdownTrigger.setAttribute("aria-expanded", isOpen);
  dropdownMenu.setAttribute("aria-hidden", !isOpen);

  if (isOpen) {
    dropdownMenu.querySelector("li").focus();
  }
}

function closeDropdown() {
  dropdown.classList.remove("active");
  dropdownTrigger.setAttribute("aria-expanded", false);
  dropdownMenu.setAttribute("aria-hidden", true);
}

function navigateOptions(direction) {
  const options = Array.from(dropdownMenu.querySelectorAll("li"));
  const currentIndex = options.findIndex(
    (option) => option === document.activeElement
  );
  const newIndex = (currentIndex + direction + options.length) % options.length;
  options[newIndex].focus();
}

/**
 * @description Select a type of sorting
 * @param {string} itemName item's name
 */
function selectItem(itemName) {
  const selectedOption = dropdownMenu.querySelector("li:focus");
  const dropdownTrigger = document.querySelector(".dropdown-trigger");

  if (selectedOption) {
    const optionText = selectedOption.textContent;
    dropdownTrigger.textContent = optionText;
    // eslint-disable-next-line no-undef
    medias = sortMedia(itemName, instanciatedMedia);
    // eslint-disable-next-line no-undef
    displayMediaByPhotographer(medias);
    closeDropdown();
    dropdownTrigger.focus();
  }
}
