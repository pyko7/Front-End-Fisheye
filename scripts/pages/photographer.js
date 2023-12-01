//DOM Elements
const photographersSection = document.querySelector(".photograph-header");
const contactButton = document.querySelector(".contact_button");
const main = document.querySelector("#main");
const selectButton = document.querySelector(".dropdown-button");
const listbox = document.querySelector("#listbox");
const mediaContainer = document.querySelector("#media-container");
const closeLightboxBtn = document.querySelector("#close-lightbox-button");
const nextMediaButton = document.querySelector("#nav-to-right-lightbox");
const previousMediaButton = document.querySelector("#nav-to-left-lightbox");

//URL params
const param = new URL(document.location).searchParams.get("id");
const photographerId = param ? parseInt(param) : null;

let photographersAndMedias = null;
let photographer = null;
let medias = null;
let displayedMedias = null;
let listboxVisible = false;
let selectedItem = null;
let likedMedias = [];
let lightbox;
let instanciatedMedia = [];

/**
 * @description fetch photographers data
 * @returns {Promise<Object>}
 */
async function getPhotographers() {
  const url = "../../data/photographers.json";
  if (!photographersAndMedias) {
    const res = await fetch(url);
    const data = await res.json();
    photographersAndMedias = data;
  }
  return photographersAndMedias;
}

/**
 * @description get photographer by id
 * @param {number} id
 * @returns {Promise<Object>}
 */
async function getPhotographersById(id) {
  const { photographers } = await getPhotographers();
  const [photographer] = photographers.filter((el) => el.id === id);
  return photographer;
}

/**
 * @description fetch media by photographer
 * @param {number} id
 * @returns {Promise<Array>}
 */
async function getMediasByPhotographer(id) {
  const { media } = await getPhotographers();
  return media.filter((el) => el.photographerId === id);
}

/**
 * @description calculate the number of likes of a photographer
 * @param {number} id
 * @returns {Promise<Array>}
 */
async function calculateLikes(id) {
  if (!medias) {
    medias = await getMediasByPhotographer(id);
  }
  return medias.map((el) => el.price).reduce((prev, curr) => prev + curr, 0);
}

/**
 * @description Create card elements
 * @returns {Object}
 */
function createCardElement() {
  const photographerInformations = document.createElement("div");
  const photographerMoreInformations = document.createElement("div");
  const photographerProfilePictureContainer = document.createElement("div");
  const priceAndLikesContainer = document.createElement("div");

  const img = document.createElement("img");
  const h2 = document.createElement("h2");
  const h3 = document.createElement("h3");
  const tagline = document.createElement("p");
  const price = document.createElement("p");
  const totalLikes = document.createElement("span");
  return {
    priceAndLikesContainer,
    photographerInformations,
    photographerMoreInformations,
    photographerProfilePictureContainer,
    img,
    h2,
    h3,
    tagline,
    price,
    totalLikes,
  };
}

/**
 * @description create image or video object for each photographer's media
 * @param {Object} photographer
 * @returns {Array}
 */
function getMediasCard(photographer, medias) {
  return medias.map((media) => {
    const newMedia = new MediaFactory(media, photographer);
    instanciatedMedia.push(newMedia);
    return newMedia.createCard();
  });
}

/**
 * @description sort media by sorting type
 * @param {string} type the type of sorting
 * @param {Array} medias array of medias
 * @returns {Array} array of sorted medias
 */
function sortMedia(type, medias) {
  if (type === "date") {
    return medias.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (type === "title") {
    return medias.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    return medias.sort((a, b) => (a.totalLikes > b.totalLikes ? -1 : 1));
  }
}

/**
 * @description display photographer's page
 * @param {number} id
 */
async function displayDataByPhotographer(id) {
  if (!photographer) {
    photographer = await getPhotographersById(id);
  }
  if (!medias) {
    medias = await getMediasByPhotographer(id);
  }

  const photographerModel = photographerTemplate(photographer);
  await photographerModel.getUserCardDOM();

  if (!medias) {
    medias = await getMediasByPhotographer(id);
  }

  displayMediaByPhotographer(medias);
}

/**
 * @description display each photographer's media
 * @param {Array} medias array of medias
 */
async function displayMediaByPhotographer(medias) {
  lightbox = new Lightbox(instanciatedMedia);

  if (!photographer) {
    photographer = await getPhotographersById(id);
  }

  displayedMedias = getMediasCard(photographer, medias);
  mediaContainer.innerHTML = ``;
  displayedMedias.forEach((media) => {
    mediaContainer.appendChild(media);
  });
}

/**
 * @description display/hide sorting menu
 */
function toggleListbox() {
  listboxVisible = !listboxVisible;
  listbox.style.display = listboxVisible ? "block" : "none";
  listbox.parentElement
    .querySelector(".dropdown-button")
    .setAttribute("aria-expanded", listboxVisible.toString());

  if (listboxVisible) {
    listbox.setAttribute("aria-hidden", "false");
    listbox.setAttribute("tabindex", "0");
    listbox.focus();
  } else {
    listbox.setAttribute("aria-hidden", "true");
  }
}

/**
 * @description Select a type of sorting
 * @param {number} itemNumber item's index
 * @param {string} itemName item's name
 */
function selectItem(itemNumber, itemName) {
  if (selectedItem) {
    selectedItem.setAttribute("aria-selected", "false");
  }
  selectedItem = document.querySelector(`.listitem:nth-child(${itemNumber})`);
  selectedItem.setAttribute("aria-selected", "true");
  document.querySelector(".dropdown-button").textContent =
    selectedItem.textContent;
  medias = sortMedia(itemName, medias);
  displayMediaByPhotographer(medias);
  toggleListbox();
}

selectButton.addEventListener("click", toggleListbox);
nextMediaButton.addEventListener("click", () => lightbox.setNextMedia());
previousMediaButton.addEventListener("click", () =>
  lightbox.setPreviousMedia()
);
closeLightboxBtn.addEventListener("click", () => {
  Lightbox.closeLightbox();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    lightbox.setNextMedia();
  } else if (e.key === "ArrowLeft") {
    lightbox.setPreviousMedia();
  } else if (e.key === "Escape") {
    Lightbox.closeLightbox();
  } else {
    return;
  }
});

if (!photographerId) {
  window.location.href = "/";
} else {
  displayDataByPhotographer(photographerId);
}
