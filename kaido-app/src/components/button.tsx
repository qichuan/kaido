import { h } from "preact"
import { useRef, useContext, useEffect } from "preact/hooks"
import { Box, Text, Button as UIButton } from "theme-ui"

import { AppContext } from "../contexts"
import { useFocus } from "../hooks"

type ButtonProps = {
  name: string
  text: string
  onClick: () => void
}

const Button: preact.FunctionalComponent<ButtonProps> = ({ name, text, onClick }: ButtonProps) => {
  const { dispatch } = useContext(AppContext)
  const forwardedRef = useRef<HTMLButtonElement | null>(null)

  const handleFocusChange = (isNowFocused: boolean) => undefined

  // const isFocused = useFocus(forwardedRef, handleFocusChange, false)

  useEffect(() => {
    const selectedRef = forwardedRef.current!.getAttribute(`data-nav-selected`)

    if (selectedRef && selectedRef === `true`) {
      dispatch({
        type: `SET_SOFTKEY_TEXTS`,
        layoutTexts: {
          softKeys: [``, `Select`, ``],
        },
      })
    }
  }, [forwardedRef.current])

  return (
    <Box sx={{ m: 3 }}>
      <UIButton
        name={name}
        ref={forwardedRef}
        onClick={onClick}
        onFocus={() => handleFocusChange(true)}
        onBlur={() => handleFocusChange(false)}
        data-nav-selectable
        variant="kaiui.buttons.primary"
      >
        <Text as="p" variant="kaiui.p.btn">
          {text}
        </Text>
      </UIButton>
    </Box>
  )
}

export default Button
