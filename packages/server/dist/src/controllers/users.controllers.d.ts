/// <reference types="mongoose/types/aggregate.js" />
/// <reference types="mongoose/types/callback.js" />
/// <reference types="mongoose/types/collection.js" />
/// <reference types="mongoose/types/connection.js" />
/// <reference types="mongoose/types/cursor.js" />
/// <reference types="mongoose/types/document.js" />
/// <reference types="mongoose/types/error.js" />
/// <reference types="mongoose/types/expressions.js" />
/// <reference types="mongoose/types/helpers.js" />
/// <reference types="mongoose/types/middlewares.js" />
/// <reference types="mongoose/types/indexes.js" />
/// <reference types="mongoose/types/models.js" />
/// <reference types="mongoose/types/mongooseoptions.js" />
/// <reference types="mongoose/types/pipelinestage.js" />
/// <reference types="mongoose/types/populate.js" />
/// <reference types="mongoose/types/query.js" />
/// <reference types="mongoose/types/schemaoptions.js" />
/// <reference types="mongoose/types/schematypes.js" />
/// <reference types="mongoose/types/session.js" />
/// <reference types="mongoose/types/types.js" />
/// <reference types="mongoose/types/utility.js" />
/// <reference types="mongoose/types/validation.js" />
/// <reference types="mongoose/types/virtuals.js" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype.js" />
import { UpdateUserInputType, UserInputType } from "../schema/user.schema.js";
import { Context, ContextWithInput } from "../utils/trpc/index.js";
export declare const getMeHandler: ({ ctx }: {
    ctx: Context;
}) => Promise<{
    _id: import("mongoose").Types.ObjectId;
    email: string;
    followers: string[];
    following: string[];
    username: string;
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
}>;
export declare const getUserHandler: ({ ctx, input }: ContextWithInput<UserInputType>) => Promise<{
    _id: import("mongoose").Types.ObjectId;
    email: string;
    followers: string[];
    following: string[];
    username: string;
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
}>;
export declare const updateUserHandler: ({ ctx, input }: ContextWithInput<UpdateUserInputType>) => Promise<{
    _id: import("mongoose").Types.ObjectId;
    email: string;
    followers: string[];
    following: string[];
    username: string;
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
}>;
