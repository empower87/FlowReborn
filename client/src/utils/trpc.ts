import { createReactQueryHooks } from "@trpc/react"
import { AppRouter } from "../../../server/src/routes/app.router"

export const trpc = createReactQueryHooks<AppRouter>()

export const trpcZodErrorHandler = (_message: string) => {
  if (_message.charAt(0) === "[") {
    const parseError = JSON.parse(_message)
    return parseError[0].message
  } else {
    return _message
  }
}
