/**
 * @description class representing a lightbox
 */
// eslint-disable-next-line no-unused-vars
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
   * @description set up focus trap for the lightbox
   */
  static trapFocus(element) {
    let focusableElements = element.querySelectorAll("button, img, video");
    const nextMediaButton = document.querySelector("#nav-to-right-lightbox");
    const previousMediaButton = document.querySelector("#nav-to-left-lightbox");
    const closeLightboxBtn = document.querySelector("#close-lightbox-button");

    let firstElement = focusableElements[0];
    let lastElement = focusableElements[focusableElements.length - 1];
    firstElement.focus();

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        Lightbox.setNextMedia();
        focusableElements = element.querySelectorAll("button, img, video");
        firstElement = focusableElements[0];
        lastElement = focusableElements[focusableElements.length - 1];
        firstElement.focus();
      } else if (e.key === "ArrowLeft") {
        Lightbox.setPreviousMedia();
        focusableElements = element.querySelectorAll("button, img, video");
        firstElement = focusableElements[0];
        lastElement = focusableElements[focusableElements.length - 1];
        firstElement.focus();
      } else if (e.key === "Escape") {
        e.preventDefault();
        Lightbox.closeLightbox();
      }
    });

    element.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });

    nextMediaButton.addEventListener("click", () => {
      Lightbox.setNextMedia();
      focusableElements = element.querySelectorAll("button, img, video");
      firstElement = focusableElements[0];
      lastElement = focusableElements[focusableElements.length - 1];
      firstElement.focus();
    });
    previousMediaButton.addEventListener("click", () => {
      Lightbox.setPreviousMedia();
      focusableElements = element.querySelectorAll("button, img, video");
      firstElement = focusableElements[0];
      lastElement = focusableElements[focusableElements.length - 1];
      firstElement.focus();
    });
    closeLightboxBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        // eslint-disable-next-line no-undef
        Lightbox.closeLightbox();
      }
    });
    closeLightboxBtn.addEventListener("click", () => {
      // eslint-disable-next-line no-undef
      Lightbox.closeLightbox();
    });
  }

  /**
   * @description open the lightbox
   * @param {string} title
   */
  static openLightbox(title) {
    const lightboxElement = document.querySelector("#lightbox-container");
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
    Lightbox.trapFocus(lightboxElement);
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
  static setNextMedia() {
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
  static setPreviousMedia() {
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
