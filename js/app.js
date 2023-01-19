const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__input[name="name"]');
const jobInput = formElement.querySelector('.form__input[name="job"]');

const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');

const editBtn = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__close');

editBtn.onclick = () => {
    popup.style.display = 'flex';
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
}

closePopup.onclick = () => {
    popup.style.display = 'none';
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    popup.style.display = 'none';
}

formElement.addEventListener('submit', handleFormSubmit);
