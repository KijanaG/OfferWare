import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loggedIn: false,
    client_id: null,
    name: null,
    companyName: null,
    email: null,
    stripe_id: null,
    admin: false, //For future accounts that access the same DB section
    validToken: false,
    isLoading: false
}

const setParameters = (state, action) => {
    return updateObject(state, action);
}

const setClient = (state, action) => {
    action.client.loggedIn = true;
    return updateObject(state, action.client);
}

const setLogIn = (state, action) => {
    return updateObject(state, { loggedIn: true })
}

const setLoading = (state, action) => {
    return updateObject(state, { isLoading: action.loading })
}

const setTokenValidity = (state, action) => {
    return updateObject(state, { validToken: action.validToken })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PARAMETERS: return setParameters(state, action);
        case actionTypes.SET_CLIENT: return setClient(state, action);
        case actionTypes.IS_LOADING: return setLoading(state, action);
        case actionTypes.LOG_IN: return setLogIn(state, action);
        case actionTypes.VALID_TOKEN: return setTokenValidity(state, action);
        default: return state;
    }
}

export default reducer;