"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeCommentInputSchema = exports.LikeInputSchema = exports.LikeSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.LikeSchema = zod_1.default.object({
    _id: zod_1.default.string(),
});
exports.LikeInputSchema = zod_1.default.object({ _id: zod_1.default.string() });
exports.LikeCommentInputSchema = exports.LikeInputSchema.extend({ commentId: zod_1.default.string() });
