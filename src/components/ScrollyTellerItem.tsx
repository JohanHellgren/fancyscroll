import { useEffect, useRef, useState } from "react";
import ScrollyTellerItemImage, {
  ScrollyTellerItemImageProps,
} from "./ScrollyTellerItemImage";
import LocomotiveScroll from "locomotive-scroll";

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
  const headerRef = useRef<HTMLHeadingElement>(null);
  const subheaderRef = useRef<HTMLHeadingElement>(null);
  const [headerMargin, setHeaderMargin] = useState(0);
  const [subheaderMargin, setSubheaderMargin] = useState(0);
  const margin = 15;
  const locomotiveScroll = new LocomotiveScroll({
    lenisOptions: {
        wrapper: window,
        content: document.documentElement,
        lerp: 0.1,
        duration: 1.2,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    },
});

  useEffect(() => {
    // Set header and subheader margins to prevent them from ever overlapping
    if (headerRef.current && subheaderRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      const subheaderHeight = subheaderRef.current.offsetHeight;
      setHeaderMargin(subheaderHeight + margin);
      setSubheaderMargin(headerHeight + margin);
    }
  }, [header, subheader]);

  return (
    <div className="relative min-h-screen flex p-[30px]">
      <div className="w-1/2 flex flex-col">
        <div
          className="sticky top-[30px]"
          style={{
            marginBottom: headerMargin,
          }}
        >
          <h1 ref={headerRef} className="text-9xl font-bold text-[#143275]">
            {header}
          </h1>
        </div>
        <div className="flex-grow" />
        <div
          className="sticky bottom-[30px]"
          style={{
            marginTop: subheaderMargin,
          }}
        >
          <h2 ref={subheaderRef} className="text-8xl text-[#143275]">
            {subheader}
          </h2>
        </div>
      </div>
      <div className="w-1/2">
        {images.map((image) => (
          <ScrollyTellerItemImage key={image.imageUrl} {...image} />
        ))}
      </div>
    </div>
  );
};

export default ScrollyTellerItem;
