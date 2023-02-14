import { inferReactQueryProcedureOptions } from "@trpc/react-query"
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"

import type { AppRouter } from "@flowreborn-packages/server"

type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>
type RouterInputs = inferRouterInputs<AppRouter>
type RouterOutput = inferRouterOutputs<AppRouter>

type GetSongOptions = ReactQueryOptions["songs"]["getSong"]
type GetSongInput = RouterInputs["songs"]["getSong"]

export type ISongPopulatedUserAndComments = RouterOutput["songs"]["getSongPopulated"]
export type ISearch = RouterOutput["songs"]["search"]
export type ISongPopulatedUser = RouterOutput["songs"]["getSongPopulatedUser"]
export type IUser = RouterOutput["users"]["getUser"]
export type ISong = RouterOutput["songs"]["getSong"]
export type IComment = RouterOutput["comments"]["getCommentPopulatedUser"]
export type ICommentPopulatedUserAndReplies = RouterOutput["comments"]["getComment"]

export type IAuth = RouterOutput["auth"]["login"]
