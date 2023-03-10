export default class CardList {
    constructor(container, render) {
        this._container = document.querySelector(container);
        this._render = render;
    }

    addCard(card) {
        this._container.prepend(card);
    }

    renderCards(cards) {
        cards.forEach((card) => {
            this._render(card);
        });
    }
}