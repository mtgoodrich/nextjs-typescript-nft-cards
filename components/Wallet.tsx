import { useEffect, useState } from "react";

import Image from "next/image";

import CheckForWallet from "./CheckForWallet";
import Message from "./Message";

const Wallet = () => {
    const [showMessage, setShowMessage] = useState(false);
    const timerCounter: any = process.env.timerCount;

    const timer = setTimeout(() => {
        // set show = false;
        setShowMessage(false);
    }, parseInt(timerCounter));

    useEffect(() => {
        // Check for metamask wallet
        if (typeof window.ethereum === "undefined") {
            console.log("Ethereum is not installed!");
            setShowMessage(true);
            timer;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="wallet" title="Connect Wallet">
            <Image
                src="/images/custom-wallet-sm.png"
                alt="Connect Your Wallet"
                title="Connect Your Wallet"
                width={40}
                height={32}
                unoptimized={true}
                className="connect-wallet-btn"
                onClick={CheckForWallet}
            />
            <div id="wallet"></div>
            {showMessage && (
                <Message
                    show={showMessage}
                    onClose={() => setShowMessage(false)}
                    type="message"
                    message="Please install MetaMask"
                    link="https://metamask.io/download/"
                />
            )}
        </div>
    );
};

export default Wallet;
