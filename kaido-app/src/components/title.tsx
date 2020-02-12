import { h } from "preact"
import { memo } from "preact/compat"
import { Box, Heading } from "theme-ui"

type TitleProps = {
  text: string
}

const Title = ({ text }: TitleProps) => (
  <Box sx={{ display: `flex`, alignItems: `center`, bg: `gray20`, height: `buttonHeight`, p: 3 }}>
    <Heading as="h1" variant="kaiui.h1" sx={{ width: `full`, textAlign: `center` }}>
      {text}
    </Heading>
  </Box>
)

export default memo(Title)
