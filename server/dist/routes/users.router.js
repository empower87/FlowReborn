"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const users_controllers_1 = require("../controllers/users.controllers");
const uploadFileToAWS_1 = require("../middleware/uploadFileToAWS");
const user_schema_1 = require("../schema/user.schema");
const trpc_1 = require("../utils/trpc");
exports.userRouter = (0, trpc_1.router)({
    getMe: trpc_1.publicProcedure.query(({ ctx }) => (0, users_controllers_1.getMeHandler)({ ctx })),
    getUser: trpc_1.publicProcedure.input(user_schema_1.UserInputSchema).query(({ ctx, input }) => (0, users_controllers_1.getUserHandler)({ ctx, input })),
    uploadFile: trpc_1.publicProcedure.input(uploadFileToAWS_1.UploadInputSchema).mutation(({ ctx, input }) => (0, uploadFileToAWS_1.uploadFileToAWS)({ ctx, input })),
    updateUser: trpc_1.publicProcedure
        .input(user_schema_1.UpdateUserInputSchema)
        .mutation(({ ctx, input }) => (0, users_controllers_1.updateUserHandler)({ ctx, input })),
});
