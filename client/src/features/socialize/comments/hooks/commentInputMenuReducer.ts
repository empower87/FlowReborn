import { Dispatch, Reducer } from "react"
import { IComment } from "../../../../../../server/src/models"

type InputTypes = "Comment" | "Edit" | "Reply" | "Hide"

type Payload = {
  selectedComment: IComment | null
}

type State = {
  showInput: InputTypes
  showReplies: boolean
  isEditingId: string | null
  selectedComment: IComment | null
}

type Action = {
  type: "COMMENT" | "EDIT" | "REPLY" | "HIDE"
  payload: Payload
}

export const INITIAL_STATE: State = {
  showInput: "Hide",
  showReplies: false,
  isEditingId: null,
  selectedComment: null,
}

export type CommentInputReducerType = { state: State; dispatch: Dispatch<Action> }

export const commentInputMenuReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "COMMENT":
      if (state.showInput === "Comment") {
        return INITIAL_STATE
      } else {
        return {
          ...INITIAL_STATE,
          showInput: "Comment",
        }
      }
    case "EDIT":
      if (!action.payload.selectedComment) return state
      if (
        state.showInput === "Edit" &&
        action.payload.selectedComment &&
        state.isEditingId &&
        state.isEditingId === action.payload.selectedComment._id
      ) {
        return INITIAL_STATE
      }
      return {
        ...state,
        showInput: "Edit",
        isEditingId: action.payload.selectedComment._id,
        selectedComment: action.payload.selectedComment,
      }
    case "REPLY":
      if (state.showInput === "Reply") {
        if (
          state.selectedComment &&
          action.payload.selectedComment &&
          state.selectedComment._id === action.payload.selectedComment._id
        ) {
          return INITIAL_STATE
        }
        return {
          ...state,
          showInput: "Reply",
          selectedComment: action.payload.selectedComment,
        }
      }
      return {
        ...state,
        showInput: "Reply",
        showReplies: true,
        isEditingId: null,
        selectedComment: action.payload.selectedComment,
      }
    case "HIDE":
      return INITIAL_STATE
    default:
      return state
  }
}
