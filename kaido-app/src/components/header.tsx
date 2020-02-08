import { h } from "preact"
import { Flex, Heading } from "theme-ui"

type HeaderProps = {
  text: string
}

const Header: preact.FunctionalComponent<HeaderProps> = ({ text }: HeaderProps) => (
  <Flex as="header" variant="kaiui.header">
    <Heading as="h1" variant="kaiui.h1">
      {text}
    </Heading>
  </Flex>
)

export default Header
