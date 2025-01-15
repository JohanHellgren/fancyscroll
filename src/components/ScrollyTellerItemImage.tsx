export interface ScrollyTellerItemImageProps {
    imageUrl: string;
    altText: string;
    caption: string;
}

const ScrollyTellerItemImage = ({imageUrl, altText, caption}: ScrollyTellerItemImageProps) => {
    return (
        <div className="flex flex-col mb-[24px]">
            <img src={imageUrl} alt={altText} className="mt-[10px]"/>
            <p>{caption}</p>
        </div>
    );
}

export default ScrollyTellerItemImage;