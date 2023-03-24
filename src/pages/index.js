import './index.css';
import data from '../utils/data.js';

import {
    cardClass,
    profileClass,
    popups,
    buttonEdit,
    buttonAdd,
    formClass as config,
    formValidators
} from '../utils/constants.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

const userInfo = new UserInfo(profileClass);

const profilePopup = new PopupWithForm(popups.profilePopup, handleProfileFormSubmit);
const cardPopup = new PopupWithForm(popups.cardPopup, handleCardPlaceSubmit);
const imagePopup = new PopupWithImage(popups.imagePopup);

const cardList = new Section({ items: data, renderer: renderCard }, cardClass.container);
cardList.renderCards();

buttonEdit.addEventListener('click', () => {
    profilePopup.open();
    profilePopup.setInputValues(userInfo.getUserInfo());
    formValidators['profile-form'].resetValidation();
});

buttonAdd.addEventListener('click', () => {
    cardPopup.open();
    formValidators['card-form'].resetValidation();
});

function renderCard(data) {
    const card = createCard(data);
    cardList.addItem(card);
}

function createCard(data) {
    const cardElement = new Card(data, handleCardImageClick);
    return cardElement.createCard();
}

function handleCardImageClick(data) {
    imagePopup.open(data);
}

function handleProfileFormSubmit(data) {
    userInfo.setUserInfo(data);
    profilePopup.close();
}

function handleCardPlaceSubmit(data) {
    renderCard({name: data.name, link: data.url});
    cardPopup.close();
}

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(formElement, config)
        const formName = formElement.getAttribute('name')
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(config);