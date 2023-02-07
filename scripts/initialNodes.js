const initNodes = (sels = [], root = document) => {
    const nodes = sels.reduce((arr, selector) => {
        arr[selector.node] = root.querySelector(selector.sel);
        return arr;
    }, {});
    return nodes;
}

export default initNodes;