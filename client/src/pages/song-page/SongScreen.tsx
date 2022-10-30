import { Dispatch, SetStateAction } from "react"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"
import { pauseIcon, playIcon } from "../../assets/images/_icons"

export const NavigationButton = ({ onClick, direction }: { onClick: any; direction: "Previous" | "Next" }) => {
  return (
    <div className={`songscreen__navigate ${direction}`}>
      <button className="songscreen__navigate-btn" onClick={() => onClick(direction)}>
        <div className="songscreen__navigate-btn-icon">
          <Icon type={ButtonTypes[direction]} options={{ color: "White", size: 65 }} />
        </div>
      </button>
    </div>
  )
}

export const PlayButton = ({
  isPlaying,
  onClick,
}: {
  isPlaying: boolean
  onClick: Dispatch<SetStateAction<boolean>>
}) => {
  let icon = isPlaying ? pauseIcon : playIcon
  return (
    <button className="songscreen__play-btn--shadow-outset2" onClick={() => onClick((prev) => !prev)}>
      <div className="songscreen__play-btn--shadow-inset">
        <img src={icon} alt="pause/pause icon" />
      </div>
    </button>
  )
}
