import { h } from "preact"
import { memo } from "preact/compat"
import { Box, Text, Button as UIButton } from "theme-ui"

type ButtonProps = {
  name: string
  text: string
}

const Button = ({ name, text }: ButtonProps) => (
  <Box sx={{ m: 3 }}>
    <UIButton data-nav-selectable name={name} variant="kaiui.button.primary">
      <Text as="p" variant="kaiui.p.btn">
        {text}
      </Text>
    </UIButton>
  </Box>
)

export default memo(Button)
