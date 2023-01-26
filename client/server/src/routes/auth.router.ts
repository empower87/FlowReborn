import { createRouter } from '../utils/trpc'
import { LoginSchema, RegisterSchema } from '../schema/auth.schema'
import { loginHandler, registerHandler, refreshHandler } from '../controllers/auth.controllers'

export const authRouter = createRouter()
  .mutation('register', {
    input: RegisterSchema,
    resolve: async ({ input }) => registerHandler({ input }),
  })
  .mutation('login', {
    input: LoginSchema,
    resolve: async ({ ctx, input }) => loginHandler({ ctx, input }),
  })
  .query('refresh', {
    resolve: async ({ ctx }) => refreshHandler({ ctx }),
  })

export type AuthRouter = typeof authRouter
