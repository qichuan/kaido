import { h } from "preact"
import { Flex, Text } from "theme-ui"

type ItemSubProps = {
  text: string
  children: JSX.Element
}

const ItemSub = ({ text, children }: ItemSubProps) => (
  <Flex data-nav-selectable variant="kaiui.item" sx={{ height: `itemSubHeight` }}>
    {children}
    <Text as="p" variant="kaiui.p.sec">
      {text}
    </Text>
  </Flex>
)

export default ItemSub
