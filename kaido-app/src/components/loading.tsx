import { h } from "preact"
import { memo } from "preact/compat"

import SVG from "./svg"
import { Container } from "theme-ui"

const Loading = (props: any) => (
  <Container sx={{ p: 1, textAlign: `center` }}>
    <SVG width="220" height="100" {...props}>
      <title id="loading-aria">Loading...</title>
      <rect x="0" y="0" width="100%" height="100%" clipPath="url(#clip-path)" style="fill: url('#fill');" />
      <defs>
        <clipPath id="clip-path">
          <circle cx="10" cy="20" r="8" />
          <rect x="25" y="15" rx="5" ry="5" width="220" height="10" />
          <circle cx="10" cy="50" r="8" />
          <rect x="25" y="45" rx="5" ry="5" width="220" height="10" />
          <circle cx="10" cy="80" r="8" />
          <rect x="25" y="75" rx="5" ry="5" width="220" height="10" />
        </clipPath>
        <linearGradient id="fill">
          <stop offset="0.599964" stopColor="#f3f3f3" stopOpacity="1">
            <animate
              attributeName="offset"
              values="-2; -2; 1"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="1.59996" stopColor="#ecebeb" stopOpacity="1">
            <animate
              attributeName="offset"
              values="-1; -1; 2"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="2.59996" stopColor="#f3f3f3" stopOpacity="1">
            <animate attributeName="offset" values="0; 0; 3" keyTimes="0; 0.25; 1" dur="2s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
    </SVG>
  </Container>
)

export default memo(Loading)
