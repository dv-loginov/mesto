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

Promise.all([api.getUser(), api.getInitialCards()])
    .then((results) => {
        const [user, cards] = results;
        
        userInfo.setUserInfo({ name: user.name, job: user.about });
        userInfo.setAvatar(user.avatar);
        Card._myID = user._id;
        cardList = new Section({ renderer: renderCard }, cardClass.container);
        cardList.renderItems(cards);
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

    (isLike) ? like = api.deleteLike(id) : like = api.setLike(id);

    like
        .then((card) => {
            instance.setLike(card.likes);
        })
        .catch((err) => console.log(err));
};

function handleDeleteCard(data) {
    deletePopup.open(data);
}

function handleProfileFormSubmit(data) {
    const user = api.setUser(data);
    user
        .then((user) => {
            userInfo.setUserInfo({ name: user.name, job: user.about });
            profilePopup.close()
        })
        .catch((err) => console.log(err))
        .finally(() => {
            profilePopup.toogleButton(false);
        });
};

function handleCardPlaceSubmit(data) {
    const card = api.addCard({ name: data.name, link: data.url });
    card
        .then((card) => {
            renderCard(card);
            cardPopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            cardPopup.toogleButton(false);
        });
};

function handleAvatarSubmit(data) {
    const avatar = api.setAvatar(data.url);
    avatar
        .then((user) => {
            userInfo.setAvatar(user.avatar);
            avatarPopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            avatarPopup.toogleButton(false);
        });
};

function handleQuestionSubmit({ id, instance }) {
    const card = api.deleteCard(id);
    card
        .then((card) => {
            instance.deleteCard();
            deletePopup.close();
        })
        .catch((err) => console.log(err));
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