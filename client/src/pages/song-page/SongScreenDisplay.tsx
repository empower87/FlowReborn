import { useState } from "react"
import { useParams } from "react-router"
import { LoadingSongPage } from "src/components/loading/Skeletons/LoadingHome"
import CommentMenu from "src/features/socialize/comments/components/CommentMenu"
import { CommentButton, FollowButton, LikeButton } from "src/features/socialize/SocializeButtons"
import AudioTimeSlider from "../../components/audio/AudioTimeSlider"
import { LayoutThree, LayoutTwo } from "../../components/layouts/LayoutWrappers"
import Header from "./components/Header"
import useSongPage from "./hooks/useSongPage"
import { NavigationButton, PlayButton } from "./SongScreen"

export default function SongScreenDisplay() {
  const { id } = useParams()
  const { songInView, songs, findCurrentSong, isLoading, isError } = useSongPage(id)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [songScreen] = useState(`#353535`)
  const [showCommentMenu, setShowCommentMenu] = useState<boolean>(false)

  if (isLoading || !songInView || !songs) return <LoadingSongPage />
  if (isError) return <LoadingSongPage />
  return (
    <LayoutTwo classes={["SongScreen", "song-screen--container"]}>
      <CommentMenu song={songInView} page="songScreen" isOpen={showCommentMenu} onClose={setShowCommentMenu} />

      <Header song={songInView} songs={songs} />
      <LayoutTwo classes={["song-video-frame", "song-lyric-container"]}>
        {songInView?.lyrics?.map((each, index) => {
          return (
            <div className="each-lyric-container" key={`${each}_${index}`}>
              <p className="each-lyric-no">{index + 1}</p>
              <p className="each-lyric-line">{each}</p>
            </div>
          )
        })}
      </LayoutTwo>

      <div className="songscreen__interactions--container">
        <LayoutThree
          classes={["songscreen__play--container", "songscreen__play--shadow-inset", "songscreen__play--shadow-outset"]}
        >
          <div className="songscreen__play">
            <NavigationButton onClick={findCurrentSong} direction="Previous" />
            <LayoutTwo classes={["songscreen__play-btn--container", "songscreen__play-btn--shadow-inset"]}>
              <LayoutTwo classes={["songscreen__play-btn", "songscreen__play-btn--shadow-outset"]}>
                <PlayButton isPlaying={isPlaying} onClick={setIsPlaying} />
              </LayoutTwo>
            </LayoutTwo>
            <NavigationButton onClick={findCurrentSong} direction="Next" />
          </div>

          <LayoutThree
            classes={[
              "songscreen__audioslider--container",
              "songscreen__audioslider--shadow-inset",
              "songscreen__audioslider--shadow-outset",
            ]}
          >
            <AudioTimeSlider
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              currentSong={songInView}
              bgColor={songScreen}
            />
          </LayoutThree>
        </LayoutThree>

        <LayoutThree
          classes={[
            "songscreen__social-btns--container",
            "songscreen__social-btns--shadow-outset",
            "songscreen__social-btns--shadow-inset",
          ]}
        >
          <div className="songscreen__btn--container follow">
            <FollowButton location="Song" song={songInView} />
          </div>
          <div className="songscreen__btn--container like">
            <LikeButton location="Song" song={songInView} />
          </div>
          <div className="songscreen__btn--container comment">
            <CommentButton location="Song" song={songInView} onClick={() => setShowCommentMenu((prev) => !prev)} />
          </div>
        </LayoutThree>
      </div>
    </LayoutTwo>
  )
}
