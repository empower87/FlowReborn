import { followHandler, unfollowHandler } from "../controllers/follows.controllers.js";
import { FollowSchema } from "../schema/follows.schema.js";
import { publicProcedure, router } from "../utils/trpc/index.js";
export const followsRouter = router({
    follow: publicProcedure.input(FollowSchema).mutation(async ({ ctx, input }) => await followHandler({ ctx, input })),
    unfollow: publicProcedure
        .input(FollowSchema)
        .mutation(async ({ ctx, input }) => await unfollowHandler({ ctx, input })),
});
//# sourceMappingURL=follows.router.js.map