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
 * display photographers cards
 * @param {Object} photographers
 */
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    // eslint-disable-next-line no-undef
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
