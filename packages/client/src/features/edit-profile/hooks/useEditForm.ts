import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import "react-image-crop/src/ReactCrop.scss"
// import { useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { useAuth } from "src/context/AuthContext"
import { convertBase64ToBlob } from "src/utils/convertBase64ToBlob"
import { trpc } from "src/utils/trpc"
// import { ISong } from "../../../../../server/src/models"
import { ISongPopulatedUser as ISong } from "src/types/ServerModelTypes"

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
  // const queryClient = useQueryClient()
  const utils = trpc.useContext()

  const upload = trpc.users.uploadFile.useMutation()
  const getSongs = trpc.songs.usersSongs.useQuery({ _id: userId }, { enabled: !!userId })

  const updateUser = trpc.users.updateUser.useMutation({
    onMutate: async (data) => {
      // await queryClient.cancelQueries(["users.getMe"])
      await utils.users.getMe.cancel()
      const prevUser = utils.users.getMe.getData()
      // const getType = prevUser ? typeof prevUser : undefined
      // const newData = utils.users.getMe.setData(undefined, (update: IUser | undefined) => {
      //   if (!update) return
      //   return {
      //     ...update,
      //     ...data,
      //   }
      // })
      // const prevUser = queryClient.getQueryData(["users.getMe"])
      // const newData = queryClient.setQueryData(["users.getMe"], (old: any) => ({
      //   ...old,
      //   ...data,
      // }))
      return { prevUser, data }
    },
    onSuccess: (data) => {
      console.log(data, "update-user mutation successful")
      methods.reset()
      navigate(-1)
    },
    onError: (err, data, context) => {
      // queryClient.setQueryData(["users.getMe"], context?.prevUser)
      utils.users.getMe.setData(undefined, context?.prevUser)
    },
    onSettled: (prevUser) => {
      // queryClient.invalidateQueries(["users.getMe"])
      utils.users.getMe.invalidate()
    },
  })

  const onSubmitHandler = useCallback(
    async (data: IFormInputs) => {
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
    },
    [methods.formState, updateUser, upload, userId]
  )
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
