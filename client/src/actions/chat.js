import axios from 'axios';
import { setAlert } from './alert';
import {
    ADD_CHAT,
    ADD_MESSAGE,
    GET_CHATS,
    CHAT_ERROR,
} from './types';

export const addChat = (sender, senderName, receiver, receiverName, header, text) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    };
    const body = JSON.stringify({ sender, senderName, receiver, receiverName, header, text });
    try {
        const res = await axios.post("/api/chats/", body, config);
        dispatch({
            type: ADD_CHAT,
            payload: res.data,
        });
        dispatch(setAlert("Chat utworzony", "success"));
    } catch (err) {
        dispatch({
            type: CHAT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const addMessage = (text, id) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    };
    const body = JSON.stringify({ text });
    try {
        const res = await axios.put(`/api/chats/${id}`, body, config);
        dispatch({
            type: ADD_MESSAGE,
            payload: res.data,
        });
        dispatch(setAlert("Wiadomość wysłana", "success"));
    } catch (err) {
        dispatch({
            type: CHAT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        })
    }
}

export const getChats = () => async (dispatch) => {
    try {
        const res = await axios.get("api/chats/");
        dispatch({
            type: GET_CHATS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: CHAT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        })
    }
}
