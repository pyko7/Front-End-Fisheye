//DOM Elements
const photographersSection = document.querySelector(".photograph-header");
const contactButton = document.querySelector(".contact_button");
const main = document.querySelector("#main");

//URL params
const param = new URL(document.location).searchParams.get("id");
const photographerId = param ? parseInt(param) : null;

/**
 * fetch photographers data
 * @returns {Promise<Object>}
 */
async function getPhotographers() {
  const url = "../../data/photographers.json";

  const res = await fetch(url);
  const data = await res.json();
  return data;
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
  const medias = await getMediasByPhotographer(id);
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
 * create photographer's card
 * @param {Object} data
 */
function photographerTemplate(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

  async function getUserCardDOM() {
    const {
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
    } = createCardElement();
    const likesNumber = await calculateLikes(photographerId);

    h2.textContent = data.name;
    h3.textContent = `${data.city}, ${data.country}`;
    tagline.textContent = data.tagline;
    price.textContent = `${data.price}€/jour`;
    likes.textContent = `${likesNumber} ♥`;

    img.setAttribute("src", picture);
    img.setAttribute("alt", name);

    photographerProfilePictureContainer.classList.add(
      "photographer-profile-picture-container"
    );
    priceAndLikesContainer.classList.add("price-likes-container");

    photographerInformations.appendChild(h2);
    photographerInformations.appendChild(photographerMoreInformations);
    photographerMoreInformations.appendChild(h3);
    photographerMoreInformations.appendChild(tagline);
    photographerProfilePictureContainer.appendChild(img);
    photographersSection.appendChild(photographerInformations);
    photographersSection.appendChild(photographerProfilePictureContainer);
    photographersSection.insertBefore(
      contactButton,
      photographerProfilePictureContainer
    );
    priceAndLikesContainer.appendChild(likes);
    priceAndLikesContainer.appendChild(price);
    main.appendChild(priceAndLikesContainer);

    return;
  }
  return {
    name,
    picture,
    id,
    city,
    country,
    tagline,
    price,
    portrait,
    getUserCardDOM,
  };
}
/**
 * create image or video object for each photographer's media
 * @param {Object} photographer
 * @returns {Promise<Array>}
 */
async function getMediasCard(photographer) {
  const medias = await getMediasByPhotographer(photographer.id);
  return medias.map((media) => {
    const newMedia = new MediaFactory(media, photographer);
    return newMedia.createCard();
  });
}

/**
 * display photographer's page
 * @param {number} id
 */
async function displayDataByPhotographer(id) {
  const mediasContainer = document.createElement("div");
  const photographer = await getPhotographersById(id);
  const photographerModel = photographerTemplate(photographer);

  mediasContainer.classList.add("media-container");

  await photographerModel.getUserCardDOM();
  const mediasCard = await getMediasCard(photographer);
  main.appendChild(mediasContainer);
  mediasCard.forEach((media) => {
    mediasContainer.appendChild(media);
  });
}

if (!photographerId) {
  window.location.href = "/";
} else {
  displayDataByPhotographer(photographerId);
}
