import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._root.querySelector('.form');
    }

    setEventListeners = () => {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleFormSubmit);
    }

    resetEventListeners() {
        super.resetEventListeners();
        this._form.removeEventListener('submit', this._handleFormSubmit);
    };

    close() {
        super.close();
        this._form.reset();
    }
}