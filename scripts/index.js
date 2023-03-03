import data from './data.js';
import Card from './Card.js';
import Popup from './Popup.js';
import Form from './Form.js';
import FormValidator from './FormValidator.js';
import { addCard } from './helpers.js';

const cardTemplateSelector = '#card';
const cardsContainerNode = document.querySelector('.elements');

const editBtnNode = document.querySelector('.profile__edit-btn');
const addBtnNode = document.querySelector('.add-btn');

const profileTitleNode = document.querySelector('.profile__title');
const profileSubtitleNode = document.querySelector('.profile__subtitle');

const imgNode = document.querySelector('.popup__img');
const captionNode = document.querySelector('.popup__caption');

const popups = {
    profilePopup: new Popup('.popup_type_profile'),
    cardPopup: new Popup('.popup_type_place'),
    imagePopup: new Popup('.popup_type_img'),
};

const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    profileTitleNode.textContent = forms.profileForm.getInpitValue('name');
    profileSubtitleNode.textContent = forms.profileForm.getInpitValue('job');
    popups.profilePopup.close();
}

const handleCardPlaceSubmit = (evt) => {
    evt.preventDefault();
    const name = forms.cardForm.getInpitValue('name');
    const link = forms.cardForm.getInpitValue('url');
    if (name && link) {
        const card = new Card({ name, link }, cardTemplateSelector, handleCard);
        addCard(cardsContainerNode, card.createCard(), false);
        popups.cardPopup.close();
        evt.target.reset();
    }
}

const forms = {
    profileForm: new Form("profile-form", handleProfileFormSubmit),
    cardForm: new Form("card-form", handleCardPlaceSubmit),
};

editBtnNode.addEventListener('click', (event) => {
    popups.profilePopup.open();
    forms.profileForm.setInputValue('name', profileTitleNode.textContent);
    forms.profileForm.setInputValue('job', profileSubtitleNode.textContent);
});

addBtnNode.addEventListener('click', (event) => {
    popups.cardPopup.open();
    if ((forms.cardForm.getInpitValue('name') === "") || (forms.cardForm.getInpitValue('url') === "")) {
        forms.cardForm.getRoot().elements.create.classList.add('form__btn_inactive');
        forms.cardForm.getRoot().elements.create.disabled = true;
    }
});

const handleCard = {
    trash: (event) => {
        event.target.closest('.element').remove();
    },
    like: (event) => {
        event.target.classList.toggle('element__btn-like_active');
    },
    img: (event) => {
        popups.imagePopup.open();
        imgNode.setAttribute('src', event.target.getAttribute('src'));
        captionNode.setAttribute('alt', event.target.getAttribute('alt'));
        captionNode.textContent = event.target.getAttribute('alt');
    },
}

data.forEach((item) => {
    const card = new Card(item, cardTemplateSelector, handleCard);
    addCard(cardsContainerNode, card.createCard());
});

const optFormValidator = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__btn',
    inactiveButtonClass: 'form__btn_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
}

Array.from(document.forms).forEach((form) => {
    const formValidator = new FormValidator(optFormValidator, form);
    formValidator.enableValidation();
})