/**
 * @description class representing a media factory
 * @extends Media
 */
// eslint-disable-next-line no-unused-vars
class MediaFactory {
  /**
   * @description create a video or an image
   * @param {Object} data data of video or image
   * @param {Object} photographer photographer's video or image
   */
  constructor(data, photographer) {
    if ("image" in data) {
      // eslint-disable-next-line no-undef
      return new ImageMedia(data, photographer);
    } else {
      // eslint-disable-next-line no-undef
      return new Video(data, photographer);
    }
  }
}
