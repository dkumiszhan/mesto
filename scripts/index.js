const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const popupProfile = document.querySelector('.popup_place_profile');
const buttonPen = document.querySelector('.profile__button-pen');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupCloseProfile = document.querySelector('.popup .popup__close_place_profile');
const popupCloseAddCard = document.querySelector('.popup .popup__close_place_add-card');
const popupCloseShowCard = document.querySelector('.popup .popup__close_place_show-card');
const popupFormEdit = document.querySelector('.popup__inputs_type_edit');

const popupAddCard = document.querySelector('.popup_place_add-card');
const buttonAdd = document.querySelector('.profile__button-add');


const popupFormAdd = document.querySelector('.popup__inputs_type_add');


const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const cardsContainer = document.querySelector('.elements__list');
const template = document.querySelector('.template-elements');

function render() {
  const html = initialCards.map(getElement);
  cardsContainer.append(...html);
}

function getElement(item) {
  const getElementTemplate = template.content.cloneNode(true);
  const elementListTitle = getElementTemplate.querySelector('.elements__list-title');
  elementListTitle.textContent = item.name;
  const elementListImage = getElementTemplate.querySelector('.elements__list-image');
  elementListImage.src = item.link;
  elementListImage.alt = item.name;
  const removeButton = getElementTemplate.querySelector('.elements__remove');
  removeButton.addEventListener('click', removeElement);
  const likeButton = getElementTemplate.querySelector('.elements__list-button');
  likeButton.addEventListener('click', likeElement);
  const listImage = getElementTemplate.querySelector('.elements__list-image');
  listImage.addEventListener('click', showImage);

  return getElementTemplate;

}

render();

const popupImage = document.querySelector('.popup__image');
const popupShowImage = document.querySelector('.popup_place_show-card');
const popupTitleShowCard = document.querySelector('.popup__title_place_show-card');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function showImage(evt) {
  const element = evt.target;
  popupImage.src = element.src;
  const currentListElement = element.closest('.elements__list-item');
  const currentListImage = currentListElement.querySelector('.elements__list-image');
  popupImage.alt = currentListImage.alt;
  popupTitleShowCard.textContent = currentListImage.alt;
  openPopup(popupShowImage);
}




function likeElement(evt) {
  const element = evt.target;
  element.classList.toggle('elements__list-button_active');
}

function removeElement(evt) {
  const element = evt.target.closest('.elements__list-item');
  element.remove();
  
}


function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

buttonPen.addEventListener('click', function() {
    inputName.value = profileName.innerText;
    inputDescription.value = profileDescription.innerText;
    openPopup(popupProfile);
});

buttonAdd.addEventListener('click', function() {
    openPopup(popupAddCard);

});

popupCloseProfile.addEventListener('click', function() {
  closePopup(popupProfile);
  inputName.value = '';
  inputDescription.value = '';
});

popupCloseAddCard.addEventListener('click', function() {
  closePopup(popupAddCard);
});

popupCloseShowCard.addEventListener('click', function() {
  closePopup(popupShowImage);
});


popupFormEdit.addEventListener('submit', function(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup(popupProfile);
});

const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');

popupFormAdd.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const element = getElement({name: inputTitle.value, link: inputLink.value});
  cardsContainer.prepend(element);
  closePopup(popupAddCard); 
  inputTitle.value = '';
  inputLink.value = '';
});
