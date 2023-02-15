import { forms } from './forms.js';

const enableValidation = (options) => {
    
    const opt = { ...options };
    
    const showInputError = (formElement, inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(opt.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(opt.errorClass);
    };
    
    const hideInputError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(opt.inputErrorClass);
        errorElement.classList.remove(opt.errorClass);
        errorElement.textContent = 'Error';
    };
    
    const isValid = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            hideInputError(formElement, inputElement);
        }
    };
    
    const hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };
    
    const toggleButtonState = (inputList, buttonElement) => {
        buttonElement.classList.add(opt.inactiveButtonClass);
        if (hasInvalidInput(inputList)) {
            buttonElement.classList.add(opt.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(opt.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };

    const setEventListeners = (form) => {
        const inputList = Array.from(form.querySelectorAll(opt.inputSelector));
        const buttonElement = form.querySelector(opt.submitButtonSelector);

        toggleButtonState(inputList, buttonElement);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                isValid(form, inputElement)
                toggleButtonState(inputList, buttonElement);
            });
        });
    };

    for (let form in forms) {
        setEventListeners(forms[form]);
    }
};

export default enableValidation;
