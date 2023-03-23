import { cardClass } from '../utils/constants.js';

export default class Card {
    static _template = document.querySelector(cardClass.template).content;
    constructor(data, handleImageClick) {
        this._name = data.name;
        this._link = data.link;
        this._handleImageClick = handleImageClick;
        this._deleteCard = this._deleteCard.bind(this);
        this._toogleLike = this._toogleLike.bind(this);
    }

    _getTemplate() {
        const element = Card._template.querySelector(cardClass.element).cloneNode(true);
        return element;
    }


    createCard() {
        this._element = this._getTemplate();

        this._img = this._element.querySelector(cardClass.img);
        this._btnToogleLike = this._element.querySelector(cardClass.btnLike);
        this._btnDeleteCard = this._element.querySelector(cardClass.btnTarsh);

        this._element.querySelector(cardClass.name).textContent = this._name;

        this._img.setAttribute('src', this._link);
        this._img.setAttribute('alt', this._name);

        this._setEventListeners();
        return this._element;
    }

    _setEventListeners() {
        this._img.addEventListener('click', () => {
            this._handleImageClick({
                name: this._name,
                link: this._link
            })
        });
        this._btnDeleteCard.addEventListener('click', this._deleteCard);
        this._btnToogleLike.addEventListener('click', this._toogleLike);
    }

    _toogleLike() {
        this._btnToogleLike.classList.toggle(cardClass.btnLikeActiveClass);
    }

    _deleteCard() {
        this._element.remove();
    }
}