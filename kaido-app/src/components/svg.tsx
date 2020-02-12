import { h } from "preact"
import { memo } from "preact/compat"
import { Box } from "theme-ui"

const SVG = ({ width = 22, height = 22, ...props }) => (
  <Box
    as="svg"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="currentcolor"
    {...props}
  />
)

export default memo(SVG)
