const popupImage = document.querySelector(".popup__image");
const popupShowImage = document.querySelector(".popup_place_show-card");
const popupTitleShowCard = document.querySelector(
  ".popup__title_place_show-card"
);
const popupFormAdd = document.querySelector(".popup__inputs_type_add");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnEsc);
  popup.addEventListener("click", closeOnOverlayClick);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEsc);
}

function closeOnEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function closeOnOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

export {
  popupImage,
  popupShowImage,
  popupTitleShowCard,
  popupFormAdd,
  openPopup,
  closeOnEsc,
  closeOnOverlayClick,
  closePopup,
};
