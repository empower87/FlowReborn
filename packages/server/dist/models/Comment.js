import { model, Schema } from "mongoose";
const ReplySchema = new Schema({
    text: String,
    commentType: { type: String, enum: ["Reply", "Comment"] },
    likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    parent: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    editedOn: Date || undefined,
});
const CommentSchema = new Schema({
    text: String,
    likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    parent: String,
    // parent: { type: Schema.Types.ObjectId, ref: "Song" || "Comment" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    replies: [{ type: Schema.Types.ObjectId, ref: "Comment", default: [] }],
    editedOn: Date || undefined,
}, { timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" } });
export const Comment = model("Comment", CommentSchema);
//# sourceMappingURL=Comment.js.map