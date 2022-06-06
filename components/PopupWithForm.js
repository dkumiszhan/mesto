import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackOnSubmit) {
    super(popupSelector);
    this._callbackOnSubmit = callbackOnSubmit;
    this._inputList = this._popup.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const data = {};
    this._inputList.forEach((input) => {
      data[input.id] = input.value;
    });
    return data;
  }

  setEventListeners() {
    this._form = this._popup.querySelector(".popup__inputs");
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
