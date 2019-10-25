import mitt from 'mitt'

let cart = [
    //{menuid: 10, number: 1, name: 'Classic Hawaii', price: 15 },
    //{menuid: 13, number: 1, name: 'Apple Crust', price: 30}
];

let state = {customerid: null, cart };
const emitter = mitt();

export const updateSharedKernel = function (newState) {
    let oldval = null, change = false;
    if (typeof newState === 'object') {
        let obj = newState;
        for (let key in obj) {
            if (obj.hasOwnProperty(key) && state.hasOwnProperty(key)) {
                oldval = state[key];
                state[key] = obj[key];
                change = true;
                emitter.emit("change:" + key, obj[key], oldval);
            }
        }
        if(change)emitter.emit("change", state);
    }
}
export const getSharedKernel = (key) => (key)?state[key]:state;
export const onKernelKey = emitter.on;
export const offKernelKey = emitter.off;