import * as types from "./types";
import CheckWalletConnection from "../components/CheckWalletConnection";

export const showWalletIsConnected = (payload) => ({
    type: types.IS_CONNECTED,
    payload,
});

export const checkIfWalletConnected = () => (dispatch, getState) => {
    const state = getState();
    CheckWalletConnection()
        .then((metaMaskAddress) => {
            if (metaMaskAddress !== undefined && metaMaskAddress !== false) {
                dispatch(showWalletIsConnected({ isConnected: true }));
                // TODO: dispatch(showWalletAddress)
            }
        })
        .catch((e) => console.log(e));
};
