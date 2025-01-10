import ScrollyTellerItemImage, {
  ScrollyTellerItemImageProps,
} from "./ScrollyTellerItemImage";

export interface ScrollyTellerItemProps {
  header: string;
  subheader: string;
  images: ScrollyTellerItemImageProps[];
}

const ScrollyTellerItem = ({
  header,
  subheader,
  images,
}: ScrollyTellerItemProps) => {
  return (
    <div className="relative min-h-screen pt-[100px] flex">
      <div className="w-[50%]">
        <div className="sticky top-0 flex flex-col justify-between md:p-[30px]">
          <h2 className="text-6xl font-bold">{header}</h2>
          <h3 className="text-3xl">{subheader}</h3>
        </div>
      </div>
      <div className="w-[50%]">
        {images.map((image) => (
          <ScrollyTellerItemImage key={image.imageUrl} {...image} />
        ))}
      </div>
    </div>
  );
};

export default ScrollyTellerItem;
