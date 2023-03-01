import memoize from "memoize-one"
import { CSSProperties, Dispatch, memo, SetStateAction, useLayoutEffect, useRef, useState } from "react"
import { areEqual, FixedSizeList as List } from "react-window"
import { ISongPopulatedUserAndComments as ISong } from "src/types/ServerModelTypes"
import SongPost from "./SongPost"

type FeedListProps = {
  songs: ISong[]
  isVideoFullscreen: boolean
  setIsVideoFullscreen: Dispatch<SetStateAction<boolean>>
}

type ItemProps = {
  index: number
  style: CSSProperties
  data: FeedListProps
}

const Item = memo(({ index, style, data }: ItemProps) => {
  return (
    <SongPost
      key={`${data.songs[index]._id}_${index}`}
      style={style}
      song={data.songs[index]}
      isVideoFullscreen={data.isVideoFullscreen}
      setIsVideoFullscreen={data.setIsVideoFullscreen}
    />
  )
}, areEqual)

export default function SongPostList({ songs, isVideoFullscreen, setIsVideoFullscreen }: FeedListProps) {
  const parentWindowDimensionsRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState<[number, number]>([648, 364])

  useLayoutEffect(() => {
    if (parentWindowDimensionsRef.current) {
      const height = parentWindowDimensionsRef.current.clientHeight
      const width = parentWindowDimensionsRef.current.clientWidth
      setDimensions([height, width])
    }
  }, [parentWindowDimensionsRef])

  const createMemoizedItemData = memoize((items: ISong[]) => ({
    items,
  }))

  const memoizedItems = createMemoizedItemData(songs)

  const itemData = {
    songs: memoizedItems.items,
    isVideoFullscreen: isVideoFullscreen,
    setIsVideoFullscreen: setIsVideoFullscreen,
  }

  return (
    <div ref={parentWindowDimensionsRef} className="song-post__container">
      <List
        className="song-post__list"
        innerElementType="ul"
        itemData={itemData}
        height={dimensions[0]}
        itemCount={itemData.songs.length}
        itemSize={dimensions[0]}
        width={dimensions[1]}
      >
        {Item}
      </List>
    </div>
  )
}
