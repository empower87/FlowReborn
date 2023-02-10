import { model, Schema } from "mongoose";
const UserSchema = new Schema({
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
    followers: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    following: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
}, { timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" } });
export const User = model("User", UserSchema);
//# sourceMappingURL=User.js.map