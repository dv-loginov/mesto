import data from './data.js';
import Card from './Card.js';
import Popup from './Popup.js';
import Form from './Form.js';
import FormValidator from './FormValidator.js';
import CardList from './CardList.js';

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
    img: {
        caption: '.popup__caption',
        link: '.popup__img',
    }
};

const url = document.querySelector(selectors.img.link);
const caption = document.querySelector(selectors.img.caption);

const title = document.querySelector(selectors.profile.title);
const subtitle = document.querySelector(selectors.profile.subtitle);

const buttonEdit = document.querySelector(selectors.button.edit);
const buttonAdd = document.querySelector(selectors.button.add);

const popups = {
    profilePopup: new Popup('.popup_type_profile'),
    cardPopup: new Popup('.popup_type_place'),
    imagePopup: new Popup('.popup_type_img'),
};

const profileForm = new Form("profile-form", profileFormSubmit);
const cardForm = new Form("card-form", cardPlaceSubmit);

const cardList = new CardList(
    selectors.card.container,
    (data) => {
        cardList.addCard(renderCard(data));
    }
);

profileForm.setEventListeners();
cardForm.setEventListeners();

buttonEdit.addEventListener('click', () => {
    popups.profilePopup.open();
    formValidators['profile-form'].resetValidation();
    profileForm.setInputValue('name', title.textContent);
    profileForm.setInputValue('job', subtitle.textContent);
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
                popups.imagePopup.open();
                url.setAttribute('src', instance._link);
                caption.setAttribute('alt', instance._name);
                caption.textContent = instance._name;
            },
        },
        selectors.card,
    );
    return card.createCard();
}

function profileFormSubmit(event) {
    event.preventDefault();
    title.textContent = profileForm.getInpitValue('name');
    subtitle.textContent = profileForm.getInpitValue('job');
    popups.profilePopup.close();
}

function cardPlaceSubmit(event) {
    event.preventDefault();
    const name = cardForm.getInpitValue('name');
    const link = cardForm.getInpitValue('url');
    cardList.addCard(renderCard({ name, link }));
    event.target.reset();
    popups.cardPopup.close();
}

cardList.renderCards(data);

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