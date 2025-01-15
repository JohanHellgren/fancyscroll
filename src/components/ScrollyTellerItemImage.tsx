export interface ScrollyTellerItemImageProps {
    imageUrl: string;
    altText: string;
    caption: string;
    index: number;
}

const ScrollyTellerItemImage = ({imageUrl, altText, caption, index}: ScrollyTellerItemImageProps) => {
    return (
        <div className="flex flex-col mb-[24px]" data-scroll data-scroll-speed={0.05 * (index + 1)}>
            <img src={imageUrl} alt={altText} className="mt-[10px]"/>
            <p>{caption}</p>
        </div>
    );
}

export default ScrollyTellerItemImage;