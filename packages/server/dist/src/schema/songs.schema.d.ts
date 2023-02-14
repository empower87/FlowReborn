import { Types } from "mongoose";
import z from "zod";
export declare const SongSchema: z.ZodObject<{
    _id: z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>;
    title: z.ZodString;
    caption: z.ZodOptional<z.ZodString>;
    lyrics: z.ZodDefault<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
    duration: z.ZodNumber;
    audio: z.ZodString;
    thumbnail: z.ZodOptional<z.ZodString>;
    video: z.ZodOptional<z.ZodString>;
    user: z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>;
    comments: z.ZodDefault<z.ZodArray<z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>, "many">>;
    likes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    createdOn: z.ZodDate;
    updatedOn: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    caption?: string | undefined;
    thumbnail?: string | undefined;
    video?: string | undefined;
    _id: Types.ObjectId;
    createdOn: Date;
    updatedOn: Date;
    user: Types.ObjectId;
    likes: string[];
    title: string;
    lyrics: string[][];
    duration: number;
    audio: string;
    comments: Types.ObjectId[];
}, {
    likes?: string[] | undefined;
    caption?: string | undefined;
    lyrics?: string[][] | undefined;
    thumbnail?: string | undefined;
    video?: string | undefined;
    comments?: Types.ObjectId[] | undefined;
    _id: Types.ObjectId;
    createdOn: Date;
    updatedOn: Date;
    user: Types.ObjectId;
    title: string;
    duration: number;
    audio: string;
}>;
export declare const SongSchemaPopulatedUserAndComments: z.ZodObject<{
    _id: z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>;
    createdOn: z.ZodDate;
    updatedOn: z.ZodDate;
    likes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    title: z.ZodString;
    caption: z.ZodOptional<z.ZodString>;
    lyrics: z.ZodDefault<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
    duration: z.ZodNumber;
    audio: z.ZodString;
    thumbnail: z.ZodOptional<z.ZodString>;
    video: z.ZodOptional<z.ZodString>;
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
    comments: z.ZodArray<z.ZodObject<{
        _id: z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>;
        createdOn: z.ZodDate;
        updatedOn: z.ZodOptional<z.ZodDate>;
        text: z.ZodString;
        parent: z.ZodString;
        replies: z.ZodDefault<z.ZodArray<z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>, "many">>;
        likes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        editedOn: z.ZodOptional<z.ZodDate>;
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
    }, "strip", z.ZodTypeAny, {
        updatedOn?: Date | undefined;
        editedOn?: Date | undefined;
        _id: Types.ObjectId;
        createdOn: Date;
        text: string;
        parent: string;
        user: {
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
        };
        replies: Types.ObjectId[];
        likes: string[];
    }, {
        updatedOn?: Date | undefined;
        replies?: Types.ObjectId[] | undefined;
        likes?: string[] | undefined;
        editedOn?: Date | undefined;
        _id: Types.ObjectId;
        createdOn: Date;
        text: string;
        parent: string;
        user: {
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
        };
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    caption?: string | undefined;
    thumbnail?: string | undefined;
    video?: string | undefined;
    _id: Types.ObjectId;
    createdOn: Date;
    updatedOn: Date;
    user: {
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
    };
    likes: string[];
    title: string;
    lyrics: string[][];
    duration: number;
    audio: string;
    comments: {
        updatedOn?: Date | undefined;
        editedOn?: Date | undefined;
        _id: Types.ObjectId;
        createdOn: Date;
        text: string;
        parent: string;
        user: {
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
        };
        replies: Types.ObjectId[];
        likes: string[];
    }[];
}, {
    likes?: string[] | undefined;
    caption?: string | undefined;
    lyrics?: string[][] | undefined;
    thumbnail?: string | undefined;
    video?: string | undefined;
    _id: Types.ObjectId;
    createdOn: Date;
    updatedOn: Date;
    user: {
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
    };
    title: string;
    duration: number;
    audio: string;
    comments: {
        updatedOn?: Date | undefined;
        replies?: Types.ObjectId[] | undefined;
        likes?: string[] | undefined;
        editedOn?: Date | undefined;
        _id: Types.ObjectId;
        createdOn: Date;
        text: string;
        parent: string;
        user: {
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
        };
    }[];
}>;
export declare const SongSchemaPopulatedUser: z.ZodObject<{
    _id: z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>;
    createdOn: z.ZodDate;
    updatedOn: z.ZodDate;
    likes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    title: z.ZodString;
    caption: z.ZodOptional<z.ZodString>;
    lyrics: z.ZodDefault<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
    duration: z.ZodNumber;
    audio: z.ZodString;
    thumbnail: z.ZodOptional<z.ZodString>;
    video: z.ZodOptional<z.ZodString>;
    comments: z.ZodDefault<z.ZodArray<z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>, "many">>;
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
}, "strip", z.ZodTypeAny, {
    caption?: string | undefined;
    thumbnail?: string | undefined;
    video?: string | undefined;
    _id: Types.ObjectId;
    createdOn: Date;
    updatedOn: Date;
    user: {
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
    };
    likes: string[];
    title: string;
    lyrics: string[][];
    duration: number;
    audio: string;
    comments: Types.ObjectId[];
}, {
    likes?: string[] | undefined;
    caption?: string | undefined;
    lyrics?: string[][] | undefined;
    thumbnail?: string | undefined;
    video?: string | undefined;
    comments?: Types.ObjectId[] | undefined;
    _id: Types.ObjectId;
    createdOn: Date;
    updatedOn: Date;
    user: {
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
    };
    title: string;
    duration: number;
    audio: string;
}>;
export type SongSchemaType = z.infer<typeof SongSchema>;
export declare const CreateSongSchema: z.ZodObject<{
    title: z.ZodString;
    caption: z.ZodOptional<z.ZodString>;
    lyrics: z.ZodDefault<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
    duration: z.ZodNumber;
    audio: z.ZodString;
    thumbnail: z.ZodOptional<z.ZodString>;
    video: z.ZodOptional<z.ZodString>;
    user: z.ZodString;
}, "strip", z.ZodTypeAny, {
    caption?: string | undefined;
    thumbnail?: string | undefined;
    video?: string | undefined;
    user: string;
    title: string;
    lyrics: string[][];
    duration: number;
    audio: string;
}, {
    caption?: string | undefined;
    lyrics?: string[][] | undefined;
    thumbnail?: string | undefined;
    video?: string | undefined;
    user: string;
    title: string;
    duration: number;
    audio: string;
}>;
export declare const UpdateSongSchema: z.ZodObject<{
    title: z.ZodString;
    caption: z.ZodOptional<z.ZodString>;
    _id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    caption?: string | undefined;
    _id: string;
    title: string;
}, {
    caption?: string | undefined;
    _id: string;
    title: string;
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
