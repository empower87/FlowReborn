import jwt, { SignOptions } from 'jsonwebtoken'
import customConfig from '../config/default'

export type CtxUserToken = {
  username: string
  iat: string
  exp: number
}

export function signJwt(
  object: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions = {},
) {
  const secret =
    keyName === 'accessTokenPrivateKey'
      ? customConfig.accessTokenPrivateKey
      : customConfig.refreshTokenPrivateKey

  // const signingKey = Buffer.from(secret, 'base64').toString('ascii')
  console.log(secret, 'problem is here')
  return jwt.sign(object, secret, { ...(options && options) })
}

export function verifyJwt<T>(
  token: string,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
): T | null {
  const secret =
    keyName === 'accessTokenPrivateKey'
      ? customConfig.accessTokenPrivateKey
      : customConfig.refreshTokenPrivateKey

  // const publicKey = Buffer.from(secret, 'base64').toString('ascii')

  try {
    const decoded = jwt.verify(token, secret) as T
    return decoded
  } catch (e) {
    return null
  }
}
