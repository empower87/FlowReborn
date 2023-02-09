"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCommentByIdSchema = exports.EditCommentSchema = exports.DeleteCommentSchema = exports.CreateCommentSchema = exports.CommentSchemaPopulatedUserAndReplies = exports.CommentSchemaPopulatedUser = exports.CommentSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = __importDefault(require("zod"));
const user_schema_1 = require("./user.schema");
exports.CommentSchema = zod_1.default.object({
    // _id: z.string(),
    _id: zod_1.default.instanceof(mongoose_1.Types.ObjectId),
    parent: zod_1.default.string(),
    text: zod_1.default.string(),
    user: zod_1.default.instanceof(mongoose_1.Types.ObjectId),
    replies: zod_1.default.array(zod_1.default.instanceof(mongoose_1.Types.ObjectId)).default([]),
    likes: zod_1.default.string().array().default([]),
    createdOn: zod_1.default.date(),
    updatedOn: zod_1.default.date().optional(),
    editedOn: zod_1.default.date().optional(),
});
exports.CommentSchemaPopulatedUser = exports.CommentSchema.omit({ user: true }).extend({ user: user_schema_1.UserSchema });
exports.CommentSchemaPopulatedUserAndReplies = exports.CommentSchema.omit({ user: true, replies: true }).extend({
    user: user_schema_1.UserSchema,
    replies: zod_1.default.array(exports.CommentSchemaPopulatedUser).default([]),
});
exports.CreateCommentSchema = exports.CommentSchema.omit({
    _id: true,
    likes: true,
    replies: true,
    createdOn: true,
    updatedOn: true,
    editedOn: true,
    user: true,
}).extend({
    user: zod_1.default.string(),
    songId: zod_1.default.string(),
});
exports.DeleteCommentSchema = zod_1.default.object({
    _id: zod_1.default.string(),
    parent: zod_1.default.string(),
    songId: zod_1.default.string(),
});
exports.EditCommentSchema = zod_1.default.object({ _id: zod_1.default.string(), text: zod_1.default.string(), songId: zod_1.default.string() });
exports.GetCommentByIdSchema = zod_1.default.object({ _id: zod_1.default.string() });
