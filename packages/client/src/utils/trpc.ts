import type { AppRouter } from "@flowreborn-packages/server"
import { createTRPCReact } from "@trpc/react-query"

export const trpc = createTRPCReact<AppRouter>()

export const trpcZodErrorHandler = (_message: string) => {
  if (_message.charAt(0) === "[") {
    const parseError = JSON.parse(_message)
    return parseError[0].message
  } else {
    return _message
  }
}
