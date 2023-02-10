import { useState } from "react"
import { ButtonTypes } from "src/components/buttons/Icon/Icon"
import { BtnColorsEnum, RoundButton } from "src/components/buttons/RoundButton/RoundButton"

export default function LyricsPanel({ isOpen }: { isOpen: boolean }) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <div
      className={`post-recording__lyrics ${isExpanded ? "LyricsExpanded" : ""}`}
      style={isOpen ? { visibility: "visible", opacity: 1 } : { visibility: "hidden", opacity: 0 }}
    >
      <div className="post-recording__lyrics--bs-outset">
        <div className="post-recording__lyrics-header">
          <RoundButton
            type={ButtonTypes.Expand}
            btnOptions={{ bgColor: BtnColorsEnum.Primary }}
            iconOptions={{ color: "White" }}
            onClick={() => setIsExpanded((prev) => !prev)}
          />
        </div>
        <div className="post-recording__lyrics--wrapper">
          <p>laksdfj asd;fkajsdfl;a jdfslakjsdf aslksdfjasldfj alsdkjf</p>
          <p>laksdfj asd;fkajsdfl;a jdfslakjsdf aslksdfjasldfj alsdkjf</p>
          <p>laksdfj asd;fkajsdfl;a jdfslakjsdf aslksdfjasldfj alsdkjf</p>
          <p>laksdfj asd;fkajsdfl;a jdfslakjsdf aslksdfjasldfj alsdkjf</p>
          <p>laksdfj asd;fkajsdfl;a jdfslakjsdf aslksdfjasldfj alsdkjf</p>
          <p>laksdfj asd;fkajsdfl;a jdfslakjsdf aslksdfjasldfj alsdkjf</p>
          <p>laksdfj asd;fkajsdfl;a jdfslakjsdf aslksdfjasldfj alsdkjf</p>
          <p>laksdfj asd;fkajsdfl;a jdfslakjsdf aslksdfjasldfj alsdkjf</p>
          <p>laksdfj asd;fkajsdfl;a jdfslakjsdf aslksdfjasldfj alsdkjf</p>
          <p>laksdfj asd;fkajsdfl;a jdfslakjsdf aslksdfjasldfj alsdkjf</p>
        </div>
      </div>
    </div>
  )
}
