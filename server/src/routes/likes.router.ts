import {
  likeCommentHandler,
  likeSongHandler,
  unlikeCommentHandler,
  unlikeSongHandler,
} from "../controllers/likes.controllers"
import { LikeSchema } from "../schema/likes.schema"
import { createRouter, TRPCError } from "../utils/trpc"

export const likesRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.user) {
      throw TRPCError("UNAUTHORIZED", "you must be logged in to access this resource")
    }
    return next()
  })
  .mutation("like-song", {
    input: LikeSchema,
    resolve: async ({ ctx, input }) => likeSongHandler({ ctx, input }),
  })
  .mutation("unlike-song", {
    input: LikeSchema,
    resolve: async ({ ctx, input }) => unlikeSongHandler({ ctx, input }),
  })
  .mutation("like-comment", {
    input: LikeSchema,
    resolve: async ({ ctx, input }) => likeCommentHandler({ ctx, input }),
  })
  .mutation("unlike-comment", {
    input: LikeSchema,
    resolve: async ({ ctx, input }) => unlikeCommentHandler({ ctx, input }),
  })

export type LikesRouter = typeof likesRouter
