export interface ScrollyTellerItemImageProps {
    imageUrl: string;
    altText: string;
    caption: string;
}

const ScrollyTellerItemImage = ({imageUrl, altText, caption}: ScrollyTellerItemImageProps) => {
    return (
        <div className="flex flex-col">
            <img src={imageUrl} alt={altText} />
            <p>{caption}</p>
        </div>
    );
}

export default ScrollyTellerItemImage;