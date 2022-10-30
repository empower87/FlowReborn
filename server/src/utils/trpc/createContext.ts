import * as trpcExpress from '@trpc/server/adapters/express'
import * as trpc from '@trpc/server'
import { verifyToken } from '../../middleware/verifyToken'

export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) =>
  verifyToken({
    req,
    res,
  })
export type Context = trpc.inferAsyncReturnType<typeof createContext>

export type ContextWithInput<T> = {
  ctx: Context
  input: T
}
