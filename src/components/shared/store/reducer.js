const initState = {
    checkout_id: "",
    currency: {
        currencySymbol: '$',
        currencyCode: 'USD'
    }
};

const CHECKOUT_INIT = 'CHECKOUT_INIT';
const ADD_TO_CART = 'ADD_TO_CART';
const CHECKOUT_LINEITEMS_REPLACE_MUTATION_INIT = 'CHECKOUT_LINEITEMS_REPLACE_MUTATION_INIT';
const CURRENCY_INIT = "CURRENCY_INIT";

export default function store(state = initState, action) {
    switch (action.type) {
        case CHECKOUT_INIT:
            return { ...state, checkout_id: action.payload.checkout.id, checkout: action.payload.checkout };
        case ADD_TO_CART: {
            return { ...state, checkout: action.payload.checkout };
        }
        case CHECKOUT_LINEITEMS_REPLACE_MUTATION_INIT: {
            return {
                ...state,
                checkoutLineItemsReplaceMutation: action.payload.checkoutLineItemsReplaceMutation,
                checkoutLineItemsReplaceLoading: action.payload.checkoutLineItemsReplaceLoading,
            };
        }
        case CURRENCY_INIT: {
            return {
                ...state,
                currency: {
                    currencySymbol: '$',
                    currencyCode: 'USD'
                }
            }
        }
        default:
            return state;
    }
};