"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    picture: String,
    firstName: String,
    lastName: String,
    about: String,
    location: String,
    google: {
        googleId: String,
        userPhoto: String,
        userSignUpDate: Date,
        given_name: String,
        family_name: String,
    },
    socials: {
        twitter: String,
        instagram: String,
        soundCloud: String,
    },
    followers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User", default: [] }],
    following: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User", default: [] }],
}, { timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" } });
exports.User = (0, mongoose_1.model)("User", UserSchema);
