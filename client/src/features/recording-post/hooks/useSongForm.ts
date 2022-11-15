import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
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
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [AWSData, setAWSData] = useState<ResponseData[]>()
  const [songToUpload, setSongToUpload] = useState<ISongTake>()
  const [error, setError] = useState({
    path: "",
    message: "",
    showError: false,
  })
  const upload = trpc.useMutation(["users.upload-file"], {
    onSuccess: async (data, variables) => {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i], variables, i + 1, "axios.put data")
        axios.put(data[i].signedUrl, variables[i].fileBlob, data[i].options)
      }
      setAWSData(data)
    },
  })
  const createSong = trpc.useMutation(["songs.create-song"], {
    onMutate: (data) => {
      console.log(data, "OK I should see this in console if working correctly")
    },
    onSuccess: (data) => {
      console.log(data, "song successfully saved")
      setIsSaving(false)
    },
    onError: (err) => {
      console.log(err, "Song unsuccessfully saved -- check the error")
    },
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

  useEffect(() => {
    if (AWSData && songToUpload) {
      let song = {
        ...songToUpload,
        thumbnail: AWSData[0].url,
        audio: AWSData[1].url,
      }
      createSong.mutate({ ...song })
      console.log(AWSData, song, "AGH SUCCESS????")
    }
  }, [AWSData])

  // TODO: disable button onSave, saving animation/notification, handle error,
  //        if no video then no thumbnail, thumbnail auto generate if not set manually,
  const handleSaveSong = async (e: any, _song: ISongTake | undefined) => {
    if (!_song) return
    setIsSaving(true)
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
    setSongToUpload(songToUpload)

    const songFileName = userId + getTitle.replaceAll(" ", "-")

    if (_song.thumbnailBlob && recordingType === "video") {
      let data = [
        {
          fileName: songFileName + "-thumbnail",
          fileType: "image/png",
          fileBlob: _song.thumbnailBlob,
        },
        {
          fileName: songFileName,
          fileType: "video/mp4",
          fileBlob: _song.blob,
        },
      ]

      await handleUploadToAws(data)
    }
  }

  const handleUploadToAws = async (_data: UploadInputType) => {
    upload.mutate(_data, {
      onSuccess: async (data) => {
        console.log(data, "mutate onSuccess")
      },
    })
  }

  return { handleSaveSong, methods, error, setError, isSaving }
}
