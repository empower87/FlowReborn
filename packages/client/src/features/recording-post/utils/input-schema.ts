import z from "zod"

export const SaveSongInputSchema = z.object({
  title: z.string().min(1),
  caption: z.string().optional(),
})
export type SaveSongInputType = z.infer<typeof SaveSongInputSchema>
