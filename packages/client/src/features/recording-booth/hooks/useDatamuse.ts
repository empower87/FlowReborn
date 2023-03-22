import axios from "axios"
import { useEffect, useState } from "react"
import { PosType } from "./useSuggestionSettings"
import { useTranscriptPos } from "./useTranscript"

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

export type Transcript = {
  Adjectives: string
  Nouns: string
  Verbs: string
  LastWord: string
  transcript: string
  lyrics: string[][]
  listening: boolean
}

export default function useDatamuse(category: PosType, rhymeCount: number) {
  const [selectedPos, setSelectedPos] = useState<RhymeType>("RHY")
  const [rhymes, setRhymes] = useState<string[]>([])

  const { lastWord, partOfSpeech, listening } = useTranscriptPos(category)
  const [queryWord, setQueryWord] = useState<string>("")
  // const [state, dispatch] = useReducer(datamuseReducer, INITIAL_STATE)

  // useEffect(() => {
  //   setQueryWord(transcript[category])
  // }, [transcript[category]])

  const selectedRhymesHandler = (selected: RhymeType) => {
    setSelectedPos(selected)
    // switch (selected) {
    //   case "REL":
    //     dispatch({ type: "SET_SELECTED", payload: { selected: selected, selectedName: "Related" } })
    //     break
    //   case "TRG":
    //     dispatch({ type: "SET_SELECTED", payload: { selected: selected, selectedName: "Triggers" } })
    //     break
    //   case "SYN":
    //     dispatch({ type: "SET_SELECTED", payload: { selected: selected, selectedName: "Synonyms" } })
    //     break
    //   default:
    //     dispatch({ type: "SET_SELECTED", payload: { selected: selected, selectedName: "Rhyming" } })
    // }
  }

  useEffect(() => {
    if (!listening) return
    const handleAsync = async () => {
      const getDatamuseRhymes = async (url: string, max: number) => {
        const getRhymes = await axios.get<DatamuseRes[]>(`https://api.datamuse.com/words?${url}&max=${max}`)
        if (!getRhymes.data) throw new Error("failed to fetch datamuse rhymes")
        const data = getRhymes.data.map((each) => each.word)
        return data
      }
      // const pos = transcript[category]
      const pos = partOfSpeech
      let url

      switch (selectedPos) {
        case "REL":
          url = `ml=${pos}&rel_rhy=${lastWord}`
          // const related = await getDatamuseRhymes(`ml=${pos}&rel_rhy=${transcript.LastWord}`, rhymeCount)
          // setRhymes(related)
          // dispatch({
          //   type: "SET_RHYMES",
          //   payload: { selectedName: "Related", selectedRhymes: related },
          // })
          break
        case "TRG":
          url = `rel_trg=${pos}`
          break
        case "SYN":
          url = `rel_jjb=${pos}`
          break
        default:
          url = `rel_rhy=${pos}`
          break
      }

      if (!url) return console.log(url, "error in forming url")
      const rhymes = await getDatamuseRhymes(url, rhymeCount)
      setRhymes(rhymes)
    }
    handleAsync()
  }, [selectedPos, lastWord, listening])

  return {
    // state: { ...state },
    // dispatch,
    selectedPos,
    queryWord: category === "LastWord" ? lastWord : partOfSpeech,
    selectedRhymesHandler,
    rhymes,
  }
}
