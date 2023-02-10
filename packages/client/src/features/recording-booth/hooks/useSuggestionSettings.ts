import { Dispatch, Reducer, useReducer } from "react"
import { Beat, beatList } from "src/constants"

export type PosType = "LastWord" | "Nouns" | "Verbs"
const CATEGORIES: PosType[] = ["LastWord", "Nouns", "Verbs"]

type State = {
  rhymeSuggestionPanels: PosType[]
  UIOpacity: string
  beats: Beat[]
  selectedBeat: Beat
  recordingType: "audio" | "video"
  numOfRhymeSuggestions: string
  toggleModal: "UIOpacity" | "Beat" | "Rhymes" | "Hide"
}

type Action = {
  type: string
  payload: {
    rhymeSuggestionPanel?: PosType
    menu?: "UIOpacity" | "Beat" | "Rhymes" | "Hide"
    numOfRhymes?: string
    UIOpacity?: string
    recordingType?: "audio" | "video"
    selectBeat?: Beat
  }
}

export type SettingsDispatcher = Dispatch<Action>
export type SettingsState = State

export const INITIAL_STATE: State = {
  rhymeSuggestionPanels: [...CATEGORIES],
  UIOpacity: "1",
  beats: beatList,
  selectedBeat: beatList[0],
  recordingType: "video",
  numOfRhymeSuggestions: "5",
  toggleModal: "Hide",
}

const getIndexofCategory = (_categoryList: PosType[], _category: PosType) => {
  if (_categoryList.length === 0) return 0
  return CATEGORIES.indexOf(_category)
}

const addCategory = (_category: PosType, list: PosType[]) => {
  const index = getIndexofCategory(list, _category)
  const newArray = [...list.slice(0, index), _category, ...list.slice(index)]
  return newArray
}

const removeCategory = (_category: PosType, list: PosType[]) => {
  return list.filter((category) => category !== _category)
}

export const recordingBoothSettingsReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "UPDATE_PANELS":
      if (!action.payload.rhymeSuggestionPanel) return state
      if (state.rhymeSuggestionPanels.includes(action.payload.rhymeSuggestionPanel)) {
        const removePanel = removeCategory(action.payload.rhymeSuggestionPanel, state.rhymeSuggestionPanels)
        return {
          ...state,
          rhymeSuggestionPanels: removePanel,
        }
      } else {
        const addPanel = addCategory(action.payload.rhymeSuggestionPanel, state.rhymeSuggestionPanels)
        return {
          ...state,
          rhymeSuggestionPanels: addPanel,
        }
      }
    case "SHOW_MENU":
      if (!action.payload.menu) return state
      return {
        ...state,
        toggleModal: action.payload.menu,
      }
    case "SET_NUM_OF_RHYMES":
      if (!action.payload.numOfRhymes) return state
      return {
        ...state,
        numOfRhymeSuggestions: action.payload.numOfRhymes,
      }
    case "SET_UIOPACITY":
      if (!action.payload.UIOpacity) return state
      return {
        ...state,
        UIOpacity: action.payload.UIOpacity,
      }
    case "SET_BEAT":
      if (!action.payload.selectBeat) return state
      return {
        ...state,
        selectedBeat: action.payload.selectBeat,
      }
    case "SET_RECORDING_TYPE":
      if (!action.payload.recordingType) return state
      return {
        ...state,
        recordingType: action.payload.recordingType,
      }
    case "TOGGLE_VIDEO":
      return {
        ...state,
        recordingType: state.recordingType === "video" ? "audio" : "video",
      }
    default:
      return state
  }
}

export default function useSuggestionSettings() {
  const [state, dispatch] = useReducer(recordingBoothSettingsReducer, INITIAL_STATE)
  return { state, dispatch }
}
