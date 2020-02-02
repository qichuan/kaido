import { base } from "./base"

/**
 * Gaia theme variables
 */

const baseColors = {
  transparent: `transparent`,
  black: `#000`,
  white: `#fff`,
  gray: [null, `#e6e6e6`, `#cccccc`, `#8c8c8c`, `#6a6a6a`, `#323232`],
  purple: [null, `#873eff`, `#6c32cc`, `#320374`],
}

const commonButtonStyles = {
  background: `none`,
  cursor: `pointer`,
  overflow: `hidden`,
  border: `none`,
  borderRadius: 0,
  outline: `none`,
  boxShadow: `none`,
}

export const colors = {
  ...baseColors,
  text: baseColors.gray[5],
  textInvert: baseColors.white,
  background: baseColors.white,
  primary: baseColors.purple[1],
  secondary: baseColors.purple[2],
  tertiary: baseColors.purple[3],
  muted: baseColors.gray[1],
  gray20: baseColors.gray[2],
  gray40: baseColors.gray[3],
}

/**
 * In global.css set the base font size is 10px
 * 1rem == 10px: https://developer.kaiostech.com/design-guide/ui-component
 * */

export const sizes = {
  0: `0`,
  full: `100%`,
  headerHeight: `2.8rem`,
  softKeyHeight: `3rem`,
  buttonHeight: `3.6rem`,
  screenHeight: `100vh`,
  screenWidth: `100vw`,
}

export const kaiui = {
  p: {
    btn: {
      fontSize: 5,
      fontWeight: `body`,
    },
  },
  header: {
    alignItems: `center`,
    height: `headerHeight`,
    backgroundColor: `tertiary`,
    h1: {
      width: `full`,
      color: `textInvert`,
      px: 3,
      textAlign: `center`,
    },
  },
  softkey: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`,
    height: `softKeyHeight`,
    bg: `gray20`,
    textTransform: `capitalize`,
    p: 2,
    text: {
      ...base.styles.h5,
      width: `7.2rem`,
      overflow: `hidden`,
    },
  },
  menu: {
    options: {
      position: `absolute`,
      flexDirection: `column`,
      zIndex: 50,
    },
    overlay: {
      position: `fixed`,
      bg: `primary`,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 40,
    },
  },
  buttons: {
    primary: {
      ...commonButtonStyles,
      display: `flex`,
      flexDirection: `row`,
      alignItems: `center`,
      justifyContent: `center`,
      height: `buttonHeight`,
      width: `full`,
      lineHeight: `inherit`,
      bg: `gray20`,
      "&:focus": {
        color: `textInvert`,
        bg: `primary`,
      },
    },
  },
}

export default {
  ...base,
  colors,
  sizes,
  kaiui,
}
