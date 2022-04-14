const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const popup = document.querySelector('.popup');
const buttonPen = document.querySelector('.profile__button-pen');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupClose = document.querySelector('.popup .popup__close');
const popupForm = document.querySelector('.popup__inputs');

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

const elementsList = document.querySelector('.elements__list');
const template = document.querySelector('.template-elements');

function render() {
  const html = initialCards.map(getElement);
  elementsList.append(...html);
}

function getElement(item) {
  const getElementTemplate = template.content.cloneNode(true);
  const elementListTitle = getElementTemplate.querySelector('.elements__list-title');
  elementListTitle.textContent = item.name;
  const elementListImage = getElementTemplate.querySelector('.elements__list-image');
  elementListImage.src = item.link;
  return getElementTemplate;

}

render();


function closePopup() {
  popup.classList.remove('popup_opened');
}

buttonPen.addEventListener('click', function() {
    inputName.value = profileName.innerText;
    inputDescription.value = profileDescription.innerText;
    popup.classList.add('popup_opened');
});

popupClose.addEventListener('click', function() {
    console.log('closing popup');
    closePopup();
    inputName.value = '';
    inputDescription.value = ''; 
});

popupForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    profileName.innerText = inputName.value;
    profileDescription.innerText = inputDescription.value;
    closePopup();
});

