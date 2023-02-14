import { HydratedDocument, Model } from "mongoose";
import z from "zod";
import { SongSchema as ISongSchema } from "../schema/songs.schema.js";
export type ISong = z.infer<typeof ISongSchema>;
export interface ISongModel extends Model<ISong, {}, ISongQueryHelpers> {
    findAllSongs(): HydratedDocument<ISong, ISongQueryHelpers>;
}
interface ISongQueryHelpers {
}
type SongModelType = Model<ISong>;
export declare const Song: SongModelType;
export {};
