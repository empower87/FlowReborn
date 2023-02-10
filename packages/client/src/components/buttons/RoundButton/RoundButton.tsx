import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react"
import { calculateButtonSize } from "src/utils/styleCalculators"
import { ButtonTypes, Icon } from "../Icon/Icon"

export enum BtnColorsEnum {
  Primary = "Primary",
  Secondary = "Secondary",
  Initial = "Initial",
}

type BtnOptions = {
  bgColor: BtnColorsEnum
  inset?: [boolean, string]
  offset?: number
  alignment?: ["flex-start" | "flex-end", number]
}

type IconOptions = {
  color: "White" | "Primary"
  size?: number
  margin?: string
}

type RoundButtonProps = {
  type: ButtonTypes
  btnOptions: BtnOptions
  iconOptions: IconOptions
  onClick?: any
}

type ButtonStyles = {
  height: string
  width: string
  marginLeft: string | undefined
  marginRight: string | undefined
}

type ButtonProps = Omit<RoundButtonProps, "btnOptions">

interface IButtonProps extends ButtonProps {
  buttonStyles: ButtonStyles
  color: BtnColorsEnum
}

let BUTTON_STYLES: ButtonStyles = {
  height: "28px",
  width: "28px",
  marginLeft: undefined,
  marginRight: undefined,
}

export const RoundButton = ({ type, btnOptions, iconOptions, onClick }: RoundButtonProps) => {
  const [buttonStyles, setButtonStyles] = useState<ButtonStyles>(BUTTON_STYLES)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const sizeRef = useRef<number[]>([])
  const isLeft = btnOptions?.alignment && btnOptions?.alignment[0] === "flex-start" ? true : false
  const bgColor = btnOptions.bgColor

  const WRAPPER_STYLES = {
    justifyContent: btnOptions?.alignment ? btnOptions?.alignment[0] : undefined,
  }

  useLayoutEffect(() => {
    if (!wrapperRef.current) return
    const width = wrapperRef.current.offsetWidth
    const height = wrapperRef.current.offsetHeight
    const offset = btnOptions?.offset ? btnOptions.offset : 6

    sizeRef.current = calculateButtonSize(height, width, offset)
  }, [wrapperRef.current, sizeRef.current])

  useEffect(() => {
    setButtonStyles((prev) => ({
      ...prev,
      height: `${sizeRef.current[0]}px`,
      width: `${sizeRef.current[1]}px`,
      marginLeft: isLeft && btnOptions?.alignment ? `${btnOptions.alignment[1]}em` : undefined,
      marginRight: !isLeft && btnOptions?.alignment ? `${btnOptions.alignment[1]}em` : undefined,
    }))
  }, [])

  const iconColor = bgColor === BtnColorsEnum.Secondary || bgColor === BtnColorsEnum.Primary ? "White" : "Primary"

  return (
    <div className="RoundButton__wrapper" ref={wrapperRef} style={WRAPPER_STYLES}>
      {btnOptions?.inset && btnOptions.inset[0] === true ? (
        <ButtonInset padding={btnOptions.inset[1]}>
          <Button
            type={type}
            color={bgColor}
            buttonStyles={buttonStyles}
            onClick={onClick}
            iconOptions={{ ...iconOptions, color: iconColor }}
          />
        </ButtonInset>
      ) : (
        <Button
          type={type}
          color={bgColor}
          buttonStyles={buttonStyles}
          onClick={onClick}
          iconOptions={{ ...iconOptions, color: iconColor }}
        />
      )}
    </div>
  )
}

const ButtonInset = ({ padding, children }: { padding: string; children: ReactNode }) => (
  <div className="RoundButton__inset" style={{ padding: padding }}>
    {children}
  </div>
)

const Button = ({ type, color, buttonStyles, onClick, iconOptions }: IButtonProps) => {
  const onClickRef = useRef(onClick)
  return (
    <button
      className={`RoundButton ${color}`}
      style={buttonStyles}
      type="button"
      onClick={() => (onClickRef.current ? onClickRef.current() : null)}
    >
      <Icon type={type} options={iconOptions} />
    </button>
  )
}
