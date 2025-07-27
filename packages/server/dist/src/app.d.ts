/// <reference types="qs" />
/// <reference types="cookie-parser" />
import { default as bodyParser } from "express";
import mongoose from "mongoose";
export declare const appRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: {
        req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        res: bodyParser.Response<any, Record<string, any>>;
        user: null;
    } | {
        req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        res: bodyParser.Response<any, Record<string, any>>;
        user: {
            username: string;
        };
    };
    meta: object;
    errorShape: import("@trpc/server").DefaultErrorShape;
    transformer: import("@trpc/server").DefaultDataTransformer;
}>, {
    auth: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
        ctx: {
            req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: bodyParser.Response<any, Record<string, any>>;
            user: null;
        } | {
            req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: bodyParser.Response<any, Record<string, any>>;
            user: {
                username: string;
            };
        };
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
    }>, {
        register: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            };
            _input_in: {
                email: string;
                username: string;
                password: string;
            };
            _input_out: {
                email: string;
                username: string;
                password: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            username: string;
            password: string;
        }>;
        login: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            };
            _input_in: {
                username: string;
                password: string;
            };
            _input_out: {
                username: string;
                password: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            token: string;
            user: {
                _id: mongoose.Types.ObjectId;
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
        }>;
        refresh: import("@trpc/server").BuildProcedure<"query", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: {
                        username: string;
                    };
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _ctx_out: {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            };
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
            _meta: object;
        }, string>;
    }>;
    users: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
        ctx: {
            req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: bodyParser.Response<any, Record<string, any>>;
            user: null;
        } | {
            req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: bodyParser.Response<any, Record<string, any>>;
            user: {
                username: string;
            };
        };
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
    }>, {
        getMe: import("@trpc/server").BuildProcedure<"query", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: {
                        username: string;
                    };
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _ctx_out: {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
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
            _id: mongoose.Types.ObjectId;
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
        getUser: import("@trpc/server").BuildProcedure<"query", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
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
            _id: mongoose.Types.ObjectId;
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
        uploadFile: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            };
            _input_in: {
                fileName: string;
                fileType: string;
                fileBlob?: any;
            }[];
            _input_out: {
                fileName: string;
                fileType: string;
                fileBlob?: any;
            }[];
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            options: {
                headers: {
                    "Content-Type": string;
                };
            };
            signedUrl: string;
            url: string;
        }[]>;
        updateUser: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            };
            _input_in: {
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
            };
            _input_out: {
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
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            _id: mongoose.Types.ObjectId;
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
    }>;
    songs: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
        ctx: {
            req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: bodyParser.Response<any, Record<string, any>>;
            user: null;
        } | {
            req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: bodyParser.Response<any, Record<string, any>>;
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
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
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
            _id: mongoose.Types.ObjectId;
            createdOn: Date;
            updatedOn: Date;
            user: mongoose.Types.ObjectId;
            likes: string[];
            title: string;
            lyrics: string[][];
            duration: number;
            src: string;
            comments: mongoose.Types.ObjectId[];
            caption?: string | undefined;
            thumbnail?: string | undefined;
            isPosted?: boolean | undefined;
            isVideo?: boolean | undefined;
        }>;
        deleteSong: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
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
        }, (mongoose.Document<unknown, any, {
            _id: mongoose.Types.ObjectId;
            createdOn: Date;
            updatedOn: Date;
            user: mongoose.Types.ObjectId;
            likes: string[];
            title: string;
            lyrics: string[][];
            duration: number;
            src: string;
            comments: mongoose.Types.ObjectId[];
            caption?: string | undefined;
            thumbnail?: string | undefined;
            isPosted?: boolean | undefined;
            isVideo?: boolean | undefined;
        }> & Omit<{
            _id: mongoose.Types.ObjectId;
            createdOn: Date;
            updatedOn: Date;
            user: mongoose.Types.ObjectId;
            likes: string[];
            title: string;
            lyrics: string[][];
            duration: number;
            src: string;
            comments: mongoose.Types.ObjectId[];
            caption?: string | undefined;
            thumbnail?: string | undefined;
            isPosted?: boolean | undefined;
            isVideo?: boolean | undefined;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>) | null>;
        updateSong: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
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
            _id: mongoose.Types.ObjectId;
            createdOn: Date;
            updatedOn: Date;
            user: {
                _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
                createdOn: Date;
                text: string;
                parent: string;
                user: {
                    _id: mongoose.Types.ObjectId;
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
                replies: mongoose.Types.ObjectId[];
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
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
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
            _id: mongoose.Types.ObjectId;
            createdOn: Date;
            updatedOn: Date;
            user: {
                _id: mongoose.Types.ObjectId;
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
            comments: mongoose.Types.ObjectId[];
            caption?: string | undefined;
            thumbnail?: string | undefined;
            isPosted?: boolean | undefined;
            isVideo?: boolean | undefined;
        }[]>;
        usersFollowersSongs: import("@trpc/server").BuildProcedure<"query", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
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
            _id: mongoose.Types.ObjectId;
            createdOn: Date;
            updatedOn: Date;
            user: {
                _id: mongoose.Types.ObjectId;
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
            comments: mongoose.Types.ObjectId[];
            caption?: string | undefined;
            thumbnail?: string | undefined;
            isPosted?: boolean | undefined;
            isVideo?: boolean | undefined;
        }[]>;
        getSong: import("@trpc/server").BuildProcedure<"query", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
            } | {
                user: {
                    username: string;
                };
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
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
            _id: mongoose.Types.ObjectId;
            createdOn: Date;
            updatedOn: Date;
            user: mongoose.Types.ObjectId;
            likes: string[];
            title: string;
            lyrics: string[][];
            duration: number;
            src: string;
            comments: mongoose.Types.ObjectId[];
            caption?: string | undefined;
            thumbnail?: string | undefined;
            isPosted?: boolean | undefined;
            isVideo?: boolean | undefined;
        }>;
        getSongPopulated: import("@trpc/server").BuildProcedure<"query", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
            } | {
                user: {
                    username: string;
                };
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
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
            _id: mongoose.Types.ObjectId;
            createdOn: Date;
            updatedOn: Date;
            user: {
                _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
                createdOn: Date;
                text: string;
                parent: string;
                user: {
                    _id: mongoose.Types.ObjectId;
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
                replies: mongoose.Types.ObjectId[];
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
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
            } | {
                user: {
                    username: string;
                };
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
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
            _id: mongoose.Types.ObjectId;
            createdOn: Date;
            updatedOn: Date;
            user: {
                _id: mongoose.Types.ObjectId;
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
            comments: mongoose.Types.ObjectId[];
            caption?: string | undefined;
            thumbnail?: string | undefined;
            isPosted?: boolean | undefined;
            isVideo?: boolean | undefined;
        }>;
        usersSongs: import("@trpc/server").BuildProcedure<"query", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
            } | {
                user: {
                    username: string;
                };
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
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
            _id: mongoose.Types.ObjectId;
            createdOn: Date;
            updatedOn: Date;
            user: {
                _id: mongoose.Types.ObjectId;
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
            comments: mongoose.Types.ObjectId[];
            caption?: string | undefined;
            thumbnail?: string | undefined;
            isPosted?: boolean | undefined;
            isVideo?: boolean | undefined;
        }[]>;
        usersSongsWithComments: import("@trpc/server").BuildProcedure<"query", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
            } | {
                user: {
                    username: string;
                };
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
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
            _id: mongoose.Types.ObjectId;
            createdOn: Date;
            updatedOn: Date;
            user: {
                _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
                createdOn: Date;
                text: string;
                parent: string;
                user: {
                    _id: mongoose.Types.ObjectId;
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
                replies: mongoose.Types.ObjectId[];
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
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: {
                        username: string;
                    };
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _ctx_out: {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
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
            _id: mongoose.Types.ObjectId;
            createdOn: Date;
            updatedOn: Date;
            user: {
                _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
                createdOn: Date;
                text: string;
                parent: string;
                user: {
                    _id: mongoose.Types.ObjectId;
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
                replies: mongoose.Types.ObjectId[];
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
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
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
                _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
                createdOn: Date;
                updatedOn: Date;
                user: {
                    _id: mongoose.Types.ObjectId;
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
                    _id: mongoose.Types.ObjectId;
                    createdOn: Date;
                    text: string;
                    parent: string;
                    user: {
                        _id: mongoose.Types.ObjectId;
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
                    replies: mongoose.Types.ObjectId[];
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
    comments: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
        ctx: {
            req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: bodyParser.Response<any, Record<string, any>>;
            user: null;
        } | {
            req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: bodyParser.Response<any, Record<string, any>>;
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
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
            } | {
                user: {
                    username: string;
                };
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
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
            _id: mongoose.Types.ObjectId;
            createdOn: Date;
            text: string;
            parent: string;
            user: {
                _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
                createdOn: Date;
                text: string;
                parent: string;
                user: {
                    _id: mongoose.Types.ObjectId;
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
                replies: mongoose.Types.ObjectId[];
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
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
            } | {
                user: {
                    username: string;
                };
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
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
            _id: mongoose.Types.ObjectId;
            createdOn: Date;
            text: string;
            parent: string;
            user: {
                _id: mongoose.Types.ObjectId;
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
            replies: mongoose.Types.ObjectId[];
            likes: string[];
            updatedOn?: Date | undefined;
            editedOn?: Date | undefined;
        }>;
        createComment: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
            } | {
                user: {
                    username: string;
                };
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
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
            _id: mongoose.Types.ObjectId;
            createdOn: Date;
            text: string;
            parent: string;
            user: {
                _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
                createdOn: Date;
                text: string;
                parent: string;
                user: {
                    _id: mongoose.Types.ObjectId;
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
                replies: mongoose.Types.ObjectId[];
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
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
            } | {
                user: {
                    username: string;
                };
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
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
            _id: mongoose.Types.ObjectId;
            createdOn: Date;
            text: string;
            parent: string;
            user: {
                _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
                createdOn: Date;
                text: string;
                parent: string;
                user: {
                    _id: mongoose.Types.ObjectId;
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
                replies: mongoose.Types.ObjectId[];
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
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
            } | {
                user: {
                    username: string;
                };
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
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
            _id: mongoose.Types.ObjectId;
            createdOn: Date;
            text: string;
            parent: string;
            user: {
                _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
                createdOn: Date;
                text: string;
                parent: string;
                user: {
                    _id: mongoose.Types.ObjectId;
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
                replies: mongoose.Types.ObjectId[];
                likes: string[];
                updatedOn?: Date | undefined;
                editedOn?: Date | undefined;
            }[];
            likes: string[];
            updatedOn?: Date | undefined;
            editedOn?: Date | undefined;
        }>;
    }>;
    likes: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
        ctx: {
            req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: bodyParser.Response<any, Record<string, any>>;
            user: null;
        } | {
            req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: bodyParser.Response<any, Record<string, any>>;
            user: {
                username: string;
            };
        };
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
    }>, {
        likeSong: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
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
        }, any>;
        unlikeSong: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
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
        }, any>;
        likeComment: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
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
        }, any>;
        unlikeComment: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
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
        }, any>;
    }>;
    follows: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
        ctx: {
            req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: bodyParser.Response<any, Record<string, any>>;
            user: null;
        } | {
            req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: bodyParser.Response<any, Record<string, any>>;
            user: {
                username: string;
            };
        };
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
    }>, {
        follow: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            };
            _input_in: {
                following: string;
                follower: string;
            };
            _input_out: {
                following: string;
                follower: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, any>;
        unfollow: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
                    user: null;
                } | {
                    req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: bodyParser.Response<any, Record<string, any>>;
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
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            };
            _input_in: {
                following: string;
                follower: string;
            };
            _input_out: {
                following: string;
                follower: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, any>;
    }>;
}>;
export type AppRouter = typeof appRouter;
