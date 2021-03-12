import {
  GET_OFFERS,
  OFFER_ERROR,
  ADD_OFFER,
  GET_USER_OFFERS,
  DELETE_OFFER,
  GET_OFFER,
  RESERVE_OFFER,
  REMOVE_RESERVATION_AS_OWNER,
  GET_RESERVATIONS,
} from "../actions/types";

const initialState = {
  offers: [],
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
        offers: state.offers.map((offer) => {
          if (offer._id === payload) offer.status = "Archiwalna";
        }), //state.offers.filter((offer) => offer._id !== payload),
        loading: false,
      };
    case GET_OFFER:
      return {
        ...state,
        offers: payload,
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
    case REMOVE_RESERVATION_AS_OWNER:
      return {
        ...state,
        offers: state.offers.filter(
          (offer) => offer.reservation._id !== payload
        ),
        loading: false,
      };
    case GET_RESERVATIONS:
      return {
        ...state,
        offers: payload,
        loading: false,
      };

    default:
      return state;
  }
}
