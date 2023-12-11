/**
 * @description class representing a media
 */
// eslint-disable-next-line no-unused-vars
class Media {
  /**
   * @description create a media
   * @param {Object} data data of media
   * @param {Object} photographer photographer's media
   */
  constructor(data, photographer) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.photographerName = data.photographerName;
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
    this.photographerName = photographer.name;
    this.liked = false;
    this.container = null;
  }
  /**
   * @description create the base of a media card
   * @param {HTMLElement} specificDom image or video HTML tag
   * @returns
   */
  createBaseCard(specificDom) {
    const container = document.createElement("div");
    const text = document.createElement("div");
    const title = document.createElement("p");
    const likesNumber = document.createElement("button");

    specificDom.setAttribute("tabindex", 0);
    likesNumber.setAttribute("aria-label", "bouton de like");
    likesNumber.addEventListener("click", (e) => {
      e.preventDefault();
      this.createLike();
      likesNumber.innerHTML = `${this.likes} <i aria-hidden="true" class="fa-solid fa-heart"></i>`;
    });
    container.addEventListener("click", (e) => {
      if (e.target.tagName === "I" || e.target.tagName === "BUTTON") {
        return;
      }
      // eslint-disable-next-line no-undef
      Lightbox.openLightbox(this.title);
    });
    container.addEventListener("keydown", (e) => {
      if (e.target.tagName === "I" || e.target.tagName === "BUTTON") {
        return;
      }
      if (e.key === "Enter") {
        // eslint-disable-next-line no-undef
        Lightbox.openLightbox(this.title);
      }
    });
    text.classList.add("media-text");
    likesNumber.classList.add("like-btn");
    title.textContent = this.title;
    likesNumber.innerHTML = `${this.likes} <i aria-hidden="true" class="fa-solid fa-heart"></i>`;

    text.appendChild(title);
    text.appendChild(likesNumber);
    container.appendChild(specificDom);
    container.appendChild(text);

    container.classList.add("media");

    return container;
  }

  /**
   * @description handle like value
   */
  createLike() {
    const totalLikesContainer = document.getElementById("total-likes-number");
    let totalLikes = parseInt(totalLikesContainer.textContent);
    if (this.liked) {
      this.likes--;
      totalLikes--;
    } else {
      this.likes++;
      totalLikes++;
    }
    totalLikesContainer.textContent = totalLikes;
    this.liked = !this.liked;
  }
}
