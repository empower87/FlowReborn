import { useEffect, useState } from "react"
import { trpc } from "src/utils/trpc"
import { IComment, ISong } from "../../../../../../../server/src/models"
import { CommentDispatch, CommentState } from "../../hooks/commentInputMenuReducer"
import Item from "../CommentItem/Item"

export const CommentList = ({
  song,
  state,
  dispatch,
  comments,
  replyId,
}: {
  song: ISong
  state: CommentState
  dispatch: CommentDispatch
  comments: IComment[]
  replyId?: string
}) => {
  const [list, setList] = useState<IComment[]>([])
  const replies = trpc.useQuery(["comments.get-comment", { _id: replyId ? replyId : "" }])

  useEffect(() => {
    if (replyId && replies.data) {
      console.log(replies.data, "wtf")
      setList(replies.data.replies)
    } else {
      setList(comments)
    }
  }, [replyId, replies, comments])

  console.log(list, comments, "check this shit son")
  return (
    <div className="comments__list--shadow-outset">
      <div className="comments__list--shadow-inset">
        <ul className="comments__list">
          {list?.map((item, index) => {
            let isLast = false
            if (list.length - 1 === index) isLast = true
            return (
              <Item
                key={item._id}
                comment={item}
                song={song}
                reducer={{ state: state, dispatch: dispatch }}
                isLast={isLast}
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
}
