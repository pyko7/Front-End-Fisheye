/**
 * Create card elements
 * @returns {Object}
 */
function createCardElement() {
  const img = document.createElement("img");
  const h2 = document.createElement("h2");
  const h3 = document.createElement("h3");
  const tagline = document.createElement("p");
  const price = document.createElement("p");
  return {
    img,
    h2,
    h3,
    tagline,
    price,
  };
}

/**
 * create photographer's card
 * @param {Object} data
 * @returns {HTMLElement}
 */
// eslint-disable-next-line no-unused-vars
function photographerTemplate(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const url = `../../photographer.html?id=${data.id}`;
    const card = document.createElement("a");
    const { img, h2, h3, tagline, price } = createCardElement();

    h2.textContent = data.name;
    h3.textContent = `${data.city}, ${data.country}`;
    tagline.textContent = data.tagline;
    price.textContent = `${data.price}€/jour`;

    img.style.borderRadius = "50%";
    img.style.objectFit = "cover";
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    card.setAttribute("href", url);

    card.appendChild(img);
    card.appendChild(h2);
    card.appendChild(h3);
    card.appendChild(tagline);
    card.appendChild(price);

    return card;
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
