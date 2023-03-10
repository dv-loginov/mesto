export default class Form {
    constructor(name, submitHandler) {
        this._form = document.forms[name];
        this._submitHandler = submitHandler;
    }

    getInpitValue(name) {
        return this._form.elements[name].value;
    }

    setInputValue(name, value) {
        this._form.elements[name].value = value;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitHandler(event, this);
        });
    }
}