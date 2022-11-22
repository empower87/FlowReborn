import React, { Suspense, useEffect, useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import Loading from "./components/loading/Loading"
import { AuthProvider, useAuth } from "./context/AuthContext"
import Auth from "./pages/auth-page/Auth"
import Home from "./pages/home-page/Home"
import "./styles/style.css"
import { trpc } from "./utils/trpc"
const LazySearch = React.lazy(() => import("./pages/search-page/Search"))
const LazyEditProfile = React.lazy(() => import("./features/edit-profile/EditProfile"))
const LazyProfile = React.lazy(() => import("./pages/profile-page/Profile"))
const LazySongPage = React.lazy(() => import("./pages/song-page/SongPage"))
const LazyRecordingBooth = React.lazy(() => import("./features/recording-booth/RecordingBooth"))
const LazyPostRecording = React.lazy(() => import("./features/recording-post/PostRecording"))
const LazyEditLyrics = React.lazy(() => import("./features/edit-lyrics/EditLyrics"))

const getAuthToken = () => {
  const token = localStorage.getItem("token")!
  return `Bearer ${token}`
}

// const PrivateRoutes = () => {
//   const { isAuthenticated, isLoading } = useAuth()
//   if (isLoading) return <p>loading... </p>
//   return isAuthenticated !== null ? <Outlet /> : <Navigate to="/auth" />
// }
type PrivateRoutes = {
  children?: JSX.Element
}
const PrivateRoutes = () => {
  const { user } = useAuth()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [user])

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />
}

const PublicRoutes = () => {
  const { user, isLoading } = useAuth()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(true)
    }
  }, [user])
  if (isLoading) return <p>loading... </p>
  return !isAuthenticated ? <Navigate to={"/auth"} /> : <Outlet />
}

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  )
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url:
        process.env.NODE_ENV === "production"
          ? "https://iron-flow.herokuapp.com/api/trpc"
          : // "https://flow-henna.vercel.app/api/trpc"
            "http://localhost:5000/api/trpc",
      headers() {
        return { Authorization: getAuthToken() }
      },
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <div className="App">
            <Suspense fallback={<Loading margin={0.5} isLoading={true} />}>
              <Routes>
                {/* <Route element={<PublicRoutes />}>
                </Route> */}
                <Route element={<PrivateRoutes />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/profile/:id" element={<LazyProfile />} />
                  <Route path="/editProfile" element={<LazyEditProfile />} />
                  <Route path="/recording-booth" element={<LazyRecordingBooth />} />
                  <Route path="/post-recording" element={<LazyPostRecording />} />
                  <Route path="/editLyrics" element={<LazyEditLyrics />} />
                  <Route path="/songScreen/:id" element={<LazySongPage />} />
                  <Route path="/search" element={<LazySearch />} />
                </Route>
              </Routes>
            </Suspense>
          </div>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App
