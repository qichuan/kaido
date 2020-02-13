import { h } from "preact"
import { Box, Text, Flex } from "theme-ui"
import Checkbox from "./checkbox"

type ItemProps = {
  type?: `singleLine` | `twoLines`
  checkbox?: `checkbox` | `star` | null
  checked?: boolean
  text: string
  subText?: string
  strike?: boolean
  children?: JSX.Element
}

const Item = ({
  type = `singleLine`,
  checkbox = null,
  checked = false,
  text,
  subText,
  strike,
  children,
}: ItemProps) => {
  const asTag = strike ? `s` : `p`
  // Line height for p.pri multiples 1.3, so single width is 1.7rem * 1.3 = 2.21rem
  const maxLineHeight = type === `singleLine` ? `4.4rem` : `2.2rem`
  return (
    <Flex data-nav-selectable variant="kaiui.item">
      {children}
      <Box sx={{ flex: `auto` }}>
        <Text as={asTag} variant="kaiui.p.pri" sx={{ maxHeight: maxLineHeight }}>
          {text}
        </Text>
        {type === `twoLines` && (
          <Text as="p" variant="kaiui.p.sec">
            {subText}
          </Text>
        )}
      </Box>
      {checkbox && <Checkbox theme={checkbox} isChecked={checked} />}
    </Flex>
  )
}

export default Item
