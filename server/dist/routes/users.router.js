import { getMeHandler, getUserHandler, updateUserHandler } from "../controllers/users.controllers.js";
import { uploadFileToAWS, UploadInputSchema } from "../middleware/uploadFileToAWS.js";
import { UpdateUserInputSchema, UserInputSchema } from "../schema/user.schema.js";
import { publicProcedure, router } from "../utils/trpc/index.js";
export const userRouter = router({
    getMe: publicProcedure.query(({ ctx }) => getMeHandler({ ctx })),
    getUser: publicProcedure.input(UserInputSchema).query(({ ctx, input }) => getUserHandler({ ctx, input })),
    uploadFile: publicProcedure.input(UploadInputSchema).mutation(({ ctx, input }) => uploadFileToAWS({ ctx, input })),
    updateUser: publicProcedure
        .input(UpdateUserInputSchema)
        .mutation(({ ctx, input }) => updateUserHandler({ ctx, input })),
});
//# sourceMappingURL=users.router.js.map