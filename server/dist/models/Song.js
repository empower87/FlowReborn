"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
const mongoose_1 = require("mongoose");
const SongSchema = new mongoose_1.Schema({
    caption: String || undefined,
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Comment", default: [] }],
    duration: Number,
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User", default: [] }],
    lyrics: { type: [[String]], default: [] },
    title: String,
    audio: String,
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
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
exports.Song = (0, mongoose_1.model)("Song", SongSchema);
