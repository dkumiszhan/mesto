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
    this._cardImage = this._element.querySelector(".elements__list-image");
    this._cardTitle = this._element.querySelector(".elements__list-title");
    this._setEventListeners();

    this._cardTitle.textContent = this._imageTitle;
    this._cardImage.src = this._imageLink;
    this._cardImage.alt = this._imageTitle;
    return this._element;
  }

  _handleRemoveCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeCard() {
    this._likeButton.classList.toggle("elements__list-button_active");
  }

  _handleShowCard() {
    popupImage.src = this._cardImage.src;
    popupImage.alt = this._cardImage.alt;
    popupTitleShowCard.textContent = this._cardImage.alt;
    openPopup(popupShowImage);
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".elements__list-button");
    this._removeButton = this._element.querySelector(".elements__remove");

    this._removeButton.addEventListener("click", () => {
      this._handleRemoveCard();
    });
    this._likeButton.addEventListener("click", () => {
      this._handleLikeCard();
    });
    this._element
      .querySelector(".elements__list-image")
      .addEventListener("click", () => {
        this._handleShowCard();
      });
  }
}
