import './index.css';
import {
    cardClass,
    profileClass,
    popups,
    buttonEdit,
    buttonAdd,
    buttonAvatar,
    formClass as config,
    formValidators
} from '../utils/constants.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithQuestion from '../components/PopupWithQuestion.js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
    headers: {
        authorization: 'd07ea27d-96e0-4847-8c63-3989714313d5',
        'Content-Type': 'application/json'
    }
});

const profilePopup = new PopupWithForm(popups.profilePopup, handleProfileFormSubmit);
const cardPopup = new PopupWithForm(popups.cardPopup, handleCardPlaceSubmit);
const avatarPopup = new PopupWithForm(popups.avatarPopup, handleAvatarSubmit);
const imagePopup = new PopupWithImage(popups.imagePopup);
const deletePopup = new PopupWithQuestion(popups.deletePopup, handleQuestionSubmit)

let cardList = {};

const handle = {
    showImage: handleCardImageClick,
    likedImage: handleLikeClick,
    deleteImage: handleDeleteCard,
}

const userInfo = new UserInfo(profileClass);

const user = api.getUser();
const initData = api.getInitialCards();



initData
    .then(cards => {
        cardList = new Section({ items: cards, renderer: renderCard }, cardClass.container)
        user.then(user => {
            Card._myID = user._id;
            userInfo.setUserInfo({ name: user.name, job: user.about });
            userInfo.setAvatar(user.avatar);
            cardList.renderCards();
        });
    })
    .catch(err => {
        console.log(err);
    });

buttonEdit.addEventListener('click', () => {
    profilePopup.open();
    profilePopup.setInputValues(userInfo.getUserInfo());
    formValidators['profile-form'].resetValidation();
});

buttonAdd.addEventListener('click', () => {
    cardPopup.open();
    formValidators['card-form'].resetValidation();
});

buttonAvatar.addEventListener('click', () => {
    avatarPopup.open();
    formValidators['avatar-form'].resetValidation();
});



function handleCardImageClick(data) {
    imagePopup.open(data);
};

function handleLikeClick({ id, isLike }, instance) {
    let like = {};

    (isLike) ? like = api.setLike(id) : like = api.deleteLike(id)

    like
        .then((card) => {
            instance.setLike(card.likes);
        })
        .catch((err) => console.log(err));
};

function handleProfileFormSubmit(data) {
    const user = api.setUser(data);
    user
        .then((user) => {
            userInfo.setUserInfo({ name: user.name, job: user.about });
        })
        .catch((err) => console.log(err))
        .finally(() => {
            profilePopup.close()
            profilePopup.toogleButton(false);
        });
};

function handleCardPlaceSubmit(data) {
    const card = api.addCard({ name: data.name, link: data.url });
    card
        .then((card) => {
            renderCard(card);
        })
        .catch((err) => console.log(err))
        .finally(() => {
            cardPopup.close();
            cardPopup.toogleButton(false);
        });
};

function handleAvatarSubmit(data) {
    const avatar = api.setAvatar(data.url);
    avatar
        .then((user) => {
            userInfo.setAvatar(user.avatar);
        })
        .catch((err) => console.log(err))
        .finally(() => {
            avatarPopup.close()
            avatarPopup.toogleButton(false);
        });
};

function handleQuestionSubmit({ id, instance }) {
    const card = api.deleteCard(id);
    card
        .then((card) => {
            instance.deleteCard();
        })
        .catch((err) => console.log(err));
    deletePopup.close();
}

function handleDeleteCard(data) {
    deletePopup.open(data);
}

function renderCard(data) {
    const card = createCard(data);
    cardList.addItem(card);
};

function createCard(data) {
    const cardElement = new Card(data, { handle });
    return cardElement.createCard();
};
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