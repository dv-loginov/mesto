export default class Card {
    constructor(data, templateSelector, handle) {
        this._templateSelector = templateSelector;
        this._name = data.name;
        this._link = data.link;
        this._handle = handle;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.element__img')
            .addEventListener('click', this._handle.img);
        this._element.querySelector('.element__btn-trash')
            .addEventListener('click', this._handle.trash);
        this._element.querySelector('.element__btn-like')
            .addEventListener('click', this._handle.like);
    }

    createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        const imgNode = this._element.querySelector('.element__img');
        imgNode.setAttribute('src', this._link);
        imgNode.setAttribute('alt', this._name);
        this._element.querySelector('.element__name').textContent = this._name;

        return this._element;
    }
}