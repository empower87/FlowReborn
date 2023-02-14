import { Types } from "mongoose";
import z from "zod";
export declare const UserSchemaFromClient: z.ZodObject<{
    _id: z.ZodString;
    email: z.ZodString;
    google: z.ZodOptional<z.ZodObject<{
        googleId: z.ZodString;
        userPhoto: z.ZodString;
        given_name: z.ZodString;
        family_name: z.ZodString;
        userSignUpDate: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        googleId: string;
        userPhoto: string;
        userSignUpDate: string;
        given_name: string;
        family_name: string;
    }, {
        googleId: string;
        userPhoto: string;
        userSignUpDate: string;
        given_name: string;
        family_name: string;
    }>>;
    picture: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    about: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    socials: z.ZodOptional<z.ZodObject<{
        twitter: z.ZodOptional<z.ZodString>;
        instagram: z.ZodOptional<z.ZodString>;
        soundCloud: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        twitter?: string | undefined;
        instagram?: string | undefined;
        soundCloud?: string | undefined;
    }, {
        twitter?: string | undefined;
        instagram?: string | undefined;
        soundCloud?: string | undefined;
    }>>;
    followers: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    following: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    createdOn: z.ZodOptional<z.ZodString>;
    updatedOn: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    google?: {
        googleId: string;
        userPhoto: string;
        userSignUpDate: string;
        given_name: string;
        family_name: string;
    } | undefined;
    picture?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    about?: string | undefined;
    location?: string | undefined;
    socials?: {
        twitter?: string | undefined;
        instagram?: string | undefined;
        soundCloud?: string | undefined;
    } | undefined;
    createdOn?: string | undefined;
    updatedOn?: string | undefined;
    _id: string;
    email: string;
    followers: string[];
    following: string[];
}, {
    google?: {
        googleId: string;
        userPhoto: string;
        userSignUpDate: string;
        given_name: string;
        family_name: string;
    } | undefined;
    picture?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    about?: string | undefined;
    location?: string | undefined;
    socials?: {
        twitter?: string | undefined;
        instagram?: string | undefined;
        soundCloud?: string | undefined;
    } | undefined;
    followers?: string[] | undefined;
    following?: string[] | undefined;
    createdOn?: string | undefined;
    updatedOn?: string | undefined;
    _id: string;
    email: string;
}>;
export declare const UserSchema: z.ZodObject<{
    _id: z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>;
    username: z.ZodString;
    email: z.ZodString;
    google: z.ZodOptional<z.ZodObject<{
        googleId: z.ZodString;
        userPhoto: z.ZodString;
        userSignUpDate: z.ZodDate;
        given_name: z.ZodString;
        family_name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        googleId: string;
        userPhoto: string;
        userSignUpDate: Date;
        given_name: string;
        family_name: string;
    }, {
        googleId: string;
        userPhoto: string;
        userSignUpDate: Date;
        given_name: string;
        family_name: string;
    }>>;
    picture: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    about: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    socials: z.ZodOptional<z.ZodObject<{
        twitter: z.ZodOptional<z.ZodString>;
        instagram: z.ZodOptional<z.ZodString>;
        soundCloud: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        twitter?: string | undefined;
        instagram?: string | undefined;
        soundCloud?: string | undefined;
    }, {
        twitter?: string | undefined;
        instagram?: string | undefined;
        soundCloud?: string | undefined;
    }>>;
    followers: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    following: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    createdOn: z.ZodOptional<z.ZodString>;
    updatedOn: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    google?: {
        googleId: string;
        userPhoto: string;
        userSignUpDate: Date;
        given_name: string;
        family_name: string;
    } | undefined;
    picture?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    about?: string | undefined;
    location?: string | undefined;
    socials?: {
        twitter?: string | undefined;
        instagram?: string | undefined;
        soundCloud?: string | undefined;
    } | undefined;
    createdOn?: string | undefined;
    updatedOn?: string | undefined;
    _id: Types.ObjectId;
    email: string;
    followers: string[];
    following: string[];
    username: string;
}, {
    google?: {
        googleId: string;
        userPhoto: string;
        userSignUpDate: Date;
        given_name: string;
        family_name: string;
    } | undefined;
    picture?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    about?: string | undefined;
    location?: string | undefined;
    socials?: {
        twitter?: string | undefined;
        instagram?: string | undefined;
        soundCloud?: string | undefined;
    } | undefined;
    followers?: string[] | undefined;
    following?: string[] | undefined;
    createdOn?: string | undefined;
    updatedOn?: string | undefined;
    _id: Types.ObjectId;
    email: string;
    username: string;
}>;
export declare const UserInputSchema: z.ZodObject<{
    _id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    _id: string;
}, {
    _id: string;
}>;
export declare const UpdateUserInputSchema: z.ZodObject<{
    picture: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    about: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    socials: z.ZodOptional<z.ZodObject<{
        twitter: z.ZodOptional<z.ZodString>;
        instagram: z.ZodOptional<z.ZodString>;
        soundCloud: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        twitter?: string | undefined;
        instagram?: string | undefined;
        soundCloud?: string | undefined;
    }, {
        twitter?: string | undefined;
        instagram?: string | undefined;
        soundCloud?: string | undefined;
    }>>;
    createdOn: z.ZodOptional<z.ZodString>;
    updatedOn: z.ZodOptional<z.ZodString>;
    username: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    picture?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    about?: string | undefined;
    location?: string | undefined;
    socials?: {
        twitter?: string | undefined;
        instagram?: string | undefined;
        soundCloud?: string | undefined;
    } | undefined;
    createdOn?: string | undefined;
    updatedOn?: string | undefined;
    username?: string | undefined;
}, {
    email?: string | undefined;
    picture?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    about?: string | undefined;
    location?: string | undefined;
    socials?: {
        twitter?: string | undefined;
        instagram?: string | undefined;
        soundCloud?: string | undefined;
    } | undefined;
    createdOn?: string | undefined;
    updatedOn?: string | undefined;
    username?: string | undefined;
}>;
export type UserInputType = z.infer<typeof UserInputSchema>;
export type UpdateUserInputType = z.infer<typeof UpdateUserInputSchema>;
