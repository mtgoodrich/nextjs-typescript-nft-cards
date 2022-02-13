import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";

// import CheckForWallet from "../components/CheckForWallet";
import Card from "../components/Card";
import Loading from "../components/Loading";

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

interface NFT {
    description: string;
    image: any;
    name: string;
    owner: string;
    price: number;
    seller: string;
    title: string;
    tokenId: any;
}

export default function MyAssets() {
    const [nfts, setNfts] = useState<NFT[]>([]);
    const [loadingState, setLoadingState] = useState<string>("not-loaded");

    useEffect(() => {
        if (loadingState === "not-loaded") {
            // if connected with wallet
            loadNFTs();
            // otherwise ask user to connect to wallet
        }
        return () => {
            setLoadingState("not-loaded");
            setNfts([]);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function loadNFTs() {
        console.log("Check for wallet:::");
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();

        console.log("Window", window.ethereum);

        if (window.ethereum) {
            try {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: "0x13881" }], // chainId must be in hexadecimal numbers
                });
            } catch (e) {
                console.log(e);
            }

            const provider = new ethers.providers.Web3Provider(connection);

            const signer = provider.getSigner();

            const marketContract = new ethers.Contract(
                nftmarketaddress,
                Market.abi,
                signer
            );
            const tokenContract = new ethers.Contract(
                nftaddress,
                NFT.abi,
                provider
            );

            const data = await marketContract.fetchMyNFTs();

            const items = await Promise.all(
                data.map(async (i: NFT) => {
                    const tokenUri = await tokenContract.tokenURI(i.tokenId);
                    const meta = await axios.get(tokenUri);

                    let price = ethers.utils.formatUnits(
                        i.price.toString(),
                        "ether"
                    );
                    let item = {
                        price,
                        tokenId: i.tokenId.toNumber(),
                        seller: i.seller,
                        owner: i.owner,
                        image: meta.data.image,
                        name: meta.data.name,
                        description: meta.data.description,
                    };

                    return item;
                })
            );

            // console.log(items)

            setNfts(items);
            setLoadingState("loaded");
        }
    }

    if (loadingState === "not-loaded") return <Loading />;

    if (loadingState === "loaded" && !nfts.length)
        return (
            <>
                <h1 className="no-assets">No assets in your wallet</h1>
            </>
        );

    return (
        <div className="content-wrapper">
            <div className="content">
                <div className="content-grid">
                    {nfts.map((nft, i) => (
                        <div key={i}>
                            <Card nft={nft} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
