import { object, string } from "zod";
export const FollowSchema = object({
    following: string(),
    follower: string(),
});
//# sourceMappingURL=follows.schema.js.map