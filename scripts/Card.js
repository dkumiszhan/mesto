import {
  popupImage,
  popupShowImage,
  popupTitleShowCard,
  popupFormAdd,
  openPopup,
} from "./utils.js";

export class Card {
  constructor(imageLink, imageTitle, templateSelector) {
    this._imageLink = imageLink;
    this._imageTitle = imageTitle;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__list-item")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".elements__list-title").textContent =
      this._imageTitle;
    this._element.querySelector(".elements__list-image").src = this._imageLink;
    this._element.querySelector(".elements__list-image").alt = this._imageTitle;
    return this._element;
  }

  _handleRemoveCard() {
    this._element.remove();
  }

  _handleLikeCard() {
    this._element
      .querySelector(".elements__list-button")
      .classList.toggle("elements__list-button_active");
  }

  _handleShowCard() {
    const element = this._element.querySelector(".elements__list-image");
    popupImage.src = element.src;
    popupImage.alt = element.alt;
    popupTitleShowCard.textContent = element.alt;
    openPopup(popupShowImage);
  }

  _setEventListeners() {
    const removeButton = this._element.querySelector(".elements__remove");
    const likeButton = this._element.querySelector(".elements__list-button");
    removeButton.addEventListener("click", () => {
      this._handleRemoveCard();
    });
    likeButton.addEventListener("click", () => {
      this._handleLikeCard();
    });
    this._element
      .querySelector(".elements__list-image")
      .addEventListener("click", () => {
        this._handleShowCard();
      });
  }
}
