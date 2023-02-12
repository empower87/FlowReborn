import { Model } from "mongoose";
import { z } from "zod";
import { UserSchema as IUserSchema } from "../schema/user.schema.js";
export type IUser = z.infer<typeof IUserSchema>;
interface IUserDocument extends IUser {
    password: string;
}
type UserModelType = Model<IUserDocument>;
export declare const User: UserModelType;
export {};
