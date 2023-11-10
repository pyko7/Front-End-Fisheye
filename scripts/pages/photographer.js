//DOM Elements
const photographersSection = document.querySelector(".photograph-header");
const contactButton = document.querySelector(".contact_button");
const main = document.querySelector("#main");
const sortName = document.querySelector("#sort-by");
const mediaContainer = document.querySelector("#media-container");

//URL params
const param = new URL(document.location).searchParams.get("id");
const photographerId = param ? parseInt(param) : null;

let photographersAndMedias = null;
let photographer = null;
let medias = null;
let displayedMedias = null;

/**
 * fetch photographers data
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
 *
 * @param {number} id
 * @returns {Promise<Object>}
 */
async function getPhotographersById(id) {
  const { photographers } = await getPhotographers();
  const [photographer] = photographers.filter((el) => el.id === id);
  return photographer;
}

/**
 *
 * @param {number} id
 * @returns {Promise<Array>}
 */
async function getMediasByPhotographer(id) {
  const { media } = await getPhotographers();
  return media.filter((el) => el.photographerId === id);
}

/**
 * calculate the number of likes of a photographer
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
 * Create card elements
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
  const likes = document.createElement("p");
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
    likes,
  };
}

/**
 * create image or video object for each photographer's media
 * @param {Object} photographer
 * @returns {Array}
 */
function getMediasCard(photographer, medias) {
  return medias.map((media) => {
    const newMedia = new MediaFactory(media, photographer);
    return newMedia.createCard();
  });
}

function sortMedia(type, medias) {
  if (type === "date") {
    return medias.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (type === "title") {
    return medias.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    return medias.sort((a, b) => (a.likes > b.likes ? -1 : 1));
  }
}

/**
 * display photographer's page
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
  displayMediaByPhotographer();
}

async function displayMediaByPhotographer() {
  if (!photographer) {
    photographer = await getPhotographersById(id);
  }
  if (!medias) {
    medias = await getMediasByPhotographer(id);
  }

  const sortedMedia = sortMedia(sortName.value, medias);

  if (!sortName.value) {
    displayedMedias = getMediasCard(photographer, medias);
  } else {
    displayedMedias = getMediasCard(photographer, sortedMedia);
  }
  mediaContainer.innerHTML = ``;
  displayedMedias.forEach((media) => {
    mediaContainer.appendChild(media);
  });
}

sortName.addEventListener("change", displayMediaByPhotographer);

if (!photographerId) {
  window.location.href = "/";
} else {
  displayDataByPhotographer(photographerId);
}
