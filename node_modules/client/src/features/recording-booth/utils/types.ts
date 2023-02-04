// import { ISong } from "../../../../../server/src/models/Song"
import { ISongPopulatedUser as ISong } from "src/types/ServerModelTypes"

export interface ISongTake extends Omit<ISong, "comments" | "likes" | "_id" | "createdOn" | "updatedOn"> {
  _id: string
  blob?: Blob | null
  thumbnailBlob?: Blob | null
}
