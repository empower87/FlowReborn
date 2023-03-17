import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { RegisterInputClientType } from "src/pages/auth-page/utils/validation"
import { trpc, trpcZodErrorHandler } from "src/utils/trpc"
// import { IUser } from "../../../server/src/models/User"
import { IUser } from "src/types/ServerModelTypes"

type AuthProviderType = ReturnType<typeof useProvideAuth>

const AuthUserContext = createContext<AuthProviderType>({
  user: null,
  login: (credentials: { username: string; password: string }) => Promise.resolve(),
  logout: () => {},
  register: (credentials: RegisterInputClientType) => Promise.resolve(),
  error: "",
  setError: () => "",
  isAuthenticated: null,
  isLoading: false,
})

const useProvideAuth = () => {
  // const queryClient = useQueryClient()
  const utils = trpc.useContext()
  const navigate = useNavigate()
  const [user, setUser] = useState<IUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<string | null>(null)
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const authRefresh = trpc.auth.refresh.useQuery(undefined, {
    retry: 1,
    enabled: false,
    onSuccess: (data) => {
      localStorage.setItem("token", data)
      setIsAuthenticated(data)
      // queryClient.invalidateQueries(["users.getMe"])
      utils.users.getMe.invalidate()
    },
    onError: (err) => {
      console.log(err, err.message, "['auth.refresh']: onError")
      setIsAuthenticated(null)
      setUser(null)
      navigate("/auth", { replace: true })
    },
  })

  const authLogin = trpc.auth.login.useMutation({
    onSuccess: async (data) => {
      console.log(data, "FUCK THIS YO")
      localStorage.setItem("token", data.token)
      setIsAuthenticated(data.token)
      setUser(data.user as IUser)
    },
    onError: (err) => {
      const message = trpcZodErrorHandler(err.message)
      setError(message)
    },
  })

  const authRegister = trpc.auth.register.useMutation({
    onSuccess: async (data) => {
      await login(data)
    },
    onError: (err) => {
      const message = trpcZodErrorHandler(err.message)
      setError(message)
    },
  })

  const {
    data,
    refetch: refetchMe,
    isLoading: meIsLoading,
    isFetching,
  } = trpc.users.getMe.useQuery(undefined, {
    enabled: !!isAuthenticated,
    retry: 1,
    onSuccess: async (data) => {
      console.log(data, "['users.get-me']: onSuccess")
      setUser(data)
    },
    onError: (error) => {
      console.log(error, error.message, "['auth.get-me']: onError")
      let retryRequest = true

      if (error.message.includes("you must be logged in") || (error.message.includes("jwt expired") && retryRequest)) {
        retryRequest = false

        try {
          setIsAuthenticated(null)
          authRefresh.refetch({ throwOnError: true })
        } catch (err: any) {
          console.log(err, "try/catch ['auth.refresh']: error")
          if (err.message.includes("refresh expired token")) {
            setUser(null)
            navigate("/auth")
          }
        }
      }
    },
  })

  const login = async (credentials: { username: string; password: string }) => {
    authLogin.mutate(credentials, {
      onSuccess: (data) => {
        console.log(data, "LOGIN MUTATE SUCCESS")
        navigate("/", { replace: true })
      },
    })
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setIsAuthenticated(null)
  }

  const register = async (credentials: RegisterInputClientType) => {
    authRegister.mutate(credentials)
  }

  useEffect(() => {
    if (isFetching || meIsLoading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [isFetching, meIsLoading])

  useEffect(() => {
    let getToken = localStorage.getItem("token")
    if (getToken) {
      setIsAuthenticated(getToken)
      const getMeHandler = async () => {
        await refetchMe()
      }
      getMeHandler()
    }
  }, [])

  return {
    user,
    login,
    logout,
    register,
    error,
    setError,
    isAuthenticated,
    isLoading,
  }
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const values = useProvideAuth()
  return <AuthUserContext.Provider value={values}>{children}</AuthUserContext.Provider>
}

function useAuth() {
  return useContext(AuthUserContext)
}

export { useAuth, AuthProvider }

