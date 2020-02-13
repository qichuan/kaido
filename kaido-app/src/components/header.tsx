import { h } from "preact"
import { memo } from "preact/compat"
import { Flex, Heading } from "theme-ui"

type HeaderProps = {
  text: string
}

const Header = ({ text }: HeaderProps) => (
  <Flex as="header" variant="kaiui.header">
    <Heading as="h1" variant="kaiui.h1">
      {text}
    </Heading>
  </Flex>
)

export default memo(Header)
