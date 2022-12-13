import { useState } from "react"
import { useParams } from "react-router"
import { LoadingSongPage } from "src/components/loading/Skeletons/LoadingHome"
import AudioPlayer from "./components/AudioPlayer"
import Header from "./components/Header"
import SocialButtons, { SocialButton } from "./components/SocialButtons"
import useSongPage from "./hooks/useSongPage"

export default function SongPage() {
  const { id } = useParams()
  const { songInView, songs, findCurrentSong, isLoading, isError } = useSongPage(id)
  const [showCommentMenu, setShowCommentMenu] = useState<boolean>(false)

  if (isLoading || !songInView || !songs) return <LoadingSongPage />
  if (isError) return <LoadingSongPage />
  return (
    <div className="SongScreen">
      <div className="song-screen--container">
        {/* <CommentMenu song={songInView} isOpen={showCommentMenu} onClose={setShowCommentMenu} /> */}

        <Header song={songInView} songs={songs} />

        <div className="song-video-frame">
          <div className="song-lyric-container">
            {songInView?.lyrics?.map((each, index) => {
              return (
                <div className="each-lyric-container" key={`${each}_${index}`}>
                  <p className="each-lyric-no">{index + 1}</p>
                  <p className="each-lyric-line">{each}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="songscreen__interactions--container">
          <AudioPlayer song={songInView} findCurrentSong={findCurrentSong} />

          <SocialButtons>
            <SocialButton type="follow" song={songInView} />
            <SocialButton type="like" song={songInView} />
            <SocialButton type="comment" song={songInView} showComments={() => setShowCommentMenu((prev) => !prev)} />
          </SocialButtons>
        </div>
      </div>
    </div>
  )
}
