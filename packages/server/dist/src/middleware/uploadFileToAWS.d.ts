import z from "zod";
import { Context } from "../utils/trpc/index.js";
export declare const UploadInputSchema: z.ZodArray<z.ZodObject<{
    fileName: z.ZodString;
    fileType: z.ZodString;
    fileBlob: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    fileName: string;
    fileType: string;
    fileBlob?: any;
}, {
    fileName: string;
    fileType: string;
    fileBlob?: any;
}>, "many">;
export type UploadInputType = z.infer<typeof UploadInputSchema>;
export declare const uploadFileToAWS: ({ ctx, input }: {
    ctx: Context;
    input: {
        fileName: string;
        fileType: string;
        fileBlob?: any;
    }[];
}) => Promise<{
    options: {
        headers: {
            "Content-Type": string;
        };
    };
    signedUrl: string;
    url: string;
}[]>;
