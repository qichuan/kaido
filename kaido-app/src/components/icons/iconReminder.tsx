import { h } from "preact"
import { Box } from "theme-ui"

import SVG from "../svg"

export const IconReminder = (props: any) => (
  <Box sx={{ flex: `none`, p: 2 }}>
    <SVG {...props}>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <g transform="translate(1.000000, 2.000000)" stroke="#8C8C8C" strokeWidth="2">
          <g>
            <line x1="0.5992" y1="6.5" x2="0.5992" y2="11.5" id="Shape" />
            <line x1="18.5992" y1="0.25" x2="18.5992" y2="17.75" id="Shape" />
            <line x1="0.5992" y1="7.75" x2="18.5992" y2="1.5" id="Shape" />
            <line x1="0.5992" y1="10.25" x2="18.5992" y2="16.5" id="Shape" />
            <path d="M4.1008,11.4658333 L4.1008,11.5 C4.16980781,13.8490928 5.64179202,15.9024427 7.78445843,16.6385332 C9.92712484,17.3746236 12.2829741,16.6362857 13.68,14.7908333" />
          </g>
        </g>
      </g>
    </SVG>
  </Box>
)
