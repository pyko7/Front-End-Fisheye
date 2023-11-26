/**
 * @description class representing an image
 * @extends Media
 */
class Image extends Media {
  /**
   * @description create an image
   * @param {Object} data data of image
   * @param {Object} photographer photographer's image
   */
  constructor(data, photographer) {
    super(data, photographer);
    this.image = data.image;
  }

  /**
   * @description create an image HTML tag
   */
  createCard() {
    const image = document.createElement("img");
    const name = this.photographerName.split(" ")[0];

    image.setAttribute("src", `assets/photographers/${name}/${this.image}`);
    image.setAttribute("alt", this.title);

    return this.createBaseCard(image);
  }
}
