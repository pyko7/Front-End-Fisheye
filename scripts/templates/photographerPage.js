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
      totalLikes,
    } = createCardElement();
    const likesNumber = await calculateLikes(photographerId);

    h2.textContent = data.name;
    h3.textContent = `${data.city}, ${data.country}`;
    tagline.textContent = data.tagline;
    price.textContent = `${data.price}€/jour`;
    totalLikes.innerHTML = `<span id="total-likes-number">${likesNumber}</span> ♥`;

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
    priceAndLikesContainer.appendChild(totalLikes);
    priceAndLikesContainer.appendChild(price);
    main.appendChild(priceAndLikesContainer);

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
