import { useState } from "react"
import { HomeLoadingSkeleton } from "src/components/loading/Skeletons/HomeLoading"
import Navbar from "src/components/navbar/Navbar"
import SongPostList from "src/features/song-post/SongPostList"
import { FeedToggleButton, HomeHeader } from "./components/HomeHeader"
import useSongFeeds from "./hooks/useSongFeeds"

// TODO: redesign for Layout, will create a post/song item component

export default function HomeDisplay() {
  const { isLoading, feedInView, feedSongs, toggleFeedHandler } = useSongFeeds()
  const [isVideoFullscreen, setIsVideoFullscreen] = useState<boolean>(false)

  if (isLoading) return <HomeLoadingSkeleton />
  return (
    <div className="Home" id="Home">
      {/* <CommentMenu song={song} isOpen={showComments} onClose={setShowComments} /> */}

      <HomeHeader isVideoFullscreen={isVideoFullscreen}>
        <FeedToggleButton feed={"ForYou"} selectedFeed={feedInView} onClick={() => toggleFeedHandler("ForYou")} />
        <FeedToggleButton feed={"Trending"} selectedFeed={feedInView} onClick={() => toggleFeedHandler("Trending")} />
        <FeedToggleButton feed={"Following"} selectedFeed={feedInView} onClick={() => toggleFeedHandler("Following")} />
      </HomeHeader>

      <SongPostList
        songs={feedSongs}
        isVideoFullscreen={isVideoFullscreen}
        setIsVideoFullscreen={setIsVideoFullscreen}
      />

      <Navbar isVisible={!isVideoFullscreen} />
    </div>
  )
}
