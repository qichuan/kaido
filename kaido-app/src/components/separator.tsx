import { h } from "preact"
import { Box, Styled } from "theme-ui"

const Separator: preact.FunctionalComponent<{ text: string }> = ({ text }) => (
  <Box>
    <Styled.h4>{text}</Styled.h4>
  </Box>
)

export default Separator
