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
import { CreateCommentType, DeleteCommentType, EditCommentType, GetCommentByIdType } from "../schema/comments.schema.js";
import { ContextWithInput } from "../utils/trpc/index.js";
export declare const getComment: ({ ctx, input }: ContextWithInput<GetCommentByIdType>) => Promise<{
    _id: import("mongoose").Types.ObjectId;
    createdOn: Date;
    text: string;
    parent: string;
    user: {
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
    };
    replies: {
        _id: import("mongoose").Types.ObjectId;
        createdOn: Date;
        text: string;
        parent: string;
        user: {
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
        };
        replies: import("mongoose").Types.ObjectId[];
        likes: string[];
        updatedOn?: Date | undefined;
        editedOn?: Date | undefined;
    }[];
    likes: string[];
    updatedOn?: Date | undefined;
    editedOn?: Date | undefined;
}>;
export declare const getCommentPopulatedUser: ({ ctx, input }: ContextWithInput<GetCommentByIdType>) => Promise<{
    _id: import("mongoose").Types.ObjectId;
    createdOn: Date;
    text: string;
    parent: string;
    user: {
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
    };
    replies: import("mongoose").Types.ObjectId[];
    likes: string[];
    updatedOn?: Date | undefined;
    editedOn?: Date | undefined;
}>;
export declare const createCommentHandler: ({ ctx, input }: ContextWithInput<CreateCommentType>) => Promise<{
    _id: import("mongoose").Types.ObjectId;
    createdOn: Date;
    text: string;
    parent: string;
    user: {
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
    };
    replies: {
        _id: import("mongoose").Types.ObjectId;
        createdOn: Date;
        text: string;
        parent: string;
        user: {
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
        };
        replies: import("mongoose").Types.ObjectId[];
        likes: string[];
        updatedOn?: Date | undefined;
        editedOn?: Date | undefined;
    }[];
    likes: string[];
    updatedOn?: Date | undefined;
    editedOn?: Date | undefined;
}>;
export declare const editCommentHandler: ({ ctx, input }: ContextWithInput<EditCommentType>) => Promise<{
    _id: import("mongoose").Types.ObjectId;
    createdOn: Date;
    text: string;
    parent: string;
    user: {
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
    };
    replies: {
        _id: import("mongoose").Types.ObjectId;
        createdOn: Date;
        text: string;
        parent: string;
        user: {
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
        };
        replies: import("mongoose").Types.ObjectId[];
        likes: string[];
        updatedOn?: Date | undefined;
        editedOn?: Date | undefined;
    }[];
    likes: string[];
    updatedOn?: Date | undefined;
    editedOn?: Date | undefined;
}>;
export declare const deleteCommentHandler: ({ ctx, input }: ContextWithInput<DeleteCommentType>) => Promise<{
    _id: import("mongoose").Types.ObjectId;
    createdOn: Date;
    text: string;
    parent: string;
    user: {
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
    };
    replies: {
        _id: import("mongoose").Types.ObjectId;
        createdOn: Date;
        text: string;
        parent: string;
        user: {
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
        };
        replies: import("mongoose").Types.ObjectId[];
        likes: string[];
        updatedOn?: Date | undefined;
        editedOn?: Date | undefined;
    }[];
    likes: string[];
    updatedOn?: Date | undefined;
    editedOn?: Date | undefined;
}>;
