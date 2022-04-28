const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(
  ".popup__input_type_description"
);
const popupProfile = document.querySelector(".popup_place_profile");
const buttonPen = document.querySelector(".profile__button-pen");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const popupCloseProfile = document.querySelector(
  ".popup .popup__close_place_profile"
);
const popupCloseAddCard = document.querySelector(
  ".popup .popup__close_place_add-card"
);
const popupCloseShowCard = document.querySelector(
  ".popup .popup__close_place_show-card"
);
const popupFormEdit = document.querySelector(".popup__inputs_type_edit");
const popupAddCard = document.querySelector(".popup_place_add-card");
const buttonAdd = document.querySelector(".profile__button-add");
const popupFormAdd = document.querySelector(".popup__inputs_type_add");
const cardsContainer = document.querySelector(".elements__list");
const template = document.querySelector(".template-elements");

function render() {
  const html = initialCards.map(getElement);
  cardsContainer.append(...html);
}

function getElement(item) {
  const getElementTemplate = template.content.cloneNode(true);
  const elementListTitle = getElementTemplate.querySelector(
    ".elements__list-title"
  );
  elementListTitle.textContent = item.name;
  const elementListImage = getElementTemplate.querySelector(
    ".elements__list-image"
  );
  elementListImage.src = item.link;
  elementListImage.alt = item.name;
  const removeButton = getElementTemplate.querySelector(".elements__remove");
  removeButton.addEventListener("click", removeElement);
  const likeButton = getElementTemplate.querySelector(".elements__list-button");
  likeButton.addEventListener("click", likeElement);
  elementListImage.addEventListener("click", showImage);
  return getElementTemplate;
}

render();

const popupImage = document.querySelector(".popup__image");
const popupShowImage = document.querySelector(".popup_place_show-card");
const popupTitleShowCard = document.querySelector(
  ".popup__title_place_show-card"
);

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnEsc);
  document.addEventListener("click", closeOnOverlayClick);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEsc);
  const inputs = popup.querySelectorAll(".popup__input");
  const form = popup.querySelector(".popup__inputs");
  inputs.forEach((input) => {
    clearInput(input, form);
  });
}

function showImage(evt) {
  const element = evt.target;
  popupImage.src = element.src;
  const currentListElement = element.closest(".elements__list-item");
  const currentListImage = currentListElement.querySelector(
    ".elements__list-image"
  );
  popupImage.alt = currentListImage.alt;
  popupTitleShowCard.textContent = currentListImage.alt;
  openPopup(popupShowImage);
}

function likeElement(evt) {
  const element = evt.target;
  element.classList.toggle("elements__list-button_active");
}

function removeElement(evt) {
  const element = evt.target.closest(".elements__list-item");
  element.remove();
}

buttonPen.addEventListener("click", function () {
  inputName.value = profileName.innerText;
  inputDescription.value = profileDescription.innerText;
  openPopup(popupProfile);
});

buttonAdd.addEventListener("click", function () {
  openPopup(popupAddCard);
  const currentButtonSave = popupFormAdd.querySelector(".popup__button-save");
  disableSubmitButton(currentButtonSave);
});

popupCloseProfile.addEventListener("click", function () {
  closePopup(popupProfile);
  inputName.value = "";
  inputDescription.value = "";
});

popupCloseAddCard.addEventListener("click", function () {
  closePopup(popupAddCard);
});

function clearInput(input, form) {
  input.value = "";
  disableInputError(input, form);
}

popupCloseShowCard.addEventListener("click", function () {
  closePopup(popupShowImage);
});

popupFormEdit.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupProfile);
});

function closeOnEsc(evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(openedPopup);
  }
}

function closeOnOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

const inputTitle = document.querySelector(".popup__input_type_title");
const inputLink = document.querySelector(".popup__input_type_link");

popupFormAdd.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const element = getElement({ name: inputTitle.value, link: inputLink.value });
  cardsContainer.prepend(element);
  closePopup(popupAddCard);
  inputTitle.value = "";
  inputLink.value = "";
  const currentButtonSave = popupFormAdd.querySelector(".popup__button-save");
  disableSubmitButton(currentButtonSave);
});

enableValidation({
  formSelector: ".popup__inputs",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_type_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
