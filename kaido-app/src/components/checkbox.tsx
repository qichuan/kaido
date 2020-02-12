import { h, Fragment } from "preact"
import { memo } from "preact/compat"
import { Box } from "theme-ui"

import SVG from "./svg"

const CheckboxChecked = (props: any) => {
  switch (props.theme) {
    case `checkbox`:
      return (
        <SVG {...props}>
          <g fill="none" fillRule="nonzero" stroke="#8C8C8C" strokeWidth="2">
            <rect x="1" y="1" width="20" height="20" rx="9" />
            <polyline points="6 9.25964019 10.8299345 14 20 5" />
          </g>
        </SVG>
      )
    case `star`:
      return (
        <SVG {...props}>
          <polygon
            stroke="#8C8C8C"
            strokeWidth="2"
            fill="#8C8C8C"
            points="11 17 5.12214748 20.0901699 6.24471742 13.545085 1.48943484 8.90983006 8.06107374 7.95491503 11 2 13.9389263 7.95491503 20.5105652 8.90983006 15.7552826 13.545085 16.8778525 20.0901699"
          />
        </SVG>
      )
    default:
      break
  }
}

const CheckboxUnchecked = (props: any) => {
  switch (props.theme) {
    case `checkbox`:
      return (
        <SVG {...props}>
          <rect stroke="#8C8C8C" strokeWidth="2" fill="none" x="1" y="1" width="20" height="20" rx="9" />
        </SVG>
      )
    case `star`:
      return (
        <SVG {...props}>
          <polygon
            stroke="#8C8C8C"
            strokeWidth="2"
            fill="none"
            points="11 17 5.12214748 20.0901699 6.24471742 13.545085 1.48943484 8.90983006 8.06107374 7.95491503 11 2 13.9389263 7.95491503 20.5105652 8.90983006 15.7552826 13.545085 16.8778525 20.0901699"
          />
        </SVG>
      )
    default:
      break
  }
}

const CheckboxIcon = (props: any) => (
  <Fragment>
    <CheckboxChecked
      {...props}
      __css={{
        display: `none`,
        "input:checked ~ &": {
          display: `block`,
        },
      }}
    />
    <CheckboxUnchecked
      {...props}
      __css={{
        display: `block`,
        "input:checked ~ &": {
          display: `none`,
        },
      }}
    />
  </Fragment>
)

const Checkbox = ({ theme = `checkbox`, isChecked = false, sx = {}, variant = `` }) => (
  <Box sx={{ flex: `none`, p: 2 }}>
    <Box
      as="input"
      type="checkbox"
      checked={isChecked}
      sx={{
        position: `absolute`,
        opacity: 0,
        zIndex: -1,
        width: 1,
        height: 1,
        overflow: `hidden`,
      }}
    />
    <CheckboxIcon
      theme={theme}
      variant={variant}
      sx={sx}
      __css={{
        m: 2,
        borderRadius: 4,
        color: `gray`,
        "input:checked ~ &": {
          color: `primary`,
        },
        "input:focus ~ &": {
          color: `primary`,
          bg: `highlight`,
        },
      }}
    />
  </Box>
)

export default memo(Checkbox)
