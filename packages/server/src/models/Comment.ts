import { model, Model, Schema } from "mongoose"
import { z } from "zod"
import { CommentSchema as ICommentSchema } from "../schema/comments.schema.js"

export type IComment = z.infer<typeof ICommentSchema>
// export interface IComment {
//   _id: Types.ObjectId
//   text: string
//   likes: string[]
//   parent: string
//   user: PopulatedDoc<Document<Types.ObjectId> & IUser>
//   replies: HydratedDocument<IComment[]>["_id"]
//   createdOn: Date
//   updatedOn?: Date
//   editedOn?: Date
// }

type CommentModelType = Model<IComment>

const ReplySchema = new Schema({
  text: String,
  commentType: { type: String, enum: ["Reply", "Comment"] },
  likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  parent: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  editedOn: Date || undefined,
})
const CommentSchema = new Schema<IComment>(
  {
    text: String,
    likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    parent: String,
    // parent: { type: Schema.Types.ObjectId, ref: "Song" || "Comment" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    replies: [{ type: Schema.Types.ObjectId, ref: "Comment", default: [] }],
    editedOn: Date || undefined,
  },
  { timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" } }
)

export const Comment = model<IComment, CommentModelType>("Comment", CommentSchema)
