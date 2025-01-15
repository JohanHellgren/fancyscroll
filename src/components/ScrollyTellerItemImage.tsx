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
      className="flex flex-col mb-[24px]"
      data-scroll
      data-scroll-speed={0.01 * (index + 1)}
    >
      <img src={imageUrl} alt={altText} className="mt-[10px]" />
      <div className="flex flex-row justify-between mt-[10px]">
        <h5 className="text-3xl">{caption}</h5>
        <a>
          <h5 className="text-2xl">{linkText}</h5>
        </a>
      </div>
    </div>
  );
};

export default ScrollyTellerItemImage;
