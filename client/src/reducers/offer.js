import {
  GET_OFFERS,
  OFFER_ERROR,
  ADD_OFFER,
  GET_USER_OFFERS,
  DELETE_OFFER,
  RESERVE_OFFER,
} from "../actions/types";

const initialState = {
  offers: [],
  offer: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_OFFERS:
      return {
        ...state,
        offers: payload,
        loading: false,
      };
    case ADD_OFFER:
      return {
        ...state,
        offers: [...state.offers, payload],
        loading: false,
      };
    case GET_USER_OFFERS:
      return {
        ...state,
        offers: payload,
        loading: false,
      };
    case DELETE_OFFER:
      return {
        ...state,
        offers: state.offers.filter((offer) => offer._id !== payload),
        loading: false,
      };
    case RESERVE_OFFER:
      return {
        ...state,
        offers: payload,
        loading: false,
      };
    case OFFER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
