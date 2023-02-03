import {
  createCommentHandler,
  deleteCommentHandler,
  editCommentHandler,
  getComment,
  getCommentPopulatedUser,
} from "../controllers/comments.controllers"
import {
  CreateCommentSchema,
  DeleteCommentSchema,
  EditCommentSchema,
  GetCommentByIdSchema,
} from "../schema/comments.schema"
import { protectedProcedure, router } from "../utils/trpc"

export const commentsRouter = router({
  getComment: protectedProcedure
    .input(GetCommentByIdSchema)
    // .output(CommentSchemaPopulatedUserAndReplies)
    .query(({ ctx, input }) => getComment({ ctx, input })),
  getCommentPopulatedUser: protectedProcedure
    .input(GetCommentByIdSchema)
    // .output(CommentSchemaPopulatedUser)
    .query(({ ctx, input }) => getCommentPopulatedUser({ ctx, input })),
  createComment: protectedProcedure
    .input(CreateCommentSchema)
    // .output(CommentSchemaPopulatedUserAndReplies)
    .mutation(({ ctx, input }) => createCommentHandler({ ctx, input })),
  editComment: protectedProcedure
    .input(EditCommentSchema)
    // .output(CommentSchemaPopulatedUserAndReplies)
    .mutation(({ ctx, input }) => editCommentHandler({ ctx, input })),
  deleteComment: protectedProcedure
    .input(DeleteCommentSchema)
    // .output(CommentSchemaPopulatedUserAndReplies)
    .mutation(({ ctx, input }) => deleteCommentHandler({ ctx, input })),
})

// export const commentsRouter = createRouter()
//   .middleware(async ({ ctx, next }) => {
//     if (!ctx.user) {
//       throw TRPCError("UNAUTHORIZED", "you must be logged in to access this resource")
//     }
//     return next()
//   })
//   .query("get-comment", {
//     input: GetCommentByIdSchema,
//     resolve: async ({ ctx, input }) => getComment({ ctx, input }),
//   })
//   .mutation("create", {
//     input: CreateCommentSchema,
//     resolve: async ({ ctx, input }) => createCommentHandler({ ctx, input }),
//   })
//   .mutation("edit", {
//     input: EditCommentSchema,
//     resolve: async ({ ctx, input }) => await editCommentHandler({ ctx, input }),
//   })
//   .mutation("delete", {
//     input: DeleteCommentSchema,
//     resolve: async ({ ctx, input }) => deleteCommentHandler({ ctx, input }),
//   })

export type CommentsRouter = typeof commentsRouter
