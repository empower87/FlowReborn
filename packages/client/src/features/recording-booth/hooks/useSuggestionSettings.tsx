import { createContext, Dispatch, ReactNode, Reducer, useCallback, useContext, useReducer } from "react"
import { Beat, beatList } from "src/constants"

export type PosType = "LastWord" | "Nouns" | "Verbs"
const CATEGORIES: PosType[] = ["LastWord", "Nouns", "Verbs"]

type State = {
  rhymeSuggestionPanels: PosType[]
  UIOpacity: number
  beats: Beat[]
  selectedBeat: Beat
  recordingType: "audio" | "video"
  numOfRhymeSuggestions: number
  toggleModal: "UIOpacity" | "Beat" | "Rhymes" | "Hide"
}

type Action = {
  type: string
  payload: {
    rhymeSuggestionPanel?: PosType
    menu?: "UIOpacity" | "Beat" | "Rhymes" | "Hide"
    numOfRhymes?: number
    UIOpacity?: number
    recordingType?: "audio" | "video"
    selectBeat?: Beat
  }
}

export type SettingsDispatcher = Dispatch<Action>
export type SettingsState = State

export const INITIAL_STATE: State = {
  rhymeSuggestionPanels: [...CATEGORIES],
  UIOpacity: 1,
  beats: beatList,
  selectedBeat: beatList[0],
  recordingType: "video",
  numOfRhymeSuggestions: 5,
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

type SuggestionSettingsContextType = ReturnType<typeof useSuggestionSettings>

const SuggestionSettingsContext = createContext<SuggestionSettingsContextType | null>(null)

export const useSuggestionSettings = () => {
  const [state, dispatch] = useReducer(recordingBoothSettingsReducer, INITIAL_STATE)
  const { rhymeSuggestionPanels, UIOpacity, beats, selectedBeat, recordingType, numOfRhymeSuggestions, toggleModal } =
    state

  const toggleSuggestionModalHandler = useCallback((type: "UIOpacity" | "Beat" | "Rhymes" | "Hide") => {
    switch (type) {
      case "UIOpacity":
        dispatch({ type: "SHOW_MENU", payload: { menu: "UIOpacity" } })
        break
      case "Beat":
        dispatch({ type: "SHOW_MENU", payload: { menu: "Beat" } })
        break
      case "Rhymes":
        dispatch({ type: "SHOW_MENU", payload: { menu: "Rhymes" } })
        break
      case "Hide":
        dispatch({ type: "SHOW_MENU", payload: { menu: "Hide" } })
        break
    }
  }, [])

  const toggleMediaTypeHandler = () => {
    dispatch({ type: "TOGGLE_VIDEO", payload: {} })
  }

  const selectBeatHandler = (beat: Beat) => {
    dispatch({ type: "SET_BEAT", payload: { selectBeat: beat } })
    setTimeout(() => {
      dispatch({ type: "SHOW_MENU", payload: { menu: "Hide" } })
    }, 100)
  }

  const updatePanelsHandler = (panel: PosType) => {
    dispatch({ type: "UPDATE_PANELS", payload: { rhymeSuggestionPanel: panel } })
  }

  const closeModalHandler = () => {
    dispatch({ type: "SHOW_MENU", payload: { menu: "Hide" } })
  }

  const setUIOpacityHandler = (value: number | undefined) => {
    if (!value) return
    dispatch({ type: "SET_UIOPACITY", payload: { UIOpacity: value } })
  }

  const setNumOfRhymeSuggestionsHandler = (value: number | undefined) => {
    if (!value || numOfRhymeSuggestions === value) return
    dispatch({ type: "SET_NUM_OF_RHYMES", payload: { numOfRhymes: value } })
  }

  return {
    rhymeSuggestionPanels,
    UIOpacity,
    beats,
    selectedBeat,
    recordingType,
    numOfRhymeSuggestions,
    setNumOfRhymeSuggestionsHandler,
    toggleModal,
    toggleSuggestionModalHandler,
    toggleMediaTypeHandler,
    selectBeatHandler,
    updatePanelsHandler,
    closeModalHandler,
    setUIOpacityHandler,
  }
}

export const SuggestionSettingsProvider = ({ children }: { children: ReactNode }) => {
  const values = useSuggestionSettings()
  return <SuggestionSettingsContext.Provider value={values}>{children}</SuggestionSettingsContext.Provider>
}

export const useSuggestionSettingsContext = () => {
  const context = useContext(SuggestionSettingsContext)
  if (!context)
    throw new Error("useSuggestionSettingsContext has to be used within <SuggestionSettingsContext.Provider>")
  return context
}
