import ScrollyTellerItemImage, { ScrollyTellerItemImageProps } from "./ScrollyTellerItemImage";

export interface ScrollyTellerItemProps {
    header: string;
    subheader: string;
    images: ScrollyTellerItemImageProps[];
}

const ScrollyTellerItem = ({header, subheader, images}: ScrollyTellerItemProps) => {
    return (
        <div className="scrolly-item">
            <h2>{header}</h2>
            <h3>{subheader}</h3>
            {images.map((image) => (
                <ScrollyTellerItemImage {...image} />
            ))}
        </div>
    );
}

export default ScrollyTellerItem;