import axios from "axios";
import {
    GET_CATEGORIES,
    GET_CATEGORY,
    CATEGORY_ERROR,
    ADD_CATEGORY
} from "./types";

export const addCategory = (name, parent) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    };
    const body = JSON.stringify({ name, parent });
    try {
        const res = await axios.post("/api/categories", body, config);
        dispatch({
            type: ADD_CATEGORY,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: CATEGORY_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        })
    }
}


export const getCategories = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/categories");
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: CATEGORY_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
}

export const getCategory = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/categories/${id}`);
        dispatch({
            type: GET_CATEGORY,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: CATEGORY_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
}