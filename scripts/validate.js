let validationConfig = {};
function enableValidation(config) {
  validationConfig = config;
  const forms = document.querySelectorAll(".popup__inputs");
  forms.forEach((form) => {
    const inputs = form.querySelectorAll(config.inputSelector);
    inputs.forEach((input) => {
      input.addEventListener("input", (evt) => {
        handleFormInput(evt, form, config);
        console.log("this is called");
      });
    });
    form.addEventListener("submit", (evt) => handleFormSubmit(evt, form));
  });
}

function handleFormInput(evt, form) {
  console.log("handling");
  const input = evt.target;
  toggleButton(form);
  if (input.validity.valid) {
    disableInputError(input, form);
  } else {
    enableInputError(input, form);
  }
}

function enableInputError(input, form) {
  const errorNode = form.querySelector(`.${input.id}-error`);
  errorNode.textContent = input.validationMessage;
  input.classList.add(validationConfig.inputErrorClass);
  errorNode.classList.add(validationConfig.errorClass);
}

function disableInputError(input, form) {
  const errorNode = form.querySelector(`.${input.id}-error`);
  errorNode.textContent = "";
  input.classList.remove(validationConfig.inputErrorClass);
  errorNode.classList.remove(validationConfig.errorClass);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
}

function toggleButton(form) {
  console.log("toggle button");
  const button = form.querySelector(validationConfig.submitButtonSelector);
  if (!form.checkValidity()) {
    disableSubmitButton(button);
  } else {
    enableSubmitButton(button);
  }
}

function disableSubmitButton(button) {
  button.classList.add(validationConfig.inactiveButtonClass);
  button.disabled = true;
}

function enableSubmitButton(button) {
  button.classList.remove(validationConfig.inactiveButtonClass);
  button.disabled = false;
}
