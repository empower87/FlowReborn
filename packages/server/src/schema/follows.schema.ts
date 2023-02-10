import z, { object, string } from "zod"

export const FollowSchema = object({
  following: string(),
  follower: string(),
})

export type FollowInputType = z.infer<typeof FollowSchema>
