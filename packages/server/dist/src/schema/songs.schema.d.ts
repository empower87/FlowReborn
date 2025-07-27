import { Types } from "mongoose";
import z from "zod";
export declare const SongSchema: z.ZodObject<{
    _id: z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>;
    title: z.ZodString;
    caption: z.ZodOptional<z.ZodString>;
    lyrics: z.ZodDefault<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
    duration: z.ZodNumber;
    src: z.ZodString;
    thumbnail: z.ZodOptional<z.ZodString>;
    isPosted: z.ZodOptional<z.ZodBoolean>;
    isVideo: z.ZodOptional<z.ZodBoolean>;
    user: z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>;
    comments: z.ZodDefault<z.ZodArray<z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>, "many">>;
    likes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    createdOn: z.ZodDate;
    updatedOn: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    _id: Types.ObjectId;
    createdOn: Date;
    updatedOn: Date;
    user: Types.ObjectId;
    likes: string[];
    title: string;
    lyrics: string[][];
    duration: number;
    src: string;
    comments: Types.ObjectId[];
    caption?: string | undefined;
    thumbnail?: string | undefined;
    isPosted?: boolean | undefined;
    isVideo?: boolean | undefined;
}, {
    _id: Types.ObjectId;
    createdOn: Date;
    updatedOn: Date;
    user: Types.ObjectId;
    title: string;
    duration: number;
    src: string;
    likes?: string[] | undefined;
    caption?: string | undefined;
    lyrics?: string[][] | undefined;
    thumbnail?: string | undefined;
    isPosted?: boolean | undefined;
    isVideo?: boolean | undefined;
    comments?: Types.ObjectId[] | undefined;
}>;
export declare const SongSchemaPopulatedUserAndComments: z.ZodObject<Omit<{
    _id: z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>;
    title: z.ZodString;
    caption: z.ZodOptional<z.ZodString>;
    lyrics: z.ZodDefault<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
    duration: z.ZodNumber;
    src: z.ZodString;
    thumbnail: z.ZodOptional<z.ZodString>;
    isPosted: z.ZodOptional<z.ZodBoolean>;
    isVideo: z.ZodOptional<z.ZodBoolean>;
    user: z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>;
    comments: z.ZodDefault<z.ZodArray<z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>, "many">>;
    likes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    createdOn: z.ZodDate;
    updatedOn: z.ZodDate;
}, "user" | "comments"> & {
    user: z.ZodObject<{
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
        _id: Types.ObjectId;
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
    }, {
        _id: Types.ObjectId;
        email: string;
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
        followers?: string[] | undefined;
        following?: string[] | undefined;
        createdOn?: string | undefined;
        updatedOn?: string | undefined;
    }>;
    comments: z.ZodArray<z.ZodObject<Omit<{
        _id: z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>;
        parent: z.ZodString;
        text: z.ZodString;
        user: z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>;
        replies: z.ZodDefault<z.ZodArray<z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>, "many">>;
        likes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        createdOn: z.ZodDate;
        updatedOn: z.ZodOptional<z.ZodDate>;
        editedOn: z.ZodOptional<z.ZodDate>;
    }, "user"> & {
        user: z.ZodObject<{
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
            _id: Types.ObjectId;
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
        }, {
            _id: Types.ObjectId;
            email: string;
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
            followers?: string[] | undefined;
            following?: string[] | undefined;
            createdOn?: string | undefined;
            updatedOn?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        _id: Types.ObjectId;
        createdOn: Date;
        text: string;
        parent: string;
        user: {
            _id: Types.ObjectId;
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
        replies: Types.ObjectId[];
        likes: string[];
        updatedOn?: Date | undefined;
        editedOn?: Date | undefined;
    }, {
        _id: Types.ObjectId;
        createdOn: Date;
        text: string;
        parent: string;
        user: {
            _id: Types.ObjectId;
            email: string;
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
            followers?: string[] | undefined;
            following?: string[] | undefined;
            createdOn?: string | undefined;
            updatedOn?: string | undefined;
        };
        updatedOn?: Date | undefined;
        replies?: Types.ObjectId[] | undefined;
        likes?: string[] | undefined;
        editedOn?: Date | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    _id: Types.ObjectId;
    createdOn: Date;
    updatedOn: Date;
    user: {
        _id: Types.ObjectId;
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
        _id: Types.ObjectId;
        createdOn: Date;
        text: string;
        parent: string;
        user: {
            _id: Types.ObjectId;
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
        replies: Types.ObjectId[];
        likes: string[];
        updatedOn?: Date | undefined;
        editedOn?: Date | undefined;
    }[];
    caption?: string | undefined;
    thumbnail?: string | undefined;
    isPosted?: boolean | undefined;
    isVideo?: boolean | undefined;
}, {
    _id: Types.ObjectId;
    createdOn: Date;
    updatedOn: Date;
    user: {
        _id: Types.ObjectId;
        email: string;
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
        followers?: string[] | undefined;
        following?: string[] | undefined;
        createdOn?: string | undefined;
        updatedOn?: string | undefined;
    };
    title: string;
    duration: number;
    src: string;
    comments: {
        _id: Types.ObjectId;
        createdOn: Date;
        text: string;
        parent: string;
        user: {
            _id: Types.ObjectId;
            email: string;
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
            followers?: string[] | undefined;
            following?: string[] | undefined;
            createdOn?: string | undefined;
            updatedOn?: string | undefined;
        };
        updatedOn?: Date | undefined;
        replies?: Types.ObjectId[] | undefined;
        likes?: string[] | undefined;
        editedOn?: Date | undefined;
    }[];
    likes?: string[] | undefined;
    caption?: string | undefined;
    lyrics?: string[][] | undefined;
    thumbnail?: string | undefined;
    isPosted?: boolean | undefined;
    isVideo?: boolean | undefined;
}>;
export declare const SongSchemaPopulatedUser: z.ZodObject<Omit<{
    _id: z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>;
    title: z.ZodString;
    caption: z.ZodOptional<z.ZodString>;
    lyrics: z.ZodDefault<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
    duration: z.ZodNumber;
    src: z.ZodString;
    thumbnail: z.ZodOptional<z.ZodString>;
    isPosted: z.ZodOptional<z.ZodBoolean>;
    isVideo: z.ZodOptional<z.ZodBoolean>;
    user: z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>;
    comments: z.ZodDefault<z.ZodArray<z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>, "many">>;
    likes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    createdOn: z.ZodDate;
    updatedOn: z.ZodDate;
}, "user"> & {
    user: z.ZodObject<{
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
        _id: Types.ObjectId;
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
    }, {
        _id: Types.ObjectId;
        email: string;
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
        followers?: string[] | undefined;
        following?: string[] | undefined;
        createdOn?: string | undefined;
        updatedOn?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    _id: Types.ObjectId;
    createdOn: Date;
    updatedOn: Date;
    user: {
        _id: Types.ObjectId;
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
    comments: Types.ObjectId[];
    caption?: string | undefined;
    thumbnail?: string | undefined;
    isPosted?: boolean | undefined;
    isVideo?: boolean | undefined;
}, {
    _id: Types.ObjectId;
    createdOn: Date;
    updatedOn: Date;
    user: {
        _id: Types.ObjectId;
        email: string;
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
        followers?: string[] | undefined;
        following?: string[] | undefined;
        createdOn?: string | undefined;
        updatedOn?: string | undefined;
    };
    title: string;
    duration: number;
    src: string;
    likes?: string[] | undefined;
    caption?: string | undefined;
    lyrics?: string[][] | undefined;
    thumbnail?: string | undefined;
    isPosted?: boolean | undefined;
    isVideo?: boolean | undefined;
    comments?: Types.ObjectId[] | undefined;
}>;
export type SongSchemaType = z.infer<typeof SongSchema>;
export declare const CreateSongSchema: z.ZodObject<Omit<{
    _id: z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>;
    title: z.ZodString;
    caption: z.ZodOptional<z.ZodString>;
    lyrics: z.ZodDefault<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
    duration: z.ZodNumber;
    src: z.ZodString;
    thumbnail: z.ZodOptional<z.ZodString>;
    isPosted: z.ZodOptional<z.ZodBoolean>;
    isVideo: z.ZodOptional<z.ZodBoolean>;
    user: z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>;
    comments: z.ZodDefault<z.ZodArray<z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>, "many">>;
    likes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    createdOn: z.ZodDate;
    updatedOn: z.ZodDate;
}, "_id" | "createdOn" | "updatedOn" | "user" | "likes" | "comments"> & {
    user: z.ZodString;
}, "strip", z.ZodTypeAny, {
    user: string;
    title: string;
    lyrics: string[][];
    duration: number;
    src: string;
    caption?: string | undefined;
    thumbnail?: string | undefined;
    isPosted?: boolean | undefined;
    isVideo?: boolean | undefined;
}, {
    user: string;
    title: string;
    duration: number;
    src: string;
    caption?: string | undefined;
    lyrics?: string[][] | undefined;
    thumbnail?: string | undefined;
    isPosted?: boolean | undefined;
    isVideo?: boolean | undefined;
}>;
export declare const UpdateSongSchema: z.ZodObject<Pick<{
    _id: z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>;
    title: z.ZodString;
    caption: z.ZodOptional<z.ZodString>;
    lyrics: z.ZodDefault<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
    duration: z.ZodNumber;
    src: z.ZodString;
    thumbnail: z.ZodOptional<z.ZodString>;
    isPosted: z.ZodOptional<z.ZodBoolean>;
    isVideo: z.ZodOptional<z.ZodBoolean>;
    user: z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>;
    comments: z.ZodDefault<z.ZodArray<z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>, "many">>;
    likes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    createdOn: z.ZodDate;
    updatedOn: z.ZodDate;
}, "title" | "caption"> & {
    _id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    _id: string;
    title: string;
    caption?: string | undefined;
}, {
    _id: string;
    title: string;
    caption?: string | undefined;
}>;
export declare const SongInputSchema: z.ZodObject<{
    _id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    _id: string;
}, {
    _id: string;
}>;
export declare const GetByFollowersSchema: z.ZodObject<Pick<{
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
}, "followers">, "strip", z.ZodTypeAny, {
    followers: string[];
}, {
    followers?: string[] | undefined;
}>;
export type CreateSongType = z.infer<typeof CreateSongSchema>;
export type UpdateSongType = z.infer<typeof UpdateSongSchema>;
export type SongInputType = z.infer<typeof SongInputSchema>;
export type GetByFollowersType = z.infer<typeof GetByFollowersSchema>;
export type SongSchemaPopulatedUserAndCommentsType = z.infer<typeof SongSchemaPopulatedUserAndComments>;
export type SongSchemaPopulatedUserType = z.infer<typeof SongSchemaPopulatedUser>;
