import LocomotiveScroll from 'locomotive-scroll'
import { useEffect, useRef, useState } from 'react'
import '../styles/components/_scrolly-teller-item.scss'
import ScrollyTellerItemImage, {
  ScrollyTellerItemImageProps,
} from './ScrollyTellerItemImage'

export interface ScrollyTellerItemProps {
  header: string
  subheader: string
  images: ScrollyTellerItemImageProps[]
}

const ScrollyTellerItem = ({
  header,
  subheader,
  images,
}: ScrollyTellerItemProps) => {
  const headerRef = useRef<HTMLHeadingElement>(null)
  const subheaderRef = useRef<HTMLHeadingElement>(null)
  const [headerMargin, setHeaderMargin] = useState(0)
  const [subheaderMargin, setSubheaderMargin] = useState(0)
  const margin = 15
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
  })

  useEffect(() => {
    const handleResize = () => {
      // Set header and subheader margins to prevent them from ever overlapping
      if (headerRef.current && subheaderRef.current) {
        const headerHeight = headerRef.current.offsetHeight
        const subheaderHeight = subheaderRef.current.offsetHeight
        setHeaderMargin(subheaderHeight + margin)
        setSubheaderMargin(headerHeight + margin)
      }
    }
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [header, subheader])

  return (
    <div className="scrolly-teller-item">
      <div className="scrolly-teller-item__column">
        <div
          className="scrolly-teller-item__header"
          style={{
            marginBottom: headerMargin,
          }}
        >
          <h1 ref={headerRef}>{header}</h1>
        </div>
        <div className="scrolly-teller-item__column--content" />
        <div
          className="scrolly-teller-item__subheader"
          style={{
            marginTop: subheaderMargin,
          }}
        >
          <h2 ref={subheaderRef}>{subheader}</h2>
        </div>
      </div>
      <div className="scrolly-teller-item__column">
        {images.map((image, index) => (
          <ScrollyTellerItemImage
            key={image.imageUrl}
            {...image}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

export default ScrollyTellerItem
