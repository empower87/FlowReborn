// import { createReactQueryHooks } from "@trpc/react"
import { createTRPCReact } from "@trpc/react-query"

// import type { AppRouter } from "server"
// import type { AppRouter } from "../../../server/src/routes/app.router"
import type { AppRouter } from "@server/app.router"

export const trpc = createTRPCReact<AppRouter>()
// export const trpc = createReactQueryHooks<AppRouter>()

export const trpcZodErrorHandler = (_message: string) => {
  if (_message.charAt(0) === "[") {
    const parseError = JSON.parse(_message)
    return parseError[0].message
  } else {
    return _message
  }
}
