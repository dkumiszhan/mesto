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

function editAvatarHandler(popup, formData) {
  popup.setInProgress(true);
  return api
    .updateAvatar(formData)
    .then((res) => {
      userInfo.updateAvatarNode(res.avatar);
      popup.close();
    })
    .finally(() => popup.setInProgress(false))
    .catch((err) => console.log(err));
}

// function updateAvatarNode(link) {
//   // document.querySelector(".profile .profile__avatar").src = link;
//   document.querySelector(
//     ".profile__avatar-container"
//   ).style.backgroundImage = `url(${link})`;
// }

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-43",
  headers: {
    "Content-type": "application/json",
    authorization: "c1d97d50-899b-43cb-b95d-18fefc90a34b",
  },
});

let userId = undefined;

function createCard(data) {
  const card = new Card(
    {
      data: data,
      isLikedByMe: data.likes.findIndex((like) => like._id == userId) != -1,
      isOwnedByMe: data.owner._id === userId,
      handleCardClick: () => {
        popupWithImage.open(data.link, data.name);
      },
      handleRemoveCard: (card) => {
        deleteCardHandler(card);
      },
      handleLikeClick: (card) => {
        return likeCardHandler(card);
      },
    },
    ".template-elements"
  );

  return card.generateCard();
}

const cardsSection = new Section(createCard, ".elements__list");
// cardsSection.renderItems();

const popupEditAvatar = new PopupWithForm(
  ".popup_place_edit-avatar",
  (popup, formData) => editAvatarHandler(popup, formData)
);

api
  .getUserInfo()
  .then((res) => {
    //console.log(res);
    userId = res._id;
    userInfo.updateAvatarNode(res.avatar);
    userInfo.setUserInfo(res.name, res.about);
    // popupWithFormEdit.setInputValues({
    //   "name-input": res.name,
    //   "description-input": res.about,
    // });
  })
  .then(() => api.getInitialCards())
  .then((cards) => {
    cardsSection.renderItems(cards);
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

const popupWithSubmit = new PopupWithSubmit(".popup_place_confirm", (card) =>
  deletePopupSubmitHandler(card)
);

function deleteCardHandler(card) {
  popupWithSubmit.open(card);
}

function likeCardHandler(card) {
  if (!card.isLikedByMe()) {
    return api
      .putLike(card.getId())
      .then((res) => {
        return card.updateLikesState(res.likes, true);
      })
      .catch((err) => console.log(err));
  } else {
    return api
      .deleteLike(card.getId())
      .then((res) => {
        return card.updateLikesState(res.likes, false);
      })
      .catch((err) => console.log(err));
  }
}

const userInfo = new UserInfo(".profile__name", ".profile__description");

buttonPen.addEventListener("click", function () {
  const { name, description } = userInfo.getUserInfo();
  inputName.value = name;
  inputDescription.value = description;
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
  avatarValidation.disableSubmitButton();

  popupEditAvatar.open();
});

function callbackEdit(popup, formData) {
  popup.setInProgress(true);
  return api
    .updateUserInfo({
      name: formData["name-input"],
      about: formData["description-input"],
    })
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      popup.close();
    })
    .finally(() => popup.setInProgress(false))
    .catch((err) => console.log(err));
  //what was before
  //userInfo.setUserInfo(data["name-input"], data["description-input"]);
}

const popupWithFormEdit = new PopupWithForm(
  ".popup_place_profile",
  callbackEdit
);

const popupWithFormAdd = new PopupWithForm(
  ".popup_place_add-card",
  (popup, formData) => {
    popup.setInProgress(true);
    api
      .addCard(formData)
      .then((data) => {
        cardsSection.addItem(data);
        popup.close();
      })
      .finally(() => popup.setInProgress(false))
      .catch((err) => console.log(err));
  }
);

popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithImage.setEventListeners();
popupEditAvatar.setEventListeners();
popupWithSubmit.setEventListeners();

const profileValidation = new FormValidator(selectors, formEditProfile);
const newCardValidation = new FormValidator(selectors, formAddCard);
const avatarValidation = new FormValidator(selectors, formEditAvatar);
profileValidation.enableValidation();
newCardValidation.enableValidation();
avatarValidation.enableValidation();
