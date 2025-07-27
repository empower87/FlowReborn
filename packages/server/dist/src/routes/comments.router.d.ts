/// <reference types="qs" />
/// <reference types="express" />
/// <reference types="cookie-parser" />
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
export declare const commentsRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: {
        req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        res: import("express").Response<any, Record<string, any>>;
        user: null;
    } | {
        req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        res: import("express").Response<any, Record<string, any>>;
        user: {
            username: string;
        };
    };
    meta: object;
    errorShape: import("@trpc/server").DefaultErrorShape;
    transformer: import("@trpc/server").DefaultDataTransformer;
}>, {
    getComment: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("express").Response<any, Record<string, any>>;
                user: null;
            } | {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("express").Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _meta: object;
        _ctx_out: {
            user: {
                username: string;
            };
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
        } | {
            user: {
                username: string;
            };
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
        };
        _input_in: {
            _id: string;
        };
        _input_out: {
            _id: string;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
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
    getCommentPopulatedUser: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("express").Response<any, Record<string, any>>;
                user: null;
            } | {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("express").Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _meta: object;
        _ctx_out: {
            user: {
                username: string;
            };
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
        } | {
            user: {
                username: string;
            };
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
        };
        _input_in: {
            _id: string;
        };
        _input_out: {
            _id: string;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
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
    createComment: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("express").Response<any, Record<string, any>>;
                user: null;
            } | {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("express").Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _meta: object;
        _ctx_out: {
            user: {
                username: string;
            };
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
        } | {
            user: {
                username: string;
            };
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
        };
        _input_in: {
            text: string;
            parent: string;
            user: string;
            songId: string;
        };
        _input_out: {
            text: string;
            parent: string;
            user: string;
            songId: string;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
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
    editComment: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("express").Response<any, Record<string, any>>;
                user: null;
            } | {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("express").Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _meta: object;
        _ctx_out: {
            user: {
                username: string;
            };
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
        } | {
            user: {
                username: string;
            };
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
        };
        _input_in: {
            _id: string;
            text: string;
            songId: string;
        };
        _input_out: {
            _id: string;
            text: string;
            songId: string;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
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
    deleteComment: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("express").Response<any, Record<string, any>>;
                user: null;
            } | {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("express").Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _meta: object;
        _ctx_out: {
            user: {
                username: string;
            };
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
        } | {
            user: {
                username: string;
            };
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
        };
        _input_in: {
            _id: string;
            parent: string;
            songId: string;
        };
        _input_out: {
            _id: string;
            parent: string;
            songId: string;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
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
}>;
export type CommentsRouter = typeof commentsRouter;
