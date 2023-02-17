import initNodes from './initialNodes.js';

const popupSelectors = [
    { sel: '.popup_type_profile', node: 'profilePopup' },
    { sel: '.popup_type_place', node: 'cardPopup' },
    { sel: '.popup_type_img', node: 'imagePopup' },
];

export const popups = initNodes(popupSelectors);

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', clickHeader);
    document.addEventListener('keydown', keydownHeader);
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', clickHeader);
    document.removeEventListener('keydown', keydownHeader);
}

const clickHeader = (event) => {
    const classList = event.target.classList;
    if ([].includes.call(classList, 'popup') || [].includes.call(classList, 'popup__close')) {
        closePopup(event.target.closest('.popup'));
    };
}

const keydownHeader = (event) => {
    if (event.key === "Escape" || event.key === "Esc") {
        closePopup(document.querySelector('.popup_opened'));
    }
}
export default popups;