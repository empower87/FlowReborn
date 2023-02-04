import { ReactNode } from "react"
import { Feeds } from "../../hooks/songFeedReducer"

export const FeedToggleHeader = ({
  isVideoFullscreen,
  children,
}: {
  isVideoFullscreen: boolean
  children: ReactNode
}) => {
  return (
    <div className={`section-1a_toggle-feed`} style={{ visibility: isVideoFullscreen ? "hidden" : "visible" }}>
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
