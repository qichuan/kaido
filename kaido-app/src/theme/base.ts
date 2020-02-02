// From @theme-ui/preset-base
// https://github.com/system-ui/theme-ui/tree/master/packages/preset-base
const heading = {
  color: `text`,
  fontFamily: `heading`,
  lineHeight: `heading`,
  fontWeight: `heading`,
}

const baseFontWeights = {
  light: `300`,
  normal: `400`,
  semibold: `600`,
  bold: `700`,
}

export const zIndices = {
  auto: `auto`,
  0: `0`,
  10: `10`,
  20: `20`,
  30: `30`,
  40: `40`,
  50: `50`,
}

export const base = {
  ...zIndices,
  space: [0, `0.25rem`, `0.5rem`, `1rem`, `2rem`, `4rem`, `8rem`, `16rem`, `32rem`],
  fonts: {
    body: `"Open Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`,
    heading: `inherit`,
    monospace: `Menlo, monospace`,
  },
  fontSizes: [`1.2rem`, `1.4rem`, `1.4rem`, `1.4rem`, `1.7rem`, `1.7rem`],
  fontWeights: {
    ...baseFontWeights,
    body: baseFontWeights.normal,
    heading: baseFontWeights.light,
    bold: baseFontWeights.bold,
  },
  lineHeights: {
    body: 1,
    heading: 1,
  },
  styles: {
    root: {
      fontFamily: `body`,
      lineHeight: `body`,
      fontWeight: `body`,
    },
    h1: {
      ...heading,
      fontSize: 5,
    },
    h2: {
      ...heading,
      fontSize: 4,
    },
    h3: {
      ...heading,
      fontSize: 3,
    },
    h4: {
      ...heading,
      fontSize: 2,
    },
    h5: {
      ...heading,
      fontSize: 1,
      fontWeight: `600`, // Ugly, but will fix later
    },
    h6: {
      ...heading,
      fontSize: 0,
    },
    p: {
      color: `text`,
      fontFamily: `body`,
      fontWeight: `body`,
      lineHeight: `body`,
    },
    a: {
      color: `primary`,
    },
    pre: {
      fontFamily: `monospace`,
      overflowX: `auto`,
      code: {
        color: `inherit`,
      },
    },
    code: {
      fontFamily: `monospace`,
      fontSize: `inherit`,
    },
    table: {
      width: `100%`,
      borderCollapse: `separate`,
      borderSpacing: 0,
    },
    th: {
      textAlign: `left`,
      borderBottomStyle: `solid`,
    },
    td: {
      textAlign: `left`,
      borderBottomStyle: `solid`,
    },
    img: {
      maxWidth: `100%`,
    },
  },
}

export default base
