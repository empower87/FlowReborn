import { Dispatch, SetStateAction, useCallback, useEffect, useReducer, useState } from "react"
import { IComment, ISong } from "../../../../../../server/src/models"
import useComments from "../hooks/useComments"
import { commentInputMenuReducer, INITIAL_STATE, InputTypes } from "../reducers/commentInputMenuReducer"

export type SortCommentsType = "TOP" | "NEWEST"
export type ToggleInputHandlerType = (type: InputTypes, data?: IComment | undefined) => void

export default function useCommentMenu(song: ISong, onClose: Dispatch<SetStateAction<boolean>>) {
  const songId = song._id
  const _comments = song.comments
  const sortByNewest = _comments.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime())

  const { addComment, editComment, deleteComment, resetError, mutationStatus, setMutationStatus } = useComments()
  const [state, dispatch] = useReducer(commentInputMenuReducer, INITIAL_STATE)

  const [comments, setComments] = useState<IComment[]>([])
  const [sortComments, setSortComments] = useState<SortCommentsType>("NEWEST")

  useEffect(() => {
    setComments(sortByNewest)
    setSortComments("NEWEST")
  }, [_comments])

  useEffect(() => {
    if (mutationStatus.isSuccessful) {
      dispatch({ type: "HIDE_INPUT" })
      setMutationStatus({ type: "RESET", payload: { target: "NONE" } })
    }
  }, [mutationStatus])

  useEffect(() => {
    console.log(mutationStatus, "lets see how much this changes")
  }, [mutationStatus])

  useEffect(() => {
    if (mutationStatus.target === "NONE" || !mutationStatus.data) return
    const validData = mutationStatus.data
    switch (mutationStatus.target) {
      case "CREATE":
        setComments((prev) => [...prev, validData])
        break
      case "EDIT":
        setComments((prev) =>
          prev.map((prevComment) => {
            if (prevComment._id === validData._id) {
              return validData
            } else {
              return prevComment
            }
          })
        )
        break
      case "DELETE":
        setComments((prev) => prev.filter((each) => each._id !== validData._id))
        break
      default:
        return
    }
  }, [mutationStatus])

  const sortCommentsHandler = useCallback((sort: SortCommentsType) => {
    setSortComments(sort)
    if (sort === "TOP") {
      setComments((prevComments) => prevComments.sort((a, b) => b.likes.length - a.likes.length))
    } else {
      setComments((prevComments) =>
        prevComments.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime())
      )
    }
  }, [])

  const handleToggleInput = useCallback((type: InputTypes, data?: IComment | undefined) => {
    switch (type) {
      case "OPEN_EDIT_INPUT":
        dispatch({ type: "OPEN_EDIT_INPUT", payload: { editComment: data } })
        console.log("TOGGLE EDIT INPUT", data?.text, state.selectedComment?.text)
        break
      case "OPEN_REPLY_INPUT":
        dispatch({ type: "OPEN_REPLY_INPUT", payload: { reply: data } })
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
      case "OPEN_COMMENT_INPUT":
        dispatch({ type: "OPEN_COMMENT_INPUT" })
        console.log("TOGGLE COMMENT INPUT", data?.text, state.selectedComment?.text)
        break
      case "CLOSE_MENUS":
        dispatch({ type: "CLOSE_MENUS" })
        onClose(false)
        break
      case "HIDE_INPUT":
        dispatch({ type: "HIDE_INPUT" })
        resetError()
        break
      case "DELETE":
        if (!data) return
        const parentId = data.parent._id ? data.parent._id : (data.parent as unknown as string)
        deleteComment(data._id, parentId, songId)
        break
      default:
        return
    }
  }, [])

  const onSubmit = (text: string, target: "EDIT" | "CREATE") => {
    if (!text)
      return setMutationStatus({
        type: "ON_ERROR",
        payload: { target: target, errorMessage: "comment must be at least 1 character" },
      })
    switch (state.showInput) {
      case "OPEN_EDIT_INPUT":
        if (!state.selectedComment) return
        setMutationStatus({ type: "SET_SUBMITTING", payload: { target: "EDIT" } })
        editComment(state.selectedComment._id, text, songId)
        break
      case "OPEN_REPLY_INPUT":
        if (!state.selectedComment) return
        setMutationStatus({ type: "SET_SUBMITTING", payload: { target: "CREATE" } })
        addComment(state.selectedComment._id, text, songId)
        break
      case "OPEN_COMMENT_INPUT":
        setMutationStatus({ type: "SET_SUBMITTING", payload: { target: "CREATE" } })
        addComment(songId, text, songId)
        break
      default:
        return
    }
  }

  return {
    comments,
    state,
    handleToggleInput,
    onSubmit,
    sortComments,
    sortCommentsHandler,
    resetError,
    mutationStatus,
    setMutationStatus,
  }
}
