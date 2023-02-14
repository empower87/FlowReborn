import { FollowInputType } from "../schema/follows.schema.js";
import { ContextWithInput } from "../utils/trpc/index.js";
export declare const followHandler: ({ ctx, input }: ContextWithInput<FollowInputType>) => Promise<any>;
export declare const unfollowHandler: ({ ctx, input }: ContextWithInput<FollowInputType>) => Promise<any>;
