import { useEffect, useState } from "react"
import apiClient from "../services/api-client"
import { CanceledError } from "axios"
import fakeApi from "../services/fake-api"

interface Genre {
  id: number
  name: string
}

interface FetchGenresResponse {
  count: number
  results: Genre[]
}

export default function useGenres() {
  const [genres, setGenres] = useState<Genre[]>([])
  const [error, setError] = useState("")
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    setLoading(true)
    apiClient
      .get<FetchGenresResponse>("/genres", { signal: controller.signal })
      .then((res) => {
        setLoading(false)
        setGenres(res.data.results)
      })
      .catch((err) => {
        if (err instanceof CanceledError) return
        if (err.response.status === 404) {
          // console.clear()
          console.error("GET method failed. Revert to fake-api.ts")
          console.error("To resolve, please check BaseURL in api-client.ts")
          setLoading(false)
          return setGenres(fakeApi)
        }
        setError(err.message)
        setLoading(false)
      })

    return () => controller.abort()
  }, [])

  return { genres, error, isLoading }
}
