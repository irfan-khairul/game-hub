import axios from "axios"

export interface FetchResponse<T> {
  count: number
  results: T[]
}

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "e75e3e42a52f40c7bf985273e6c23ebb",
  },
})
