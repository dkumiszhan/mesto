import { disableSubmitButton } from "./utils.js";
export class FormValidator {
  constructor(formSelectors, form) {
    this._form = form;
    this._inputSelector = formSelectors.inputSelector;
    this._submitButtonSelector = formSelectors.submitButtonSelector;
    this._inactiveButtonClass = formSelectors.inactiveButtonClass;
    this._inputErrorClass = formSelectors.inputErrorClass;
    this._errorClass = formSelectors.errorClass;
  }

  _disableInputError(evt) {
    const currentInput = evt.target;
    const errorNode = this._form.querySelector(`.${currentInput.id}-error`);
    errorNode.textContent = "";
    currentInput.classList.remove(this._inputErrorClass);
    errorNode.classList.remove(this._errorClass);
  }

  _enableInputError(evt) {
    const currentInput = evt.target;

    const errorNode = this._form.querySelector(`.${currentInput.id}-error`);
    errorNode.textContent = currentInput.validationMessage;
    currentInput.classList.add(this._inputErrorClass);
    errorNode.classList.add(this._errorClass);
  }

  _toggleButton() {
    const button = this._form.querySelector(this._submitButtonSelector);
    if (!this._form.checkValidity()) {
      disableSubmitButton(this._form.querySelector(this._submitButtonSelector));
    } else {
      this._enableSubmitButton();
    }
  }

  _disableSubmitButton() {
    const button = this._form.querySelector(this._submitButtonSelector);
    button.classList.add(this._inactiveButtonClass);
    button.disabled = true;
  }

  _enableSubmitButton() {
    const button = this._form.querySelector(this._submitButtonSelector);
    button.classList.remove(this._inactiveButtonClass);
    button.disabled = false;
  }

  _handleFormInput(evt) {
    this._toggleButton();
    const input = evt.target;
    if (input.validity.valid) {
      this._disableInputError(evt);
    } else {
      this._enableInputError(evt);
    }
  }

  _handleFormSubmit(evt) {
    evt.preventDefault(evt);
  }

  enableValidation() {
    const inputs = this._form.querySelectorAll(this._inputSelector);
    inputs.forEach((input) => {
      input.addEventListener("input", (evt) => {
        this._handleFormInput(evt);
      });
    });

    this._form.addEventListener("submit", (evt) => {
      this._handleFormSubmit(evt);
    });
  }
}
