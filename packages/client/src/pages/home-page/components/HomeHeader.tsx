import { ReactNode } from "react"
import { Feeds } from "../hooks/songFeedReducer"

type HomeHeaderProps = {
  isVideoFullscreen: boolean
  children: ReactNode
}

type FeedButtonProps = {
  feed: Feeds
  selectedFeed: string
  onClick: (feed: Feeds) => void
}

export const FeedToggleButton = ({ feed, selectedFeed, onClick }: FeedButtonProps) => {
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

export const HomeHeader = ({ isVideoFullscreen, children }: HomeHeaderProps) => {
  return (
    <div className={`section-1a_toggle-feed`} style={{ visibility: isVideoFullscreen ? "hidden" : "visible" }}>
      <div className="toggle-feed-container">{children}</div>
    </div>
  )
}
