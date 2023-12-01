const modal = document.getElementById("contact_modal");
const form = document.querySelector("form");
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const email = document.querySelector("#email");
const textarea = document.querySelector("textarea");

function displayModal() {
  modal.style.display = "block";
  modal.style.position = "absolute";
}

function closeModal() {
  modal.style.display = "none";
  modal.style.position = "static";
}

contactButton.addEventListener("click", () => {
  if (modal.style.display === "block") {
    closeModal();
  } else {
    displayModal();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formResult = {
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
  };
  console.log(formResult);
});

main.addEventListener("keydown", (e) => {
  if (modal.style.display === "block" && e.key === "Escape") {
    e.preventDefault();
    closeModal();
  }
});
