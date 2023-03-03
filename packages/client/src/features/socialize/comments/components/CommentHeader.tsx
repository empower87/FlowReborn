import { MouseEventHandler } from "react"
import { Icon } from "src/components/buttons/Icon/Icon"
import { ResizeBar } from "src/components/ui/ResizeBar"

type CommentMenuButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>
  type: "Close" | "Comment" | "Back"
}

export const CommentHeaderButton = ({ onClick, type }: CommentMenuButtonProps) => {
  const color = type === "Comment" ? "White" : "Primary"
  const size = type === "Comment" ? 75 : 100
  return (
    <div className="comments__header-btn--container">
      <button className={`comments__header-btn ${type}`} type="button" onClick={onClick}>
        <Icon type={type} options={{ color: color, size: size }} />
      </button>
    </div>
  )
}

const TitleText = ({ text, count }: { text: string; count: number | undefined }) => {
  const p1 = {
    color: "white",
    fontSize: "13px",
    fontWeight: "500",
    margin: "0% 3%",
  }
  const p2 = {
    fontSize: "12px",
    color: "#efbfbf",
  }
  return (
    <>
      <p style={p1}>{text}</p>
      <p style={p2}>{count}</p>
    </>
  )
}
const Title = ({ title, count }: { title: string; count: number | undefined }) => {
  const onClickHandler = () => {}
  return (
    <div className="comments__title--container">
      <ResizeBar text={<TitleText text={title} count={count} />} onClick={onClickHandler} />
    </div>
  )
}

export const CommentHeader = ({
  menu,
  onClose,
  totalComments,
  replyBackButton,
}: {
  menu: "Comments" | "Replies"
  onClose: () => void
  totalComments?: number
  replyBackButton?: JSX.Element
}) => {
  return (
    <div className="comments__header--shadow-outset">
      <div className="comments__header--shadow-inset">
        {replyBackButton}
        <Title title={menu} count={totalComments} />
        <CommentHeaderButton onClick={onClose} type="Close" />
      </div>
    </div>
  )
}
