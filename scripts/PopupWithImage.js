import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._url = document.querySelector('.popup__img');
        this._caption = document.querySelector('.popup__caption');
    }

    open({link, name}) {
        super.open();
        this._url.setAttribute('src', link);
        this._caption.setAttribute('alt', name);
        this._caption.textContent = name;
    }
}