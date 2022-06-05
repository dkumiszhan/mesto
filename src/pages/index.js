import "./index.css";

import {
  inputName,
  inputDescription,
  buttonPen,
  buttonAdd,
  formEditProfile,
  formAddCard,
  selectors,
} from "../../utils/constants.js";
import { Card } from "../../components/Card.js";
import { initialCards } from "../../utils/cards.js";
import { Section } from "../../components/Section.js";
import { FormValidator } from "../../components/FormValidator.js";
import PopupWithImage from "../../components/PopupWithImage.js";
import UserInfo from "../../components/UserInfo.js";
import PopupWithForm from "../../components/PopupWithForm.js";

const popupWithImage = new PopupWithImage(".popup_place_show-card");

function createCard(data) {
  const card = new Card(
    {
      data: data,
      handleCardClick: () => {
        popupWithImage.open(data.link, data.name);
      },
    },
    ".template-elements"
  );
  return card.generateCard();
}

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".elements__list"
);

cardsSection.renderItems();

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

const popupWithFormEdit = new PopupWithForm(
  ".popup_place_profile",
  callbackEdit
);

const popupWithFormAdd = new PopupWithForm(".popup_place_add-card", (data) => {
  cardsSection.addItem(data);
});

popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithImage.setEventListeners();

const profileValidation = new FormValidator(selectors, formEditProfile);
const newCardValidation = new FormValidator(selectors, formAddCard);
profileValidation.enableValidation();
newCardValidation.enableValidation();
