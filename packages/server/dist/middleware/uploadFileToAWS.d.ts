import z from "zod";
import { Context } from "../utils/trpc/index.js";
export declare const UploadInputSchema: z.ZodArray<z.ZodObject<{
    fileName: z.ZodString;
    fileType: z.ZodString;
    fileBlob: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    fileBlob?: any;
    fileName: string;
    fileType: string;
}, {
    fileBlob?: any;
    fileName: string;
    fileType: string;
}>, "many">;
export type UploadInputType = z.infer<typeof UploadInputSchema>;
export declare const uploadFileToAWS: ({ ctx, input }: {
    ctx: Context;
    input: {
        fileBlob?: any;
        fileName: string;
        fileType: string;
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
