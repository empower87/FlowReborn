import memoize from "memoize-one"
import { CSSProperties, memo, useEffect, useRef, useState } from "react"
import { FixedSizeList as List, areEqual } from "react-window"
import { ISongPopulatedUserAndComments as ISong } from "src/types/ServerModelTypes"
import SongPost from "./SongPost"

type FeedListProps = {
  songs: ISong[]
}

type ItemProps = {
  index: number
  style: CSSProperties
  data: ISong[]
}

const Item = memo(({ index, style, data }: ItemProps) => {
  return <SongPost key={`${data[index]._id}_${index}`} style={style} song={data[index]} />
}, areEqual)

const createMemoizedItemData = memoize((items: ISong[]) => ({
  items,
}))

export default function SongPostList({ songs }: FeedListProps) {
  const memoizedItems = createMemoizedItemData(songs)
  const parentWindowDimensionsRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState<[number, number]>([648, 364])

  useEffect(() => {
    if (parentWindowDimensionsRef.current) {
      const height = parentWindowDimensionsRef.current.clientHeight
      const width = parentWindowDimensionsRef.current.clientWidth
      setDimensions([height, width])
    }
  }, [parentWindowDimensionsRef])

  return (
    <div ref={parentWindowDimensionsRef} className="song-post__container">
      <List
        className="song-post__list"
        innerElementType="ul"
        itemData={memoizedItems.items}
        height={dimensions[0]}
        itemCount={memoizedItems.items.length}
        itemSize={dimensions[0]}
        width={dimensions[1]}
      >
        {Item}
      </List>
    </div>
  )
}
