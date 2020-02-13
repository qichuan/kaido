import { h } from "preact"
import { Box } from "theme-ui"

import SVG from "../svg"

export const IconDueDate = (props: any) => (
  <Box sx={{ flex: `none`, p: 2 }}>
    <SVG {...props}>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <g transform="translate(1.000000, 3.000000)" stroke="#8C8C80">
          <g>
            <rect id="Rectangle-path" strokeWidth="2" x="0.624166667" y="0.5" width="18.75" height="15" rx="1.5" />
            <line x1="0.624166667" y1="4.25" x2="19.3741667" y2="4.25" id="Shape" strokeWidth="1.5" />
            <line x1="16.8741667" y1="8" x2="11.8741667" y2="8" id="Shape" strokeWidth="1.5" />
            <line x1="14.3741667" y1="11.75" x2="11.8741667" y2="11.75" id="Shape" strokeWidth="1.5" />
            <line x1="6.24916667" y1="7.375" x2="6.24916667" y2="12.375" id="Shape" strokeWidth="1.5" />
            <line x1="3.74916667" y1="9.875" x2="8.74916667" y2="9.875" id="Shape" strokeWidth="1.5" />
          </g>
        </g>
      </g>
    </SVG>
  </Box>
)
