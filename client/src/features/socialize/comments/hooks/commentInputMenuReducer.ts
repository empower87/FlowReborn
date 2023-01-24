import { Dispatch, Reducer } from "react"
import { IComment } from "../../../../../../server/src/models"

export type InputTypes =
  | "OPEN_COMMENT_INPUT"
  | "OPEN_EDIT_INPUT"
  | "OPEN_REPLY_INPUT"
  | "OPEN_REPLY_MENU"
  | "CLOSE_REPLY_MENU"
  | "UPDATE_REPLY_MENU"
  | "HIDE_INPUT"
  | "CLOSE_MENUS"

export type CommentState = {
  showInput: InputTypes
  isReplyMenuOpen: boolean
  replyComment: IComment | null
  isEditingId: string | null
  selectedComment: IComment | null
}

type Payload = {
  comment?: IComment
  reply?: IComment
  editComment?: IComment
}

type Action = {
  type: InputTypes
  payload?: Payload
}

export type CommentInputReducerType = { state: CommentState; dispatch: Dispatch<Action> }
export type CommentDispatch = Dispatch<Action>

export const INITIAL_STATE: CommentState = {
  showInput: "HIDE_INPUT",
  isReplyMenuOpen: false,
  replyComment: null,
  isEditingId: null,
  selectedComment: null,
}

export const commentInputMenuReducer: Reducer<CommentState, Action> = (state, action) => {
  switch (action.type) {
    case "OPEN_COMMENT_INPUT":
      if (state.showInput === "OPEN_COMMENT_INPUT") {
        return INITIAL_STATE
      } else {
        return {
          ...INITIAL_STATE,
          showInput: "OPEN_COMMENT_INPUT",
        }
      }
    case "OPEN_EDIT_INPUT":
      if (!action.payload?.editComment) return state
      return {
        ...state,
        showInput: "OPEN_EDIT_INPUT",
        isEditingId: action.payload.editComment._id,
        selectedComment: action.payload.editComment,
      }
    case "OPEN_REPLY_INPUT":
      if (!action.payload?.reply) return state
      return {
        ...state,
        showInput: "OPEN_REPLY_INPUT",
        isEditingId: null,
        selectedComment: action.payload.reply,
      }
    case "OPEN_REPLY_MENU":
      if (!action.payload?.reply) return state
      return {
        ...state,
        isReplyMenuOpen: true,
        showInput: "OPEN_REPLY_INPUT",
        isEditingId: null,
        replyComment: action.payload.reply,
        selectedComment: action.payload.reply,
      }
    case "CLOSE_REPLY_MENU":
      return { ...state, isReplyMenuOpen: false, isEditingId: null }
    case "HIDE_INPUT":
      return { ...state, showInput: "HIDE_INPUT", isEditingId: null }
    case "CLOSE_MENUS":
      return INITIAL_STATE
    case "UPDATE_REPLY_MENU":
      if (!action.payload?.editComment) return state
      return { ...state, selectedComment: action.payload.editComment }
    default:
      return state
  }
}
