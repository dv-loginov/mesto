import cards from './initialCards.js';

const cardTemplate = document.querySelector('#card').content;
const cardsContainer = document.querySelector('.elements');

const popups = document.querySelectorAll('.popup');

const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.add-btn');

renderCards();

function renderCards() {
    cards.forEach((item) => {
        addCard(item.name, item.link);
    });
}

function createCard(name, link) {
    const card = cardTemplate.cloneNode(true);
    card.querySelector('.element__name').textContent = name;
    const imgNode = card.querySelector('.element__img');
    imgNode.setAttribute('src', link);
    imgNode.setAttribute('alt', name);
    return card;
}

function addCard(name, link, metod = true) {
    metod
        ?cardsContainer.append(createCard(name, link))
        :cardsContainer.prepend(createCard(name, link));
}

cardsContainer.onclick = (event) => {
    if (event.target.classList.contains('element__btn-trash')) {
        event.target.closest('.element').remove();
    }

    if (event.target.classList.contains('element__btn-like')) {
        event.target.classList.toggle('element__btn-like_active');
    }

    if (event.target.classList.contains('element__img')) {
        openPopup('popup_type_img');
        const popup = document.querySelector('.popup_type_img');
        const img = popup.querySelector('.popup__img');
        const caption = popup.querySelector('.popup__caption');
        img.setAttribute('src', event.target.getAttribute('src'));
        img.setAttribute('alt', event.target.getAttribute('alt'));
        caption.textContent = event.target.getAttribute('alt');       
    }
} 

popups.forEach((popup) => {
    popup.querySelector('.popup__close').onclick = () => {
        closePopup (popup);
    }
});

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openPopup(type) { 
    console.log(type);
    const popup = document.querySelector(`.${type}`);
    popup.classList.add('popup_opened');
}

editBtn.onclick = () => {
    console.log('edit button');
    openPopup('popup_type_profile');
}

addBtn.onclick = () => {
    console.log('add button');
    openPopup('popup_type_place');
}

const formProfile = document.querySelector('.form[name="edit-profile"]');
const nameInput = formProfile.querySelector('.form__input[name="name"]');
const jobInput = formProfile.querySelector('.form__input[name="job"]');

const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');

function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    closePopup(popups[0]);
}

formProfile.addEventListener('submit', handleFormProfileSubmit);

const formPlace = document.querySelector('.form[name="edit-place"]');
const nameImgInput = formPlace.querySelector('.form__input[name="name"]');
const urlInput = formPlace.querySelector('.form__input[name="url"]');

function handleFormformPlaceSubmit(evt) {
    evt.preventDefault();
    if (nameImgInput.value && urlInput.value) {
        addCard(nameImgInput.value, urlInput.value, false);
        closePopup(popups[1]);
    }
}

formPlace.addEventListener('submit', handleFormformPlaceSubmit);