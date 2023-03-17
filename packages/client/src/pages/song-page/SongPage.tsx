import { useState } from "react"
import { useParams } from "react-router"
import SongPostList from "src/features/song-post/SongPostList"
import Header from "./components/Header"
import useSongPage from "./hooks/useSongPage"

export default function SongPage() {
  const { id } = useParams()
  const { songInView, songs, isLoading, isError } = useSongPage(id)
  // const [showCommentMenu, setShowCommentMenu] = useState<boolean>(false)
  const [isVideoFullscreen, setIsVideoFullscreen] = useState<boolean>(false)

  if (isLoading || !songInView || !songs) return <p>loading..</p>
  if (isError) return <p>loading..</p>
  return (
    <div className="SongScreen">
      <div className="song-screen--container">
        {/* <CommentMenu song={songInView} isOpen={showCommentMenu} onClose={setShowCommentMenu} /> */}

        <Header song={songInView} songs={songs} isVideoFullscreen={isVideoFullscreen} />
        <SongPostList songs={songs} />
      </div>
    </div>
  )
}
