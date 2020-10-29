import { createStore } from 'redux';
import reducer from './reducer'; 


function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch(e) {
    }
}

function loadFromStorage() {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch(e) {
        return undefined;
    }
}

const persistedState = loadFromStorage();

const store = createStore(reducer, persistedState);

store.subscribe(() => {
    saveToLocalStorage(
        {
            checkout_id: store.getState().checkout_id
        });
});



export default store;