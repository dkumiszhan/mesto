import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._title = this._popup.querySelector(".popup__title");
  }

  open(imageLink, imageTitle) {
    this._image.src = imageLink;
    this._image.alt = imageTitle;

    this._title.textContent = imageTitle;
    super.open();
  }
}
