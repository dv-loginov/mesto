export default class Card {
    constructor(data, handle, selectors) {
        this._name = data.name;
        this._link = data.link;
        this._toogleLike = handle.toogleLike;
        this._imageClick = handle.imageClick;
        this._selectors = selectors;
        Card._template = document.querySelector(this._selectors.template).content;

        this._deleteCard = this._deleteCard.bind(this);
    }

    _getTemplate() {
        const element = Card._template.querySelector('.element').cloneNode(true);
        return element;
    }

    
    createCard() {
        this._element = this._getTemplate();
        
        this._img = this._element.querySelector(this._selectors.img);
        this._btnToogleLike = this._element.querySelector(this._selectors.btnLike);
        this._btnDeleteCard = this._element.querySelector(this._selectors.btnTarsh);
        
        this._element.querySelector(this._selectors.name).textContent = this._name;

        this._img.setAttribute('src', this._link);
        this._img.setAttribute('alt', this._name);

        this._setEventListeners();
        return this._element;
    }
    
    _setEventListeners() {
        this._img.addEventListener('click', () => { this._imageClick(this) });
        this._btnDeleteCard.addEventListener('click', this._deleteCard);
        this._btnToogleLike.addEventListener('click', () => { this._toogleLike(this) });
    }

    _deleteCard() {
        this._element.remove();
    }
}