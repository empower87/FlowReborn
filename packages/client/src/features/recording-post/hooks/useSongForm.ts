import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { ISongTake } from "src/features/recording-booth/utils/types"
import { trpc } from "src/utils/trpc"
import { UploadInputType } from "../../../../../server/src/middleware/uploadFileToAWS"
import { SaveSongInputSchema } from "../utils/input-schema"

export interface IPostSongFormInputs {
  title: string
  caption?: string | undefined
}

// TODO: Not sure I need the path key
export const INITIAL_ERROR_STATE = {
  message: "",
  showError: false,
}
type Error = typeof INITIAL_ERROR_STATE

export const useSongForm = (recordingType: "audio" | "video") => {
  const navigate = useNavigate()
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [error, setError] = useState<Error>(INITIAL_ERROR_STATE)

  const uploadToAWS = trpc.users.uploadFile.useMutation({
    onError: (err) => onSettledMutation(err.message),
  })
  const createSong = trpc.songs.createSong.useMutation({
    onSuccess: (data) => onSettledMutation("success", data._id),
    onError: (err) => onSettledMutation(err.message),
  })
  const methods = useForm<IPostSongFormInputs>({
    mode: "onChange",
    defaultValues: {
      title: "",
      caption: undefined,
    },
    resolver: zodResolver(SaveSongInputSchema),
  })
  const {
    formState: { errors, isDirty, isValid },
  } = methods

  useEffect(() => {
    if (errors.title?.message) {
      setError({ message: errors.title.message, showError: true })
    } else if (errors.caption?.message) {
      setError({ message: errors.caption.message, showError: true })
    }
  }, [errors])

  useEffect(() => {
    if (error.message) {
      setTimeout(() => {
        setError(INITIAL_ERROR_STATE)
      }, 4000)
    }
  }, [error])

  const handleSaveSong = useCallback(async (e: any, _song: ISongTake | undefined) => {
    if (!_song || _song.blob == null) {
      return setError({ message: "No Flows to be saved", showError: true })
    }
    // if (!isDirty) {
    //   return setError({ message: "Must add a title", showError: true })
    // }

    setIsSaving(true)

    const userId = _song.user._id
    const getTitle = methods.getValues("title")
    const getCaption = methods.getValues("caption")
    const songFileName = userId + getTitle.replaceAll(" ", "-")
    let songToUpload = {
      ..._song,
      title: getTitle,
      caption: getCaption,
    }

    console.log(e, _song, songToUpload, recordingType, "handleSaveSong in useSongForm.ts")
    if (recordingType === "video") {
      // if (!_song.thumbnailBlob) return

      let data = [
        {
          fileName: songFileName + "-thumbnail.png",
          fileType: "image/png",
          fileBlob: _song.thumbnailBlob,
        },
        {
          fileName: songFileName + ".mp4",
          fileType: "video/mp4",
          fileBlob: _song.blob,
        },
      ]
      console.log(data, "handleSaveSong if recordingType is video in useSongForm.ts")

      await uploadAndCreateSongHandler(data, songToUpload)
    } else {
      let data = [
        {
          fileName: songFileName + ".mp3",
          fileType: "audio/mpeg-4",
          fileBlob: _song.blob,
        },
      ]

      await uploadAndCreateSongHandler(data, songToUpload)
    }
    e.preventDefault()
  }, [])

  const uploadAndCreateSongHandler = async (_data: UploadInputType, songToUpload: ISongTake) => {
    uploadToAWS.mutate(_data, {
      onSuccess: async (data, variables) => {
        let thumbnailUrl
        let songUrl
        for (let i = 0; i < data.length; i++) {
          axios.put(data[i].signedUrl, variables[i].fileBlob, data[i].options)
          if (variables[i].fileName.includes("-thumbnail") && variables.length > 1) {
            thumbnailUrl = data[i].url
          } else {
            songUrl = data[i].url
          }
        }

        if (songUrl) {
          let { blob, thumbnailBlob, _id, user, ...rest } = songToUpload
          let songToCreate = { ...rest, user: songToUpload.user._id, thumbnail: thumbnailUrl, audio: songUrl }
          createSong.mutate({ ...songToCreate })
        }
        console.log(data, thumbnailUrl, songUrl, "DATA HERE ON UPLOAD TO AWS???")
      },
    })
  }

  const onSettledMutation = useCallback(
    (message: string, id?: string) => {
      setIsSaving(false)
      if (message === "you must be logged in to access this resource") {
        navigate("/auth")
      } else if (message !== "success") {
        console.log(message, "error saving song")
        setError({ message: message, showError: true })
      } else {
        if (!methods.formState.isSubmitted || !id) return
        console.log("song saved successfully")
        methods.reset()
      }
    },
    [methods, navigate]
  )

  return { handleSaveSong, methods, error, setError, isSaving }
}
