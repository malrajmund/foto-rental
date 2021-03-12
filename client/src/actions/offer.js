import axios from "axios";
import { setAlert } from "./alert";
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
} from "./types";

export const getOffers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/offers");
    dispatch({
      type: GET_OFFERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: OFFER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getOffer = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/offers/${id}`);
    dispatch({
      type: GET_OFFER,
      payload: res.data,
    });
    //dispatch(setAlert("Oferta usunięta", "success"));
  } catch (err) {
    dispatch({
      type: OFFER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addOffer = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const res = await axios.post("/api/offers/", formData, config);
    dispatch({
      type: ADD_OFFER,
      payload: res.data,
    });

    dispatch(setAlert("Offerta dodana", "success"));
  } catch (err) {
    dispatch({
      type: OFFER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert("Wypelnij wszystkie wymagane pola!", "danger"));
  }
};

export const getUserOffers = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/offers/myOffers/${id}`);
    dispatch({
      type: GET_USER_OFFERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: OFFER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteOffer = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/offers/myOffers/${id}`);
    dispatch({
      type: DELETE_OFFER,
      payload: id,
    });

    dispatch(setAlert("Oferta usunięta", "success"));
  } catch (err) {
    dispatch({
      type: OFFER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const reserveOffer = (
  message,
  startDate,
  endDate,
  id,
  totalCost
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ message, startDate, endDate, totalCost });
  try {
    const res = await axios.put(`/api/offers/${id}`, body, config);
    dispatch({
      type: RESERVE_OFFER,
      payload: res.data,
    });
    dispatch(setAlert("Pomyślnie zarezerwowano!", "success"));
  } catch (err) {
    dispatch({
      type: OFFER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const removeReservationAsOwner = (id, offerId) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/offers/${id}`, {
      params: { id: id, offerId: offerId },
    });

    dispatch({
      type: REMOVE_RESERVATION_AS_OWNER,
      payload: id,
    });
    dispatch(setAlert("Rezerwacja usunięta!", "success"));
  } catch (err) {
    dispatch({
      type: OFFER_ERROR,
      payload: "git",
    });
  }
};

export const getReservations = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/offers/reservations/${id}`);
    dispatch({
      type: GET_RESERVATIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: OFFER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

