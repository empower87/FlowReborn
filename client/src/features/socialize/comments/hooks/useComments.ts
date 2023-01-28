import { useCallback, useReducer } from "react"
import { useQueryClient } from "react-query"
import { useAuth } from "src/context/AuthContext"
import { trpc, trpcZodErrorHandler } from "src/utils/trpc"
import { IComment } from "../../../../../../server/src/models"
import { commentMutationStatusReducer, INITIAL_STATE } from "../reducers/commentMutationStatusReducer"

type MutationType = "CREATE" | "EDIT" | "NONE"

export default function useComments() {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const [state, dispatch] = useReducer(commentMutationStatusReducer, INITIAL_STATE)

  const add = trpc.useMutation(["comments.create"], {
    onSuccess: (data, variables) => {
      onSuccessHandler("CREATE", data)
      invalidateQueries(variables.parent, variables.songId)
    },
    onError: (err) => onErrorHandler("CREATE", err.message),
  })
  const edit = trpc.useMutation(["comments.edit"], {
    onSuccess: (data, variables) => {
      onSuccessHandler("EDIT", data)
      invalidateQueries(data.parent._id, variables.songId)
    },
    onError: (err) => onErrorHandler("EDIT", err.message),
  })
  const del = trpc.useMutation(["comments.delete"], {
    onSuccess: (data, variables) => {
      onSuccessHandler("NONE", data)
      invalidateQueries(variables.parent, variables.songId)
    },
    onError: (err) => onErrorHandler("NONE", err.message),
  })

  const addComment = useCallback((parent: string, text: string, songId: string) => {
    if (!user) return
    add.mutate({ parent, text, user, songId })
  }, [])

  const editComment = useCallback((_id: string, text: string, songId: string) => {
    edit.mutate({ _id, text, songId })
  }, [])

  const deleteComment = useCallback((_id: string, parent: string, songId: string) => {
    del.mutate({ _id, parent, songId })
  }, [])

  const invalidateQueries = (parentId: string, songId: string) => {
    const commentId = parentId !== songId && { _id: `${parentId}` }

    queryClient.invalidateQueries("songs.all-songs")
    if (commentId) {
      queryClient.invalidateQueries(["comments.get-comment", commentId])
    }
  }

  const onSuccessHandler = (target: MutationType, data: IComment | null) => {
    console.log(data, `SUCCESS: ${target} mutation executed`)
    dispatch({ type: "ON_SUCCESS", payload: { target: target, data: data } })
  }

  const onErrorHandler = (target: MutationType, error: string) => {
    const message = trpcZodErrorHandler(error)
    dispatch({ type: "ON_ERROR", payload: { target: target, errorMessage: message } })
  }

  const resetError = () => {
    dispatch({ type: "RESET_ERROR", payload: { target: "CREATE" } })
  }

  return {
    addComment,
    editComment,
    deleteComment,
    resetError,
    mutationStatus: state,
    setMutationStatus: dispatch,
  }
}
