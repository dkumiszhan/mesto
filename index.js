console.log('hello world');

document.querySelector('.profile__button-pen').addEventListener('click', function() {
    document.querySelector('.popup__input-name').value = document.querySelector('.profile__name').innerText;
    document.querySelector('.popup__input-description').value = document.querySelector('.profile__description').innerText;
    document.querySelector('.popup').classList.add('popup_opened');
});

document.querySelector('.popup .popup__close').addEventListener('click', function() {
    console.log('closing popup');
    document.querySelector('.popup').classList.remove('popup_opened');
    document.querySelector('.popup__input-name').value = '';
    document.querySelector('.popup__input-description').value = ''; 
});

document.querySelector('.popup').addEventListener('submit', function(evt) {
    evt.preventDefault();

    console.log('asdasdf');
    console.log('called ' + document.querySelector('.popup__input-name').value);
    document.querySelector('.profile__name').innerText = document.querySelector('.popup__input-name').value;
    document.querySelector('.profile__description').innerText = document.querySelector('.popup__input-description').value;
    document.querySelector('.popup').classList.remove('popup_opened');
});


console.log('done');
