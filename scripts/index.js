import data from './data.js';
import Card from './Card.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import Form from './Form.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';

const selectors = {
    card: {
        template: '#card',
        container: '.elements',
        element: '.element',
        img: '.element__img',
        name: '.element__name',
        btnTarsh: '.element__btn-trash',
        btnLike: '.element__btn-like',
    },
    button: {
        edit: '.profile__edit-btn',
        add: '.add-btn',
    },
    profile: {
        title: '.profile__title',
        subtitle: '.profile__subtitle',
    },
};

const buttonEdit = document.querySelector(selectors.button.edit);
const buttonAdd = document.querySelector(selectors.button.add);

const popups = {
    profilePopup: new PopupWithForm('.popup_type_profile', profileFormSubmit),
    cardPopup: new PopupWithForm('.popup_type_place', cardPlaceSubmit),
    imagePopup: new PopupWithImage('.popup_type_img'),
};

const userInfo = new UserInfo({name: selectors.profile.title, about: selectors.profile.subtitle});

const profileForm = new Form("profile-form", profileFormSubmit);
const cardForm = new Form("card-form", cardPlaceSubmit);

const cardList = new Section({ items: data, renderer: renderCard }, selectors.card.container);
cardList.renderCards();

buttonEdit.addEventListener('click', () => {
    popups.profilePopup.open();
    formValidators['profile-form'].resetValidation();
    profileForm.setInputValue('name', userInfo.getUserInfo().name);
    profileForm.setInputValue('job', userInfo.getUserInfo().about);
});

buttonAdd.addEventListener('click', () => {
    popups.cardPopup.open();
    formValidators['card-form'].resetValidation();
});

function renderCard(data) {
    const card = new Card(
        data,
        {
            toogleLike: (instance) => {
                instance._btnToogleLike.classList.toggle('element__btn-like_active');
            },
            imageClick: (instance) => {
                popups.imagePopup.open({ link: instance._link, name: instance._name });
            },
        },
        selectors.card,
    );
    cardList.addItem(card.createCard());
}

function profileFormSubmit(event) {
    event.preventDefault();
    const name = profileForm.getInpitValue('name');
    const about = profileForm.getInpitValue('job');
    userInfo.setUserInfo({name: name, about: about});
    popups.profilePopup.close();
}

function cardPlaceSubmit(event) {
    event.preventDefault();
    const name = cardForm.getInpitValue('name');
    const link = cardForm.getInpitValue('url');
    renderCard({ name, link });
    popups.cardPopup.close();
}

const config = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__btn',
    inactiveButtonClass: 'form__btn_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
}

const formValidators = {}

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