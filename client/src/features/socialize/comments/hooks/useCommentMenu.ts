import { Dispatch, MouseEvent, SetStateAction, useEffect, useReducer, useState } from "react"
import { IComment } from "../../../../../../server/src/models"
import { commentInputMenuReducer, INITIAL_STATE } from "../hooks/commentInputMenuReducer"
import useComments from "../hooks/useComments"

export default function useCommentMenu(
  songId: string,
  _comments: IComment[],
  onClose: Dispatch<SetStateAction<boolean>>
) {
  const [comments, setComments] = useState<IComment[]>([])
  const { addComment, editComment, error, isLoading, data } = useComments()
  const [state, dispatch] = useReducer(commentInputMenuReducer, INITIAL_STATE)
  const [sortComments, setSortComments] = useState<"Top" | "Newest">("Newest")

  useEffect(() => {
    setComments(_comments)
  }, [_comments])

  useEffect(() => {
    if ((data && !data.data) || (data && !data.target)) return
    switch (data?.target) {
      case "ADD":
        if (!data || typeof data.data === "undefined" || data.target !== "ADD") return
        setComments((prev) => [...prev, data.data])
        break
      case "EDIT":
        if (!data || typeof data.data === "undefined" || data.target !== "EDIT") return
        setComments((prev) =>
          prev.map((prevComment) => {
            if (prevComment._id === data.data._id) {
              return data.data
            } else {
              return prevComment
            }
          })
        )
        break
      case "DELETE":
        if (!data || typeof data.data === "undefined" || data.target !== "DELETE") return
        setComments((prev) => prev.filter((prevComment) => prevComment._id !== data.data._id))
        break
      default:
        return
    }
    console.log(data, "Did Comments update?")
  }, [data])

  const handleToggleInput = (
    type: "EDIT" | "REPLY" | "COMMENT" | "OPEN_REPLY_MENU" | "CLOSE_REPLY_MENU" | "CLOSE",
    data?: IComment | undefined
  ) => {
    switch (type) {
      case "EDIT":
        dispatch({ type: "EDIT", payload: { editComment: data } })
        console.log("TOGGLE EDIT INPUT", data?.text, state.selectedComment?.text)
        break
      case "REPLY":
        dispatch({ type: "REPLY", payload: { reply: data } })
        console.log("TOGGLE REPLY INPUT", data?.text, state.selectedComment?.text)
        break
      case "OPEN_REPLY_MENU":
        dispatch({ type: "OPEN_REPLY_MENU", payload: { reply: data } })
        console.log("TOGGLE OPEN_REPLY INPUT", data?.text, state.selectedComment?.text)
        break
      case "CLOSE_REPLY_MENU":
        dispatch({ type: "CLOSE_REPLY_MENU" })
        console.log("TOGGLE CLOSE REPLY INPUT", data?.text, state.selectedComment?.text)
        break
      case "COMMENT":
        dispatch({ type: "COMMENT" })
        console.log("TOGGLE COMMENT INPUT", data?.text, state.selectedComment?.text)
        break
      case "CLOSE":
        dispatch({ type: "CLOSE" })
        onClose(false)
        break
    }
  }

  const handleCloseInput = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      dispatch({ type: "HIDE" })
    }
  }

  const onSubmit = (e: MouseEvent<HTMLButtonElement>, text: string | undefined) => {
    if (!text || text === "") return
    switch (state.showInput) {
      case "EDIT":
        if (!state.selectedComment) return
        editComment(state.selectedComment._id, text)
        break
      case "REPLY":
        if (!state.selectedComment) return
        addComment(state.selectedComment._id, text)
        break
      case "COMMENT":
        addComment(songId, text)
        break
      default:
        return
    }
    e.preventDefault()
  }

  return {
    comments,
    state,
    // handleCloseCommentMenu,
    handleToggleInput,
    handleCloseInput,
    onSubmit,
    sortComments,
    setSortComments,
  }
}
