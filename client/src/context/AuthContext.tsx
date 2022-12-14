import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import { useNavigate } from "react-router"
import { RegisterInputClientType } from "src/pages/auth-page/utils/validation"
import { trpc } from "src/utils/trpc"
import { IUser } from "../../../server/src/models/User"

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
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [user, setUser] = useState<IUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<string | null>(null)
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const authRefresh = trpc.useQuery(["auth.refresh"], {
    retry: 1,
    enabled: false,
    onSuccess: (data) => {
      localStorage.setItem("token", data)
      setIsAuthenticated(data)
      queryClient.invalidateQueries(["users.get-me"])
    },
    onError: (err) => {
      console.log(err, "['auth.refresh']: onError")
      setIsAuthenticated(null)
      setUser(null)
      navigate("/auth", { replace: true })
    },
  })

  const authLogin = trpc.useMutation(["auth.login"], {
    onSuccess: async (data) => {
      localStorage.setItem("token", data.token)
      setIsAuthenticated(data.token)
      setUser(data.user)
    },
    onError: (err) => handleTRPCError(err.message),
  })

  const authRegister = trpc.useMutation(["auth.register"], {
    onSuccess: async (data) => {
      await login(data)
    },
    onError: (err) => handleTRPCError(err.message),
  })

  const {
    data,
    refetch: refetchMe,
    isLoading: meIsLoading,
    isFetching,
  } = trpc.useQuery(["users.get-me"], {
    enabled: !!isAuthenticated,
    retry: 1,
    onSuccess: async (data) => {
      console.log(data, "['users.get-me']: onSuccess")
      setUser(data)
    },
    onError: (error) => {
      console.log(error, "['auth.get-me']: onError")
      let retryRequest = true

      if (error.message.includes("you must be logged in") && retryRequest) {
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
        console.log(data, "LOGIN MUTATE SSUCCESSS")
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

  const handleTRPCError = (_message: string) => {
    if (_message.charAt(0) === "[") {
      const parseError = JSON.parse(_message)
      setError(parseError[0].message)
    } else {
      setError(_message)
    }
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
