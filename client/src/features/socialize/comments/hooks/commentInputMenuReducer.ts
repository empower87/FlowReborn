import { Dispatch, Reducer } from "react"
import { IComment } from "../../../../../../server/src/models"

export type InputTypes = "COMMENT" | "EDIT" | "REPLY" | "OPEN_REPLY_MENU" | "CLOSE_REPLY_MENU" | "HIDE" | "CLOSE"

type Payload = {
  comment?: IComment
  reply?: IComment
  editComment?: IComment
}

type Action = {
  type: InputTypes
  payload?: Payload
}

export type CommentState = {
  showInput: InputTypes
  isReplyMenuOpen: boolean
  replyComment: IComment | null
  isEditingId: string | null
  selectedComment: IComment | null
}
export type CommentInputReducerType = { state: CommentState; dispatch: Dispatch<Action> }
export type CommentDispatch = Dispatch<Action>

export const INITIAL_STATE: CommentState = {
  showInput: "HIDE",
  isReplyMenuOpen: false,
  replyComment: null,
  isEditingId: null,
  selectedComment: null,
}

export const commentInputMenuReducer: Reducer<CommentState, Action> = (state, action) => {
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
      if (!action.payload?.editComment) return state
      return {
        ...state,
        showInput: "EDIT",
        isEditingId: action.payload.editComment._id,
        selectedComment: action.payload.editComment,
      }
    case "REPLY":
      if (!action.payload?.reply) return state
      return {
        ...state,
        showInput: "REPLY",
        isEditingId: null,
        selectedComment: action.payload.reply,
      }
    case "OPEN_REPLY_MENU":
      if (!action.payload?.reply) return state
      return {
        ...state,
        isReplyMenuOpen: true,
        showInput: "REPLY",
        isEditingId: null,
        replyComment: action.payload.reply,
      }
    case "CLOSE_REPLY_MENU":
      return { ...state, isReplyMenuOpen: false, isEditingId: null }
    case "HIDE":
      return { ...state, showInput: "HIDE", isEditingId: null }
    case "CLOSE":
      return INITIAL_STATE
    default:
      return state
  }
}
