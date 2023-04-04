import Popup from './Popup.js';
import { formClass } from '../utils/constants';

export default class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._root.querySelector(formClass.formSelector);
        this._submitForm = this._submitForm.bind(this);
        this._inputList = this._form.querySelectorAll(formClass.inputSelector);
        this._btn =  this._form.querySelector(formClass.submitButtonSelector); 
    }

    _getInputValue() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    _submitForm(event) {
        event.preventDefault();
        this.toogleButton(true);
        this._handleFormSubmit(this._getInputValue());
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    setEventListeners = () => {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitForm);
    }

    resetEventListeners() {
        super.resetEventListeners();
        this._form.removeEventListener('submit', this._submitForm);
    };

    close() {
        super.close();
        this._form.reset();
    }

    toogleButton(isSave) {
        isSave
        ? this._btn.textContent = 'Сохранение...'
        : this._btn.textContent = 'Сохранить';
    }
}