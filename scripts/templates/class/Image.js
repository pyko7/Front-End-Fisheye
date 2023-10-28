class Image {
  constructor(data, photographer) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.image = data.image;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
    this.photographerName = photographer.name;
  }

  createCard() {
    const container = document.createElement("div");
    const text = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("p");
    const likesNumber = document.createElement("p");
    const name = this.photographerName.split(" ")[0];

    image.setAttribute("src", `assets/photographers/${name}/${this.image}`);
    image.setAttribute("alt", this.title);
    text.classList.add("media-text");
    title.textContent = this.title;
    likesNumber.textContent = `${this.likes} ♥`;

    text.appendChild(title);
    text.appendChild(likesNumber);
    container.appendChild(image);
    container.appendChild(text);

    container.classList.add("media");

    return container;
  }
}
