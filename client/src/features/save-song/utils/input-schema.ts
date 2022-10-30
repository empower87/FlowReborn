import z from "zod"

export const SaveSongInputSchema = z.object({
  title: z.string().min(1),
  caption: z.string().min(1).optional(),
})
export type SaveSongInputType = z.infer<typeof SaveSongInputSchema>
