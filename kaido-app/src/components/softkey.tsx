import { h } from "preact"
import { useContext } from "preact/hooks"
import { Flex, Heading } from "theme-ui"

import { UIComponentsContext } from "../contexts"

const SoftKey: preact.FunctionalComponent = () => {
  const { texts } = useContext(UIComponentsContext)

  return (
    <Flex as="nav" id="softkey" variant="kaiui.softkey">
      <Heading as="h5" variant="kaiui.softkey.text">
        {texts.softKeys[0]}
      </Heading>
      <Heading
        as="h5"
        variant="kaiui.softkey.text"
        sx={{ width: `7.6rem`, fontWeight: `bold`, textTransform: `uppercase`, textAlign: `center` }}
      >
        {texts.softKeys[1]}
      </Heading>
      <Heading as="h5" variant="kaiui.softkey.text" sx={{ textAlign: `right` }}>
        {texts.softKeys[2]}
      </Heading>
    </Flex>
  )
}

export default SoftKey
