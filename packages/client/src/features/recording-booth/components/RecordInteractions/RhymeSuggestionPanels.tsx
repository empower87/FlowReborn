import { ReactNode, useLayoutEffect, useRef } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import useDatamuse, { RhymeType } from "../../hooks/useDatamuse"
import { PosType, useSuggestionSettingsContext } from "../../hooks/useSuggestionSettings"

// type SuggestionDisplayProps = {
//   title: string
//   queryWord: string
//   selectedRhymeType: RhymeType
//   selectedRhymeName: FullRhymeType
//   selectedRhymes: string[]
//   onClick: (selected: RhymeType) => void
// }

const RhymeSuggestionButton = ({
  type,
  selectedBtn,
  onClick,
}: {
  type: RhymeType
  selectedBtn: RhymeType
  onClick: () => void
}) => {
  return (
    <div className="suggestions__pos-btn">
      <button
        className={`suggestions__pos-btn--bs-outset ${type} ${type === selectedBtn ? "Selected" : ""}`}
        type="button"
        onClick={onClick}
      >
        {type}
      </button>
    </div>
  )
}

const RhymeSuggestionText = ({ selectedRhymes }: { selectedRhymes: string[] }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLParagraphElement>(null)

  useLayoutEffect(() => {
    if (!scrollContainerRef.current || !scrollRef.current) return
    let container = scrollContainerRef.current.clientWidth
    let scroller = scrollRef.current.clientWidth
    if (scroller > container) {
      const difference = scroller - container
      scrollContainerRef.current.scrollLeft += difference
    }
  }, [])

  return (
    <div className="rhyme-actions__suggestions-type-scroller" ref={scrollContainerRef}>
      <p className="rhyme-actions__scroll-text" ref={scrollRef}>
        {selectedRhymes.map((each, index) => {
          if (selectedRhymes.length - 1 === index) return `${each}`
          return `${each} ${String.fromCodePoint(8226)} `
        })}
      </p>
    </div>
  )
}

type RhymeSuggestionPanelLayoutProps = {
  queryWord: ReactNode
  buttons: ReactNode
  rhymeName: ReactNode
  text: ReactNode
}

const QueryWord = ({ type, queryWord }: { type: PosType; queryWord: string }) => {
  return (
    <div className="suggestions__pos-header--bs-inset">
      <p className={`rhyme-actions__header-text`}>{type}:</p>
      <p className="rhyme-actions__header-query-word">{queryWord}</p>
    </div>
  )
}

const RhymeName = ({ selectedRhymeName }: { selectedRhymeName: RhymeType }) => {
  return <p className="rhyme-actions__suggestions-text">{selectedRhymeName}: </p>
}

const Buttons = ({
  selectedRhymeType,
  onClick,
}: {
  selectedRhymeType: RhymeType
  onClick: (selected: RhymeType) => void
}) => {
  // const renderRef = useRef<number>(0)
  // console.log(renderRef.current++, "<RhymeName /> -- Render test -- Layer 3")
  return (
    <div className="suggestions__pos-btns--container">
      <RhymeSuggestionButton type="RHY" selectedBtn={selectedRhymeType} onClick={() => onClick("RHY")} />
      <RhymeSuggestionButton type="TRG" selectedBtn={selectedRhymeType} onClick={() => onClick("TRG")} />
      <RhymeSuggestionButton type="SYN" selectedBtn={selectedRhymeType} onClick={() => onClick("SYN")} />
    </div>
  )
}

export const RhymeSuggestionPanelLayout = ({
  queryWord,
  buttons,
  rhymeName,
  text,
}: RhymeSuggestionPanelLayoutProps) => {
  // const renderRef = useRef<number>(0)
  // console.log(renderRef.current++, "<RhymeSuggestionPanelLayout /> -- Render test -- Layer 3")
  return (
    <div className="suggestions-box">
      <div className="suggestions__pos-header--container">
        <div className="suggestions__pos-header">
          {queryWord}
          {buttons}
        </div>

        <div className="rhyme-actions__suggestions--container">
          <div className="rhyme-actions__suggestions">
            <div className="rhyme-actions__suggestions-type">
              <div className="rhyme-actions__suggestions-type--bs-outset">{rhymeName}</div>
            </div>
            {text}
          </div>
        </div>
      </div>
    </div>
  )
}

const RhymeSuggestionPanelWrapper = ({ type, numofRhymes }: { type: PosType; numofRhymes: number }) => {
  const { selectedPos, rhymes, queryWord, selectedRhymesHandler } = useDatamuse(type, numofRhymes)
  // const renderRef = useRef<number>(0)

  // console.log(renderRef.current++, "<RhymeSuggestionPanelWrapper /> -- Render test -- Layer 2")
  return (
    <RhymeSuggestionPanelLayout
      queryWord={<QueryWord type={type} queryWord={queryWord} />}
      buttons={<Buttons selectedRhymeType={selectedPos} onClick={selectedRhymesHandler} />}
      rhymeName={<RhymeName selectedRhymeName={selectedPos} />}
      text={<RhymeSuggestionText selectedRhymes={rhymes} />}
    />
  )
}

export default function RhymeSuggestionsPanels() {
  const { rhymeSuggestionPanels: categoryList, numOfRhymeSuggestions: numofRhymes } = useSuggestionSettingsContext()

  const renderRef = useRef<number>(0)
  console.log(renderRef.current++, "<RhymeSuggestionsPanels /> -- Render test -- Layer 2")
  return (
    <div className="suggestions">
      <TransitionGroup className="suggestions__transitionGroup">
        {categoryList.map((item, index) => {
          return (
            <CSSTransition key={item} timeout={300} classNames="item">
              <RhymeSuggestionPanelWrapper key={`${item}_${index}`} type={item} numofRhymes={numofRhymes} />
            </CSSTransition>
          )
        })}
      </TransitionGroup>
    </div>
  )
}
