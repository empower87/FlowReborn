import { Reducer } from "react"
// import { IComment } from "../../../../../../server/src/models"
import { ICommentPopulatedUserAndReplies as IComment } from "src/types/ServerModelTypes"

export type CommentMutationStatusState = {
  target: "EDIT" | "CREATE" | "DELETE" | "NONE"
  data: IComment | null
  error: string | null
  isIdle: boolean
  isError: boolean
  isLoading: boolean
  isSubmitting: boolean
  isSuccessful: boolean
}

type Payload = {
  target: "CREATE" | "EDIT" | "DELETE" | "NONE"
  data?: IComment | null
  errorMessage?: string | null
}

type Action = {
  type: "SET_IDLE" | "SET_SUBMITTING" | "SET_LOADING" | "ON_ERROR" | "ON_SUCCESS" | "RESET_ERROR" | "RESET"
  payload: Payload
}

export const INITIAL_STATE: CommentMutationStatusState = {
  target: "NONE",
  data: null,
  error: null,
  isIdle: true,
  isLoading: false,
  isSubmitting: false,
  isSuccessful: false,
  isError: false,
}

export const commentMutationStatusReducer: Reducer<CommentMutationStatusState, Action> = (state, action) => {
  switch (action.type) {
    case "SET_IDLE":
      return {
        ...state,
        isIdle: true,
        isSubmitting: false,
      }
    case "SET_SUBMITTING":
      return {
        ...state,
        target: action.payload.target,
        isSuccessful: false,
        isIdle: false,
        isError: false,
        isSubmitting: true,
      }
    case "SET_LOADING":
      return {
        ...state,
        target: action.payload.target,
        isSuccessful: false,
        isIdle: false,
        isLoading: true,
        isError: false,
      }
    case "ON_ERROR":
      if (!action.payload.errorMessage) return state
      return {
        ...state,
        target: action.payload.target,
        error: action.payload.errorMessage,
        data: null,
        isSuccessful: false,
        isIdle: false,
        isLoading: false,
        isError: true,
        isSubmitting: false,
      }
    case "RESET_ERROR":
      return {
        ...state,
        isIdle: true,
        isError: false,
        error: null,
      }
    case "ON_SUCCESS":
      // if (!action.payload.data) return state
      return {
        ...state,
        target: action.payload.target,
        data: action.payload.data ? action.payload.data : null,
        error: null,
        isSuccessful: true,
        isIdle: false,
        isLoading: false,
        isError: false,
        isSubmitting: false,
      }
    case "RESET":
      return INITIAL_STATE
    default:
      return state
  }
}
