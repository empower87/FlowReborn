import { useLayoutEffect, useRef, useState } from "react"

type MarqueeTextProps = {
  text: any
  wrapperStyles?: [string, string, string]
  textStyles?: [string, string, string]
}

export default function MarqueeText({ text, wrapperStyles, textStyles }: MarqueeTextProps) {
  const [isMarquee, setIsMarquee] = useState<boolean>(false)
  const titleRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!titleRef.current || !wrapperRef.current) return
    let computedTitleWidth = window.getComputedStyle(titleRef?.current)
    let computedWrapperWidth = window.getComputedStyle(wrapperRef?.current)
    let titleWidth = parseInt(computedTitleWidth.getPropertyValue("width"))
    let wrapperWidth = parseInt(computedWrapperWidth.getPropertyValue("width"))

    if (titleWidth >= wrapperWidth) {
      setIsMarquee(true)
    } else {
      setIsMarquee(false)
    }
  }, [text])

  const marqueeWrapperStyles = {
    height: wrapperStyles ? wrapperStyles[0] : "75%",
    width: wrapperStyles ? wrapperStyles[1] : "92%",
    borderRadius: wrapperStyles ? wrapperStyles[2] : "0em 0em 1.4em 0em",
  }
  const marqueeTextStyles = {
    fontSize: textStyles ? textStyles[0] : "0.95rem",
    color: textStyles ? textStyles[1] : "white",
    textIndent: textStyles ? textStyles[2] : "0",
  }

  return (
    <div
      className={`marquee-wrapper ${isMarquee ? "marquee-animation" : ""}`}
      ref={wrapperRef}
      style={wrapperStyles ? marqueeWrapperStyles : {}}
    >
      <p className="marquee-text" ref={titleRef} style={textStyles ? marqueeTextStyles : {}}>
        {text}
      </p>
      {isMarquee ? (
        <p className="marquee-text" style={textStyles ? marqueeTextStyles : {}}>
          {text}
        </p>
      ) : (
        <></>
      )}
    </div>
  )
}
