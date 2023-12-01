/**
 * @description class representing a lightbox
 */
class Lightbox {
  /**
   * @description create a lightbox
   * @param {Array} medias medias displayed in lightbox
   */
  constructor(medias) {
    Lightbox.medias = medias;
  }
  static currentIndex = 0;
  static medias;

  /**
   * @description open the lightbox
   * @param {string} title
   */
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
    lightbox.appendChild(cardMedia);
    cardMedia.setAttribute("class", "lightbox-media");
    if (cardMedia.firstChild.tagName === "VIDEO") {
      cardMedia.firstChild.setAttribute("autoplay", true);
    }
  }

  /**
   * @description close the lightbox
   */
  static closeLightbox() {
    const lightbox = document.querySelector("#lightbox-container");
    lightbox.style.display = "none";
    document.getElementById("lightbox").innerHTML = "";
  }

  /**
   * @description display the next media in lightbox
   */
  setNextMedia() {
    const lightbox = document.querySelector("#lightbox");

    Lightbox.currentIndex =
      (Lightbox.currentIndex + 1) % Lightbox.medias.length;

    lightbox.innerHTML = "";
    const cardMedia = Lightbox.medias[Lightbox.currentIndex].createCard();
    lightbox.appendChild(cardMedia);
    cardMedia.setAttribute("class", "lightbox-media");
  }

  /**
   * @description display the previous media in lightbox
   */
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
