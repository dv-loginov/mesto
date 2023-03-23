import { popupClassName as popup } from '../utils/constants';

export default class Popup {
    constructor(selector) {
        this._root = document.querySelector(selector);
    }

    open() {
        this._root.classList.add(popup.popupOpened);
        this.setEventListeners();
    }

    close() {
        this._root.classList.remove(popup.popupOpened);
        this.resetEventListeners();
    }

    getRoot() {
        return this._root;
    }

    setEventListeners() {
        this._root.addEventListener('click', this._handleClickClose);
        document.addEventListener('keydown', this._handleEscClose);
    };

    resetEventListeners() {
        this._root.removeEventListener('click', this._handleClickClose);
        document.removeEventListener('keydown', this._handleEscClose);
    };

    _handleClickClose = (event) => {
        const classList = event.target.classList;
        if ([].includes.call(classList, popup.popup) || [].includes.call(classList, popup.popupClose)) {
            this.close();
        }
    }

    _handleEscClose = (event) => {
        if (event.key === "Escape" || event.key === "Esc") {
            this.close();
        }
    }

}