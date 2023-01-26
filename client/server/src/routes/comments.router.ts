import {
  createCommentHandler,
  deleteCommentHandler,
  editCommentHandler,
  getComment,
} from "../controllers/comments.controllers"
import {
  CreateCommentSchema,
  DeleteCommentSchema,
  EditCommentSchema,
  GetCommentByIdSchema,
} from "../schema/comments.schema"
import { createRouter, TRPCError } from "../utils/trpc"

export const commentsRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.user) {
      throw TRPCError("UNAUTHORIZED", "you must be logged in to access this resource")
    }
    return next()
  })
  .query("get-comment", {
    input: GetCommentByIdSchema,
    resolve: async ({ ctx, input }) => getComment({ ctx, input }),
  })
  .mutation("create", {
    input: CreateCommentSchema,
    resolve: async ({ ctx, input }) => createCommentHandler({ ctx, input }),
  })
  .mutation("edit", {
    input: EditCommentSchema,
    resolve: async ({ ctx, input }) => await editCommentHandler({ ctx, input }),
  })
  .mutation("delete", {
    input: DeleteCommentSchema,
    resolve: async ({ ctx, input }) => deleteCommentHandler({ ctx, input }),
  })

export type CommentsRouter = typeof commentsRouter
