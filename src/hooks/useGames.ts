import { GameQuery } from "../App"
import { useQuery } from "@tanstack/react-query"
import { Platform } from "./usePlatforms"
import APIClient, { FetchResponse } from "../services/api-client"
// import games from "../assets/games.json" // for faking api

const apiClient = new APIClient<Game>("/games")

export interface Game {
  id: number
  name: string
  background_image: string
  parent_platforms: { platform: Platform }[]
  metacritic: number
  rating_top: number
}

const useGames = (gameQuery: GameQuery) =>
  // useData<Game>(
  //   "/games",
  //   {
  //     params: {
  //       genres: gameQuery.genre?.id,
  //       parent_platforms: gameQuery.platform?.id,
  //       ordering: gameQuery.sortOrder,
  //       search: gameQuery.searchText,
  //     },
  //   },
  //   [gameQuery]
  // )
  useQuery<FetchResponse<Game>, Error>({
    queryKey: ["games", gameQuery],
    queryFn: () =>
      apiClient.getAll({
        params: {
          genres: gameQuery.genre?.id,
          parent_platforms: gameQuery.platform?.id,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
        },
      }),
  })

export default useGames
