import { getMeHandler, getUserHandler, updateUserHandler } from "../controllers/users.controllers.js"
import { uploadFileToAWS, UploadInputSchema } from "../middleware/uploadFileToAWS.js"
import { UpdateUserInputSchema, UserInputSchema } from "../schema/user.schema.js"
import { publicProcedure, router } from "../utils/trpc/index.js"

export const userRouter = router({
  getMe: publicProcedure.query(({ ctx }) => getMeHandler({ ctx })),
  getUser: publicProcedure.input(UserInputSchema).query(({ ctx, input }) => getUserHandler({ ctx, input })),
  uploadFile: publicProcedure.input(UploadInputSchema).mutation(({ ctx, input }) => uploadFileToAWS({ ctx, input })),
  updateUser: publicProcedure
    .input(UpdateUserInputSchema)
    .mutation(({ ctx, input }) => updateUserHandler({ ctx, input })),
})

// export const userRouter = createRouter()
//   .middleware(async ({ ctx, next }) => {
//     if (!ctx.user) {
//       throw TRPCError("UNAUTHORIZED", "you must be logged in to access this resource")
//     }
//     return next()
//   })
//   .query("get-me", {
//     resolve: async ({ ctx }) => getMeHandler({ ctx }),
//   })
//   .query("get-user", {
//     input: UserInputSchema,
//     resolve: async ({ ctx, input }) => getUserHandler({ ctx, input }),
//   })
//   .mutation("upload-file", {
//     input: UploadInputSchema,
//     resolve: async ({ ctx, input }) => uploadFileToAWS({ ctx, input }),
//   })
//   .mutation("update-user", {
//     input: UpdateUserInputSchema,
//     resolve: async ({ ctx, input }) => await updateUserHandler({ ctx, input }),
//   })

export type UserRouter = typeof userRouter
