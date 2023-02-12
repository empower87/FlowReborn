import { Types } from "mongoose";
import z from "zod";
export declare const CommentSchema: z.ZodObject<{
    _id: z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>;
    parent: z.ZodString;
    text: z.ZodString;
    user: z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>;
    replies: z.ZodDefault<z.ZodArray<z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>, "many">>;
    likes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    createdOn: z.ZodDate;
    updatedOn: z.ZodOptional<z.ZodDate>;
    editedOn: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    updatedOn?: Date | undefined;
    editedOn?: Date | undefined;
    _id: Types.ObjectId;
    createdOn: Date;
    text: string;
    parent: string;
    user: Types.ObjectId;
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
    user: Types.ObjectId;
}>;
export declare const CommentSchemaPopulatedUser: z.ZodObject<{
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
}>;
export declare const CommentSchemaPopulatedUserAndReplies: z.ZodObject<{
    _id: z.ZodType<Types.ObjectId, z.ZodTypeDef, Types.ObjectId>;
    createdOn: z.ZodDate;
    updatedOn: z.ZodOptional<z.ZodDate>;
    text: z.ZodString;
    parent: z.ZodString;
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
    replies: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
    }>, "many">>;
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
    replies: {
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
    likes: string[];
}, {
    updatedOn?: Date | undefined;
    replies?: {
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
    }[] | undefined;
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
}>;
export declare const CreateCommentSchema: z.ZodObject<{
    text: z.ZodString;
    parent: z.ZodString;
    user: z.ZodString;
    songId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    text: string;
    parent: string;
    user: string;
    songId: string;
}, {
    text: string;
    parent: string;
    user: string;
    songId: string;
}>;
export declare const DeleteCommentSchema: z.ZodObject<{
    _id: z.ZodString;
    parent: z.ZodString;
    songId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    _id: string;
    parent: string;
    songId: string;
}, {
    _id: string;
    parent: string;
    songId: string;
}>;
export declare const EditCommentSchema: z.ZodObject<{
    _id: z.ZodString;
    text: z.ZodString;
    songId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    _id: string;
    text: string;
    songId: string;
}, {
    _id: string;
    text: string;
    songId: string;
}>;
export declare const GetCommentByIdSchema: z.ZodObject<{
    _id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    _id: string;
}, {
    _id: string;
}>;
export type CreateCommentType = z.infer<typeof CreateCommentSchema>;
export type EditCommentType = z.infer<typeof EditCommentSchema>;
export type DeleteCommentType = z.infer<typeof DeleteCommentSchema>;
export type GetCommentByIdType = z.infer<typeof GetCommentByIdSchema>;
export type CommentSchemaPopulatedUserType = z.infer<typeof CommentSchemaPopulatedUser>;
export type CommentSchemaPopulatedUserAndRepliesType = z.infer<typeof CommentSchemaPopulatedUserAndReplies>;
