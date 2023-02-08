import renderCards from './cards.js';
import initNodes from './initialNodes.js';
import { popups, openPopup } from './popups.js';
import { forms, handleProfileFormSubmit, handleCardPlaceSubmit, profileNodes } from './forms.js';

renderCards();

const btnSelectors = [
    { sel: '.profile__edit-btn', node: 'editBtn' },
    { sel: '.add-btn', node: 'addBtn' },
];

const btn = initNodes(btnSelectors);

btn.editBtn.addEventListener('click', (event) => {
    openPopup(popups.profilePopup);
    console.log(profileNodes.title.textContent);
    console.log(profileNodes.subtitle.textContent);
    forms.profileForm.elements.name.value = profileNodes.title.textContent;
    forms.profileForm.elements.job.value = profileNodes.subtitle.textContent;
});

btn.addBtn.addEventListener('click', (event) => {
    openPopup(popups.cardPopup);
});

forms.profileForm.addEventListener('submit', handleProfileFormSubmit);
forms.cardForm.addEventListener('submit', handleCardPlaceSubmit);