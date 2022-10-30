import z, { object, string } from 'zod'

export const LoginSchema = object({
  username: string().trim().min(5),
  password: string(),
})

export const RegisterSchema = object({
  username: string().trim().min(5),
  email: string().email(),
  password: string().min(6),
})

export type LoginInputType = z.infer<typeof LoginSchema>
export type RegisterInputType = z.infer<typeof RegisterSchema>
