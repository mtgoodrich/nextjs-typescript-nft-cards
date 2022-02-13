import Head from "next/head";

import type { AppProps } from "next/app";

import { Provider } from "react-redux";
import { useStore } from "../store";

import Wallet from "../components/Wallet";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    const store = useStore(pageProps.initialReduxState);

    return (
        <Provider store={store}>
            <Head>
                <title>
                    Bitgang Art NFTs - A marketplace for empowering at-risk
                    youth toward financial freedom
                </title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <meta
                    name="description"
                    content="Bitgang Art NFTs, A marketplace for empowering at-risk youth toward financial freedom."
                />
            </Head>
            <div className="container-wrapper">
                <Wallet />
                <Component {...pageProps} />
            </div>
        </Provider>
    );
}

export default MyApp;
