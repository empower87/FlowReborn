import { useRef, useState } from "react"
import LoadingHome from "src/components/loading/Skeletons/LoadingHome"
import { CommentButton, FollowButton, LikeButton } from "src/features/socialize/SocializeButtons"
import Navbar from "../../components/navbar/Navbar"
import CommentMenu from "../../features/socialize/comments/components/CommentMenu"
import AudioPlayer from "./components/Details/AudioPlayer"
import DetailsLayout from "./components/Details/DetailsLayout"
import SongDetails from "./components/Details/SongDetails"
import { Feed } from "./components/Feed/Feed"
import { FeedToggleButton, FeedToggleHeader } from "./components/Header/HomeHeader"
import useSongFeeds from "./hooks/useSongFeeds"

export default function HomeDisplay() {
  const { isLoading, songInView, feedInView, feedSongs, dispatch } = useSongFeeds()
  const [showCommentMenu, setShowCommentMenu] = useState<boolean>(false)
  const renderRef = useRef(0)

  console.log(renderRef.current++, "RENDERS AT HOME")
  if (isLoading) return <LoadingHome />
  return (
    <div className="Home" id="Home">
      <CommentMenu song={songInView} page="home" isOpen={showCommentMenu} onClose={setShowCommentMenu} />
      <div className="section-1_feed">
        <FeedToggleHeader showMenu={showCommentMenu}>
          <FeedToggleButton
            feed={"Home"}
            selectedFeed={feedInView}
            onClick={() => dispatch({ type: "Home", payload: { feed: "Home" } })}
          />
          <FeedToggleButton
            feed={"Trending"}
            selectedFeed={feedInView}
            onClick={() => dispatch({ type: "Trending", payload: { feed: "Trending" } })}
          />
          <FeedToggleButton
            feed={"Following"}
            selectedFeed={feedInView}
            onClick={() => dispatch({ type: "Following", payload: { feed: "Following" } })}
          />
        </FeedToggleHeader>

        <Feed songs={feedSongs} feedInView={feedInView} dispatch={dispatch} />

        <DetailsLayout
          buttons={
            <>
              <FollowButton location="Home" song={songInView} />
              <LikeButton location="Home" song={songInView} />
              <CommentButton location="Home" song={songInView} onClick={() => setShowCommentMenu(!showCommentMenu)} />
            </>
          }
          details={<SongDetails song={songInView} />}
          audioPlayer={<AudioPlayer src={songInView.audio} duration={songInView.duration} />}
        />
      </div>
      <Navbar isVisible={showCommentMenu} />
    </div>
  )
}
