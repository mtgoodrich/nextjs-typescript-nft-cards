import Image from "next/image";

interface CardInterface {
    nft: NFTInterface;
    buyNFT?: any;
}

interface NFTInterface {
    description: string;
    image: any;
    name: string;
    price: number;
}

const Card = ({ nft, buyNFT }: CardInterface) => (
    <div className="nft-card">
        <div className="nft-title">
            <div>
                <Image
                    src="/images/verified-icon.png"
                    alt="Verified Seller"
                    width={20}
                    height={20}
                    unoptimized={true}
                    className="verified-icon"
                />
                <span>{nft.name}</span>
            </div>
        </div>
        <div className="nft-image">
            <Image src={nft.image} alt={nft.description} layout="fill" />
        </div>
        <div className="nft-description-wrapper">
            <div className="nft-description">
                <p>{nft.description}</p>
            </div>
        </div>
        <div className="nft-price-wrapper">
            <div className="nft-price">
                <span>{nft.price} </span>
                <Image
                    src="/images/polygon-matic.svg"
                    alt="Pay with Polygon"
                    title="Pay in Matic/Polygon"
                    width={20}
                    height={35}
                    unoptimized={true}
                    className="nft-currency"
                />
            </div>
            {buyNFT && (
                <button className="nft-buy" onClick={() => buyNFT(nft)}>
                    Buy
                </button>
            )}
        </div>
    </div>
);

export default Card;
