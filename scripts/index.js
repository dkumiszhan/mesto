const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const popupProfile = document.querySelector('.popup_place_profile');
const buttonPen = document.querySelector('.profile__button-pen');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupClose = document.querySelectorAll('.popup .popup__close');
const popupForm = document.querySelector('.popup__inputs');

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
  const removeButton = getElementTemplate.querySelector('.elements__remove');
  removeButton.addEventListener('click', removeElement);
  const likeButton = getElementTemplate.querySelector('.elements__list-button');
  likeButton.addEventListener('click', likeElement);
  return getElementTemplate;

}

render();

function likeElement(evt) {
  console.log(evt);
  const element = evt.target;
  element.classList.add('elements__list-button_active');
  element.classList.remove('element__list-button_inactive');
}

function removeElement(evt) {
  const element = evt.target.closest('.elements__list-item');
  element.remove();
  
}

function closePopup(evt) {
  evt.target.parentNode.parentNode.classList.remove('popup_opened');
}

buttonPen.addEventListener('click', function() {
    inputName.value = profileName.innerText;
    inputDescription.value = profileDescription.innerText;
    popupProfile.classList.add('popup_opened');
});

buttonAdd.addEventListener('click', function() {
    
    popupAddCard.classList.add('popup_opened');
    console.log('button add clicked');

});


for (let i = 0; i < popupClose.length; i++) {
  popupClose[i].addEventListener('click', function(evt) {
    console.log('closing popup');
    closePopup(evt);
    inputName.value = '';
    inputDescription.value = ''; 
  });
}

// popupClose.addEventListener('click', function(evt) {
//     console.log('closing popup');
//     closePopup(evt);
//     inputName.value = '';
//     inputDescription.value = ''; 
// });

// for (let i = 0; i < popupForm.length; i++) {
//     popupForm[i].addEventListener('submit', function(evt) {
//         console.log('submitting form');
//         evt.preventDefault();
//         profileName.innerText = inputName.value;
//         profileDescription.innerText = inputDescription.value;
//         closePopup(evt);
//     });
//   }

popupForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    profileName.innerText = inputName.value;
    profileDescription.innerText = inputDescription.value;
    closePopup(evt);
});


popupFormAdd.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const inputTitle = document.querySelector('.popup__input_type_title').value;
  const inputLink = document.querySelector('.popup__input_type_link').value;
  const element = getElement({name: inputTitle, link: inputLink});
  elementsList.prepend(element);
  closePopup(evt);
  
});
