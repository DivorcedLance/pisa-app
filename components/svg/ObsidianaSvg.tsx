import * as React from "react"
import Svg, { Ellipse, Path } from "react-native-svg"

function SvgComponent(props:any) {
  return (
    <Svg
      width={160}
      height={164}
      viewBox="0 0 160 164"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Ellipse cx={80} cy={82} rx={80} ry={82} fill="#fff" />
      <Path
        d="M79.5 42.956L28.124 68.31v51.571L79.5 145.667l51.376-25.785v-51.57L79.5 42.955z"
        fill="#5F5F5F"
      />
      <Path
        d="M79.5 34.76L28.124 60.117v51.57L79.5 137.472l51.376-25.786v-51.57L79.5 34.76z"
        fill="#494949"
      />
      <Path
        opacity={0.553}
        d="M79.5 14L28.124 39.356v51.57L79.5 116.71l51.376-25.785v-51.57L79.5 14z"
        fill="#3A3A3A"
      />
      <Path
        opacity={0.553}
        d="M79.5 63.267L28.124 39.131v51.72l51.376 25.86 51.376-25.86v-51.72L79.5 63.267z"
        fill="#2E2E2E"
      />
    </Svg>
  )
}

export default SvgComponent
