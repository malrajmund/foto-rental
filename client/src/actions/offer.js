import axios from "axios";
import { setAlert } from "./alert";
import { GET_OFFERS, OFFER_ERROR, ADD_OFFER, GET_USER_OFFERS } from "./types";

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