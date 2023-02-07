import initNodes from './initialNodes.js';

const popupSelectors = [
    { sel: '.popup_type_profile', node: 'profilePopup' },
    { sel: '.popup_type_place', node: 'cardPopup' },
    { sel: '.popup_type_img', node: 'imagePopup' },
];

export const popups = initNodes(popupSelectors);

export function openPopup(popup) {
    popup.classList.add('popup_opened');
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

for (let key in popups) {
    popups[key].querySelector('.popup__close').addEventListener('click', () => {
        closePopup(popups[key]);
    });

}

export default popups;