function enableValidation(config) {
  const forms = document.querySelectorAll(".popup__inputs");
  forms.forEach((form) => {
    const inputs = form.querySelectorAll(config.inputSelector);
    inputs.forEach((input) => {
      input.addEventListener("input", (evt) =>
        handleFormInput(evt, form, config)
      );
    });
    form.addEventListener("submit", (evt) => handleFormSubmit(evt, form));
    toggleButton(form, config);
  });
}

function handleFormInput(evt, form, config) {
  const input = evt.target;
  const errorNode = form.querySelector(`.${input.id}-error`);
  toggleButton(form, config);
  if (input.validity.valid) {
    errorNode.textContent = "";
    input.classList.remove(config.inputErrorClass);
    errorNode.classList.remove(config.errorClass);
  } else {
    errorNode.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass);
    errorNode.classList.add(config.errorClass);
  }
}

function handleFormSubmit(evt, form) {
  evt.preventDefault();
}

function toggleButton(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  button.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
  if (!form.checkValidity()) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}
