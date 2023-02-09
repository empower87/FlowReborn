import z from "zod";
export const LikeSchema = z.object({
    _id: z.string(),
});
export const LikeInputSchema = z.object({ _id: z.string() });
export const LikeCommentInputSchema = LikeInputSchema.extend({ commentId: z.string() });
//# sourceMappingURL=likes.schema.js.map