import React, { Suspense, useState } from "react"
// import { QueryClient, QueryClientProvider } from "react-query"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { getFetch, httpBatchLink, loggerLink } from "@trpc/client"
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import Loading from "./components/loading/Loading"
import { AuthProvider } from "./context/AuthContext"
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

const PrivateRoutes = () => {
  const user = localStorage.getItem("token") == null ? false : true
  return user ? <Outlet /> : <Navigate to="/auth" replace />
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
      links: [
        loggerLink(),
        httpBatchLink({
          url:
            process.env.NODE_ENV === "production" ? "https://flow-reborn.vercel.app" : "http://localhost:5000/api/trpc",
          async fetch(input, init?) {
            const fetch = getFetch()
            return fetch(input, {
              ...init,
              credentials: "include",
            })
          },
          headers() {
            return {
              authorization: getAuthToken(),
            }
          },
        }),
      ],
    })
  )
  // const [trpcClient] = useState(() =>
  //   trpc.createClient({
  //     url:
  //       process.env.NODE_ENV === "production"
  //         ? // ? "https://iron-flow.herokuapp.com/api/trpc"git
  //           "https://flow-henna.vercel.app/api/trpc"
  //         : "http://localhost:5000/api/trpc",
  //     headers() {
  //       return { Authorization: getAuthToken() }
  //     },
  //   })
  // )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <BrowserRouter>
            <AuthProvider>
              <Suspense fallback={<Loading margin={0.5} isLoading={true} />}>
                <Routes>
                  {/* <Route element={<PublicRoutes />}>
                </Route> */}
                  <Route path="/auth" element={<Auth />} />
                  <Route element={<PrivateRoutes />}>
                    <Route path="/" element={<Home />} />
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
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={true} />
          </BrowserRouter>
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App
