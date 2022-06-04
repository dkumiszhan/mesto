import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(imageLink, imageTitle) {
    let img = this._popup.querySelector(".popup__image");
    img.src = imageLink;
    img.alt = imageTitle;
    let title = this._popup.querySelector(".popup__title");
    title.textContent = imageTitle;
    super.open();
  }
}
