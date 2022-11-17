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

export const INITIAL_ERROR_STATE = {
  path: "",
  message: "",
  showError: false,
}

export const useSongForm = (recordingType: "audio" | "video") => {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [showError, setShowError] = useState<boolean>(false)
  const [error, setError] = useState(INITIAL_ERROR_STATE)

  const upload = trpc.useMutation(["users.upload-file"], {
    onError: (err) => {
      console.log(err)
      setError({ path: "upload", message: err.message, showError: true })
    },
  })
  const createSong = trpc.useMutation(["songs.create-song"], {
    onSuccess: (data) => {
      console.log(data, "song successfully saved")
      setIsSaving(false)
      if (methods.formState.isSubmitted) {
        console.log(methods.formState, "what does the formState look like")
        methods.reset()
      }
    },
    onError: (err) => {
      console.log(err, "Song unsuccessfully saved -- check the error")
      setError({ path: "create", message: err.message, showError: true })
    },
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
    const errors = methods.formState.errors
    if (errors.title?.message) {
      setError({ path: "title", message: errors.title.message, showError: true })
    } else if (errors.caption?.message) {
      setError({ path: "caption", message: errors.caption.message, showError: true })
    }
  }, [errors])

  useEffect(() => {
    if (error.message) {
      setTimeout(() => {
        setError(INITIAL_ERROR_STATE)
      }, 4000)
    }
  }, [error])

  useEffect(() => {
    if (isDirty || isValid) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [isDirty, isValid])

  // TODO: disable button onSave, saving animation/notification, handle error,
  //        if no video then no thumbnail, thumbnail auto generate if not set manually,
  const handleSaveSong = async (e: any, _song: ISongTake | undefined) => {
    if (!_song || _song.blob == null) {
      return setError({
        path: "",
        message: "You haven't yet recorded a Flow",
        showError: true,
      })
    }
    console.log(isDisabled, "is this true??")
    if (isDisabled) {
      return setError((prevError) => ({ ...prevError, message: "Must add a title", showError: true }))
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
      await handleUploadToAws(data, songToUpload)
    }
    e.preventDefault()
  }

  const handleUploadToAws = async (_data: UploadInputType, songToUpload: ISongTake) => {
    upload.mutate(_data, {
      onSuccess: async (data, variables) => {
        let thumbnailUrl
        let songUrl
        for (let i = 0; i < data.length; i++) {
          console.log(data[i], variables, i + 1, "axios.put data")

          axios.put(data[i].signedUrl, variables[i].fileBlob, data[i].options)
          if (variables[i].fileName.includes("-thumbnail") && variables.length > 1) {
            thumbnailUrl = data[i].url
          } else {
            songUrl = data[i].url
          }
        }
        if ((thumbnailUrl && songUrl) || (!thumbnailUrl && songUrl)) {
          songToUpload = { ...songToUpload, thumbnail: thumbnailUrl, audio: songUrl }
          createSong.mutate({ ...songToUpload })
        }
      },
    })
  }

  return { handleSaveSong, methods, error, setError, showError, setShowError, isSaving, isDisabled }
}
