import {
    GET_OFFERS,
    OFFER_ERROR,
    ADD_OFFER
} from '../actions/types'

const initialState = {
    offers: [],
    offer: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch(type){
        case GET_OFFERS:
            return {
                ...state,
                offers: payload,
                loading: false
            }
        case ADD_OFFER:
            return {
                ...state,
                offers: [...state.offers, payload],
                loading: false
            }
        case OFFER_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }

}