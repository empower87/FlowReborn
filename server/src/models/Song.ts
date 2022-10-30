import { model, Model, Schema } from "mongoose"
import { IComment } from "./Comment"
import { IUser } from "./User"

export interface ISong {
  _id: string
  caption: string
  comments: IComment[]
  duration: number
  likes: string[]
  lyrics: string[][]
  title: string
  audio: string
  user: IUser | string
  thumbnail?: string
  video?: string
  createdOn?: Date
  updatedOn?: Date
}

// type SongModelQuery = Query<ISong | ISong[], HydratedDocument<ISong>, ISongQueryHelpers> &
//   ISongQueryHelpers

// interface ISongQueryHelpers {
//   // populatedFind(this: SongModelQuery, value?: Value): SongModelQuery
//   popUser(this: SongModelQuery): SongModelQuery
//   popComments(this: SongModelQuery): SongModelQuery
// }

type SongModelType = Model<ISong>

const SongSchema = new Schema<ISong>(
  {
    caption: String,
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment", default: [] }],
    duration: Number,
    likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    lyrics: { type: [[String]], default: [] },
    title: String,
    audio: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    video: String,
    thumbnail: String,
  },
  {
    timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" },
  }
)

// SongSchema.query.populatedFind = function (value?: Value): SongModelQuery {
//   this.populate<{ user: IUser }>('user')
//   this.populate<{ comments: IComment[] }>({ path: 'comments', populate: 'user' })
//   if (value) return this.find(value)
//   return this.find()
// }

// SongSchema.query.popUser = function () {
//   return this.populate<{ user: IUser }>('user')
// }

// SongSchema.query.popComments = function () {
//   return this.populate<{ comments: IComment[] }>({ path: 'comments', populate: 'user' })
// }

export const Song = model<ISong, SongModelType>("Song", SongSchema)
