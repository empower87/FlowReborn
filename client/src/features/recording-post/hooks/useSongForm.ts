import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ISongTake } from "src/features/recording-booth/utils/types"
import { trpc } from "src/utils/trpc"
import { UploadInputType } from "../../../../../server/src/middleware/uploadFileToAWS"
import { SaveSongInputSchema } from "../utils/input-schema"

export interface IPostSongFormInputs {
  title: string
  caption?: string | undefined
}

type ResponseData = {
  options: {
    headers: {
      "Content-Type": string
    }
  }
  signedUrl: string
  url: string
}

export const useSongForm = (recordingType: "audio" | "video") => {
  const upload = trpc.useMutation(["users.upload-file"])
  const createSong = trpc.useMutation(["songs.create-song"])

  const [thumbnailBlob, setThumbnailBlob] = useState<Blob>()
  const [AWSData, setAWSData] = useState<ResponseData[]>()
  const [error, setError] = useState({
    path: "",
    message: "",
    showError: false,
  })

  const methods = useForm<IPostSongFormInputs>({
    defaultValues: {
      title: "",
      caption: "",
    },
    resolver: zodResolver(SaveSongInputSchema),
  })

  useEffect(() => {
    const errors = methods.formState.errors
    if (errors.title?.message) {
      setError({ path: "title", message: errors.title.message, showError: true })
    } else if (errors.caption?.message) {
      setError({ path: "caption", message: errors.caption.message, showError: true })
    }
  }, [methods.formState])

  const handleSaveSong = async (e: any, _song: ISongTake | undefined) => {
    if (!_song) return
    e.preventDefault()

    if (_song.blob == null)
      return setError({
        path: "",
        message: "You haven't yet recorded a Flow",
        showError: true,
      })

    const userId = _song.user._id
    const getTitle = methods.getValues("title")
    const getCaption = methods.getValues("caption")

    let songToUpload = {
      ..._song,
      title: getTitle,
      caption: getCaption,
    }

    const songFileName = userId + getTitle.replaceAll(" ", "-")
    const songFileType = recordingType === "audio" ? "audio/mpeg-3" : "video/mp4"
    const songFileBlob = songToUpload.blob

    if (thumbnailBlob && recordingType === "video") {
      let data = [
        {
          fileName: songFileName + "-thumbnail",
          fileType: "image/png",
          fileBlob: thumbnailBlob,
        },
        {
          fileName: songFileName,
          fileType: songFileType,
          fileBlob: songFileBlob,
        },
      ]

      await handleUploadToAws(data)

      if (!AWSData) return
      songToUpload = {
        ...songToUpload,
        thumbnail: AWSData[0].url,
        audio: AWSData[1].url,
      }
      // createSong.mutate({ ...songToUpload })
      console.log(songToUpload, thumbnailBlob, AWSData, "WHOOOOAAAA")
    } else {
      console.log("hi no thumbnail")
    }
    // upload.mutate(
    //   { fileName: fileName, fileType: fileType },
    //   {
    //     onSuccess: async (data) => {
    //       await axios.put(data.signedUrl, fileBlob, data.options)
    //       console.log(validated.data, data.url, "these values need to be valid")
    //       createSong.mutate({ ...songToUpload, audio: data.url })
    //     },
    //   }
    // )
  }

  const handleUploadToAws = async (_data: UploadInputType) => {
    console.log(_data, "what deez values handleUploadToAws")
    upload.mutate(_data, {
      onSuccess: (data) => {
        // axios.put(data.signedUrl, _fileBlob, data.options)
        console.log(data, "WTF")
        // setAwsUrls((prev) => ({ ...prev, [_type]: data.url }))
        setAWSData(data)
      },
      onError: (err) => {
        console.log(err, "YO ERR OCCURED DOG")
      },
    })
  }

  // const handleSaveSong = async (e: any, _song: ISongTake | undefined) => {
  //   if (!_song) return
  //   e.preventDefault()
  //   console.log(e.target.form[0].value, "lets check this data")
  //   if (_song.blob == null)
  //     return setError({
  //       path: "",
  //       message: "You haven't yet recorded a Flow",
  //       showError: true,
  //     })
  //   const title = titleRef.current?.value.trim() as string
  //   const caption = captionRef.current?.value.trim() as string
  //   const userId = _song.user._id

  //   const validated = validateInputs({ title: title, caption: caption })
  //   if (!validated.success) {
  //     setError({ path: "", message: validated.error.message, showError: true })
  //     return null
  //   }
  //   const songToUpload = {
  //     ..._song,
  //     title: validated.data.title,
  //     caption: validated.data.caption,
  //   }
  //   const fileName = userId + title.replaceAll(" ", "-")
  //   const fileType = recordingType === "audio" ? "audio/mpeg-3" : "video/mp4"
  //   const fileBlob = songToUpload.blob

  //   // upload.mutate(
  //   //   { fileName: fileName, fileType: fileType },
  //   //   {
  //   //     onSuccess: async (data) => {
  //   //       await axios.put(data.signedUrl, fileBlob, data.options)
  //   //       console.log(validated.data, data.url, "these values need to be valid")
  //   //       createSong.mutate({ ...songToUpload, audio: data.url })
  //   //     },
  //   //   }
  //   // )
  // }

  return { handleSaveSong, methods, error, setError, thumbnailBlob, setThumbnailBlob }
}
