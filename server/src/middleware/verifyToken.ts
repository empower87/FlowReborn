import * as trpcExpress from "@trpc/server/adapters/express"
import { User } from "../models/User.js"
import { CtxUserToken, verifyJwt } from "../utils/jwt.js"

export const verifyToken = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  const token = req.headers["authorization" || "Authorization"]?.split(" ")[1]
  console.log(token, "is this ok???")
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
