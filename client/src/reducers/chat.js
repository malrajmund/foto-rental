import {
    ADD_CHAT,
    ADD_MESSAGE,
    GET_CHATS,
    CHAT_ERROR
} from '../actions/types';

const initialState = {
    chats: [],
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ADD_CHAT:
            return {
                ...state,
                chats: [...state.chats, payload],
                loading: false,
            };
        case ADD_MESSAGE:
            return {
                ...state,
                chats: payload,
                loading: false,
            };
        case GET_CHATS:
            return {
                ...state,
                chats: payload,
                loading: false,
            };
        case CHAT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            }
        default:
            return state;

    }
}