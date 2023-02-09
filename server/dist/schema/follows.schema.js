"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowSchema = void 0;
const zod_1 = require("zod");
exports.FollowSchema = (0, zod_1.object)({
    following: (0, zod_1.string)(),
    follower: (0, zod_1.string)(),
});
