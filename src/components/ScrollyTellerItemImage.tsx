export interface ScrollyTellerItemImageProps {
  imageUrl: string;
  altText: string;
  caption: string;
  index: number;
  linkText: string;
}

const ScrollyTellerItemImage = ({
  imageUrl,
  altText,
  caption,
  index,
  linkText,
}: ScrollyTellerItemImageProps) => {
  return (
    <div
      className="scrolly-teller-image"
      data-scroll
      data-scroll-speed={0.01 * (index + 1)}
    >
      <img src={imageUrl} alt={altText} className="scrolly-teller-image__image" />
      <div className="scrolly-teller-image__image-text">
        <h4 className="scrolly-teller-image__caption">{caption}</h4>
        <a>
          <h5 className="scrolly-teller-image__link-text">{linkText}</h5>
        </a>
      </div>
    </div>
  );
};

export default ScrollyTellerItemImage;
