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

function photographerTemplate(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const { img, h2, h3, tagline, price } = createCardElement();

    h2.textContent = data.name;
    h3.textContent = `${data.city}, ${data.country}`;
    tagline.textContent = data.tagline;
    price.textContent = `${data.price}€/jour`;

    img.style.borderRadius = "50%";
    img.style.objectFit = "cover";
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(tagline);
    article.appendChild(price);

    return article;
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