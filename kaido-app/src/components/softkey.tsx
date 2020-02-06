import { h } from "preact"
import { Flex, Heading } from "theme-ui"

type SoftKeyProps = {
  left: string
  center: string
  right: string
}

const SoftKey: preact.FunctionalComponent<SoftKeyProps> = ({ left, center, right }) => (
  <Flex as="nav" id="softkey" variant="kaiui.softkey">
    <Heading as="h5" variant="kaiui.h5">
      {left}
    </Heading>
    <Heading
      as="h5"
      variant="kaiui.h5"
      sx={{ width: `7.6rem`, fontWeight: `bold`, textTransform: `uppercase`, textAlign: `center` }}
    >
      {center}
    </Heading>
    <Heading as="h5" variant="kaiui.h5" sx={{ textAlign: `right` }}>
      {right}
    </Heading>
  </Flex>
)

export default SoftKey
