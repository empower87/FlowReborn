"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const ReplySchema = new mongoose_1.Schema({
    text: String,
    commentType: { type: String, enum: ["Reply", "Comment"] },
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User", default: [] }],
    parent: String,
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    editedOn: Date || undefined,
});
const CommentSchema = new mongoose_1.Schema({
    text: String,
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User", default: [] }],
    parent: String,
    // parent: { type: Schema.Types.ObjectId, ref: "Song" || "Comment" },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    replies: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Comment", default: [] }],
    editedOn: Date || undefined,
}, { timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" } });
exports.Comment = (0, mongoose_1.model)("Comment", CommentSchema);
