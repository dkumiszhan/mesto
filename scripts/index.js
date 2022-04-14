const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const popup = document.querySelector('.popup');
const buttonPen = document.querySelector('.profile__button-pen');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupClose = document.querySelector('.popup .popup__close');
const popupForm = document.querySelector('.popup__inputs');

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

