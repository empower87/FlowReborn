import { useEffect, useState } from "react"

interface UseThumbnailProps {
  _src: string | null
}

interface ThumbnailState {
  _src: string | null
  time: number
  thumbnail: string | null
}

const useThumbnail = ({ _src }: UseThumbnailProps) => {
  const [thumbnailState, setThumbnailState] = useState<ThumbnailState>({
    _src,
    time: 0,
    thumbnail: null,
  })

  useEffect(() => {
    if (_src) {
      const video = document.createElement("video")
      video.src = _src
      video.currentTime = thumbnailState.time
      video.addEventListener("loadeddata", () => {
        const canvas = document.createElement("canvas")
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        canvas.getContext("2d")?.drawImage(video, 0, 0, canvas.width, canvas.height)
        setThumbnailState((prev) => ({ ...prev, thumbnail: canvas.toDataURL() }))
        video.remove()
      })
    } else {
      setThumbnailState((prev) => ({ ...prev, src: null, thumbnail: null }))
    }
  }, [_src, thumbnailState.time])

  const selectThumbnail = (time: number) => {
    setThumbnailState((prev) => ({ ...prev, time }))
  }

  return { thumbnail: thumbnailState, selectThumbnail }
}

export default useThumbnail
