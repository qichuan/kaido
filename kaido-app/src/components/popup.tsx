import { h } from "preact"
import { Box, Container } from "theme-ui"

export const Popup = ({ component, props, options, style }) => {
  if (component) {
    let contentClasses = `popup-content`
    if (options && options.mode === `fullscreen`) {
      contentClasses += ` fullscreen`
    }
    return (
      <Box className={contentClasses} sx={style}>
        {h(component, props)}
      </Box>
    )
  }
}

export const PopupContainer = ({ popups }) => {
  if (popups.length === 0) {
    return ``
  }
  let zIndex = 100
  const nextZIndex = () => {
    zIndex += 2
    return zIndex
  }
  // The shader is just before the last popup
  const shaderZIndex = 100 + popups.length * 2 - 1
  return (
    <Container id="popup" variant="kaiui.popup">
      <Container variant="kaiui.popup.content" sx={{ zIndex: shaderZIndex + 1 }}>
        {popups.map(popup => {
          return <Popup {...popup} key={popup.id} style={{ zIndex: nextZIndex() }} />
        })}
      </Container>
      <Box id="popup-shader" variant="kaiui.popup.shader" sx={{ zIndex: shaderZIndex }} />
    </Container>
  )
}
