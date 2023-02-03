import z from "zod"
import { loginHandler, refreshHandler, registerHandler } from "../controllers/auth.controllers"
import { LoginSchema, RegisterSchema } from "../schema/auth.schema"
import { publicProcedure, router } from "../utils/trpc"

const GoogleUser = z.object({
  googleId: z.string(),
  userPhoto: z.string(),
  userSignUpDate: z.date(),
  given_name: z.string(),
  family_name: z.string(),
})

const OutputSchema = z.object({
  socials: z
    .object({
      twitter: z.string().optional(),
      instagram: z.string().optional(),
      soundCloud: z.string().optional(),
    })
    .optional(),
  _id: z.string(),
  email: z.string().email(),
  username: z.string(),
  followers: z.array(z.string()).default([]),
  following: z.array(z.string()).default([]),
  createdOn: z.date().optional(),
  updatedOn: z.date().optional(),
  __v: z.number().optional(),
  about: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  location: z.string().optional(),
  picture: z.string().optional(),
  google: GoogleUser.optional(),
})

export const authRouter = router({
  register: publicProcedure.input(RegisterSchema).mutation(({ input }) => registerHandler({ input })),
  login: publicProcedure
    .input(LoginSchema)
    // .output(z.object({ token: z.string(), user: UserSchema }))
    .mutation(({ ctx, input }) => loginHandler({ ctx, input })),
  refresh: publicProcedure.query(({ ctx }) => refreshHandler({ ctx })),
})

// export const authRouter = createRouter()
//   .mutation('register', {
//     input: RegisterSchema,
//     resolve: async ({ input }) => registerHandler({ input }),
//   })
//   .mutation('login', {
//     input: LoginSchema,
//     resolve: async ({ ctx, input }) => loginHandler({ ctx, input }),
//   })
//   .query('refresh', {
//     resolve: async ({ ctx }) => refreshHandler({ ctx }),
//   })

export type AuthRouter = typeof authRouter
