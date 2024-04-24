import { useQuery } from "@tanstack/react-query"
import platforms from "../data/platforms"
import apiClient, { FetchResponse } from "../services/api-client"
// import platforms from "../assets/platforms.json" // for faking api

export interface Platform {
  id: number
  name: string
  slug: string
}

// const usePlatforms = () => useData<Platform>("/platforms/lists/parents")  // use Data hook with axios
const usePlatforms = () =>
  useQuery({
    queryKey: ["platforms"],
    queryFn: () =>
      apiClient
        .get<FetchResponse<Platform>>("/platforms/lists/parents")
        .then((response) => response.data),
    staleTime: 24 * 60 * 60 * 1000, // 24h
    initialData: { count: platforms.length, results: platforms },
  })

export default usePlatforms
