import * as trpc from "@trpc/server"
import * as trpcExpress from "@trpc/server/adapters/express"
import { User } from "../../models/index.js"
import { CtxUserToken, verifyJwt } from "../jwt.js"

export const createContext = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  async function getUserFromHeader() {
    const token = req.headers.authorization?.split(" ")[1]
    const notAuthenticated = {
      req,
      res,
      user: null,
    }
    if (!token) return notAuthenticated

    console.log(token, typeof token, "did we get here?")
    const decoded = verifyJwt<CtxUserToken>(token, "accessTokenPrivateKey")
    console.log(decoded, "omfg what is going")
    if (!decoded) return notAuthenticated

    const user = await User.findOne({ username: decoded.username })
    if (!user) return notAuthenticated

    return {
      req,
      res,
      user: { username: user.username },
    }
  }
  const user = await getUserFromHeader()
  return user
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>

export type ContextWithInput<T> = {
  ctx: Context
  input: T
}

// export const verifyToken = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
//   const token = req.headers["authorization" || "Authorization"]?.split(" ")[1]
//   console.log(token, "is this ok???")
//   const notAuthenticated = {
//     req,
//     res,
//     user: null,
//   }
//   if (!token) return notAuthenticated

//   console.log(token, typeof token, "did we get here?")
//   const decoded = verifyJwt<CtxUserToken>(token, "accessTokenPrivateKey")
//   console.log(decoded, "omfg what is going")
//   if (!decoded) return notAuthenticated

//   const user = await User.findOne({ username: decoded.username })
//   if (!user) return notAuthenticated

//   return {
//     req,
//     res,
//     user: { username: user.username },
//   }
// }
