export default class Form {
    constructor(name, handleSubmit) {
        this._form = document.forms[name];
        this._form.addEventListener('submit', handleSubmit);
    }

    getInpitValue(name) {
        return this._form.elements[name].value;
    }

    setInputValue(name, value) {
        this._form.elements[name].value = value;
    }

    getRoot() {
        return this._form;
    }
}