import { Dispatch, Reducer } from "react"
import { IComment } from "../../../../../../server/src/models"

export type InputTypes = "COMMENT" | "EDIT" | "REPLY" | "OPEN_REPLY_MENU" | "CLOSE_REPLY_MENU" | "HIDE" | "CLOSE"

type Payload = {
  selectedComment: IComment | null
}

type State = {
  showInput: InputTypes
  isReplyMenuOpen: boolean
  showComments: boolean
  isEditingId: string | null
  selectedComment: IComment | null
}

type Action = {
  type: InputTypes
  payload: Payload
}

export const INITIAL_STATE: State = {
  showInput: "HIDE",
  isReplyMenuOpen: false,
  showComments: false,
  isEditingId: null,
  selectedComment: null,
}

export type CommentInputReducerType = { state: State; dispatch: Dispatch<Action> }
export type CommentDispatch = Dispatch<Action>
export type CommentState = State

export const commentInputMenuReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "COMMENT":
      if (state.showInput === "COMMENT") {
        return INITIAL_STATE
      } else {
        return {
          ...INITIAL_STATE,
          showInput: "COMMENT",
        }
      }
    case "EDIT":
      if (!action.payload.selectedComment) return state
      if (
        state.showInput === "EDIT" &&
        action.payload.selectedComment &&
        state.isEditingId &&
        state.isEditingId === action.payload.selectedComment._id
      ) {
        return INITIAL_STATE
      }
      return {
        ...state,
        showInput: "EDIT",
        isEditingId: action.payload.selectedComment._id,
        selectedComment: action.payload.selectedComment,
      }
    case "REPLY":
      if (state.showInput === "REPLY") {
        if (
          state.selectedComment &&
          action.payload.selectedComment &&
          state.selectedComment._id === action.payload.selectedComment._id
        ) {
          return INITIAL_STATE
        }
        return {
          ...state,
          showInput: "REPLY",
          selectedComment: action.payload.selectedComment,
        }
      }
      return {
        ...state,
        showInput: "REPLY",
        isEditingId: null,
        selectedComment: action.payload.selectedComment,
      }
    case "OPEN_REPLY_MENU":
      if (action.payload.selectedComment) {
        return { ...state, isReplyMenuOpen: true, showInput: "REPLY", selectedComment: action.payload.selectedComment }
      } else {
        return state
      }
    case "CLOSE_REPLY_MENU":
      return { ...state, isReplyMenuOpen: false }
    case "HIDE":
      return { ...state, showInput: "HIDE", isEditingId: null }
    case "CLOSE":
      return INITIAL_STATE
    default:
      return state
  }
}
