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
        d="M78.5 44.956L27.124 70.31v51.571L78.5 147.667l51.376-25.785v-51.57L78.5 44.955z"
        fill="#F1D540"
      />
      <Path
        d="M78.5 36.76L27.124 62.117v51.57L78.5 139.472l51.376-25.786v-51.57L78.5 36.76z"
        fill="#FFEF39"
      />
      <Path
        opacity={0.553}
        d="M78.5 16L27.124 41.356v51.57L78.5 118.71l51.376-25.785v-51.57L78.5 16z"
        fill="#E8CC8F"
      />
      <Path
        opacity={0.553}
        d="M78.5 65.267L27.124 41.131v51.72l51.376 25.86 51.376-25.86v-51.72L78.5 65.267z"
        fill="#FC0"
      />
    </Svg>
  )
}

export default SvgComponent
