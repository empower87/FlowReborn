import { useEffect, useState } from "react"
import { trpc } from "src/utils/trpc"
import { IComment, ISong } from "../../../../../../../server/src/models/index"
import { CommentInputReducerType } from "../../hooks/commentInputMenuReducer"
import Item from "../CommentItem/Item"

type InputType = "Comment" | "Edit" | "Reply" | "Hide"

export default function ReplyList({
  song,
  reducer,
}: // openInputModal,
{
  song: ISong
  reducer: CommentInputReducerType
  // openInputModal: (type: InputType, editId?: string, comment?: IComment) => void
}) {
  const id = reducer.state.selectedComment!._id
  const getComment = trpc.useQuery(["comments.get-comment", { _id: id }], { enabled: !!id })
  const [replies, setReplies] = useState<IComment[]>([])

  useEffect(() => {
    if (getComment.data) {
      const comment = getComment.data
      setReplies(comment.replies)
    }
  }, [getComment.data])

  if (getComment.isLoading || !getComment.data) return <p>loading...</p>

  return (
    <>
      <div className="comments__item-reply">
        {reducer.state.selectedComment && (
          <Item song={song} comment={reducer.state.selectedComment} reducer={reducer} />
        )}
      </div>
      <ul className="comments__item-reply-list">
        {replies?.map((reply, index) => {
          return <Item key={`${reply._id}_${index}`} song={song} comment={reply} reducer={reducer} />
        })}
      </ul>
    </>
  )
}
