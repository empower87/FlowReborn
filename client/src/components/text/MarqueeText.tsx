import { useLayoutEffect, useRef, useState } from "react"

export default function MarqueeText({ text }: { text: any }) {
  const [isMarquee, setIsMarquee] = useState<boolean>(false)
  const titleRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!titleRef.current || !wrapperRef.current) return
    let computedTitleWidth = window.getComputedStyle(titleRef?.current)
    let computedWrapperWidth = window.getComputedStyle(wrapperRef?.current)
    let titleWidth = parseInt(computedTitleWidth.getPropertyValue("width"))
    let wrapperWidth = parseInt(computedWrapperWidth.getPropertyValue("width"))

    if (titleWidth >= wrapperWidth) setIsMarquee(true)
    else setIsMarquee(false)
  }, [text])

  return (
    <div className={`marquee-wrapper ${isMarquee ? "marquee--animation" : ""}`} ref={wrapperRef}>
      {/* <Paragraph ref={titleRef}>{text}</Paragraph> */}
      <p className="song-title-marquee" ref={titleRef}>
        {text}
        {/* {song?.title} {String.fromCodePoint(8226)} <span>{song?.user?.username}</span> */}
      </p>
      {isMarquee && (
        <p className="song-title-marquee" ref={titleRef}>
          {text}
          {/* {song?.title} {String.fromCodePoint(8226)} <span>{song?.user?.username}</span> */}
        </p>
      )}
    </div>
  )
}
