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

const fullFillArea = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
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
  black: baseColors.black,
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
  itemHeight: `6rem`,
  menuItemHeight: `4.8rem`,
  separatorHeight: `2rem`,
  screenHeight: `100vh`,
  screenWidth: `100vw`,
}

export const kaiui = {
  h1: {
    ...base.styles.h1,
  },
  h2: {
    ...base.styles.h2,
  },
  h3: {
    ...base.styles.h3,
  },
  h4: {
    ...base.styles.h4,
  },
  h5: {
    ...base.styles.h5,
  },
  p: {
    pri: {
      fontSize: 5,
      fontWeight: `body`,
    },
    sec: {
      fontSize: 3,
      fontWeight: `body`,
    },
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
    h5: {
      width: `7.2rem`,
      overflow: `hidden`,
    },
  },
  menu: {
    ...fullFillArea,
    position: `fixed`,
    mb: sizes.softKeyHeight,
    options: {
      width: `full`,
      position: `absolute`,
      flexDirection: `column`,
      bottom: 0,
      zIndex: 50,
      bg: `background`,
    },
    overlay: {
      ...fullFillArea,
      position: `absolute`,
      bg: `black`,
      zIndex: 40,
      opacity: 0.8,
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
      color: `text`,
      bg: `gray20`,
      "&[data-nav-selected='true']": {
        color: `textInvert`,
        bg: `primary`,
      },
    },
  },
  item: {
    display: `flex`,
    alignItems: `center`,
    height: `itemHeight`,
    bg: `background`,
    p: 3,
    "&[data-nav-selected='true']": {
      color: `textInvert`,
      bg: `primary`,
    },
  },
  separator: {
    alignItems: `center`,
    height: `separatorHeight`,
    bg: `gray20`,
    p: 3,
  },
}

export default {
  ...base,
  colors,
  sizes,
  kaiui,
}
