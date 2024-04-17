import useData from "./useData"
import platforms from "../assets/platforms.json" // for faking api

interface Platform {
  id: number
  name: string
  slug: string
}

const usePlatforms = () => useData<Platform>("/platforms/lists/parents")

export default usePlatforms
