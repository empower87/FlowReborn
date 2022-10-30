import { MouseEventHandler, useState } from "react"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"
import ContinueModal from "src/components/modals/ContinueModal"
import { IComment } from "../../../../../../../server/src/models/index"
import useLike from "../../../like/useLike"
import useComments from "../../hooks/useComments"

type OnClick = MouseEventHandler<HTMLButtonElement>

type ItemButtonProps = {
  type: "Like" | "Reply" | "Edit" | "Delete"
  onClick: OnClick
  total?: number
  isLiked?: boolean
}

const ItemButton = ({ type, onClick, total, isLiked }: ItemButtonProps) => {
  return (
    <button
      className={`comments__btn ${type} ${isLiked ? "isLiked" : ""}`}
      style={type === "Like" ? { borderRadius: "40px 3px 3px 40px" } : {}}
      onClick={onClick}
    >
      <div className={`comments__btn-icon ${type}`}>
        <Icon type={ButtonTypes[type]} options={{ color: "Primary", size: type === "Reply" ? 70 : undefined }} />
      </div>
      <div className="comments__btn-text--container">
        <p className={`comments__btn-text ${type}`}>{type === "Like" || type === "Reply" ? total : type}</p>
        {type === "Reply" && total !== 0 && (
          <div className="comments__btn-reply-icon">
            <Icon type={ButtonTypes.Down} options={{ color: "Primary" }} />
          </div>
        )}
      </div>
    </button>
  )
}

export const EditButton = ({ onClick }: { onClick: OnClick }) => {
  return (
    <div className="comments__btn--container">
      <ItemButton type={"Edit"} onClick={onClick} />
    </div>
  )
}

export const DeleteButton = ({ songId, commentId }: { songId: string; commentId: string }) => {
  const { deleteComment } = useComments()
  const [isDelete, setIsDelete] = useState<boolean>(false)

  const handleOnDelete = () => {
    deleteComment(commentId, songId)
  }

  return (
    <div className="comments__btn--container">
      <ItemButton type={"Delete"} onClick={() => setIsDelete(true)} />
      <ContinueModal
        title="Delete Comment"
        text="Are you sure you want to delete this comment?"
        btnText="delete"
        isOpen={isDelete}
        onClose={setIsDelete}
        onExit={handleOnDelete}
      />
    </div>
  )
}

export const LikeButton = ({ comment }: { comment: IComment }) => {
  const { hasUser, total, onClick, loading } = useLike(comment, "Comment")
  return (
    <div className="comments__btn--container">
      <ItemButton type={"Like"} onClick={() => onClick()} total={total} isLiked={hasUser} />
    </div>
  )
}

export const ReplyButton = ({ onClick, total }: { onClick: OnClick; total: number }) => {
  return (
    <div className="comments__btn--container">
      <ItemButton type={"Reply"} onClick={onClick} total={total} />
    </div>
  )
}
