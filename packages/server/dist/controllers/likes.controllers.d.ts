import { LikeInputType } from "../schema/likes.schema.js";
import { ContextWithInput } from "../utils/trpc/index.js";
export declare const likeSongHandler: ({ ctx, input }: ContextWithInput<LikeInputType>) => Promise<any>;
export declare const unlikeSongHandler: ({ ctx, input }: ContextWithInput<LikeInputType>) => Promise<any>;
export declare const likeCommentHandler: ({ ctx, input }: ContextWithInput<LikeInputType>) => Promise<any>;
export declare const unlikeCommentHandler: ({ ctx, input }: ContextWithInput<LikeInputType>) => Promise<any>;
