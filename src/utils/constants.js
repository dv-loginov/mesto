export const cardClass = {
    template: '#card',
    container: '.elements',
    element: '.element',
    img: '.element__img',
    name: '.element__name',
    btnTarsh: '.element__btn-trash',
    btnLike: '.element__btn-like',
    btnLikeActiveClass: 'element__btn-like_active',
};

export const buttonClass = {
    edit: '.profile__edit-btn',
    add: '.add-btn',
}

export const profileClass = {
    name: '.profile__title',
    job: '.profile__subtitle',
}

export const popupImageClass = {
    imageUrl: '.popup__img',
    caption: '.popup__caption',
}

export const popupClassName = {
    popup: 'popup',
    popupOpened: 'popup_opened',
    popupClose: 'popup__close',
}

export const popups = {
    profilePopup: '.popup_type_profile',
    cardPopup: '.popup_type_place',
    imagePopup: '.popup_type_img',
}

export const formClass = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__btn',
    inactiveButtonClass: 'form__btn_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
}

export const formValidators = {}

export const buttonEdit = document.querySelector(buttonClass.edit);
export const buttonAdd = document.querySelector(buttonClass.add);
