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
export declare const songsRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
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
    createSong: import("@trpc/server").BuildProcedure<"mutation", {
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
        _input_in: {
            user: string;
            title: string;
            duration: number;
            src: string;
            caption?: string | undefined;
            lyrics?: string[][] | undefined;
            thumbnail?: string | undefined;
            isPosted?: boolean | undefined;
            isVideo?: boolean | undefined;
        };
        _input_out: {
            user: string;
            title: string;
            lyrics: string[][];
            duration: number;
            src: string;
            caption?: string | undefined;
            thumbnail?: string | undefined;
            isPosted?: boolean | undefined;
            isVideo?: boolean | undefined;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
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
    deleteSong: import("@trpc/server").BuildProcedure<"mutation", {
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
        _input_in: {
            _id: string;
        };
        _input_out: {
            _id: string;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, (import("mongoose").Document<unknown, any, {
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
    updateSong: import("@trpc/server").BuildProcedure<"mutation", {
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
        _input_in: {
            _id: string;
            title: string;
            caption?: string | undefined;
        };
        _input_out: {
            _id: string;
            title: string;
            caption?: string | undefined;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
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
    usersLikedSongs: import("@trpc/server").BuildProcedure<"query", {
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
    usersFollowersSongs: import("@trpc/server").BuildProcedure<"query", {
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
        _input_in: {
            followers?: string[] | undefined;
        };
        _input_out: {
            followers: string[];
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
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
    getSong: import("@trpc/server").BuildProcedure<"query", {
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
    getSongPopulated: import("@trpc/server").BuildProcedure<"query", {
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
    getSongPopulatedUser: import("@trpc/server").BuildProcedure<"query", {
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
    usersSongs: import("@trpc/server").BuildProcedure<"query", {
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
    usersSongsWithComments: import("@trpc/server").BuildProcedure<"query", {
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
    allSongs: import("@trpc/server").BuildProcedure<"query", {
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
        _ctx_out: {
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
        _input_in: typeof import("@trpc/server").unsetMarker;
        _input_out: typeof import("@trpc/server").unsetMarker;
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
        _meta: object;
    }, {
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
    search: import("@trpc/server").BuildProcedure<"mutation", {
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
        _input_in: string;
        _input_out: string;
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
        users: {
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
        }[];
        songs: {
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
        }[];
    }>;
}>;
export type SongsRouter = typeof songsRouter;
