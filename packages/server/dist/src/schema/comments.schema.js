import { Types } from "mongoose";
import z from "zod";
import { UserSchema } from "./user.schema.js";
export const CommentSchema = z.object({
    // _id: z.string(),
    _id: z.instanceof(Types.ObjectId),
    parent: z.string(),
    text: z.string(),
    user: z.instanceof(Types.ObjectId),
    replies: z.array(z.instanceof(Types.ObjectId)).default([]),
    likes: z.string().array().default([]),
    createdOn: z.date(),
    updatedOn: z.date().optional(),
    editedOn: z.date().optional(),
});
export const CommentSchemaPopulatedUser = CommentSchema.omit({ user: true }).extend({ user: UserSchema });
export const CommentSchemaPopulatedUserAndReplies = CommentSchema.omit({ user: true, replies: true }).extend({
    user: UserSchema,
    replies: z.array(CommentSchemaPopulatedUser).default([]),
});
export const CreateCommentSchema = CommentSchema.omit({
    _id: true,
    likes: true,
    replies: true,
    createdOn: true,
    updatedOn: true,
    editedOn: true,
    user: true,
}).extend({
    user: z.string(),
    songId: z.string(),
});
export const DeleteCommentSchema = z.object({
    _id: z.string(),
    parent: z.string(),
    songId: z.string(),
});
export const EditCommentSchema = z.object({ _id: z.string(), text: z.string(), songId: z.string() });
export const GetCommentByIdSchema = z.object({ _id: z.string() });
//# sourceMappingURL=comments.schema.js.map