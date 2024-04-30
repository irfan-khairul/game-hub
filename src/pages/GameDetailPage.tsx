import { Heading, Spinner } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import ExpandableText from "../components/ExpandableText"
import GameAtrributes from "../components/GameAtrributes"
import useGame from "../hooks/useGame"
import GameTrailer from "../components/GameTrailer"

const GameDetailPage = () => {
  const { slug } = useParams()
  const { data: game, isLoading, error } = useGame(slug!)
  // console.log(game)

  if (isLoading) return <Spinner />
  if (error || !game) throw error
  return (
    <>
      <Heading>{game.name}</Heading>
      <ExpandableText>{game.description_raw}</ExpandableText>
      <GameAtrributes game={game} />
      <GameTrailer gameId={game.id} />
    </>
  )
}

export default GameDetailPage
