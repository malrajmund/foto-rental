import axios from 'axios';
import { setAlert } from './alert'
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

export const register = ({ firstName, lastName, email, town, street, streetNumber, postCode, phoneNumber, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ firstName, lastName, email, town, street, streetNumber, postCode, phoneNumber, password })

    try {
        const res = await axios.post('/api/users', body, config);

        dispatch({ 
            type: REGISTER_SUCCESS,
            payload: res.data
         });
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            document.documentElement.scrollTop = 0;
            errors.forEach(error =>dispatch(setAlert(error.msg, 'danger')) );
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
}