export default class Popups {
    constructor(selector) {
        this._root = document.querySelector(selector);
    }

    open() {
        this._root.classList.add('popup_opened');
        this._root.addEventListener('click', this._handleClick);
        document.addEventListener('keydown', this._handleKeydown);
    }

    close() {
        this._root.classList.remove('popup_opened');
        this._root.removeEventListener('click', this._handleClick);
        document.removeEventListener('keydown', this._handleKeydown);
    }

    getRoot() {
        return this._root;
    }

    _handleClick = (event) => {
        const classList = event.target.classList;
        if ([].includes.call(classList, 'popup') || [].includes.call(classList, 'popup__close')) {
            this.close();
        };
    }

    _handleKeydown = (event) => {
        if (event.key === "Escape" || event.key === "Esc") {
            this.close();
        }
    }

}