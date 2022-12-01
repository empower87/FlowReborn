import { PropsWithChildren } from "react"
import { Feeds } from "../../hooks/songFeedReducer"

type FeedToggle = PropsWithChildren<{
  showMenu: boolean
}>

export const FeedToggleHeader = ({ showMenu, children }: FeedToggle) => {
  return (
    <div className="section-1a_toggle-feed">
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
  return (
    <div className="each-feed_shadow-div-inset">
      <button
        className={`each-feed_shadow-div-outset ${feed === selectedFeed ? "active" : ""}`}
        onClick={() => onClick(feed)}
      >
        <div className="each-feed_shadow-div-inset-2">{feed === "ForYou" ? "For You" : feed}</div>
      </button>
    </div>
  )
}
