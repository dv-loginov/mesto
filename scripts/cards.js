import initialCards from './initialCards.js';
import initNodes from './initialNodes.js';
import { popups, openPopup } from './popups.js';

const cardRootSelectors = [
    { sel: '#card', node: 'cardTemplate' },
    { sel: '.elements', node: 'cardsContainer' },
];

const imagePopupSelectors = [
    { sel: '.popup__img', node: 'img' },
    { sel: '.popup__caption', node: 'caption' },
];

const cardRoot = initNodes(cardRootSelectors);

const imagePopupNodes = initNodes(imagePopupSelectors, popups.imagePopup);

export function renderCards() {
    initialCards.forEach((item) => {
        addCard(item.name, item.link);
    });
}

export function addCard(name, link, metod = true) {
    metod
        ? cardRoot.cardsContainer.append(createCard(name, link))
        : cardRoot.cardsContainer.prepend(createCard(name, link));
}

function createCard(name, link) {
    const cardContent = cardRoot.cardTemplate.content;
    const card = cardContent.cloneNode(true);

    const cardSelectors = [
        { sel: '.element__name', node: 'cardName' },
        { sel: '.element__img', node: 'cardImg' },
        { sel: '.element__btn-trash', node: 'cardTrash' },
        { sel: '.element__btn-like', node: 'cardLike' },
    ];

    const cardNodes = initNodes(cardSelectors, card);

    cardNodes.cardName.textContent = name;
    cardNodes.cardImg.setAttribute('src', link);
    cardNodes.cardImg.setAttribute('alt', name);

    cardNodes.cardTrash.addEventListener('click', (event) => {
        event.target.closest('.element').remove();
    });

    cardNodes.cardLike.addEventListener('click', (event) => {
        event.target.classList.toggle('element__btn-like_active');
    });

    cardNodes.cardImg.addEventListener('click', (event) => {
        openPopup(popups.imagePopup);
        imagePopupNodes.img.setAttribute('src', event.target.getAttribute('src'));
        imagePopupNodes.img.setAttribute('alt', event.target.getAttribute('alt'));
        imagePopupNodes.caption.textContent = event.target.getAttribute('alt');
    });
    return card;
}

export default renderCards;