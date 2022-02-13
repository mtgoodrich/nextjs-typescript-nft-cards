import { combineReducers } from "redux";
import * as types from "./types";

const connectedReducer = (state = false, { type, payload }) => {
    switch (type) {
        case types.IS_CONNECTED:
            return {
                isConnected: payload.isConnected,
            };
        default:
            return state;
    }
};

const reducers = {
    isConnected: connectedReducer,
};

export default combineReducers(reducers);
