import Popup from "./Popup.js";
export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, callbackOnSubmit) {
    super(popupSelector);
    this._callbackOnSubmit = callbackOnSubmit;
    //this._inputList = this._popup.querySelectorAll(".popup__input");
  }

  setEventListeners() {
    this._form = this._popup.querySelector(".popup__inputs");
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._callbackOnSubmit(this._data);
      this.close();
    });

    super.setEventListeners();
  }
}
