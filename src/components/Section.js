export default class Section {
    // constructor(data, container) {
    constructor(data, container) {
        this._container = document.querySelector(container);
        this._render = data.renderer;
        // this._items = data.items;
    }

    addItem(item) {
        this._container.prepend(item);
    }
    // renderCards() {
    renderItems(items) {
        items.forEach((item) => {
            this._render(item);
        });
    }
}