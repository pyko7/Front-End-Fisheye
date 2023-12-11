//DOM Elements
// eslint-disable-next-line no-unused-vars
const photographersSection = document.querySelector(".photograph-header");
// eslint-disable-next-line no-unused-vars
const contactButton = document.querySelector(".contact_button");
// eslint-disable-next-line no-unused-vars
const main = document.querySelector("#main");
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
// eslint-disable-next-line no-unused-vars
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
// eslint-disable-next-line no-unused-vars
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
    // eslint-disable-next-line no-undef
    const newMedia = new MediaFactory(media, photographer);
    if (instanciatedMedia.length < medias.length) {
      instanciatedMedia.push(newMedia);
    }
    return newMedia.createCard();
  });
}

/**
 * @description sort media by sorting type
 * @param {string} type the type of sorting
 * @param {Array} medias array of medias
 * @returns {Array} array of sorted medias
 */
// eslint-disable-next-line no-unused-vars
function sortMedia(type, medias) {
  if (type === "date") {
    return medias.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (type === "titre") {
    return medias.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    return medias.sort((a, b) => b.likes - a.likes);
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

  // eslint-disable-next-line no-undef
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
  // eslint-disable-next-line no-undef
  lightbox = new Lightbox(instanciatedMedia);

  if (!photographer) {
    // eslint-disable-next-line no-undef
    photographer = await getPhotographersById(id);
  }

  displayedMedias = getMediasCard(photographer, medias);
  mediaContainer.innerHTML = ``;
  displayedMedias.forEach((media) => {
    mediaContainer.appendChild(media);
  });
}

nextMediaButton.addEventListener("click", () => lightbox.setNextMedia());
previousMediaButton.addEventListener("click", () =>
  lightbox.setPreviousMedia()
);
closeLightboxBtn.addEventListener("click", () => {
  // eslint-disable-next-line no-undef
  Lightbox.closeLightbox();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    lightbox.setNextMedia();
  } else if (e.key === "ArrowLeft") {
    lightbox.setPreviousMedia();
  } else if (e.key === "Escape") {
    e.preventDefault();
    // eslint-disable-next-line no-undef
    Lightbox.closeLightbox();
  } else {
    return;
  }
});

displayDataByPhotographer(photographerId);
