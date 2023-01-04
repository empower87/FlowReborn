import { useState } from "react"
import { IComment, ISong } from "../../../../../../../server/src/models"
import { CommentDispatch, CommentState } from "../../hooks/commentInputMenuReducer"
import Item from "../CommentItem/Item"

export const CommentList = ({
  song,
  state,
  dispatch,
  comments,
  onClose,
}: // replyId,
{
  song: ISong
  state: CommentState
  dispatch: CommentDispatch
  comments: IComment[]
  onClose?: () => void
  // replyId?: string
}) => {
  const [list, setList] = useState<IComment[]>([])
  // const replies = trpc.useQuery(["comments.get-comment", { _id: replyId ? replyId : "" }])

  // useEffect(() => {
  //   if (replyId && replies.data) {
  //     console.log(replies.data, "wtf")
  //     setList(replies.data.replies)
  //   } else {
  //     setList(comments)
  //   }
  // }, [replyId, replies, comments])

  return (
    <div className="comments__list--shadow-outset">
      <div className="comments__list--shadow-inset">
        <ul className="comments__list">
          {comments?.map((item, index) => {
            let isLast = false
            if (comments.length - 1 === index) isLast = true
            return (
              <Item
                key={item._id}
                comment={item}
                song={song}
                reducer={{ state: state, dispatch: dispatch }}
                isLast={isLast}
                onClose={onClose}
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
}
