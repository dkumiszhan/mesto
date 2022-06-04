import "./index.css";

// const inputName = document.querySelector(".popup__input_type_name");
// const inputDescription = document.querySelector(
//   ".popup__input_type_description"
// );
// const buttonPen = document.querySelector(".profile__button-pen");
// const buttonAdd = document.querySelector(".profile__button-add");
// const cardsContainer = document.querySelector(".elements__list");
import {
  inputName,
  inputDescription,
  buttonPen,
  buttonAdd,
  cardsContainer,
  formEditProfile,
  formAddCard,
  selectors,
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { initialCards } from "../utils/cards.js";

import PopupWithImage from "../components/PopupWithImage.js";

const popupWithImage = new PopupWithImage(".popup_place_show-card");

function createCardNew(data) {
  const card = new Card(
    {
      data: data,
      handleCardClick: () => {
        popupWithImage.open(data.link, data.name);
      },
    },
    ".template-elements"
  );
  const cardElement = card.generateCard();

  return cardElement;
}

initialCards.forEach((item) => {
  const cardElement = createCardNew(item);
  cardsContainer.append(cardElement);
});

import UserInfo from "../components/UserInfo.js";

const userInfo = new UserInfo(".profile__name", ".profile__description");

buttonPen.addEventListener("click", function () {
  const { name, description } = userInfo.getUserInfo();
  inputName.value = name;
  inputDescription.value = description;

  profileValidation.resetValidation();
  popupWithFormEdit.open();
});

buttonAdd.addEventListener("click", function () {
  newCardValidation.disableSubmitButton();
  popupWithFormAdd.open();
});

function callbackEdit(data) {
  userInfo.setUserInfo(data["name-input"], data["description-input"]);
}

import PopupWithForm from "../components/PopupWithForm.js";
const popupWithFormEdit = new PopupWithForm(
  ".popup_place_profile",
  callbackEdit
);

const popupWithFormAdd = new PopupWithForm(".popup_place_add-card", (data) => {
  const element = createCardNew(data);
  cardsContainer.prepend(element);
});

popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithImage.setEventListeners();

import { FormValidator } from "../components/FormValidator.js";

// const formEditProfile = document.querySelector(".popup__inputs_type_edit");
// const formAddCard = document.querySelector(".popup__inputs_type_add");
// const selectors = {
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__button-save",
//   inactiveButtonClass: "popup__button-save_type_disabled",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "popup__error_visible",
// };

const profileValidation = new FormValidator(selectors, formEditProfile);
const newCardValidation = new FormValidator(selectors, formAddCard);
profileValidation.enableValidation();
newCardValidation.enableValidation();
