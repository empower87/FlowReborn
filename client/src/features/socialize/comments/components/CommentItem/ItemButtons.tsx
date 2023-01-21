import { MouseEventHandler, useState } from "react"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"
import ContinueModal from "src/components/modals/ContinueModal"
import { useAuth } from "src/context/AuthContext"
import { IComment } from "../../../../../../../server/src/models/index"
import useLike from "../../../like/useLike"

type OnClick = MouseEventHandler<HTMLButtonElement>

type ItemButtonProps = {
  type: "Like" | "Reply" | "Edit" | "Delete"
  onClick: OnClick
  total?: number
  isLiked?: boolean
}
type EditDeleteButtonsProps = {
  // songId: string
  comment: IComment
  dispatch: (type: any, data?: IComment | undefined) => void
}

const ItemButton = ({ type, onClick, total, isLiked }: ItemButtonProps) => {
  return (
    <div className="comments__btn--container">
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
    </div>
  )
}

export const LikeButton = ({ comment }: { comment: IComment }) => {
  const { hasUser, total, onClick, loading } = useLike(comment, "Comment")
  return (
    <ItemButton
      type={"Like"}
      onClick={() => {
        onClick()
        console.log("CLICKED LIKE BUTTON", comment.text, comment._id)
      }}
      total={total}
      isLiked={hasUser}
    />
  )
}

export const ReplyButton = ({
  reply,
  onClick,
  total,
}: {
  reply: IComment
  onClick: (type: any, data?: IComment | undefined) => void
  total: number
}) => {
  return (
    <>
      <ItemButton
        type={"Reply"}
        onClick={() => {
          onClick("OPEN_REPLY_MENU", reply)
          console.log("CLICKED REPLY BUTTON", reply.text, reply._id)
        }}
        total={total}
      />
    </>
  )
}

const EditButton = ({ onClick }: { onClick: OnClick }) => {
  return <ItemButton type="Edit" onClick={onClick} />
}

const DeleteButton = ({
  songId,
  comment,
  onClick,
}: {
  songId: string
  comment: IComment
  onClick: (type: any, data?: IComment | undefined) => void
}) => {
  // const { deleteComment } = useComments()
  const [isDelete, setIsDelete] = useState<boolean>(false)

  const parentId = comment.parent._id ? comment.parent._id : (comment.parent as unknown as string)
  const handleOnDelete = () => {
    onClick("DELETE", comment)
    // deleteComment(comment._id, parentId)
  }

  return (
    <>
      <ItemButton
        type="Delete"
        onClick={() => {
          setIsDelete(true)
          console.log(comment, "what's this commentId")
        }}
      />
      <ContinueModal
        title="Delete Comment"
        text="Are you sure you want to delete this comment?"
        btnText="delete"
        isOpen={isDelete}
        onClose={setIsDelete}
        onExit={handleOnDelete}
      />
    </>
  )
}

export const EditDeleteButtons = ({ comment, dispatch }: EditDeleteButtonsProps) => {
  const { user } = useAuth()
  const parentId = comment.parent._id ? comment.parent._id : (comment.parent as unknown as string)
  if (user && user._id !== comment.user._id) return null
  return (
    <>
      <EditButton
        onClick={() => {
          dispatch("EDIT", comment)
          console.log("CLICKED EDIT BUTTON", comment.text, comment._id)
        }}
      />
      <DeleteButton songId={parentId} comment={comment} onClick={dispatch} />
    </>
  )
}
