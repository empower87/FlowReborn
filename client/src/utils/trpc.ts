import { createReactQueryHooks } from "@trpc/react"
import { AppRouter } from "../../../server/src/routes/app.router"

export const trpc = createReactQueryHooks<AppRouter>()
