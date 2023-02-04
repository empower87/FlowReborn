export const useSongForm = (recordingType: "audio" | "video") => {
  // const upload = trpc.useMutation(["users.upload-file"])
  // const createSong = trpc.useMutation(["songs.create-song"])
  // const [error, setError] = useState({
  //   path: "",
  //   message: "",
  //   showError: false,
  // })
  // const titleRef = useRef<HTMLInputElement>(null)
  // const captionRef = useRef<HTMLInputElement>(null)
  // const handleSaveSong = async (e: any, _song: ISongTake | undefined) => {
  //   if (!_song) return
  //   e.preventDefault()
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
  //     console.log(validated, "HAHAH")
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
  // const validateInputs = ({ title, caption }: SaveSongInputType) => {
  //   const validated = SaveSongInputSchema.safeParse({ title, caption })
  //   return validated
  // }
  // return { handleSaveSong, error, setError, titleRef, captionRef }
}
