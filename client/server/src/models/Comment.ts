import { model, Model, Schema } from "mongoose"
import { ISong } from "./Song"
import { IUser } from "./User"

export interface IComment {
  _id: string
  text: string
  likes: string[]
  parent: ISong | IComment
  user: IUser
  replies: IComment[]
  createdOn: Date
  updatedOn?: Date
  editedOn?: Date
}

type CommentModelType = Model<IComment>

const CommentSchema = new Schema<IComment>(
  {
    text: String,
    likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    parent: { type: Schema.Types.ObjectId, ref: "Song" || "Comment" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    replies: [{ type: Schema.Types.ObjectId, ref: "Comment", default: [] }],
    editedOn: Date,
  },
  { timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" } }
)

export const Comment = model<IComment, CommentModelType>("Comment", CommentSchema)
