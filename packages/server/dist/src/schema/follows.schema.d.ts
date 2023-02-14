import z from "zod";
export declare const FollowSchema: z.ZodObject<{
    following: z.ZodString;
    follower: z.ZodString;
}, "strip", z.ZodTypeAny, {
    following: string;
    follower: string;
}, {
    following: string;
    follower: string;
}>;
export type FollowInputType = z.infer<typeof FollowSchema>;
