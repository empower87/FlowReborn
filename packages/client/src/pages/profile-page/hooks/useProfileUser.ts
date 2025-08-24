import { useEffect, useState } from "react"
import { useAuth } from "src/context/AuthContext"
import { IUser } from "src/types/ServerModelTypes"
import { trpc } from "src/utils/trpc"

const useProfileUser = (id: string | undefined) => {
  const { user } = useAuth()
  const userId = id ? id : ""

  const getUser = trpc.users.getUser.useQuery(
    { _id: userId },
    {
      enabled: !!userId,
      refetchOnWindowFocus: false,
    }
  )

  const [thisUser, setThisUser] = useState<IUser>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (user && user._id === id) {
      setThisUser(user)
    }
  }, [user, id])

  useEffect(() => {
    if (user && user._id !== id) {
      const fetchUserByParams = async () => {
        try {
          const fetchedUser = await getUser.refetch({ throwOnError: true })
          setThisUser(fetchedUser.data)
        } catch (error) {
          console.error("Error fetching user: ", error)
        }
      }
      fetchUserByParams()
    }
  }, [user, id])

  useEffect(() => {
    if (getUser.isLoading || getUser.isFetching || typeof thisUser === "undefined") {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [thisUser, getUser.isLoading, getUser.isFetching])

  return { thisUser, isLoading }
}
export default useProfileUser
