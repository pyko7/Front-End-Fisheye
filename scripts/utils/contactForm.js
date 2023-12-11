const modal = document.querySelector("dialog");
const form = document.querySelector("form");
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const email = document.querySelector("#email");
const closeModalBtn = document.querySelector("#closeModalBtn");
const photographerName = document.querySelector("#photographerName");

function trapFocus(event) {
  const focusableElements = modal.querySelectorAll(
    'input, textarea, [tabindex]:not([tabindex="-1"]),button'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.key === "Tab") {
    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }
}

modal.addEventListener("keydown", trapFocus);

// eslint-disable-next-line no-undef
contactButton.addEventListener("click", () => {
  modal.showModal();
  // eslint-disable-next-line no-undef
  photographerName.innerHTML = photographer.name;
  firstname.focus();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formResult = {
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
  };
  console.log(formResult);
  form.reset();
  modal.close();
});

closeModalBtn.addEventListener("click", () => {
  modal.close();
});

modal.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" ||
    (e.target.id === "closeModalBtn" && e.key === "Enter")
  ) {
    e.preventDefault();
    modal.close();
  }
});
