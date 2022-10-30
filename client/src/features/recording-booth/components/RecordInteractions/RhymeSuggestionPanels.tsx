import { useLayoutEffect, useRef } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import useDatamuse, { FullRhymeType, RhymeType } from "../../hooks/useDatamuse"
import { PosType } from "../../hooks/useSuggestionSettings"

type SuggestionDisplayProps = {
  title: string
  queryWord: string
  selectedRhymeType: RhymeType
  selectedRhymeName: FullRhymeType
  selectedRhymes: string[]
  onClick: (selected: RhymeType) => void
}

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

const RhymeSuggestionPanel = ({
  title,
  queryWord,
  selectedRhymeType,
  selectedRhymeName,
  selectedRhymes,
  onClick,
}: SuggestionDisplayProps) => {
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
    <div className="suggestions-box">
      <div className="suggestions__pos-header--container">
        <div className="suggestions__pos-header">
          <div className="suggestions__pos-header--bs-inset">
            <p className={`rhyme-actions__header-text`}>{title}:</p>
            <p className="rhyme-actions__header-query-word">{queryWord}</p>
          </div>
          <div className="suggestions__pos-btns--container">
            <RhymeSuggestionButton type="RHY" selectedBtn={selectedRhymeType} onClick={() => onClick("RHY")} />
            <RhymeSuggestionButton type="TRG" selectedBtn={selectedRhymeType} onClick={() => onClick("TRG")} />
            <RhymeSuggestionButton type="SYN" selectedBtn={selectedRhymeType} onClick={() => onClick("SYN")} />
          </div>
        </div>

        <div className="rhyme-actions__suggestions--container">
          <div className="rhyme-actions__suggestions">
            <div className="rhyme-actions__suggestions-type">
              <div className="rhyme-actions__suggestions-type--bs-outset">
                <p className="rhyme-actions__suggestions-text">{selectedRhymeName}: </p>
              </div>
            </div>
            <div className="rhyme-actions__suggestions-type-scroller" ref={scrollContainerRef}>
              <p className="rhyme-actions__scroll-text" ref={scrollRef}>
                {selectedRhymes.map((each, index) => {
                  if (selectedRhymes.length - 1 === index) return `${each}`
                  return `${each} ${String.fromCodePoint(8226)} `
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const RhymeSuggestionPanelWrapper = ({ type, numofRhymes }: { type: PosType; numofRhymes: string }) => {
  const { state, queryWord, selectedRhymesHandler } = useDatamuse(type, numofRhymes)
  const { selected, selectedName, selectedRhymes } = state

  return (
    <RhymeSuggestionPanel
      title={type}
      queryWord={queryWord}
      selectedRhymeType={selected}
      selectedRhymeName={selectedName}
      selectedRhymes={selectedRhymes}
      onClick={selectedRhymesHandler}
    />
  )
}

export default function RhymeSuggestionsPanels({
  categoryList,
  numofRhymes,
  children,
}: {
  categoryList: PosType[]
  numofRhymes: string
  children: JSX.Element | JSX.Element[]
}) {
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
      {children}
    </div>
  )
}
