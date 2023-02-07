import { Dispatch, SetStateAction, useState } from "react"
// import { ISong } from "../../../../../../server/src/models"
import SongPost from "src/features/song-post/SongPost"
import { ISongPopulatedUserAndComments as ISong } from "src/types/ServerModelTypes"

type FeedListProps = {
  songs: ISong[]
  isVideoFullscreen: boolean
  setIsVideoFullscreen: Dispatch<SetStateAction<boolean>>
}

export default function FeedList({ songs, isVideoFullscreen, setIsVideoFullscreen }: FeedListProps) {
  const [onShowCommentMenu, setOnShowCommentMenu] = useState<boolean>(false)

  return (
    <ul className="video-scroll-container" style={{ zIndex: onShowCommentMenu ? "2" : "1" }}>
      {/* <Loading isLoading={isLoading} /> */}
      {songs?.map((item, index) => {
        return (
          <SongPost
            key={`${item._id}_${index}`}
            song={item}
            isVideoFullscreen={isVideoFullscreen}
            setIsVideoFullscreen={setIsVideoFullscreen}
            setOnShowCommentMenu={setOnShowCommentMenu}
          />
        )
      })}
    </ul>
  )
}
