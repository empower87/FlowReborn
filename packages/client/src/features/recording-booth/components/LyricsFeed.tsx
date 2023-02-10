import { PropsWithChildren, ReactNode, useCallback, useEffect, useRef, useState } from "react"
import useTranscript from "../hooks/useTranscript"

type LyricsFeedProps = PropsWithChildren<{
  isRecording: boolean
}>

const LiveTranscript = ({ transcript }: { transcript: string }) => {
  const scrollContainerRef = useRef<any>(null)
  const scrollRef = useRef<any>(null)

  useEffect(() => {
    if (scrollContainerRef.current) {
      let container = scrollContainerRef.current.clientWidth
      let scroller = scrollRef.current.clientWidth
      if (scroller > container) {
        const difference = scroller - container
        scrollContainerRef.current.scrollLeft += difference
      }
    }
  }, [transcript])

  return (
    <div className="suggestions__transcript--container">
      <div className="suggestions__transcript--bs-inset">
        <div className="suggestions__transcript-title">
          <div className="suggestions__transcript-title--bs-outset">Bar</div>
        </div>
        <div className="suggestions__transcript-text">
          <div className="suggestions__transcript--wrapper" ref={scrollContainerRef}>
            <p className="suggestions__transcript" ref={scrollRef}>
              {transcript}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const LyricLine = ({ row, index }: { row: string[]; index: number }) => {
  return (
    <li className="record__lyrics-item" key={`${row}_${index}`}>
      <div className="record__item-num">
        <p className="record__item-num-text">{`${index + 1}`}</p>
      </div>
      <div className="record__item-words">
        {row.map((word, index) => {
          return (
            <p className="record__item-words-text" key={`${index}_${word}`}>
              {word}
            </p>
          )
        })}
      </div>
    </li>
  )
}

const LyricPrompt = ({ children }: { children: ReactNode }) => (
  <li className="record__lyrics-item">
    <div className="record__item-words">
      <p className="record__item-words-text initial-prompt">{children}</p>
    </div>
  </li>
)

export default function LyricsFeed({ isRecording, children }: LyricsFeedProps) {
  const { lyrics, transcript } = useTranscript()
  const [feedLyrics, setFeedLyrics] = useState<string[][]>([])
  const scrollRef = useRef<any>(null)

  useEffect(() => {
    console.log(transcript, "IN LYRICS FEED useTranscript")
    setFeedLyrics(lyrics)
  }, [lyrics])

  const handleLiveLyrics = useCallback(() => {
    if (feedLyrics[0] && feedLyrics[0].length === 0) return null
    // console.log(feedLyrics, "what does this lyrics look like atm???")
    return feedLyrics.map((row, index) => {
      return <LyricLine key={`${row}_${index}`} row={row} index={index} />
    })
  }, [feedLyrics])

  const handleSongLyricsLength = (songLyrics: string[][] | null) => {
    const lyricsLength = songLyrics ? songLyrics.length : -1
    const copiedLyrics = songLyrics ? [...songLyrics] : null

    switch (lyricsLength) {
      case -1:
        return <LyricPrompt>Start flowing to see your lyrics!</LyricPrompt>
      case 0:
        return <LyricPrompt>This Flow contains no lyrics.</LyricPrompt>
      default:
        return copiedLyrics?.map((row, index) => {
          return <LyricLine key={`${row}_${index}`} row={row} index={index} />
        })
    }
  }

  useEffect(() => {
    let scrollLyrics = document.getElementById("currentTranscript")
    if (scrollLyrics) {
      scrollLyrics.scrollTop = scrollLyrics.scrollHeight + 35
    }
  }, [lyrics])

  return (
    <div className="lyrics__feed--container">
      <div className={`record__lyrics`}>
        <ul className="record__lyrics-list" ref={scrollRef}>
          {isRecording ? handleLiveLyrics() : handleSongLyricsLength(feedLyrics)}
        </ul>
      </div>
      <LiveTranscript transcript={transcript} />
    </div>
  )
}
