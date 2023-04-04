import { cardClass } from '../utils/constants.js';

export default class Card {
    static _template = document.querySelector(cardClass.template).content;
    static _myID = '';
    constructor(data, { handle}) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data._id;
        this._ownerID = data.owner._id;
        this._deleteCard = this.deleteCard.bind(this);
        this._toogleLike = this._toogleLike.bind(this);
        this._myLike = false;
        this._handleImageClick = handle.showImage;
        this._handleLikeClick = handle.likedImage;
        this._handleDeleteClick = handle.deleteImage;
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

        if (Card._myID !== this._ownerID) this._btnDeleteCard.style.display = 'none';

        this._element.querySelector(cardClass.name).textContent = this._name;
        this.setLike(this._likes);

        if (this._isHaveMyLike()) this._toogleLike();

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

        this._btnDeleteCard.addEventListener('click', () => {
            this._handleDeleteClick({ id: this._id, instance: this });
        })
        
        this._btnToogleLike.addEventListener('click', this._toogleLike);
    }

    setLike(likes) {
        this._likes = Object.assign([], likes);
        this._element.querySelector(cardClass.like).textContent = this._likes.length;
    }

    _isHaveMyLike() {
        let isHaveMyLike = false;

        this._likes.map((item => {
            if (item._id === Card._myID) isHaveMyLike = true;
        }));

        return isHaveMyLike;
    }

    _toogleLike() {
        this._btnToogleLike.classList.toggle(cardClass.btnLikeActiveClass);
        this._myLike = !this._myLike;
        this._handleLikeClick({ id: this._id, isLike: this._myLike }, this);
    }

    deleteCard() {
        this._element.remove();
    }
}