import { PropsWithChildren } from "react"
import { Feeds } from "../../hooks/songFeedReducer"

type FeedToggle = PropsWithChildren<{
  showMenu: boolean
}>

export const FeedToggleHeader = ({ showMenu, children }: FeedToggle) => {
  return (
    <div className="section-1a_toggle-feed" style={showMenu ? { height: "0%", visibility: "hidden" } : {}}>
      <div className="toggle-feed-container">{children}</div>
    </div>
  )
}

type FeedButton = {
  feed: Feeds
  selectedFeed: string
  onClick: (feed: Feeds) => void
}

export const FeedToggleButton = ({ feed, selectedFeed, onClick }: FeedButton) => {
  const bRadius1 = feed === "Home" ? "0.3vh 0.3vh 0.3vh 2.5vh" : feed === "Following" ? ".3vh .3vh 2.5vh .3vh" : ""
  const bRadius2 = feed === "Home" ? "4vh .2vh .2vh 4vh" : feed === "Following" ? ".2vh 4vh 4vh .2vh" : ""
  return (
    <div className="each-feed_shadow-div-inset" style={{ borderRadius: bRadius1 }}>
      <button
        className={`each-feed_shadow-div-outset ${feed === selectedFeed ? "toggle-feed" : ""}`}
        onClick={() => onClick(feed)}
        style={{ borderRadius: bRadius2 }}
      >
        <div className={`each-feed_shadow-div-inset-2 ${feed === selectedFeed ? "toggle-feed-2" : ""}`}>{feed}</div>
      </button>
    </div>
  )
}
