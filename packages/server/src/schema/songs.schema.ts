import { Types } from "mongoose"
import z from "zod"
import { CommentSchemaPopulatedUser } from "./comments.schema.js"
import { UserSchema } from "./user.schema.js"

export const SongSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  // _id: z.string(),
  title: z.string(),
  caption: z.string().optional(),
  lyrics: z.array(z.string().array()).default([]),
  duration: z.number(),
  audio: z.string(),
  thumbnail: z.string().optional(),
  video: z.string().optional(),
  user: z.instanceof(Types.ObjectId),
  comments: z.array(z.instanceof(Types.ObjectId)).default([]),
  likes: z.string().array().default([]),
  createdOn: z.date(),
  updatedOn: z.date(),
})

export const SongSchemaPopulatedUserAndComments = SongSchema.omit({ user: true, comments: true }).extend({
  user: UserSchema,
  comments: z.array(CommentSchemaPopulatedUser),
})

export const SongSchemaPopulatedUser = SongSchema.omit({ user: true }).extend({ user: UserSchema })
export type SongSchemaType = z.infer<typeof SongSchema>

export const CreateSongSchema = SongSchema.omit({
  _id: true,
  user: true,
  likes: true,
  comments: true,
  createdOn: true,
  updatedOn: true,
}).extend({
  user: z.string(),
})

const UpdateSongSchemaPick = SongSchema.pick({ title: true, caption: true })
export const UpdateSongSchema = UpdateSongSchemaPick.extend({
  _id: z.string(),
})

// export const SongInputSchema = SongSchema.pick({ _id: true })
export const SongInputSchema = z.object({ _id: z.string() })
export const GetByFollowersSchema = UserSchema.pick({ followers: true })

export type CreateSongType = z.infer<typeof CreateSongSchema>
export type UpdateSongType = z.infer<typeof UpdateSongSchema>
export type SongInputType = z.infer<typeof SongInputSchema>
export type GetByFollowersType = z.infer<typeof GetByFollowersSchema>
export type SongSchemaPopulatedUserAndCommentsType = z.infer<typeof SongSchemaPopulatedUserAndComments>
export type SongSchemaPopulatedUserType = z.infer<typeof SongSchemaPopulatedUser>
