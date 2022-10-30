import z from "zod"

export const RegisterInputClientSchema = z.object({
  email: z.string().email(),
  username: z.string().min(5),
  password: z
    .string()
    .min(6)
    .refine((val) => val.length > 0, { message: "Password is required" })
    .refine((val) => val.length >= 6 && val.length > 0, { message: "Password must be at least 6 characters" }),
})

export const LoginInputClientSchema = RegisterInputClientSchema.omit({
  email: true,
})

export type RegisterInputClientType = z.infer<typeof RegisterInputClientSchema>
export type LoginInputClientType = z.infer<typeof LoginInputClientSchema>
