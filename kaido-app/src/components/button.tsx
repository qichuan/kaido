/** @jsx jsx*/
import { h } from "preact"
import { useRef, useContext } from "preact/hooks"
import { Box, jsx } from "theme-ui"

import { UIComponentsContext } from "../contexts"
import { useFocus } from "../hooks"

type ButtonProps = {
  name: string
  text: string
  onClick: () => void
  softKeyText?: string
}

const Button: preact.FunctionalComponent<ButtonProps> = ({
  name,
  text,
  onClick,
  softKeyText = `select`,
}: ButtonProps) => {
  const { dispatch } = useContext(UIComponentsContext)

  const handleFocusChange = (isNowFocused: boolean) => {
    if (isNowFocused) {
      dispatch({
        type: `SET_SOFTKEY_TEXTS`,
        texts: {
          softKeys: [``, `Select`, ``],
        },
      })
    }
  }

  const forwardedRef = useRef<HTMLButtonElement | null>(null)

  // const isFocused = useFocus(forwardedRef, handleFocusChange, false)

  return (
    <Box sx={{ m: 3 }}>
      <button
        type="button"
        tabIndex={0}
        name={name}
        ref={forwardedRef}
        onClick={onClick}
        onFocus={() => handleFocusChange(true)}
        onBlur={() => handleFocusChange(false)}
        sx={{ variant: `kaiui.buttons.primary` }}
      >
        <p sx={{ variant: `kaiui.p.btn` }}>{text}</p>
      </button>
    </Box>
  )
}

export default Button
