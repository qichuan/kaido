import { h } from "preact"
import { Link } from "preact-router/match"
import { Flex, Styled } from "theme-ui"

type HeaderProps = {
  text: string
}

const Header: preact.FunctionalComponent<HeaderProps> = ({ text }: HeaderProps) => (
  <Flex variant="kaiui.header">
    <Styled.h1 sx={{ variant: `kaiui.header.h1` }}>{text}</Styled.h1>
    <p>
      <Link href="/">Home</Link>
      <Link href="/profile">Me</Link>
    </p>
  </Flex>
)

export default Header
