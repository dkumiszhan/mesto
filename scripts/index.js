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

import { Card } from "./Card.js";

import {
  popupImage,
  popupShowImage,
  popupTitleShowCard,
  openPopup,
  closeOnEsc,
  closeOnOverlayClick,
  closePopup,
  disableSubmitButton,
  disableInputError,
  clearInput,
} from "./utils.js";

initialCards.forEach((item) => {
  const card = new Card(item.link, item.name, ".template-elements");
  const cardElement = card.generateCard();
  cardsContainer.append(cardElement);
});

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

popupCloseShowCard.addEventListener("click", function () {
  closePopup(popupShowImage);
});

popupFormEdit.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupProfile);
});

const inputTitle = document.querySelector(".popup__input_type_title");
const inputLink = document.querySelector(".popup__input_type_link");

popupFormAdd.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const card = new Card(
    inputLink.value,
    inputTitle.value,
    ".template-elements"
  );
  const element = card.generateCard();
  cardsContainer.prepend(element);
  closePopup(popupAddCard);
  inputTitle.value = "";
  inputLink.value = "";
  const currentButtonSave = popupFormAdd.querySelector(".popup__button-save");
  disableSubmitButton(currentButtonSave);
});

import { FormValidator } from "./FormValidator.js";
const forms = document.querySelectorAll(".popup__inputs");
forms.forEach((form) => {
  const validationClass = new FormValidator(
    {
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__button-save",
      inactiveButtonClass: "popup__button-save_type_disabled",
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__error_visible",
    },
    form
  );
  validationClass.enableValidation();
});
