import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import axios from "axios";
import Web3Modal from "web3modal";

import Card from "../components/Card";
import Loading from "../components/Loading";

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

import { checkIfWalletConnected } from "../store/actions";

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

export default function Home() {
    const [nfts, setNfts] = useState<NFT[]>([]);
    const [loadingState, setLoadingState] = useState<string>("not-loaded");

    const dispatch = useDispatch();
    const isConnected = useSelector(
        (state: RootStateOrAny) => state.isConnected
    );

    useEffect(() => {
        dispatch(checkIfWalletConnected());
        if (loadingState === "not-loaded") {
            loadNFTs();
        }
        return () => {
            setLoadingState("not-loaded");
            setNfts([]);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    async function loadNFTs() {
        const provider = new ethers.providers.JsonRpcProvider(
            "https://polygon-mumbai.infura.io/v3/249b2cbc600e49779b7114564470bc81"
        );
        const tokenContract = new ethers.Contract(
            nftaddress,
            NFT.abi,
            provider
        );
        const marketContract = new ethers.Contract(
            nftmarketaddress,
            Market.abi,
            provider
        );

        const data = await marketContract.fetchMarketItems();

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

        // console.log(items);

        setNfts(items);
        setLoadingState("loaded");
    }

    async function buyNFT(nft: NFT) {
        if (window.ethereum) {
            try {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: "0x13881" }], // chainId must be in hexadecimal numbers
                });
            } catch (e) {
                console.log(e);
            }
        }

        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            nftmarketaddress,
            Market.abi,
            signer
        );

        const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

        const transaction = await contract.createMarketSale(
            nftaddress,
            nft.tokenId,
            {
                value: price,
            }
        );
        await transaction.wait();

        // reload NFTs list
        loadNFTs();
    }

    if (loadingState === "not-loaded") return <Loading />;

    if (loadingState === "loaded" && !nfts.length)
        return (
            <>
                <h1 className="no-assets">No items in marketplace</h1>
            </>
        );

    return (
        <>
            <div className="content-wrapper">
                <div className="content">
                    {nfts.length && (
                        <h1 className="content-title marketplace-title">
                            Marketplace
                        </h1>
                    )}
                    <div className="content-grid">
                        {nfts.map((nft, i) => {
                            return (
                                <div key={i}>
                                    {isConnected ? (
                                        <Card nft={nft} buyNFT={buyNFT} />
                                    ) : (
                                        <Card nft={nft} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
