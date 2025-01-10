import ScrollyTellerItemImage, {
  ScrollyTellerItemImageProps,
} from "./ScrollyTellerItemImage";
import { useEffect, useRef, useState } from "react";

export interface ScrollyTellerItemProps {
  header: string;
  subheader: string;
  images: ScrollyTellerItemImageProps[];
}

const lerp = (start: number, end: number, t: number) => {
  return start * (1 - t) + end * t;
};

const ScrollyTellerItem = ({
  header,
  subheader,
  images,
}: ScrollyTellerItemProps) => {
  const [subheaderPosition, setSubheaderPosition] = useState<number>(0);
  const [headerPosition, setHeaderPosition] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const subheaderRef = useRef<HTMLHeadingElement>(null);
  const targetSubheaderPosition = useRef<number>(0);
  const targetHeaderPosition = useRef<number>(0);
  const animationFrame = useRef<number>();

  useEffect(() => {
    const animate = () => {
      setSubheaderPosition(prev => lerp(prev, targetSubheaderPosition.current, 0.2));
      setHeaderPosition(prev => lerp(prev, targetHeaderPosition.current, 0.2));
      animationFrame.current = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      if (containerRef.current && headerRef.current && subheaderRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const headerHeight = headerRef.current.offsetHeight;
        const subheaderHeight = subheaderRef.current.offsetHeight;
        
        if (containerRect.bottom < 0 || containerRect.top > window.innerHeight) {
          return;
        }

        const headerStartPosition = 0;
        const headerEndPosition = 20; 
        targetHeaderPosition.current = Math.max(
          Math.min(
            -containerRect.top,
            headerEndPosition
          ),
          headerStartPosition
        );

        // Subheader position calculation
        const startPosition = headerHeight + 20;
        const endPosition = window.innerHeight - subheaderHeight - 20;
        
        if (containerRect.bottom < window.innerHeight) {
          const remainingSpace = containerRect.bottom;
          const newPosition = Math.min(endPosition, remainingSpace - subheaderHeight);
          targetSubheaderPosition.current = Math.max(newPosition, startPosition);
          return;
        }

        const newPosition = Math.min(
          Math.max(
            startPosition - containerRect.top,
            startPosition
          ),
          endPosition
        );
        
        targetSubheaderPosition.current = Math.max(newPosition, startPosition);
      }
    };

    animationFrame.current = requestAnimationFrame(animate);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen pt-[100px] flex p-[30px]">
      <div className="w-1/2">
        <div style={{ position: 'sticky', top: 0 }}>
          <h1 
            ref={headerRef}
            className="text-9xl font-bold"
            style={{ transform: `translateY(${headerPosition}px)` }}
          >
            {header}
          </h1>
        </div>
        <div style={{ 
          position: 'sticky', 
          top: 0,
          display: containerRef.current?.getBoundingClientRect().bottom < 0 ? 'none' : 'block'
        }}>
          <h2 
            ref={subheaderRef}
            className="text-7xl mb-10"
            style={{ transform: `translateY(${subheaderPosition}px)` }}
          >
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
