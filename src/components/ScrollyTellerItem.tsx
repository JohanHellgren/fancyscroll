import { useEffect, useRef, useState } from 'react'
import ScrollyTellerItemImage, {
  ScrollyTellerItemImageProps,
} from './ScrollyTellerItemImage'

export interface ScrollyTellerItemProps {
  header: string
  subheader: string
  images: ScrollyTellerItemImageProps[]
}

const lerpSmoothing = 0.07

const lerp = (start: number, end: number, t: number) => {
  return start * (1 - t) + end * t
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

  // Just lerp to scroll position
  const [smoothScroll, setSmoothScroll] = useState(0)
  const animationFrame = useRef<number>()

  useEffect(() => {
    if (headerRef.current && subheaderRef.current) {
      const headerHeight = headerRef.current.offsetHeight
      const subheaderHeight = subheaderRef.current.offsetHeight
      const spacing = 30
      setHeaderMargin(headerHeight + subheaderHeight + spacing)
      setSubheaderMargin(subheaderHeight / 2 + 15)
    }
  }, [header, subheader])

  useEffect(() => {
    const animate = () => {
      setSmoothScroll((prev) => lerp(prev, window.scrollY, lerpSmoothing))
      animationFrame.current = requestAnimationFrame(animate)
    }
    animationFrame.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
    }
  }, [])

  return (
    <div className="relative min-h-screen flex p-[30px]">
      <div className="w-1/2 flex flex-col">
        <div
          className="sticky top-[30px]"
          style={{
            marginBottom: headerMargin,
            transform: `translateY(${
              -(window.scrollY - smoothScroll) * 0.5
            }px)`,
          }}
        >
          <h1
            ref={headerRef}
            className="text-9xl font-bold"
          >
            {header}
          </h1>
        </div>
        <div className="flex-grow" />
        <div
          className="sticky bottom-[30px]"
          style={{
            marginTop: subheaderMargin,
            transform: `translateY(${
              -(window.scrollY - smoothScroll) * 0.5
            }px)`,
          }}
        >
          <h2
            ref={subheaderRef}
            className="text-8xl"
          >
            {subheader}
          </h2>
        </div>
      </div>
      <div className="w-1/2">
        {images.map((image) => (
          <ScrollyTellerItemImage
            key={image.imageUrl}
            {...image}
          />
        ))}
      </div>
    </div>
  )
}

export default ScrollyTellerItem
