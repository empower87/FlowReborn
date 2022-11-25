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

  const uploadToAWS = trpc.useMutation(["users.upload-file"], {
    onError: (err) => onSettledMutation(err.message),
  })
  const createSong = trpc.useMutation(["songs.create-song"], {
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
    formState: { isDirty, isValid, errors },
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

  const handleSaveSong = useCallback(
    async (e: any, _song: ISongTake | undefined) => {
      if (!_song || _song.blob == null) {
        return setError({ message: "No Flows to be saved", showError: true })
      }
      if (!isDirty || !isValid) {
        return setError({ message: "Must add a title", showError: true })
      }

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

      if (recordingType === "video") {
        if (!_song.thumbnailBlob) return

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

        await uploadAndCreateSongHandler(data, songToUpload)
      } else {
        let data = [
          {
            fileName: songFileName,
            fileType: "audio/mpeg-4",
            fileBlob: _song.blob,
          },
        ]

        await uploadAndCreateSongHandler(data, songToUpload)
      }
      e.preventDefault()
    },
    [isDirty, isValid]
  )

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
          songToUpload = { ...songToUpload, thumbnail: thumbnailUrl, audio: songUrl }
          createSong.mutate({ ...songToUpload })
        }
      },
    })
  }

  const onSettledMutation = useCallback((message: string, id?: string) => {
    setIsSaving(false)
    if (message === "you must be logged in to access this resource") {
      // this is not working, goes to /home
      navigate("/auth")
    } else if (message !== "success") {
      console.log(message, "error saving song")
      setError({ message: message, showError: true })
    } else {
      if (!methods.formState.isSubmitted || !id) return
      console.log("song saved successfully")
      // onDelete(id)
      methods.reset()
    }
  }, [])

  return { handleSaveSong, methods, error, setError, isSaving }
}
