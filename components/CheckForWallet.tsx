import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { ethers } from "ethers";

// TODO:: Should be named ConnectWallet
const CheckForWallet = async () => {
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: `process.env.infuraId`,
            },
        },
    };

    const web3Modal = new Web3Modal({
        providerOptions,
        theme: "dark",
        disableInjectedProvider: true,
    });

    let connection;
    try {
        await web3Modal.clearCachedProvider();
        connection = await web3Modal.connect();
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }

    const provider = new ethers.providers.Web3Provider(connection);
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    // console.log("Account:", await signer.getAddress());
    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x13881" }], // chainId must be in hexadecimal numbers
        });
    } catch (e) {
        console.log(e);
    }
};

export default CheckForWallet;
