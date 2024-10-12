import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Import thunk correctly as a named export
import authReducer from './reducers/authReducer';
import teamReducer from './reducers/teamReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    team: teamReducer,
});

// Correctly apply middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
