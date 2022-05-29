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
import { initialCards } from "./cards.js";

import { popupShowImage, openPopup, closePopup } from "./utils.js";

function createCard(link, name, template) {
  const card = new Card(link, name, template);
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach((item) => {
  const cardElement = createCard(item.link, item.name, ".template-elements");
  cardsContainer.append(cardElement);
});

buttonPen.addEventListener("click", function () {
  inputName.value = profileName.innerText;
  inputDescription.value = profileDescription.innerText;

  //const inputs = popupProfile.querySelectorAll(".popup__input");
  //const form = popupProfile.querySelector(".popup__inputs");
  //inputs.forEach((input) => {
  //  profileValidation.disableInputError(input);
  //});
  profileValidation.resetValidation();

  openPopup(popupProfile);
});

buttonAdd.addEventListener("click", function () {
  newCardValidation.disableSubmitButton();
  openPopup(popupAddCard);
});

popupCloseProfile.addEventListener("click", function () {
  closePopup(popupProfile);
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
  const element = createCard(
    inputLink.value,
    inputTitle.value,
    ".template-elements"
  );
  cardsContainer.prepend(element);
  closePopup(popupAddCard);
  evt.target.reset();
});

import { FormValidator } from "./FormValidator.js";

const formEditProfile = document.querySelector(".popup__inputs_type_edit");
const formAddCard = document.querySelector(".popup__inputs_type_add");
const selectors = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_type_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const profileValidation = new FormValidator(selectors, formEditProfile);
const newCardValidation = new FormValidator(selectors, formAddCard);
profileValidation.enableValidation();
newCardValidation.enableValidation();
