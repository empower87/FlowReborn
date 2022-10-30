import axios from "axios"
import { useEffect, useReducer, useState } from "react"
import { PosType } from "./useSuggestionSettings"
import useTranscript from "./useTranscript"

// getRhymeWords `rel_rhy=${param}`
// getTriggerWords `rel_trg=${param}`
// getSynonymWords `rel_jjb=${param}`
// getKindOfWords `rel_spc=${param}`
// getLastWordRelWords `ml=${noun}&rel_rhy=${lastWord}`

export type RhymeType = "RHY" | "TRG" | "SYN" | "REL"
export type FullRhymeType = "Rhyming" | "Triggers" | "Synonyms" | "Related"
type DatamuseRes = {
  word: string
  score: string
}
type State = {
  Rhyming: string[]
  Triggers: string[]
  Synonyms: string[]
  Related: string[]
  selected: RhymeType
  selectedName: FullRhymeType
  selectedRhymes: State["Rhyming"] | State["Triggers"] | State["Synonyms"] | State["Related"]
}
type Action = {
  type: string
  payload: {
    selected?: RhymeType
    selectedName: FullRhymeType
    selectedRhymes?: string[]
  }
}

const INITIAL_STATE: State = {
  Rhyming: [],
  Triggers: [],
  Synonyms: [],
  Related: [],
  selected: "RHY",
  selectedName: "Rhyming",
  selectedRhymes: [],
}

export const datamuseReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_SELECTED":
      if (!action.payload.selected) return state
      return {
        ...state,
        selected: action.payload.selected,
        selectedName: action.payload.selectedName,
      }
    case "SET_RHYMES":
      if (!action.payload.selectedRhymes) return state
      return {
        ...state,
        [action.payload.selectedName]: action.payload.selectedRhymes,
        selectedRhymes: action.payload.selectedRhymes,
      }
    default:
      return state
  }
}

export default function useDatamuse(category: PosType, rhymeCount: string) {
  const transcript = useTranscript()
  const [queryWord, setQueryWord] = useState<string>("")
  const [state, dispatch] = useReducer(datamuseReducer, INITIAL_STATE)

  useEffect(() => {
    setQueryWord(transcript[category])
  }, [transcript[category]])

  const selectedRhymesHandler = (selected: RhymeType) => {
    switch (selected) {
      case "REL":
        dispatch({ type: "SET_SELECTED", payload: { selected: selected, selectedName: "Related" } })
        break
      case "TRG":
        dispatch({ type: "SET_SELECTED", payload: { selected: selected, selectedName: "Triggers" } })
        break
      case "SYN":
        dispatch({ type: "SET_SELECTED", payload: { selected: selected, selectedName: "Synonyms" } })
        break
      default:
        dispatch({ type: "SET_SELECTED", payload: { selected: selected, selectedName: "Rhyming" } })
    }
  }

  useEffect(() => {
    if (!transcript.listening) return
    const handleAsync = async () => {
      const getDatamuseRhymes = async (url: string, max: string) => {
        const getRhymes = await axios.get<DatamuseRes[]>(`https://api.datamuse.com/words?${url}&max=${max}`)
        if (!getRhymes.data) throw new Error("failed to fetch datamuse rhymes")
        const data = getRhymes.data.map((each) => each.word)
        return data
      }
      const pos = transcript[category]

      switch (state.selected) {
        case "REL":
          const related = await getDatamuseRhymes(`ml=${pos}&rel_rhy=${transcript.LastWord}`, rhymeCount)
          dispatch({
            type: "SET_RHYMES",
            payload: { selectedName: "Related", selectedRhymes: related },
          })
          break
        case "TRG":
          const triggers = await getDatamuseRhymes(`rel_trg=${pos}`, rhymeCount)
          dispatch({
            type: "SET_RHYMES",
            payload: { selectedName: "Triggers", selectedRhymes: triggers },
          })
          break
        case "SYN":
          const synonyms = await getDatamuseRhymes(`rel_jjb=${pos}`, rhymeCount)
          dispatch({
            type: "SET_RHYMES",
            payload: { selectedName: "Synonyms", selectedRhymes: synonyms },
          })
          break
        default:
          const rhymes = await getDatamuseRhymes(`rel_rhy=${pos}`, rhymeCount)
          dispatch({
            type: "SET_RHYMES",
            payload: { selectedName: "Rhyming", selectedRhymes: rhymes },
          })
      }
    }
    handleAsync()
  }, [state.selected, transcript[category], transcript.listening])

  return {
    state: { ...state },
    dispatch,
    queryWord,
    selectedRhymesHandler,
  }
}
