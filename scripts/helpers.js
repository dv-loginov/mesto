export function addCard(root, card, metod = true) {
    metod
        ? root.append(card)
        : root.prepend(card);
};

// export const initNodes = (sels = [], root = document) => {
//     const nodes = sels.reduce((arr, selector) => {
//         arr[selector.node] = root.querySelector(selector.sel);
//         return arr;
//     }, {});
//     return nodes;
// }