import z from "zod";
export declare const LikeSchema: z.ZodObject<{
    _id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    _id: string;
}, {
    _id: string;
}>;
export declare const LikeInputSchema: z.ZodObject<{
    _id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    _id: string;
}, {
    _id: string;
}>;
export declare const LikeCommentInputSchema: z.ZodObject<{
    _id: z.ZodString;
    commentId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    _id: string;
    commentId: string;
}, {
    _id: string;
    commentId: string;
}>;
export type LikeInputType = z.infer<typeof LikeInputSchema>;
export type LikeCommentInputType = z.infer<typeof LikeCommentInputSchema>;
