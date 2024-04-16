import { useEffect, useState } from "react"
import apiClient from "../services/api-client"
import { CanceledError } from "axios"
// import fakeApi from "../services/fake-api"

interface FetchResponse<T> {
  count: number
  results: T[]
}

export default function useData<T>(endpoint: string) {
  const [data, setData] = useState<T[]>([])
  const [error, setError] = useState("")
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    setLoading(true)
    apiClient
      .get<FetchResponse<T>>(endpoint, { signal: controller.signal })
      .then((res) => {
        setLoading(false)
        setData(res.data.results)
      })
      .catch((err) => {
        if (err instanceof CanceledError) return
        // if (err.response.status === 404) {
        //   // console.clear()
        //   console.error(
        //     "GET method failed. Revert to fake-api.ts.",
        //     "To resolve, please check BaseURL in api-client.ts"
        //   )
        //   setLoading(false)
        //   return setData(fakeApi)
        // }
        setError(err.message)
        setLoading(false)
      })

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, error, isLoading }
}
