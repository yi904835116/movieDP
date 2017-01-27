
import {createStore} from "redux";


const ADD_CART_ACTION = "addcart";
const REMOVE_CART_ACTION = "removecart";
const REMOVE_CARTALL_ACTION = "removecartall";

const DEFAULT_STATE = {carts: []};
const LS_KEY = "redux-store";

function reducer(state, action) {
    //switch is like if/elseif/elseif/elseif/.../else
    //just more compact
    switch(action.type) {
        case ADD_CART_ACTION:
            if (state.carts.find(item => item.id === action.item.id)) {
                action.item.quantity += 1;
                return state;
            } else {
                
                var newState = Object.assign({}, state);
                newState.carts = newState.carts.concat(action.item);
                return newState;
            }

        case REMOVE_CART_ACTION:

            var cartQuantity = state.carts.find(item => item.id === action.id).quantity;

            if (state.carts.find(item => item.id === action.id) && cartQuantity > 1) {
                state.carts.find(item => item.id === action.id).quantity -=1;
                return state;
            } else {
                return Object.assign({}, state, {carts: state.carts.filter(item => item.id != action.id)});
            }
        case REMOVE_CARTALL_ACTION:
            return Object.assign({}, state, {carts: state.carts.filter(item => item.id != action.id)});
                    
        default:
            return state;
    }
}


export function addCart(item) {
    return {
        type: ADD_CART_ACTION,
        item: item
    }
}

export function removeCart(id) {
    return {
        type: REMOVE_CART_ACTION,
        id: id
    }
}
export function removeAll(id) {
    return {
        type: REMOVE_CARTALL_ACTION,
        id: id
    }
}


var savedState = JSON.parse(localStorage.getItem(LS_KEY));
export var store = createStore(reducer, savedState || DEFAULT_STATE);
store.subscribe(() => localStorage.setItem(LS_KEY, JSON.stringify(store.getState())));
