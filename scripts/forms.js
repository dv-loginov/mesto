import { popups, closePopup } from './popups.js';
import initNodes from './initialNodes.js';
import { addCard } from './cards.js';

export const forms = {
    profileForm: document.forms["profile-form"],
    cardForm: document.forms["card-form"]
};

const profileSelectors = [
    { sel: '.profile__title', node: 'title' },
    { sel: '.profile__subtitle', node: 'subtitle' },
];

export const profileNodes = initNodes(profileSelectors);

export function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileNodes.title.textContent = forms.profileForm.elements.name.value;
    profileNodes.subtitle.textContent = forms.profileForm.elements.job.value;
    closePopup(popups.profilePopup);
}

export function handleCardPlaceSubmit(evt) {
    evt.preventDefault();
    const name = forms.cardForm.elements.name.value;
    const url = forms.cardForm.elements.url.value;

    if (name && url) {
        addCard(name, url, false);
        closePopup(popups.cardPopup);
        evt.target.reset();
    }
}

export default forms;