import z from "zod"
import { UserSchema } from "./user.schema"

export const CommentSchema = z.object({
  _id: z.string(),
  parent: z.string(),
  text: z.string(),
  user: UserSchema,
  replies: z.string().array(),
  likes: z.string().array(),
  createdOn: z.date().optional(),
  updatedOn: z.date().optional(),
})

export const CreateCommentSchema = CommentSchema.omit({
  _id: true,
  likes: true,
  replies: true,
  createdOn: true,
  updatedOn: true,
})

export const DeleteCommentSchema = z.object({
  _id: z.string(),
  parent: z.string(),
  songId: z.string(),
})

export const EditCommentSchema = CommentSchema.pick({ _id: true, text: true })
// export const DeleteCommentSchema = CommentSchema.pick({ _id: true, parent: true, songId: z.string() })
export const GetCommentByIdSchema = CommentSchema.pick({ _id: true })

export type CreateCommentType = z.infer<typeof CreateCommentSchema>
export type EditCommentType = z.infer<typeof EditCommentSchema>
export type DeleteCommentType = z.infer<typeof DeleteCommentSchema>
export type GetCommentByIdType = z.infer<typeof GetCommentByIdSchema>
