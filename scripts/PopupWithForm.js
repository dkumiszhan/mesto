import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackOnSubmit) {
    super(popupSelector);
    this._callbackOnSubmit = callbackOnSubmit;
  }

  _getInputValues() {
    let inputs = this._popup.querySelectorAll(".popup__input");

    let data = {};
    inputs.forEach((input) => {
      data[input.id] = input.value;
    });
    return data;
  }

  setEventListeners() {
    this._form = this._popup.querySelector(".popup__inputs");
    console.log(this._popup);
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callbackOnSubmit(this._getInputValues());
      this.close();
    });

    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
