import {
  Button,
  HStack,
  Heading,
  Image,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react"
import useGenres from "../hooks/useGenres"
import getCroppedImage from "../services/image-url"
import useGameQueryStore from "../store"

function GenreList() {
  const { data, isLoading, error } = useGenres()
  const selectedGenre = useGameQueryStore((s) => s.gameQuery.genreId)
  const setSelectedGenreId = useGameQueryStore((s) => s.setGenreId)

  if (isLoading) return <Spinner />
  if (error) return null

  return (
    <>
      <Heading fontSize={"2xl"} marginTop={9} marginBottom={3}>
        Genres
      </Heading>
      <List>
        {data?.results.map((genre) => (
          <ListItem key={genre.id} paddingY={"5px"}>
            <HStack>
              <Image
                boxSize={"32px"}
                borderRadius={8}
                objectFit={"cover"}
                src={getCroppedImage(genre.image_background)}
              />
              <Button
                whiteSpace={"normal"}
                textAlign={"left"}
                fontWeight={genre.id === selectedGenre ? "bold" : "normal"}
                colorScheme={genre.id === selectedGenre ? "green" : ""}
                onClick={() => {
                  setSelectedGenreId(genre.id)
                }}
                fontSize={"lg"}
                variant={"link"}
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default GenreList
