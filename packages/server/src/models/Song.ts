import { HydratedDocument, model, Model, Schema } from "mongoose"
import z from "zod"
import { SongSchema as ISongSchema } from "../schema/songs.schema.js"

export type ISong = z.infer<typeof ISongSchema>

// export interface ISong {
//   _id: Types.ObjectId
//   caption?: string
//   // comments: IComment[]
//   comments: [Types.ObjectId]
//   duration: number
//   likes: string[]
//   lyrics: string[][]
//   title: string
//   audio: string
//   user: Types.ObjectId
//   thumbnail?: string
//   video?: string
//   createdOn?: Date
//   updatedOn?: Date
// }
// export interface ISongDocument extends ISong, Document {}

// interface ISongDocument extends ISong, Document {}

export interface ISongModel extends Model<ISong, {}, ISongQueryHelpers> {
  findAllSongs(): HydratedDocument<ISong, ISongQueryHelpers>
}

// type SongModelQuery = Query<ISong | ISong[], HydratedDocument<ISong>, ISongQueryHelpers> &
//   ISongQueryHelpers

interface ISongQueryHelpers {
  // populatedFind(this: SongModelQuery, value?: Value): SongModelQuery
  // popUser(this: SongModelQuery): SongModelQuery
  // popComments(this: SongModelQuery): SongModelQuery
}

type SongModelType = Model<ISong>

const SongSchema = new Schema<ISong>(
  {
    caption: String || undefined,
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment", default: [] }],
    duration: Number,
    likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    lyrics: { type: [[String]], default: [] },
    title: String,
    src: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    thumbnail: String || undefined,
    isPosted: Boolean,
    isVideo: Boolean,
  },
  {
    timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" },
  }
)

SongSchema.statics.findAllSongs = function () {
  return this.find()
}

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
