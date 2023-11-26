class Media {
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
  createBaseCard(specificDom) {
    const container = document.createElement("div");
    const text = document.createElement("div");
    const title = document.createElement("p");
    const likesNumber = document.createElement("button");

    container.setAttribute("tabindex", 0);
    likesNumber.addEventListener("click", () => {
      this.createLike();
      likesNumber.innerHTML = `${this.likes} <i class="fa-solid fa-heart"></i>`;
    });
    container.addEventListener("click", () => {
      Lightbox.openLightbox(this.title);
    });
    text.classList.add("media-text");
    likesNumber.classList.add("like-btn");
    title.textContent = this.title;
    likesNumber.innerHTML = `${this.likes} <i class="fa-solid fa-heart"></i>`;

    text.appendChild(title);
    text.appendChild(likesNumber);
    container.appendChild(specificDom);
    container.appendChild(text);

    container.classList.add("media");

    return container;
  }

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
