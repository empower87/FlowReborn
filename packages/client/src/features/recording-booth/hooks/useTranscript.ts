import { useEffect, useRef, useState } from "react"
import { useSpeechRecognition } from "react-speech-recognition"
import useDebounce from "src/hooks/useDebounce"
import { refilterProfanity } from "../utils/profanityHandler"
import { PosType } from "./useSuggestionSettings"
var pos = require("pos")

const ADJ_TAGS = ["JJ", "JJS", "JJR"]
const NOUN_TAGS = ["NN", "NNP", "NNPS", "NNS"]
const VERB_TAGS = ["VB", "VBD", "VBG", "VBN", "VBP", "VBZ"]

// IN_PROGRESS: Testing whether or not I need multiple hooks to satisfy different conditions
export const useGetTranscriptLyrics = () => {
  const { transcript } = useSpeechRecognition()
  const debouncedTranscript = useDebounce(transcript, 400)
  const lyricsRef = useRef<string[][]>([])

  useEffect(() => {
    const validArray = getValidTranscriptArray(debouncedTranscript)
    if (!validArray.length || !lyricsRef.current) return
    lyricsRef.current = [...lyricsRef.current, validArray]
  }, [debouncedTranscript, lyricsRef])

  const resetLyrics = () => {
    lyricsRef.current = []
  }

  return {
    totalLyrics: lyricsRef.current,
    resetLyrics,
  }
}

export const useLiveTranscript = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition()
  const debouncedTranscript = useDebounce(transcript, 400)

  useEffect(() => {
    if (listening) {
      resetTranscript()
    }
  }, [debouncedTranscript])

  return {
    transcript,
  }
}

export const useTranscriptLyrics = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition()
  const debouncedTranscript = useDebounce(transcript, 400)
  const [lyrics, setLyrics] = useState<string[][]>([])
  const lyricsRef = useRef<string[][] | null>(null)

  useEffect(() => {
    const validArray = getValidTranscriptArray(debouncedTranscript)
    if (validArray.length) {
      setLyrics((prevLyrics) => [...prevLyrics, validArray])

      if (!lyricsRef.current) return
      lyricsRef.current = [...lyricsRef.current, validArray]
      resetTranscript()
    }
  }, [debouncedTranscript])

  return {
    lyrics,
    listening,
    lyricsRef: lyricsRef.current,
  }
}

const getPosArray = (posType: PosType) => {
  switch (posType) {
    case "Verbs":
      return VERB_TAGS
    case "Nouns":
      return NOUN_TAGS
    default:
      return NOUN_TAGS
  }
}

export const useTranscriptPos = (posType: PosType) => {
  const { transcript, listening } = useSpeechRecognition()
  const debounced500 = useDebounce(transcript, 400)
  const [partOfSpeech, setPartOfSpeech] = useState<string>("")
  const [lastWord, setLastWord] = useState<string>("")

  useEffect(() => {
    var words = new pos.Lexer().lex(debounced500)
    var tagger = new pos.Tagger()
    var taggedWords = tagger.tag(words)

    const validWord = getValidTranscriptWord(debounced500)
    if (validWord !== "") {
      setLastWord(validWord)
    }

    if (posType !== "LastWord") {
      setPartOfSpeech(findPOSWord(taggedWords, getPosArray(posType)))
    }
  }, [debounced500])

  return {
    lastWord,
    partOfSpeech,
    listening,
  }
}

export default function useTranscript() {
  const { transcript, listening, finalTranscript, resetTranscript } = useSpeechRecognition()
  const debounced500 = useDebounce(transcript, 400)
  const [adjectives, setAdjectives] = useState<string>("")
  const [nouns, setNouns] = useState<string>("")
  const [verbs, setVerbs] = useState<string>("")
  const [lastWord, setLastWord] = useState<string>("")
  const [lyrics, setLyrics] = useState<string[][]>([])

  useEffect(() => {
    var words = new pos.Lexer().lex(debounced500)
    var tagger = new pos.Tagger()
    var taggedWords = tagger.tag(words)

    setAdjectives(findPOSWord(taggedWords, ADJ_TAGS))
    setNouns(findPOSWord(taggedWords, NOUN_TAGS))
    setVerbs(findPOSWord(taggedWords, VERB_TAGS))
  }, [debounced500])

  useEffect(() => {
    const validWord = getValidTranscriptWord(debounced500)
    if (validWord !== "") {
      setLastWord(validWord)
    }
  }, [debounced500])

  useEffect(() => {
    const validArray = getValidTranscriptArray(debounced500)
    if (validArray.length) {
      setLyrics((prevLyrics) => [...prevLyrics, validArray])

      resetTranscript()
    }
  }, [debounced500])

  return { Adjectives: adjectives, Nouns: nouns, Verbs: verbs, LastWord: lastWord, transcript, lyrics, listening }
}

const findPOSWord = (taggedWords: string[][], type: string[]) => {
  if (!taggedWords.length) return ""

  let partsOfSpeech: string[] = []
  for (let i in taggedWords) {
    if (type.includes(taggedWords[i][1])) {
      partsOfSpeech.push(taggedWords[i][0])
    }
  }

  if (partsOfSpeech.length === 1) {
    return partsOfSpeech[0]
  } else {
    const sort = partsOfSpeech.sort((a, b) => b.length - a.length)
    return sort[0]
  }
}

const getValidTranscriptWord = (_transcript: string): string => {
  const transcript = _transcript.trim()
  const transcriptArray = transcript.split(" ")

  const filteredForProfanity = refilterProfanity(transcriptArray[transcriptArray.length - 1])
  if (filteredForProfanity.includes("'")) return filteredForProfanity.split("'").join("")
  return filteredForProfanity
}

const getValidTranscriptArray = (_transcript: string): string[] => {
  const transcript = _transcript.trim()
  const splitTranscript = transcript.split(" ")
  let filteredTranscript = []

  for (let i = 0; i < splitTranscript.length; i++) {
    const filteredWord = refilterProfanity(splitTranscript[i])
    if (filteredWord !== "") {
      filteredTranscript.push(filteredWord)
    }
  }
  return filteredTranscript
}
