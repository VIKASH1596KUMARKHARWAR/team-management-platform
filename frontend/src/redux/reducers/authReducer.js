import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOADING, // Include the loading action type
} from '../actions/actionTypes';

const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
    loading: false, // Add loading state
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true, // Set loading to true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload, // Store user object, containing role and other details
                error: null,
                loading: false, // Reset loading on success
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: action.payload, // Set the error message
                loading: false, // Reset loading on failure
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false, // Reset loading on success
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                error: action.payload, // Set the error message
                loading: false, // Reset loading on failure
            };
        default:
            return state;
    }
};

export default authReducer;
