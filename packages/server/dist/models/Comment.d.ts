import { Model } from "mongoose";
import { z } from "zod";
import { CommentSchema as ICommentSchema } from "../schema/comments.schema.js";
export type IComment = z.infer<typeof ICommentSchema>;
type CommentModelType = Model<IComment>;
export declare const Comment: CommentModelType;
export {};
