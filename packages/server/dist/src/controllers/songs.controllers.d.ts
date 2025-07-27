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
import { IUser } from "../models/index.js";
import { CreateSongType, GetByFollowersType, SongInputType, SongSchemaPopulatedUserAndCommentsType, UpdateSongType } from "../schema/songs.schema.js";
import { ContextWithInput } from "../utils/trpc/index.js";
export declare const createSongHandler: ({ ctx, input }: ContextWithInput<CreateSongType>) => Promise<{
    _id: import("mongoose").Types.ObjectId;
    createdOn: Date;
    updatedOn: Date;
    user: import("mongoose").Types.ObjectId;
    likes: string[];
    title: string;
    lyrics: string[][];
    duration: number;
    src: string;
    comments: import("mongoose").Types.ObjectId[];
    caption?: string | undefined;
    thumbnail?: string | undefined;
    isPosted?: boolean | undefined;
    isVideo?: boolean | undefined;
}>;
export declare const updateSongHandler: ({ ctx, input }: ContextWithInput<UpdateSongType>) => Promise<{
    _id: import("mongoose").Types.ObjectId;
    createdOn: Date;
    updatedOn: Date;
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
    likes: string[];
    title: string;
    lyrics: string[][];
    duration: number;
    src: string;
    comments: {
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
    caption?: string | undefined;
    thumbnail?: string | undefined;
    isPosted?: boolean | undefined;
    isVideo?: boolean | undefined;
}>;
export declare const deleteSongHandler: ({ ctx, input }: ContextWithInput<SongInputType>) => Promise<(import("mongoose").Document<unknown, any, {
    _id: import("mongoose").Types.ObjectId;
    createdOn: Date;
    updatedOn: Date;
    user: import("mongoose").Types.ObjectId;
    likes: string[];
    title: string;
    lyrics: string[][];
    duration: number;
    src: string;
    comments: import("mongoose").Types.ObjectId[];
    caption?: string | undefined;
    thumbnail?: string | undefined;
    isPosted?: boolean | undefined;
    isVideo?: boolean | undefined;
}> & Omit<{
    _id: import("mongoose").Types.ObjectId;
    createdOn: Date;
    updatedOn: Date;
    user: import("mongoose").Types.ObjectId;
    likes: string[];
    title: string;
    lyrics: string[][];
    duration: number;
    src: string;
    comments: import("mongoose").Types.ObjectId[];
    caption?: string | undefined;
    thumbnail?: string | undefined;
    isPosted?: boolean | undefined;
    isVideo?: boolean | undefined;
} & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, never>) | null>;
export declare const getSongHandler: ({ input }: {
    input: SongInputType;
}) => Promise<{
    _id: import("mongoose").Types.ObjectId;
    createdOn: Date;
    updatedOn: Date;
    user: import("mongoose").Types.ObjectId;
    likes: string[];
    title: string;
    lyrics: string[][];
    duration: number;
    src: string;
    comments: import("mongoose").Types.ObjectId[];
    caption?: string | undefined;
    thumbnail?: string | undefined;
    isPosted?: boolean | undefined;
    isVideo?: boolean | undefined;
}>;
export declare const getSongWithPopulatedUserHandler: ({ ctx, input }: ContextWithInput<SongInputType>) => Promise<{
    _id: import("mongoose").Types.ObjectId;
    createdOn: Date;
    updatedOn: Date;
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
    likes: string[];
    title: string;
    lyrics: string[][];
    duration: number;
    src: string;
    comments: import("mongoose").Types.ObjectId[];
    caption?: string | undefined;
    thumbnail?: string | undefined;
    isPosted?: boolean | undefined;
    isVideo?: boolean | undefined;
}>;
export declare const getSongWithPopulatedUserAndCommentsHandler: ({ input }: {
    input: SongInputType;
}) => Promise<{
    _id: import("mongoose").Types.ObjectId;
    createdOn: Date;
    updatedOn: Date;
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
    likes: string[];
    title: string;
    lyrics: string[][];
    duration: number;
    src: string;
    comments: {
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
    caption?: string | undefined;
    thumbnail?: string | undefined;
    isPosted?: boolean | undefined;
    isVideo?: boolean | undefined;
}>;
export declare const getUsersSongsHandler: ({ ctx, input }: ContextWithInput<SongInputType>) => Promise<{
    _id: import("mongoose").Types.ObjectId;
    createdOn: Date;
    updatedOn: Date;
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
    likes: string[];
    title: string;
    lyrics: string[][];
    duration: number;
    src: string;
    comments: import("mongoose").Types.ObjectId[];
    caption?: string | undefined;
    thumbnail?: string | undefined;
    isPosted?: boolean | undefined;
    isVideo?: boolean | undefined;
}[]>;
export declare const getUsersSongsWithCommentsHandler: ({ ctx, input }: ContextWithInput<SongInputType>) => Promise<{
    _id: import("mongoose").Types.ObjectId;
    createdOn: Date;
    updatedOn: Date;
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
    likes: string[];
    title: string;
    lyrics: string[][];
    duration: number;
    src: string;
    comments: {
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
    caption?: string | undefined;
    thumbnail?: string | undefined;
    isPosted?: boolean | undefined;
    isVideo?: boolean | undefined;
}[]>;
export declare const getUsersLikedSongs: ({ ctx, input }: ContextWithInput<SongInputType>) => Promise<{
    _id: import("mongoose").Types.ObjectId;
    createdOn: Date;
    updatedOn: Date;
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
    likes: string[];
    title: string;
    lyrics: string[][];
    duration: number;
    src: string;
    comments: import("mongoose").Types.ObjectId[];
    caption?: string | undefined;
    thumbnail?: string | undefined;
    isPosted?: boolean | undefined;
    isVideo?: boolean | undefined;
}[]>;
export declare const getUsersFollowersSongs: ({ ctx, input }: ContextWithInput<GetByFollowersType>) => Promise<{
    _id: import("mongoose").Types.ObjectId;
    createdOn: Date;
    updatedOn: Date;
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
    likes: string[];
    title: string;
    lyrics: string[][];
    duration: number;
    src: string;
    comments: import("mongoose").Types.ObjectId[];
    caption?: string | undefined;
    thumbnail?: string | undefined;
    isPosted?: boolean | undefined;
    isVideo?: boolean | undefined;
}[]>;
export declare const getAllSongsHandler: () => Promise<{
    _id: import("mongoose").Types.ObjectId;
    createdOn: Date;
    updatedOn: Date;
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
    likes: string[];
    title: string;
    lyrics: string[][];
    duration: number;
    src: string;
    comments: {
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
    caption?: string | undefined;
    thumbnail?: string | undefined;
    isPosted?: boolean | undefined;
    isVideo?: boolean | undefined;
}[]>;
type SearchResults = {
    users: IUser[];
    songs: SongSchemaPopulatedUserAndCommentsType[];
};
export declare const searchHandler: ({ ctx, input }: ContextWithInput<string>) => Promise<SearchResults>;
export {};
