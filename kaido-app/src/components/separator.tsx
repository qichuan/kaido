import { h } from "preact"
import { Flex, Heading } from "theme-ui"

const Separator: preact.FunctionalComponent<{ text: string }> = ({ text }) => (
  <Flex variant="kaiui.separator">
    <Heading as="h4" variant="kaiui.h4">
      {text}
    </Heading>
  </Flex>
)

export default Separator
