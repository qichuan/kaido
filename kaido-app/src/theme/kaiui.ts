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
  position: `absolute`,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}

const textEllipsis = {
  overflow: `hidden`,
  textOverflow: `ellipsis`,
  wordWrap: `break-word`,
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
  inputHeight: `3.6rem`,
  itemHeight: `6rem`,
  itemSubHeight: `3.6rem`,
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
      ...textEllipsis,
      fontSize: 5,
      fontWeight: `body`,
      lineHeight: 1.3,
    },
    sec: {
      ...textEllipsis,
      fontSize: 3,
      fontWeight: `body`,
      lineHeight: 1.2,
    },
    btn: {
      fontSize: 5,
      fontWeight: `body`,
    },
  },
  layout: {
    ...fullFillArea,
    flexDirection: `column`,
    minHeight: `screenHeight`,
  },
  header: {
    alignItems: `center`,
    height: `headerHeight`,
    minHeight: `headerHeight`,
    width: `full`,
    minWidth: `full`,
    backgroundColor: `tertiary`,
    h1: {
      width: `full`,
      color: `textInvert`,
      px: 3,
      textAlign: `center`,
    },
  },
  popup: {
    position: `absolute`,
    height: `full`,
    minHeight: `full`,
    zIndex: 50,
    content: {
      position: `absolute`,
      bottom: 0,
      bg: `background`,
    },
    shader: {
      ...fullFillArea,
      bg: `black`,
      opacity: 0.8,
    },
  },
  softkey: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`,
    flexShrink: 0,
    whiteSpace: `no-wrap`,
    width: `full`,
    minWidth: `full`,
    height: `softKeyHeight`,
    maxHeight: `softKeyHeight`,
    bg: `gray20`,
    textTransform: `capitalize`,
    p: 2,
    h5: {
      width: `7.2rem`,
      overflow: `hidden`,
    },
  },
  button: {
    primary: {
      ...commonButtonStyles,
      display: `flex`,
      flexDirection: `row`,
      alignItems: `center`,
      justifyContent: `center`,
      height: `inputHeight`,
      maxHeight: `inputHeight`,
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
  input: {
    fontSize: 5,
    height: `inputHeight`,
    maxHeight: `inputHeight`,
    bg: `background`,
    borderRadius: 0,
  },
  list: {
    ...fullFillArea,
    zIndex: 40,
    overflowX: `hidden`,
    overflowY: `auto`,
  },
  item: {
    display: `flex`,
    alignItems: `center`,
    height: `itemHeight`,
    bg: `background`,
    p: 2,
    "&[data-nav-selected='true']": {
      color: `textInvert`,
      bg: `primary`,
    },
    "&[data-menu-selected='true']": {
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
