"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByFollowersSchema = exports.SongInputSchema = exports.UpdateSongSchema = exports.CreateSongSchema = exports.SongSchemaPopulatedUser = exports.SongSchemaPopulatedUserAndComments = exports.SongSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = __importDefault(require("zod"));
const comments_schema_1 = require("./comments.schema");
const user_schema_1 = require("./user.schema");
exports.SongSchema = zod_1.default.object({
    _id: zod_1.default.instanceof(mongoose_1.Types.ObjectId),
    // _id: z.string(),
    title: zod_1.default.string(),
    caption: zod_1.default.string().optional(),
    lyrics: zod_1.default.array(zod_1.default.string().array()).default([]),
    duration: zod_1.default.number(),
    audio: zod_1.default.string(),
    thumbnail: zod_1.default.string().optional(),
    video: zod_1.default.string().optional(),
    user: zod_1.default.instanceof(mongoose_1.Types.ObjectId),
    comments: zod_1.default.array(zod_1.default.instanceof(mongoose_1.Types.ObjectId)).default([]),
    likes: zod_1.default.string().array().default([]),
    createdOn: zod_1.default.date(),
    updatedOn: zod_1.default.date(),
});
exports.SongSchemaPopulatedUserAndComments = exports.SongSchema.omit({ user: true, comments: true }).extend({
    user: user_schema_1.UserSchema,
    comments: zod_1.default.array(comments_schema_1.CommentSchemaPopulatedUser),
});
exports.SongSchemaPopulatedUser = exports.SongSchema.omit({ user: true }).extend({ user: user_schema_1.UserSchema });
exports.CreateSongSchema = exports.SongSchema.omit({
    _id: true,
    user: true,
    likes: true,
    comments: true,
    createdOn: true,
    updatedOn: true,
}).extend({
    user: zod_1.default.string(),
});
const UpdateSongSchemaPick = exports.SongSchema.pick({ title: true, caption: true });
exports.UpdateSongSchema = UpdateSongSchemaPick.extend({
    _id: zod_1.default.string(),
});
// export const SongInputSchema = SongSchema.pick({ _id: true })
exports.SongInputSchema = zod_1.default.object({ _id: zod_1.default.string() });
exports.GetByFollowersSchema = user_schema_1.UserSchema.pick({ followers: true });
