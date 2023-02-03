import { Dispatch, SetStateAction, useState } from "react"
// import { ISong } from "../../../../../../server/src/models"
import { ISongPopulatedUserAndComments as ISong } from "src/types/ServerModelTypes"
import SongPost from "./SongPost"

type FeedProps = {
  songs: ISong[]
  isVideoFullscreen: boolean
  setIsVideoFullscreen: Dispatch<SetStateAction<boolean>>
}

export const Feed = ({ songs, isVideoFullscreen, setIsVideoFullscreen }: FeedProps) => {
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
