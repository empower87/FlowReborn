export const generateThumbnail = async (src: HTMLVideoElement, width: number, height: number) => {
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")
  console.log(src, width, height, ctx, "WHAT IT DO?")
  if (!ctx) return
  ctx.drawImage(src, 0, 0, canvas.width, canvas.height)
  return await new Promise<Blob | null>((resolve) => {
    ctx.canvas.toBlob((blob) => {
      // if (blob) {
      //   let url = window.URL.createObjectURL(blob)
      //   return url
      // }
      return resolve(blob)
    }, "image/jpeg")
  })
}

export const generateCanvas = (src: HTMLVideoElement, height: number, width: number) => {
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")
  if (!ctx) return
  ctx.drawImage(src, 0, 0, canvas.width, canvas.height)
  return ctx.canvas
}
