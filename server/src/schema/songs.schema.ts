import z from "zod"
import { CommentSchema } from "./comments.schema"
import { UserSchema } from "./user.schema"

export const SongSchema = z.object({
  _id: z.string(),
  title: z.string(),
  caption: z.string().max(80).optional(),
  lyrics: z.array(z.string().array()),
  duration: z.number(),
  audio: z.string(),
  video: z.string().optional(),
  user: UserSchema,
  comments: z.array(CommentSchema),
  likes: z.string().array().default([]),
  createdOn: z.date().optional(),
  updatedOn: z.date().optional(),
})

export type SongSchemaType = z.infer<typeof SongSchema>

export const CreateSongSchema = SongSchema.omit({
  _id: true,
  likes: true,
  comments: true,
  createdOn: true,
  updatedOn: true,
})

export const UpdateSongSchema = SongSchema.pick({
  _id: true,
  title: true,
  caption: true,
})
export const SongInputSchema = SongSchema.pick({ _id: true })
export const GetByFollowersSchema = UserSchema.pick({ followers: true })

export type CreateSongType = z.infer<typeof CreateSongSchema>
export type UpdateSongType = z.infer<typeof UpdateSongSchema>
export type SongInputType = z.infer<typeof SongInputSchema>
export type GetByFollowersType = z.infer<typeof GetByFollowersSchema>
