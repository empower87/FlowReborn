import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ISongTake } from "src/features/recording-booth/utils/types"
import { trpc } from "src/utils/trpc"
import { SaveSongInputSchema } from "../utils/input-schema"

export interface IPostSongFormInputs {
  title: string
  caption?: string | undefined
}

export const useSongForm = (recordingType: "audio" | "video") => {
  const upload = trpc.useMutation(["users.upload-file"])
  const createSong = trpc.useMutation(["songs.create-song"])
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
    console.log(e, "lets check this data")

    if (_song.blob == null)
      return setError({
        path: "",
        message: "You haven't yet recorded a Flow",
        showError: true,
      })

    const userId = _song.user._id
    const getTitle = methods.getValues("title")
    const getCaption = methods.getValues("caption")

    const songToUpload = {
      ..._song,
      title: getTitle,
      caption: getCaption,
    }
    const fileName = userId + getTitle.replaceAll(" ", "-")
    const fileType = recordingType === "audio" ? "audio/mpeg-3" : "video/mp4"
    const fileBlob = songToUpload.blob

    console.log(songToUpload, "LETS CHECK THIS OUT???????")
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

  return { handleSaveSong, methods, error, setError }
}
