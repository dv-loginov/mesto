export const cardClass = {
    template: '#card',
    container: '.elements',
    element: '.element',
    img: '.element__img',
    name: '.element__name',
    btnTarsh: '.element__btn-trash',
    btnLike: '.element__btn-like',
    btnLikeActiveClass: 'element__btn-like_active',
    like: '.element__counter-like',
};

export const buttonClass = {
    edit: '.profile__edit-btn',
    add: '.add-btn',
    avatar: '.profile__avatar-edit',
}

export const profileClass = {
    name: '.profile__title',
    job: '.profile__subtitle',
    avatar: '.profile__avatar',
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
    avatarPopup: '.popup_type_avatar',
    deletePopup: '.popup_type_question',
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
export const buttonAvatar = document.querySelector(buttonClass.avatar);