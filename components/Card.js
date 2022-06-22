import { data } from "autoprefixer";

export class Card {
  constructor(
    {
      data,
      isLikedByMe,
      isOwnedByMe,
      handleCardClick,
      handleRemoveCard,
      handleLikeClick,
    },
    templateSelector
  ) {
    this._imageLink = data.link;
    this._imageTitle = data.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveCard = handleRemoveCard;
    this._handleLikeClick = handleLikeClick;
    this._data = data;
    this._isLikedByMe = isLikedByMe;
    this._isOwnedByMe = isOwnedByMe;
  }

  getId() {
    //console.log(this._data._id);
    return this._data._id;
  }

  isLikedByMe() {
    //console.log(this._data.likes);
    // return this._data.likes.findIndex((like) => like._id == this._userId) != -1;
    return this._isLikedByMe;
  }

  _updateLikesView() {
    if (this.isLikedByMe()) {
      this._likeButton.classList.add("elements__list-button_active");
    } else {
      this._likeButton.classList.remove("elements__list-button_active");
    }

    this._likeCount.textContent = this._data.likes.length;
  }

  updateLikesState(likes, isLikedByMe) {
    this._data.likes = likes;
    this._isLikedByMe = isLikedByMe;

    this._updateLikesView();
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
    this._likeButton = this._element.querySelector(".elements__list-button");
    this._removeButton = this._element.querySelector(".elements__remove");
    this._likeCount = this._element.querySelector(".elements__like-count");

    this._setEventListeners();

    this._cardTitle.textContent = this._imageTitle;
    this._cardImage.src = this._imageLink;
    this._cardImage.alt = this._imageTitle;

    this._updateLikesView();

    if (!this._isOwnedByMe) {
      //console.log("card owner not me");
      this._removeButton.classList.add("elements__remove_hidden");
    }

    return this._element;
  }

  // _handleRemoveCard() {
  //   this._element.remove();
  //   this._element = null;
  // }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  // _handleLikeCount(count, enabled) {
  //   this._likeCount = this._element.querySelector(".elements__like-count");
  //   // this._likeCount.textContent = count;
  //   // if (enabled) {
  //   //   this._likeButton.classList.add("elements__list-button_active");
  //   // } else {
  //   //   this._likeButton.classList.remove("elements__list-button_active");
  //   // }
  //   this._updateLikesView(count);
  // }

  _setEventListeners() {
    this._removeButton.addEventListener("click", () => {
      this._handleRemoveCard(this);
    });

    this._likeButton.addEventListener("click", () =>
      this._handleLikeClick(this)
    );

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  }
}
