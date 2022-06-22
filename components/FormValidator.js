export class FormValidator {
  constructor(formSelectors, form) {
    this._form = form;
    this._inputSelector = formSelectors.inputSelector;
    this._submitButtonSelector = formSelectors.submitButtonSelector;
    this._inactiveButtonClass = formSelectors.inactiveButtonClass;
    this._inputErrorClass = formSelectors.inputErrorClass;
    this._errorClass = formSelectors.errorClass;
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  disableInputError(currentInput) {
    const errorNode = this._form.querySelector(`.${currentInput.id}-error`);
    errorNode.textContent = "";
    currentInput.classList.remove(this._inputErrorClass);
    errorNode.classList.remove(this._errorClass);
  }

  _enableInputError(currentInput) {
    const errorNode = this._form.querySelector(`.${currentInput.id}-error`);
    errorNode.textContent = currentInput.validationMessage;
    currentInput.classList.add(this._inputErrorClass);
    errorNode.classList.add(this._errorClass);
  }

  _toggleButton() {
    if (!this._form.checkValidity()) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableSubmitButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _handleFormInput(evt) {
    this._toggleButton();
    const input = evt.target;
    if (input.validity.valid) {
      this.disableInputError(input);
    } else {
      this._enableInputError(input);
    }
  }

  _handleFormSubmit(evt) {
    evt.preventDefault(evt);
  }

  resetValidation() {
    this._toggleButton();
    this._inputs.forEach((input) => {
      this.disableInputError(input);
    });
  }

  enableValidation() {
    this._inputs = this._form.querySelectorAll(this._inputSelector);
    this._inputs.forEach((input) => {
      input.addEventListener("input", (evt) => {
        this._handleFormInput(evt);
      });
    });

    // this._form.addEventListener("submit", (evt) => {
    //   this._handleFormSubmit(evt);
    // });
  }
}
