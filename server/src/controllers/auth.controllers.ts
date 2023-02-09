import customConfig from "../config/default.js"
import { IUser, User } from "../models/User.js"
import { LoginInputType, RegisterInputType } from "../schema/auth.schema.js"
import { hashPassword, matchPassword } from "../utils/bcrypt.js"
import { CtxUserToken, signJwt, verifyJwt } from "../utils/jwt.js"
import { Context, ContextWithInput, TRPCError } from "../utils/trpc/index.js"

export const registerHandler = async ({ input }: { input: RegisterInputType }) => {
  const { email, username, password } = input
  const lowercaseUsername = username.toLowerCase()
  const lowercaseEmail = email.toLowerCase()

  const takenUsername = await User.findOne({ username: lowercaseUsername })
  if (takenUsername) throw TRPCError("BAD_REQUEST", "username has already been taken")

  const hashedPassword = await hashPassword(password)
  if (!hashedPassword) throw TRPCError("INTERNAL_SERVER_ERROR", "password failed to encrypt")

  const newUser = await User.create({
    username: lowercaseUsername,
    email: lowercaseEmail,
    password: hashedPassword,
  })

  return { username: lowercaseUsername, password: password }
}

interface IUserWithPassword extends IUser {
  password: string
}
export const loginHandler = async ({ ctx, input }: ContextWithInput<LoginInputType>) => {
  const { username, password } = input
  const lowercaseUsername = username.toLowerCase()

  const dbUser: IUserWithPassword | null = await User.findOne({ username: lowercaseUsername }).select("+password")
  if (!dbUser) throw TRPCError("NOT_FOUND", `username of: ${username} does not exist`)

  const isMatch = await matchPassword(password, dbUser.password)
  if (!isMatch) throw TRPCError("BAD_REQUEST", "invalid password")

  const payload = { username: dbUser.username }

  const accessToken = signJwt({ ...payload }, "accessTokenPrivateKey", {
    expiresIn: `${customConfig.accessTokenExpiresIn}m`,
  })

  const refreshToken = signJwt({ ...payload }, "refreshTokenPrivateKey", {
    expiresIn: `${customConfig.refreshTokenExpiresIn}m`,
  })

  ctx.res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  })
  const returnUser: IUser | null = await User.findById(dbUser._id).select("-password")
  if (!returnUser) throw TRPCError("NOT_FOUND", "user not found..")
  console.log(returnUser, "OMG WE GOT HERE???")
  return { token: accessToken, user: returnUser }
}

export const refreshHandler = async ({ ctx }: { ctx: Context }) => {
  try {
    const cookies = ctx.req.cookies.jwt as string
    if (!cookies) throw TRPCError("UNAUTHORIZED", "refresh expired token")
    const refreshToken = cookies

    const decoded = verifyJwt<CtxUserToken>(refreshToken, "refreshTokenPrivateKey")
    if (!decoded) throw TRPCError("UNAUTHORIZED", "refresh expired token")

    const user: IUser | null = await User.findOne({ username: decoded.username })
    if (!user) throw TRPCError("INTERNAL_SERVER_ERROR", "user not found")

    const accessToken = signJwt({ username: user.username }, "accessTokenPrivateKey", {
      expiresIn: `${customConfig.accessTokenExpiresIn}m`,
    })

    console.log(cookies, decoded, user, accessToken, "HAHAHAH ???")
    return accessToken
  } catch (err: any) {
    throw err
  }
}

// export const googleLoginHandler = async () => {
//   const tokenId: string | undefined = req.header('X-Google-Token')
//   console.log(tokenId, 'google token')

//   if (tokenId != null) {
//     res.json({ success: false, message: 'missing Google token' })
//   }

//   const googleResponse = await axios.get(
//     `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${encodeURI(tokenId!)}`,
//   )
//   const { email, email_verified, picture, given_name, family_name, error_description } =
//     googleResponse.data

//   if (!email || error_description) {
//     res.json({
//       success: false,
//       error: error_description,
//       message: 'error awaiting response from Google',
//     })
//   } else if (!email_verified) {
//     res.json({ success: false, message: 'email not verified with Google' })
//   }

//   const emailToUserName = (email: string) => {
//     const allCharsBeforeAt = /^.*?(?=\@)/gm
//     const validChars = /[a-zA-Z0-9]/gm
//     let splitEmail: Array<string> | null = email.match(allCharsBeforeAt)
//     if (splitEmail != null) {
//       let username = splitEmail[0]!.match(validChars)!.join('')
//       return username
//     }
//   }

//   const userData = {
//     email,
//     password: `thisisnotvalid`,
//     username: emailToUserName(email),
//     email_verified,
//     picture,
//     given_name,
//     family_name,
//     error_description,
//     googleId: req.body.googleId,
//   }

//   let user = await User.findOne({ email })
//   if (!user) {
//     user = await User.create(userData)
//   }
//   console.log(user, 'what could go wrong herre??')
//   const payload = {
//     _id: user._id,
//     username: user.username,
//   }
//   const secret = process.env.JWT_SECRET
//   if (!secret) return
//   jwt.sign(payload, secret, { expiresIn: 86400 }, (err: any, token: any) => {
//     if (err) return res.json({ success: false, error: err, message: "couldn't verify token" })
//     else {
//       return res.json({
//         success: true,
//         message: 'Success',
//         token: token,
//       })
//     }
//   })
// }
