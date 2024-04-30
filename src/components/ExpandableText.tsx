import { Button, Text } from "@chakra-ui/react"
import { useState } from "react"

interface Props {
  children: string
}

const ExpandableText = ({ children }: Props) => {
  const [expanded, setExpanded] = useState(false)
  const charLimit = 300

  if (children.length <= charLimit) return <Text>{children}</Text>

  if (!children) return null

  const summary = expanded ? children : `${children.substring(0, charLimit)}...`

  return (
    <Text>
      {summary}
      <Button
        size={"xs"}
        marginLeft={1}
        fontWeight={"bold"}
        colorScheme="yellow"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Show less" : "Read more"}
      </Button>
    </Text>
  )
}

export default ExpandableText
