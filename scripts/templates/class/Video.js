class Video extends Media {
  constructor(data, photographer) {
    super(data, photographer);
    this.video = data.video;
  }

  createCard() {
    const video = document.createElement("video");
    const name = this.photographerName.split(" ")[0];

    video.setAttribute("src", `assets/photographers/${name}/${this.video}`);
    video.setAttribute("alt", this.title);

    return this.createBaseCard(video);
  }
}
