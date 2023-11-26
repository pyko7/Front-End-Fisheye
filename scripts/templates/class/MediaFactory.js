/**
 * @description class representing a media factory
 * @extends Media
 */
class MediaFactory {
  /**
   * @description create a video or an image
   * @param {Object} data data of video or image
   * @param {Object} photographer photographer's video or image
   */
  constructor(data, photographer) {
    if ("image" in data) {
      return new Image(data, photographer);
    } else {
      return new Video(data, photographer);
    }
  }
}
