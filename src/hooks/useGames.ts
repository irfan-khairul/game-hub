import { useEffect, useState } from "react"
import apiClient from "../services/api-client"
import { CanceledError } from "axios"
// faking api to save request...
import fakeApi from "../assets/games.json"

interface Game {
  id: number
  name: string
}

interface FetchGameResponse {
  count: number
  results: Game[]
}

export default function useGames() {
  const [games, setGames] = useState<Game[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()

    apiClient
      .get<FetchGameResponse>("/games", { signal: controller.signal })
      .then((res) => {
        setGames(res.data.results)
      })
      .catch((err) => {
        if (err instanceof CanceledError) return
        if (err.response.status === 404) {
          console.clear()
          console.error("GET method failed")
          console.error("Reverted to fake-api.ts")
          return setGames(fakeApi)
        }
        setError(err.message)
      })

    return () => controller.abort()
  }, [])

  return { games, error }
}
