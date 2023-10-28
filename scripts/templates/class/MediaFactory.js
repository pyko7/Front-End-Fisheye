class MediaFactory {
  constructor(data, photographer) {
    if ("image" in data) {
      return new Image(data, photographer);
    } else {
      return new Video(data, photographer);
    }
  }
}
