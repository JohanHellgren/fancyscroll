import { useEffect, useRef, useState } from "react";
import ScrollyTellerItemImage, {
  ScrollyTellerItemImageProps,
} from "./ScrollyTellerItemImage";

export interface ScrollyTellerItemProps {
  header: string;
  subheader: string;
  images: ScrollyTellerItemImageProps[];
}

const lerp = (start: number, end: number, t: number) => {
  return start * (1 - t) + end * t;
};

const map = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

const ScrollyTellerItem = ({
  header,
  subheader,
  images,
}: ScrollyTellerItemProps) => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const subheaderRef = useRef<HTMLHeadingElement>(null);
  const [headerMargin, setHeaderMargin] = useState(0);
  const [subheaderMargin, setSubheaderMargin] = useState(0);
  // Smooth scroll stuff
  const startScroll = useRef<number>(window.scrollY);
  const startTime = useRef<number>(performance.now());
  const currentLerpFactor = useRef<number>(0);
  const [smoothScroll, setSmoothScroll] = useState(0);
  const animationFrame = useRef<number>();

  useEffect(() => {
    // Set header and subheader margins to prevent them from ever overlapping
    if (headerRef.current && subheaderRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      const subheaderHeight = subheaderRef.current.offsetHeight;
      setHeaderMargin(headerHeight + 15);
      setSubheaderMargin(subheaderHeight + 15);
    }
  }, [header, subheader]);

  useEffect(() => {
    const animate = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - startTime.current;
      const scrollAmount = Math.abs(window.scrollY - startScroll.current);
      const scrollSpeed = scrollAmount / deltaTime;
      const lerpStrength = map(Math.min(scrollSpeed, 1), 0, 1, 0.05, 0.5);
      currentLerpFactor.current = lerp(currentLerpFactor.current, lerpStrength, 0.1);
      setSmoothScroll((prev) => lerp(prev, window.scrollY, lerpStrength));
      startScroll.current = window.scrollY;
      startTime.current = currentTime;
      animationFrame.current = requestAnimationFrame(animate);
    };
    animationFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex p-[30px]">
      <div className="w-1/2 flex flex-col">
        <div
          className="sticky top-[30px]"
          style={{
            marginBottom: headerMargin,
            transform: `translateY(${-(window.scrollY - smoothScroll)}px)`,
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
            transform: `translateY(${-(window.scrollY - smoothScroll)}px)`,
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
