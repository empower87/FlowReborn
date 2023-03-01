/// <reference types="qs" />
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
                _id: mongoose.Types.ObjectId;
                email: string;
                followers: string[];
                following: string[];
                username: string;
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
            _id: mongoose.Types.ObjectId;
            email: string;
            followers: string[];
            following: string[];
            username: string;
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
            _id: mongoose.Types.ObjectId;
            email: string;
            followers: string[];
            following: string[];
            username: string;
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
                fileBlob?: any;
                fileName: string;
                fileType: string;
            }[];
            _input_out: {
                fileBlob?: any;
                fileName: string;
                fileType: string;
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
            _id: mongoose.Types.ObjectId;
            email: string;
            followers: string[];
            following: string[];
            username: string;
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
                caption?: string | undefined;
                lyrics?: string[][] | undefined;
                thumbnail?: string | undefined;
                video?: string | undefined;
                user: string;
                title: string;
                duration: number;
                audio: string;
            };
            _input_out: {
                caption?: string | undefined;
                thumbnail?: string | undefined;
                video?: string | undefined;
                user: string;
                title: string;
                lyrics: string[][];
                duration: number;
                audio: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            caption?: string | undefined;
            thumbnail?: string | undefined;
            video?: string | undefined;
            _id: mongoose.Types.ObjectId;
            createdOn: Date;
            updatedOn: Date;
            user: mongoose.Types.ObjectId;
            likes: string[];
            title: string;
            lyrics: string[][];
            duration: number;
            audio: string;
            comments: mongoose.Types.ObjectId[];
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
            caption?: string | undefined;
            thumbnail?: string | undefined;
            video?: string | undefined;
            _id: mongoose.Types.ObjectId;
            createdOn: Date;
            updatedOn: Date;
            user: mongoose.Types.ObjectId;
            likes: string[];
            title: string;
            lyrics: string[][];
            duration: number;
            audio: string;
            comments: mongoose.Types.ObjectId[];
        }> & {
            caption?: string | undefined;
            thumbnail?: string | undefined;
            video?: string | undefined;
            _id: mongoose.Types.ObjectId;
            createdOn: Date;
            updatedOn: Date;
            user: mongoose.Types.ObjectId;
            likes: string[];
            title: string;
            lyrics: string[][];
            duration: number;
            audio: string;
            comments: mongoose.Types.ObjectId[];
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>) | null>;
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
                caption?: string | undefined;
                _id: string;
                title: string;
            };
            _input_out: {
                caption?: string | undefined;
                _id: string;
                title: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            caption?: string | undefined;
            thumbnail?: string | undefined;
            video?: string | undefined;
            _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
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
                    _id: mongoose.Types.ObjectId;
                    email: string;
                    followers: string[];
                    following: string[];
                    username: string;
                };
                replies: mongoose.Types.ObjectId[];
                likes: string[];
            }[];
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
            caption?: string | undefined;
            thumbnail?: string | undefined;
            video?: string | undefined;
            _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
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
            comments: mongoose.Types.ObjectId[];
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
            caption?: string | undefined;
            thumbnail?: string | undefined;
            video?: string | undefined;
            _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
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
            comments: mongoose.Types.ObjectId[];
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
            _ctx_out: import("@trpc/server").Overwrite<{
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            }, {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            }>;
            _input_in: {
                _id: string;
            };
            _input_out: {
                _id: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            caption?: string | undefined;
            thumbnail?: string | undefined;
            video?: string | undefined;
            _id: mongoose.Types.ObjectId;
            createdOn: Date;
            updatedOn: Date;
            user: mongoose.Types.ObjectId;
            likes: string[];
            title: string;
            lyrics: string[][];
            duration: number;
            audio: string;
            comments: mongoose.Types.ObjectId[];
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
            _ctx_out: import("@trpc/server").Overwrite<{
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            }, {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            }>;
            _input_in: {
                _id: string;
            };
            _input_out: {
                _id: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            caption?: string | undefined;
            thumbnail?: string | undefined;
            video?: string | undefined;
            _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
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
                    _id: mongoose.Types.ObjectId;
                    email: string;
                    followers: string[];
                    following: string[];
                    username: string;
                };
                replies: mongoose.Types.ObjectId[];
                likes: string[];
            }[];
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
            _ctx_out: import("@trpc/server").Overwrite<{
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            }, {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            }>;
            _input_in: {
                _id: string;
            };
            _input_out: {
                _id: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            caption?: string | undefined;
            thumbnail?: string | undefined;
            video?: string | undefined;
            _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
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
            comments: mongoose.Types.ObjectId[];
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
            _ctx_out: import("@trpc/server").Overwrite<{
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            }, {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            }>;
            _input_in: {
                _id: string;
            };
            _input_out: {
                _id: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            caption?: string | undefined;
            thumbnail?: string | undefined;
            video?: string | undefined;
            _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
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
            comments: mongoose.Types.ObjectId[];
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
            _ctx_out: import("@trpc/server").Overwrite<{
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            }, {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            }>;
            _input_in: {
                _id: string;
            };
            _input_out: {
                _id: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            caption?: string | undefined;
            thumbnail?: string | undefined;
            video?: string | undefined;
            _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
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
                    _id: mongoose.Types.ObjectId;
                    email: string;
                    followers: string[];
                    following: string[];
                    username: string;
                };
                replies: mongoose.Types.ObjectId[];
                likes: string[];
            }[];
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
            caption?: string | undefined;
            thumbnail?: string | undefined;
            video?: string | undefined;
            _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
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
                    _id: mongoose.Types.ObjectId;
                    email: string;
                    followers: string[];
                    following: string[];
                    username: string;
                };
                replies: mongoose.Types.ObjectId[];
                likes: string[];
            }[];
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
                _id: mongoose.Types.ObjectId;
                email: string;
                followers: string[];
                following: string[];
                username: string;
            }[];
            songs: {
                caption?: string | undefined;
                thumbnail?: string | undefined;
                video?: string | undefined;
                _id: mongoose.Types.ObjectId;
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
                    _id: mongoose.Types.ObjectId;
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
                    _id: mongoose.Types.ObjectId;
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
                        _id: mongoose.Types.ObjectId;
                        email: string;
                        followers: string[];
                        following: string[];
                        username: string;
                    };
                    replies: mongoose.Types.ObjectId[];
                    likes: string[];
                }[];
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
            _ctx_out: import("@trpc/server").Overwrite<{
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            }, {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            }>;
            _input_in: {
                _id: string;
            };
            _input_out: {
                _id: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            updatedOn?: Date | undefined;
            editedOn?: Date | undefined;
            _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
                email: string;
                followers: string[];
                following: string[];
                username: string;
            };
            replies: {
                updatedOn?: Date | undefined;
                editedOn?: Date | undefined;
                _id: mongoose.Types.ObjectId;
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
                    _id: mongoose.Types.ObjectId;
                    email: string;
                    followers: string[];
                    following: string[];
                    username: string;
                };
                replies: mongoose.Types.ObjectId[];
                likes: string[];
            }[];
            likes: string[];
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
            _ctx_out: import("@trpc/server").Overwrite<{
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            }, {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            }>;
            _input_in: {
                _id: string;
            };
            _input_out: {
                _id: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            updatedOn?: Date | undefined;
            editedOn?: Date | undefined;
            _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
                email: string;
                followers: string[];
                following: string[];
                username: string;
            };
            replies: mongoose.Types.ObjectId[];
            likes: string[];
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
            _ctx_out: import("@trpc/server").Overwrite<{
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            }, {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            }>;
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
            updatedOn?: Date | undefined;
            editedOn?: Date | undefined;
            _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
                email: string;
                followers: string[];
                following: string[];
                username: string;
            };
            replies: {
                updatedOn?: Date | undefined;
                editedOn?: Date | undefined;
                _id: mongoose.Types.ObjectId;
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
                    _id: mongoose.Types.ObjectId;
                    email: string;
                    followers: string[];
                    following: string[];
                    username: string;
                };
                replies: mongoose.Types.ObjectId[];
                likes: string[];
            }[];
            likes: string[];
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
            _ctx_out: import("@trpc/server").Overwrite<{
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            }, {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            }>;
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
            updatedOn?: Date | undefined;
            editedOn?: Date | undefined;
            _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
                email: string;
                followers: string[];
                following: string[];
                username: string;
            };
            replies: {
                updatedOn?: Date | undefined;
                editedOn?: Date | undefined;
                _id: mongoose.Types.ObjectId;
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
                    _id: mongoose.Types.ObjectId;
                    email: string;
                    followers: string[];
                    following: string[];
                    username: string;
                };
                replies: mongoose.Types.ObjectId[];
                likes: string[];
            }[];
            likes: string[];
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
            _ctx_out: import("@trpc/server").Overwrite<{
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: null;
            } | {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            }, {
                req: bodyParser.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: bodyParser.Response<any, Record<string, any>>;
                user: {
                    username: string;
                };
            }>;
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
            updatedOn?: Date | undefined;
            editedOn?: Date | undefined;
            _id: mongoose.Types.ObjectId;
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
                _id: mongoose.Types.ObjectId;
                email: string;
                followers: string[];
                following: string[];
                username: string;
            };
            replies: {
                updatedOn?: Date | undefined;
                editedOn?: Date | undefined;
                _id: mongoose.Types.ObjectId;
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
                    _id: mongoose.Types.ObjectId;
                    email: string;
                    followers: string[];
                    following: string[];
                    username: string;
                };
                replies: mongoose.Types.ObjectId[];
                likes: string[];
            }[];
            likes: string[];
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
