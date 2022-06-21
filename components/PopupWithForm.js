import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackOnSubmit) {
    super(popupSelector);
    this._callbackOnSubmit = callbackOnSubmit;
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._form = this._popup.querySelector(".popup__inputs");
    this._inprogressButton = this._popup.querySelector(
      ".popup__button-inprogress"
    );
    this._buttonSave = this._popup.querySelector(".popup__button-save");
  }

  _getInputValues() {
    const data = {};
    this._inputList.forEach((input) => {
      data[input.id] = input.value;
    });
    return data;
  }

  successCallback() {
    this._inprogressButton.classList.add("popup__button-inprogress_enabled");
    this._buttonSave.classList.add("popup__button-save_type_hidden");
  }

  failureCallback() {
    console.log("error");
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._inprogressButton.classList.add("popup__button-inprogress_enabled");
      this._buttonSave.classList.add("popup__button-save_type_hidden");

      this._callbackOnSubmit(this._getInputValues()).then((res) => {
        this._inprogressButton.classList.remove(
          "popup__button-inprogress_enabled"
        );
        this._buttonSave.classList.remove("popup__button-save_type_hidden");
      });
      this.close();
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
}
