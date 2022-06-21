import "./index.css";

import {
  inputName,
  inputDescription,
  buttonPen,
  buttonAdd,
  formEditProfile,
  formAddCard,
  formEditAvatar,
  selectors,
  editAvatarButton,
} from "../../utils/constants.js";
import { Card } from "../../components/Card.js";
import { initialCards } from "../../utils/cards.js";
import { Section } from "../../components/Section.js";
import { FormValidator } from "../../components/FormValidator.js";
import PopupWithImage from "../../components/PopupWithImage.js";
import UserInfo from "../../components/UserInfo.js";
import PopupWithForm from "../../components/PopupWithForm.js";
import Api from "../../components/Api.js";
import PopupWithSubmit from "../../components/PopupWithSubmit.js";

const popupWithImage = new PopupWithImage(".popup_place_show-card");

function editAvatarHandler(data) {
  //console.log("edit avatar here");
  return api
    .updateAvatar(data)
    .then((res) => updateAvatarNode(res.avatar))
    .catch((err) => console.log(err));
}

function updateAvatarNode(link) {
  // document.querySelector(".profile .profile__avatar").src = link;
  document.querySelector(
    ".profile__avatar-container"
  ).style.backgroundImage = `url(${link})`;
}

const api = new Api(
  "https://mesto.nomoreparties.co/v1/cohort-43/cards",
  "c1d97d50-899b-43cb-b95d-18fefc90a34b"
);

let userId = undefined;

function createCard(data) {
  const card = new Card(
    {
      data: data,
      userId: userId,
      handleCardClick: () => {
        popupWithImage.open(data.link, data.name);
      },
      handleRemoveCard: (card) => {
        deleteCardHandler(card);
      },
      handleLikeClick: (cardId, isLike) => {
        return likeCardHandler(cardId, isLike);
      },
    },
    ".template-elements"
  );

  return card.generateCard();
}

const cardsSection = new Section(
  {
    items: [],
    renderer: createCard,
  },
  ".elements__list"
);
cardsSection.renderItems();

const popupEditAvatar = new PopupWithForm(".popup_place_edit-avatar", (res) =>
  editAvatarHandler(res)
);

api
  .getUserInfo()
  .then((res) => {
    //console.log(res);
    userId = res._id;
    updateAvatarNode(res.avatar);
    updateUserInfoNode(res.name, res.about);
  })
  .then(() => api.getInitialCards())
  .then((cards) => {
    cards
      .slice()
      .reverse()
      .forEach((card) => {
        cardsSection.addItem(card);
      });
  })
  .catch((err) => console.log(err));

function callbackOnDelete() {
  //card.removeCard();
}

function deletePopupSubmitHandler(card) {
  api
    .deleteCard(card.getId())
    .then((res) => {
      card.removeCard();
    })
    .catch((err) => console.log(err));
}

function deleteCardHandler(card) {
  const popupWithSubmit = new PopupWithSubmit(".popup__confirm", () =>
    deletePopupSubmitHandler(card)
  );
  popupWithSubmit.open();
  popupWithSubmit.setEventListeners();
}

function likeCardHandler(cardId, isLike) {
  if (isLike) {
    return api.putLike(cardId).then((res) => {
      //console.log(`${card.getLikes()} card liked by`);
      //console.log(`this is result ${res}`);
      return res.likes;
    });
  } else {
    return api.deleteLike(cardId).then((res) => {
      //console.log("like removed");
      return res.likes;
    });
  }
}

const userInfo = new UserInfo(".profile__name", ".profile__description");

buttonPen.addEventListener("click", function () {
  popupWithFormEdit.open();
  profileValidation.resetValidation();

  //what was before
  // const { name, description } = userInfo.getUserInfo();
  // inputName.value = name;
  // inputDescription.value = description;
  // profileValidation.resetValidation();
  // popupWithFormEdit.open();
});

buttonAdd.addEventListener("click", function () {
  newCardValidation.disableSubmitButton();
  popupWithFormAdd.open();
});

editAvatarButton.addEventListener("click", function () {
  popupEditAvatar.open();
});

function updateUserInfoNode(name, about) {
  userInfo.setUserInfo(name, about);
}

function callbackEdit(data) {
  return api
    .updateUserInfo({
      name: data["name-input"],
      about: data["description-input"],
    })
    .then((res) => {
      //console.log(res.name, res.about);
      return updateUserInfoNode(res.name, res.about);
    })
    .catch((err) => console.log(err));
  //what was before
  //userInfo.setUserInfo(data["name-input"], data["description-input"]);
}

const popupWithFormEdit = new PopupWithForm(
  ".popup_place_profile",
  callbackEdit
);

const popupWithFormAdd = new PopupWithForm(".popup_place_add-card", (data) =>
  api.addCard(data).then((data) => cardsSection.addItem(data))
);

popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithImage.setEventListeners();
popupEditAvatar.setEventListeners();

const profileValidation = new FormValidator(selectors, formEditProfile);
const newCardValidation = new FormValidator(selectors, formAddCard);
const avatarValidation = new FormValidator(selectors, formEditAvatar);
profileValidation.enableValidation();
newCardValidation.enableValidation();
avatarValidation.enableValidation();
