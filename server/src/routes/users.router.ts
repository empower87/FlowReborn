import { getMeHandler, getUserHandler, updateUserHandler } from "../controllers/users.controllers"
import { uploadFileToAWS, UploadInputSchema } from "../middleware/uploadFileToAWS"
import { UpdateUserInputSchema, UserInputSchema } from "../schema/user.schema"
import { createRouter, TRPCError } from "../utils/trpc"

export const userRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.user) {
      throw TRPCError("UNAUTHORIZED", "you must be logged in to access this resource")
    }
    return next()
  })
  .query("get-me", {
    resolve: async ({ ctx }) => getMeHandler({ ctx }),
  })
  .query("get-user", {
    input: UserInputSchema,
    resolve: async ({ ctx, input }) => getUserHandler({ ctx, input }),
  })
  .mutation("upload-file", {
    input: UploadInputSchema,
    resolve: async ({ ctx, input }) => uploadFileToAWS({ ctx, input }),
  })
  .mutation("update-user", {
    input: UpdateUserInputSchema,
    resolve: async ({ ctx, input }) => await updateUserHandler({ ctx, input }),
  })

export type UserRouter = typeof userRouter
