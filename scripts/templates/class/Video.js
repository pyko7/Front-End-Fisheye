/**
 * @description class representing a video
 * @extends Media
 */
class Video extends Media {
  /**
   * @description create a video
   * @param {Object} data data of video
   * @param {Object} photographer photographer's video
   */
  constructor(data, photographer) {
    super(data, photographer);
    this.video = data.video;
  }
  /**
   * @description create a video HTML tag
   */
  createCard() {
    const video = document.createElement("video");
    const name = this.photographerName.split(" ")[0];

    video.setAttribute("src", `assets/photographers/${name}/${this.video}`);
    video.setAttribute("alt", this.title);

    return this.createBaseCard(video);
  }
}
