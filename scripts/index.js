import renderCards from './cards.js';
import initNodes from './initialNodes.js';
import { popups, openPopup } from './popups.js';
import { forms, handleProfileFormSubmit, handleCardPlaceSubmit, profileNodes } from './forms.js';
import enableValidation from './validate.js';

renderCards();

const btnSelectors = [
    { sel: '.profile__edit-btn', node: 'editBtn' },
    { sel: '.add-btn', node: 'addBtn' },
];

const btn = initNodes(btnSelectors);

btn.editBtn.addEventListener('click', (event) => {
    openPopup(popups.profilePopup);
    forms.profileForm.elements.name.value = profileNodes.title.textContent;
    forms.profileForm.elements.job.value = profileNodes.subtitle.textContent;
});

btn.addBtn.addEventListener('click', (event) => {
    openPopup(popups.cardPopup);
});

forms.profileForm.addEventListener('submit', handleProfileFormSubmit);
forms.cardForm.addEventListener('submit', handleCardPlaceSubmit);

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__btn',
    inactiveButtonClass: 'form__btn_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
}); 

