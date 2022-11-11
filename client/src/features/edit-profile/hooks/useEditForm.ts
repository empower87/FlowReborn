import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import "react-image-crop/src/ReactCrop.scss"
import { useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { useAuth } from "src/context/AuthContext"
import { convertBase64ToBlob } from "src/utils/convertBase64ToBlob"
import { trpc } from "src/utils/trpc"
import { ISong } from "../../../../../server/src/models"

interface IFormInputs {
  picture: string
  username: string
  about: string
  location: string
  email: string
  firstName: string
  lastName: string
  instagram: string
  twitter: string
  soundCloud: string
}

export default function useEditForm() {
  const { user } = useAuth()
  const userId = user ? user._id : ""
  const navigate = useNavigate()
  const methods = useForm<IFormInputs>({
    defaultValues: {
      picture: user?.picture,
      username: user?.username,
      about: user?.about,
      location: user?.location,
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      instagram: user?.socials?.instagram,
      twitter: user?.socials?.twitter,
      soundCloud: user?.socials?.soundCloud,
    },
  })
  const [songs, setSongs] = useState<ISong[]>([])
  const queryClient = useQueryClient()
  const upload = trpc.useMutation(["users.upload-file"])
  const getSongs = trpc.useQuery(["songs.users-songs", { _id: userId }], { enabled: !!userId })
  const updateUser = trpc.useMutation(["users.update-user"], {
    onMutate: async (data) => {
      await queryClient.cancelQueries(["users.get-me"])
      const prevUser = queryClient.getQueryData(["users.get-me"])
      const newData = queryClient.setQueryData(["users.get-me"], (old: any) => ({
        ...old,
        ...data,
      }))
      return { prevUser, data }
    },
    onSuccess: (data) => {
      console.log(data, "update-user mutation successful")
      methods.reset()
      navigate(-1)
    },
    onError: (err, data, context) => {
      queryClient.setQueryData(["users.get-me"], context?.prevUser)
    },
    onSettled: (prevUser) => {
      queryClient.invalidateQueries(["users.get-me"])
    },
  })

  const onSubmitHandler = useCallback(async (data: IFormInputs) => {
    const { dirtyFields } = methods.formState
    if (dirtyFields && Object.keys(dirtyFields).length === 0) return

    let socialFields: any = {}
    let nonSocialFields: any = {}
    let updatedUser: any = {}

    for (const [key, value] of Object.entries(dirtyFields)) {
      if (["instagram", "twitter", "soundCloud"].includes(key)) {
        socialFields[key] = data[key as keyof IFormInputs]
      } else if (value && data[key as keyof IFormInputs] !== "") {
        nonSocialFields[key] = data[key as keyof IFormInputs]
      }
    }

    if (socialFields && Object.keys(socialFields).length === 0) {
      updatedUser = { ...nonSocialFields }
    } else {
      updatedUser = { ...nonSocialFields, socials: socialFields }
    }
    console.log(updatedUser, "UPDATE USER input")

    if (nonSocialFields.picture) {
      const pic = nonSocialFields.picture
      const randomID = Math.round(Math.random() * 1000000)
      const blob = convertBase64ToBlob(pic)

      const uploadData = {
        fileName: userId + `-${randomID}-profile-picture`,
        fileType: "image/jpeg",
        fileBlob: blob,
      }

      upload.mutate([uploadData], {
        onSuccess: async (data) => {
          console.log(data, "signed-s3 data BEFORE")

          await axios
            .put(data[0].signedUrl, blob, data[0].options)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))

          console.log(data, pic, blob, "signed-s3 data AFTER")

          updateUser.mutate({ ...updatedUser, picture: data[0].url })
        },
      })
    } else {
      updateUser.mutate({ ...updatedUser })
    }
  }, [])
  // const onSubmitHandler = useCallback(async (data: IFormInputs) => {
  //   const { dirtyFields } = methods.formState
  //   if (dirtyFields && Object.keys(dirtyFields).length === 0) return

  //   let socialFields: any = {}
  //   let nonSocialFields: any = {}
  //   let updatedUser: any = {}

  //   for (const [key, value] of Object.entries(dirtyFields)) {
  //     if (["instagram", "twitter", "soundCloud"].includes(key)) {
  //       socialFields[key] = data[key as keyof IFormInputs]
  //     } else if (value && data[key as keyof IFormInputs] !== "") {
  //       nonSocialFields[key] = data[key as keyof IFormInputs]
  //     }
  //   }

  //   if (socialFields && Object.keys(socialFields).length === 0) {
  //     updatedUser = { ...nonSocialFields }
  //   } else {
  //     updatedUser = { ...nonSocialFields, socials: socialFields }
  //   }
  //   console.log(updatedUser, "UPDATE USER input")

  //   if (nonSocialFields.picture) {
  //     const pic = nonSocialFields.picture
  //     const randomID = Math.round(Math.random() * 1000000)
  //     const fileName = userId + `-${randomID}-profile-picture`
  //     const fileType = "image/jpeg"
  //     const blob = convertBase64ToBlob(pic)
  //     const uploadData = {
  //       fileName: userId + `-${randomID}-profile-picture`,
  //       fileType: 'image/jpeg',
  //       fileBlob: blob
  //     }
  //     upload.mutate(
  //       { fileName: fileName, fileType: fileType },
  //       {
  //         onSuccess: async (data) => {
  //           console.log(data, "signed-s3 data BEFORE")

  //           await axios
  //             .put(data.signedUrl, blob, data.options)
  //             .then((res) => console.log(res))
  //             .catch((err) => console.log(err))

  //           console.log(data, pic, blob, "signed-s3 data AFTER")

  //           updateUser.mutate({ ...updatedUser, picture: data.url })
  //         },
  //       }
  //     )
  //   } else {
  //     updateUser.mutate({ ...updatedUser })
  //   }
  // }, [])

  const onResetHandler = () => {
    const { dirtyFields } = methods.formState
    if (dirtyFields && Object.keys(dirtyFields).length === 0) return
    methods.reset()
  }

  useEffect(() => {
    if (getSongs.data) {
      setSongs(getSongs.data)
    }
  }, [getSongs])

  return { onSubmitHandler, onResetHandler, songs, methods }
}
