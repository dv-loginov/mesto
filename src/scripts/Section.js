export default class Section {
    constructor({ items, renderer }, container) {
        this._container = document.querySelector(container);
        this._renderer = renderer;
        this._data = items;
    }

    addItem(item) {
        this._container.prepend(item);
    }

    renderCards() {
        this._data.forEach((item) => {
            this._renderer(item);
        });
    }
}