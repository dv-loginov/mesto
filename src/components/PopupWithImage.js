import Popup from './Popup.js';
import { popupImageClass as popup } from '../utils/constants';

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._url = document.querySelector(popup.imageUrl);
        this._caption = document.querySelector(popup.caption);
    }

    open({link, name}) {
        super.open();
        this._url.setAttribute('src', link);
        this._url.setAttribute('alt', name);
        this._caption.textContent = name;
    }
}