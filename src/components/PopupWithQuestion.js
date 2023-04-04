import Popup from './Popup.js';
import { formClass } from '../utils/constants';

export default class PopupWithQuestion extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._submitForm = this._submitForm.bind(this);
        this._form = this._root.querySelector(formClass.formSelector);
    }

    open(data) {
        super.open();
        this._data = data;
    }

    _submitForm(event) {
        event.preventDefault();
        this._handleFormSubmit(this._data);
    }

    setEventListeners = () => {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitForm);
    }

    resetEventListeners() {
        super.resetEventListeners();
        this._form.removeEventListener('submit', this._submitForm);
    };
}