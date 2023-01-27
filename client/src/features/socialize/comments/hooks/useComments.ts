import { useCallback, useReducer } from "react"
import { useQueryClient } from "react-query"
import { trpc } from "src/utils/trpc"
import { IComment } from "../../../../../../server/src/models"
import { useAuth } from "../../../../context/AuthContext"
import { commentMutationStatusReducer, INITIAL_STATE } from "../reducers/commentMutationStatusReducer"

type MutationType = "CREATE" | "EDIT" | "DELETE"
export type ErrorType = {
  target: MutationType | undefined
  message: string
}
type DataType = {
  target: MutationType | undefined
  data: IComment | null
}

const ERROR_STATE: ErrorType = {
  target: undefined,
  message: "",
}
const DATA_STATE: DataType = {
  target: undefined,
  data: null,
}

export default function useComments() {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const [state, dispatch] = useReducer(commentMutationStatusReducer, INITIAL_STATE)

  const add = trpc.useMutation(["comments.create"], {
    // onMutate: () => {
    //   dispatch({ type: "SET_SUBMITTING", payload: { target: "CREATE" } })
    // },
    onSuccess: (data, variables) => {
      console.log(data, "SUCCESS: created a comment")
      invalidateQueries("songs.all-songs")
      if (variables.parent !== variables.songId) {
        console.log(queryClient, "if parent._id doesn't equal songId then created comment must be a reply")
        invalidateQueries("comments.get-comment", { _id: `${variables.parent}` })
      }

      dispatch({ type: "ON_SUCCESS", payload: { target: "CREATE", data: data } })
    },
    onError: (err) => {
      dispatch({ type: "ON_ERROR", payload: { target: "CREATE", errorMessage: err.message } })
    },
    onSettled: () => {
      dispatch({ type: "SET_IDLE", payload: { target: "CREATE" } })
    },
  })

  const edit = trpc.useMutation(["comments.edit"], {
    // onMutate: () => {
    //   dispatch({ type: "SET_SUBMITTING", payload: { target: "EDIT" } })
    // },
    onSuccess: (data, variables) => {
      console.log(data, "SUCCESS: edited a comment")
      invalidateQueries("songs.all-songs")
      dispatch({ type: "ON_SUCCESS", payload: { target: "EDIT", data: data } })
    },
    onError: (err) => {
      dispatch({ type: "ON_ERROR", payload: { target: "EDIT", errorMessage: err.message } })
    },
    onSettled: () => {
      dispatch({ type: "SET_IDLE", payload: { target: "EDIT" } })
    },
  })

  const del = trpc.useMutation(["comments.delete"], {
    // onMutate: () => {
    //   dispatch({ type: "SET_SUBMITTING", payload: { target: "DELETE" } })
    // },
    onSuccess: (data, variables) => {
      console.log(data, "SUCCESS: deleted a comment")
      invalidateQueries("songs.all-songs")
      if (variables.parent !== variables.songId) {
        console.log(queryClient, "if parent._id doesn't equal songId then created comment must be a reply")
        invalidateQueries("comments.get-comment", { _id: `${variables.parent}` })
      }
      dispatch({ type: "ON_SUCCESS", payload: { target: "DELETE", data: data } })
    },
    onError: (err) => {
      dispatch({ type: "ON_ERROR", payload: { target: "DELETE", errorMessage: err.message } })
    },
    onSettled: () => {
      dispatch({ type: "SET_IDLE", payload: { target: "DELETE" } })
    },
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

  const invalidateQueries = (key: string, _id?: { _id: string }) => {
    queryClient.invalidateQueries([key, _id])
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
