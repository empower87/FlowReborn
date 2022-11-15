import { ISong } from "../../../../../server/src/models/Song"

export interface ISongTake extends Omit<ISong, "comments" | "likes" | "_id"> {
  _id: string
  blob: Blob | null
  thumbnailBlob: Blob | null
}
