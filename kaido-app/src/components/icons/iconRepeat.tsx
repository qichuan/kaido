import { h } from "preact"
import { Box } from "theme-ui"

import SVG from "../svg"

export const IconRepeat = (props: any) => (
  <Box sx={{ flex: `none`, p: 2 }}>
    <SVG {...props}>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <g transform="translate(1.000000, 1.000000)" stroke="#8C8C8C">
          <g>
            <path
              d="M19.28,7.79 L17.07,10 C15.1099114,11.9073723 11.9810358,11.8859566 10.0472397,9.95193258 C8.11344358,8.01790853 8.09239671,4.88903048 10,2.92916667 L12.2091667,0.719166667"
              id="Shape"
              strokeWidth="2"
            />
            <path
              d="M7.78916667,19.2808333 L10,17.0708333 C11.9525567,15.1180465 11.9523702,11.95214 9.99958333,9.99958333 C8.04679651,8.04702662 4.88089004,8.04721317 2.92833333,10 L0.718333333,12.21"
              id="Shape"
              strokeWidth="1.5"
            />
            <line x1="18.8383333" y1="8.2325" x2="11.7675" y2="1.16083333" id="Shape" strokeWidth="2" />
            <line x1="17.07" y1="10" x2="9.99916667" y2="2.92916667" id="Shape" strokeWidth="1.5" />
            <line x1="12.2091667" y1="8.67416667" x2="8.705" y2="5.17" id="Shape" strokeWidth="1.5" />
            <path
              d="M0.718333333,12.21 L2.92833333,10 C4.88089004,8.04721317 8.04679651,8.04702662 9.99958333,9.99958333 C11.9523702,11.95214 11.9525567,15.1180465 10,17.0708333 L7.78916667,19.2808333"
              id="Shape"
              strokeWidth="2"
            />
            <line x1="1.16083333" y1="11.7675" x2="8.23166667" y2="18.8391667" id="Shape" strokeWidth="2" />
            <line x1="2.92833333" y1="10" x2="9.99916667" y2="17.0708333" id="Shape" strokeWidth="1.5" />
            <line x1="7.78916667" y1="11.3258333" x2="11.2941667" y2="14.83" id="Shape" strokeWidth="1.5" />
          </g>
        </g>
      </g>
    </SVG>
  </Box>
)
