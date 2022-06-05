import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(imageLink, imageTitle) {
    const image = this._popup.querySelector(".popup__image");
    image.src = imageLink;
    image.alt = imageTitle;
    const title = this._popup.querySelector(".popup__title");
    title.textContent = imageTitle;
    super.open();
  }
}
