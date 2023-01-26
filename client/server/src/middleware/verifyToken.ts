import * as trpcExpress from "@trpc/server/adapters/express"
import { User } from "../models/User"
import { CtxUserToken, verifyJwt } from "../utils/jwt"
import { TRPCError } from "../utils/trpc"

export const verifyToken = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  try {
    const token = req.headers["authorization" || "Authorization"]?.split(" ")[1]
    console.log(token, "is this ok???")
    const notAuthenticated = {
      req,
      res,
      user: null,
    }
    if (!token) return notAuthenticated

    const decoded = verifyJwt<CtxUserToken>(token, "accessTokenPrivateKey")
    if (!decoded) return notAuthenticated

    const user = await User.findOne({ username: decoded.username })
    if (!user) return notAuthenticated

    return {
      req,
      res,
      user: { username: user.username },
    }
  } catch (err: any) {
    throw TRPCError("INTERNAL_SERVER_ERROR", err.message)
  }
}
