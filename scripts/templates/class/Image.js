class Image extends Media {
  constructor(data, photographer) {
    super(data, photographer);
    this.image = data.image;
  }

  createCard() {
    const image = document.createElement("img");
    const name = this.photographerName.split(" ")[0];

    image.setAttribute("src", `assets/photographers/${name}/${this.image}`);
    image.setAttribute("alt", this.title);

    return this.createBaseCard(image);
  }
}
