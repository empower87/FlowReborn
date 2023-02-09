"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserInputSchema = exports.UserInputSchema = exports.UserSchema = exports.UserSchemaFromClient = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = __importStar(require("zod"));
const GoogleUser = (0, zod_1.object)({
    googleId: (0, zod_1.string)(),
    userPhoto: (0, zod_1.string)(),
    userSignUpDate: (0, zod_1.date)(),
    given_name: (0, zod_1.string)(),
    family_name: (0, zod_1.string)(),
});
const GoogleUserClient = GoogleUser.omit({
    userSignUpDate: true,
}).extend({ userSignUpDate: zod_1.default.string() });
const Socials = (0, zod_1.object)({
    twitter: (0, zod_1.string)().optional(),
    instagram: (0, zod_1.string)().optional(),
    soundCloud: (0, zod_1.string)().optional(),
});
exports.UserSchemaFromClient = (0, zod_1.object)({
    _id: (0, zod_1.string)(),
    email: (0, zod_1.string)().email(),
    google: GoogleUserClient.optional(),
    picture: (0, zod_1.string)().optional(),
    firstName: (0, zod_1.string)().optional(),
    lastName: (0, zod_1.string)().optional(),
    about: (0, zod_1.string)().optional(),
    location: (0, zod_1.string)().optional(),
    socials: Socials.optional(),
    followers: (0, zod_1.string)().array().default([]),
    following: (0, zod_1.string)().array().default([]),
    createdOn: (0, zod_1.string)().optional(),
    updatedOn: (0, zod_1.string)().optional(),
});
exports.UserSchema = (0, zod_1.object)({
    // _id: string(),
    _id: zod_1.default.instanceof(mongoose_1.Types.ObjectId),
    username: (0, zod_1.string)(),
    email: (0, zod_1.string)().email(),
    google: GoogleUser.optional(),
    picture: (0, zod_1.string)().optional(),
    firstName: (0, zod_1.string)().optional(),
    lastName: (0, zod_1.string)().optional(),
    about: (0, zod_1.string)().optional(),
    location: (0, zod_1.string)().optional(),
    socials: Socials.optional(),
    followers: (0, zod_1.string)().array().default([]),
    following: (0, zod_1.string)().array().default([]),
    createdOn: (0, zod_1.string)().optional(),
    updatedOn: (0, zod_1.string)().optional(),
});
const UpdateUserInput = exports.UserSchema.omit({
    _id: true,
    username: true,
    email: true,
    google: true,
    followers: true,
    following: true,
});
exports.UserInputSchema = zod_1.default.object({ _id: zod_1.default.string() });
exports.UpdateUserInputSchema = UpdateUserInput.extend({
    username: (0, zod_1.string)().optional(),
    email: (0, zod_1.string)().email().optional(),
});
