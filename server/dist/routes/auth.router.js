"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const zod_1 = __importDefault(require("zod"));
const auth_controllers_1 = require("../controllers/auth.controllers");
const auth_schema_1 = require("../schema/auth.schema");
const trpc_1 = require("../utils/trpc");
const GoogleUser = zod_1.default.object({
    googleId: zod_1.default.string(),
    userPhoto: zod_1.default.string(),
    userSignUpDate: zod_1.default.date(),
    given_name: zod_1.default.string(),
    family_name: zod_1.default.string(),
});
const OutputSchema = zod_1.default.object({
    socials: zod_1.default
        .object({
        twitter: zod_1.default.string().optional(),
        instagram: zod_1.default.string().optional(),
        soundCloud: zod_1.default.string().optional(),
    })
        .optional(),
    _id: zod_1.default.string(),
    email: zod_1.default.string().email(),
    username: zod_1.default.string(),
    followers: zod_1.default.array(zod_1.default.string()).default([]),
    following: zod_1.default.array(zod_1.default.string()).default([]),
    createdOn: zod_1.default.date().optional(),
    updatedOn: zod_1.default.date().optional(),
    __v: zod_1.default.number().optional(),
    about: zod_1.default.string().optional(),
    firstName: zod_1.default.string().optional(),
    lastName: zod_1.default.string().optional(),
    location: zod_1.default.string().optional(),
    picture: zod_1.default.string().optional(),
    google: GoogleUser.optional(),
});
exports.authRouter = (0, trpc_1.router)({
    register: trpc_1.publicProcedure.input(auth_schema_1.RegisterSchema).mutation(({ input }) => (0, auth_controllers_1.registerHandler)({ input })),
    login: trpc_1.publicProcedure
        .input(auth_schema_1.LoginSchema)
        // .output(z.object({ token: z.string(), user: UserSchema }))
        .mutation(({ ctx, input }) => (0, auth_controllers_1.loginHandler)({ ctx, input })),
    refresh: trpc_1.publicProcedure.query(({ ctx }) => (0, auth_controllers_1.refreshHandler)({ ctx })),
});
