import { h } from "preact"
import { Box } from "theme-ui"

import SVG from "../svg"

export const IconCustomFolder = (props: any) => (
  <Box sx={{ flex: `none`, p: 2 }}>
    <SVG {...props}>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <g transform="translate(1.000000, 2.000000)" stroke="#8C8C8C" strokeWidth="2">
          <g>
            <path
              d="M0.624166667,12.75 L13.9225,12.75 C14.5413005,12.750276 15.0671717,12.2977574 15.1591667,11.6858333 L16.715,1.31416667 C16.806948,0.702555127 17.3323488,0.250136501 17.9508333,0.25 L19.3741667,0.25"
              id="Shape"
            />
            <rect id="Rectangle-path" x="0.874166667" y="4.25" width="5" height="5" rx="0.75" />
            <rect id="Rectangle-path" x="5.87416667" y="1.75" width="6.25" height="7.5" rx="0.75" />
            <circle id="Oval" cx="3.43666667" cy="16.1875" r="1.5625" />
            <circle id="Oval" cx="12.1866667" cy="16.1875" r="1.5625" />
          </g>
        </g>
      </g>
    </SVG>
  </Box>
)
