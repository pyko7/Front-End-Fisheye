class Lightbox {
  constructor(medias) {
    Lightbox.medias = medias;
  }
  static currentIndex = 0;
  static medias;

  static openLightbox(title) {
    const currentMedia = Lightbox.medias.find((media) => {
      if (media.title === title) {
        return media;
      }
    });
    Lightbox.currentIndex = Lightbox.medias.indexOf(currentMedia);
    const cardMedia = currentMedia.createCard();
    const lightbox = document.querySelector("#lightbox");
    document.getElementById("lightbox-container").style.display = "flex";
    console.log(cardMedia);
    lightbox.appendChild(cardMedia);
    cardMedia.setAttribute("class", "lightbox-media");
  }

  static closeLightbox() {
    const lightbox = document.querySelector("#lightbox-container");
    lightbox.style.display = "none";
    document.getElementById("lightbox").innerHTML = "";
  }

  setNextMedia() {
    const lightbox = document.querySelector("#lightbox");

    Lightbox.currentIndex =
      (Lightbox.currentIndex + 1) % Lightbox.medias.length;

    lightbox.innerHTML = "";
    const cardMedia = Lightbox.medias[Lightbox.currentIndex].createCard();
    lightbox.appendChild(cardMedia);
    cardMedia.setAttribute("class", "lightbox-media");
  }

  setPreviousMedia() {
    const lightbox = document.querySelector("#lightbox");

    Lightbox.currentIndex =
      (Lightbox.currentIndex - 1 + Lightbox.medias.length) %
      Lightbox.medias.length;

    lightbox.innerHTML = "";
    const cardMedia = Lightbox.medias[Lightbox.currentIndex].createCard();
    lightbox.appendChild(cardMedia);
    cardMedia.setAttribute("class", "lightbox-media");
  }
}
