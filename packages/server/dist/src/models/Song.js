import { model, Schema } from "mongoose";
const SongSchema = new Schema({
    caption: String || undefined,
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment", default: [] }],
    duration: Number,
    likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    lyrics: { type: [[String]], default: [] },
    title: String,
    audio: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    thumbnail: String || undefined,
    video: String || undefined,
}, {
    timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" },
});
SongSchema.statics.findAllSongs = function () {
    return this.find();
};
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
export const Song = model("Song", SongSchema);
//# sourceMappingURL=Song.js.map