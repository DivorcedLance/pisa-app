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
        d="M80.5 44.956L29.124 70.31v51.571L80.5 147.667l51.376-25.785v-51.57L80.5 44.955z"
        fill="#70E2F7"
      />
      <Path
        d="M80.5 36.76L29.124 62.117v51.57L80.5 139.472l51.376-25.786v-51.57L80.5 36.76z"
        fill="#B2EBF2"
      />
      <Path
        opacity={0.7}
        d="M80.5 16L29.124 41.356v51.57L80.5 118.71l51.376-25.785v-51.57L80.5 16z"
        fill="#80DEEA"
      />
      <Path
        opacity={0.7}
        d="M80.5 65.267L29.124 41.131v51.72l51.376 25.86 51.376-25.86v-51.72L80.5 65.267z"
        fill="#4DD0E1"
      />
    </Svg>
  )
}

export default SvgComponent
