export class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._imageLink = data.link;
    this._imageTitle = data.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".elements__list-button");
    this._removeButton = this._element.querySelector(".elements__remove");

    this._removeButton.addEventListener("click", () => {
      this._handleRemoveCard();
    });
    this._likeButton.addEventListener("click", () => {
      this._handleLikeCard();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  }
}
