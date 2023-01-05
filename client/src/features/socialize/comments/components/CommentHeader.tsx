import { MouseEventHandler } from "react"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"

type CommentMenuButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>
  type: "Close" | "Comment" | "Back"
}

const Button = ({ onClick, type }: CommentMenuButtonProps) => {
  const color = type === "Comment" ? "White" : "Primary"
  const size = type === "Comment" ? 75 : 100
  return (
    <div className="comments__header-btn--container">
      <button className={`comments__header-btn ${type}`} type="button" onClick={onClick}>
        <Icon type={ButtonTypes[type]} options={{ color: color, size: size }} />
      </button>
    </div>
  )
}

const Title = ({ title, count }: { title: string; count: number | undefined }) => {
  return (
    <div className="comments__title--container">
      <div className="comments__title--shadow-outset">
        <h3 className="comments__text">{title} </h3>
        <p>{count}</p>
        <div className="comments__header-toggle-fullscreen">
          <div className="comments__header-toggle-fullscreen--bs-inset">
            <button className="comments__header-toggle-fullscreen-btn"></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const CommentHeader = ({
  menu,
  comments,
  handleCloseMenu,
  handleCloseBothMenus,
}: {
  menu: "Comments" | "Replies"
  comments: number | undefined
  handleCloseMenu: () => void
  handleCloseBothMenus?: () => void
}) => {
  return (
    <div className="comments__header--shadow-outset">
      <div className="comments__header--shadow-inset">
        {menu === "Replies" ? <Button onClick={handleCloseMenu} type="Back" /> : null}
        <Title title={menu} count={comments} />
        <Button onClick={handleCloseBothMenus ? handleCloseBothMenus : handleCloseMenu} type="Close" />
      </div>
    </div>
  )
}
