import z from "zod"
import { UserSchema } from "./user.schema"

export const CommentSchema = z.object({
  _id: z.string(),
  parent: z.string(),
  text: z.string().min(1, "comment must be at least 1 character"),
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
}).extend({
  songId: z.string(),
})

export const DeleteCommentSchema = CommentSchema.pick({
  _id: true,
  parent: true,
}).extend({
  songId: z.string(),
})

export const EditCommentSchema = CommentSchema.pick({ _id: true, text: true }).extend({ songId: z.string() })
export const GetCommentByIdSchema = CommentSchema.pick({ _id: true })

export type CreateCommentType = z.infer<typeof CreateCommentSchema>
export type EditCommentType = z.infer<typeof EditCommentSchema>
export type DeleteCommentType = z.infer<typeof DeleteCommentSchema>
export type GetCommentByIdType = z.infer<typeof GetCommentByIdSchema>
