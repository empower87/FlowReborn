import { ReactNode, useCallback, useEffect, useRef, useState } from "react"
import { useLiveTranscript, useTranscriptLyrics } from "../hooks/useTranscript"
import RhymeSuggestionPanels from "./RecordInteractions/RhymeSuggestionPanels"

type LyricsFeedProps = {
  children: ReactNode
}

const LiveLyricsLine = () => {
  const { transcript } = useLiveTranscript()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLParagraphElement>(null)
  const renderRef = useRef<number>(0)

  useEffect(() => {
    if (scrollContainerRef.current && scrollRef.current) {
      let container = scrollContainerRef.current.clientWidth
      let scroller = scrollRef.current.clientWidth
      if (scroller > container) {
        const difference = scroller - container
        scrollContainerRef.current.scrollLeft += difference
      }
    }
  }, [transcript, scrollContainerRef, scrollRef])

  console.log(renderRef.current++, "<LiveTranscript /> -- Render test -- Layer 2")
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

const LyricLine = ({ row, index }: { row: string[]; index?: number }) => {
  return (
    <li className="record__lyrics-item">
      {index && (
        <div className="record__item-num">
          <p className="record__item-num-text">{`${index + 1}`}</p>
        </div>
      )}
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

const LyricsFeed = ({ children }: LyricsFeedProps) => {
  const { lyrics, listening: isRecording } = useTranscriptLyrics()
  const [feedLyrics, setFeedLyrics] = useState<string[][]>([])
  const scrollRef = useRef<any>(null)

  const renderRef = useRef<number>(0)

  useEffect(() => {
    setFeedLyrics(lyrics)
  }, [lyrics])

  const handleLiveLyrics = useCallback(() => {
    if (feedLyrics[0] && feedLyrics[0].length === 0) return null

    return feedLyrics.map((row, index) => {
      return <LyricLine key={`${row}_${index}`} row={row} index={index} />
    })
  }, [feedLyrics])

  const handleSongLyricsLength = (songLyrics: string[][] | null) => {
    const lyricsLength = songLyrics ? songLyrics.length : -1
    const copiedLyrics = songLyrics ? [...songLyrics] : null

    switch (lyricsLength) {
      case -1:
        return <LyricLine row={["Start flowing to see your lyrics!"]} />
      case 0:
        return <LyricLine row={["This Flow contains no lyrics."]} />
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

  console.log(renderRef.current++, "<LyricsFeed /> -- Render test -- Layer 2")
  return (
    <div className="lyrics__feed--container">
      <div className="record__lyrics">
        <ul className="record__lyrics-list" ref={scrollRef}>
          {isRecording ? handleLiveLyrics() : handleSongLyricsLength(feedLyrics)}
        </ul>
      </div>
      {children}
    </div>
  )
}

const LyricsController = () => {
  const renderRef = useRef<number>(0)
  console.log(renderRef.current++, "<LyricsController /> -- Render test -- Layer 1")
  return (
    <>
      <div className="recording-video__actions--container">
        <div className="record__lyrics--container">
          <LyricsFeed>
            <LiveLyricsLine />
          </LyricsFeed>
        </div>
      </div>

      <RhymeSuggestionPanels />
    </>
  )
}

export default LyricsController
