import { useQuery } from "@tanstack/react-query"
import ms from "ms"
import platforms from "../data/platforms"
import APIClient from "../services/api-client"
// import platforms from "../assets/platforms.json" // for faking api

const apiClient = new APIClient<Platform>("/platforms/lists/parents")

export interface Platform {
  id: number
  name: string
  slug: string
}

// const usePlatforms = () => useData<Platform>("/platforms/lists/parents")  // use Data hook with axios
const usePlatforms = () =>
  useQuery({
    queryKey: ["platforms"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"), // 24h
    initialData: platforms,
  })

export default usePlatforms
