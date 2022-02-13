import { ethers } from "ethers";

const CheckWalletConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const metaMaskAddress = await signer.getAddress().catch((e) => {
            console.log("Error:: Wallet not signed in.", e);
            return false;
        });

        return metaMaskAddress;
    }
};

export default CheckWalletConnection;
