import { useEffect, useState } from "react"
import { useSpeechRecognition } from "react-speech-recognition"
import useDebounce from "src/hooks/useDebounce"
import { refilterProfanity } from "../utils/profanityHandler"
var pos = require("pos")

const ADJ_TAGS = ["JJ", "JJS", "JJR"]
const NOUN_TAGS = ["NN", "NNP", "NNPS", "NNS"]
const VERB_TAGS = ["VB", "VBD", "VBG", "VBN", "VBP", "VBZ"]

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
      // resetTranscript()
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
