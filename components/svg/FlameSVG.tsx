import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props:any) {
  return (
    <Svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 92.27 122.88"
      xmlSpace="preserve"
      enableBackground="new 0 0 92.27 122.88"
      {...props}
    >
      <Path
        d="M18.61 54.89C15.7 28.8 30.94 10.45 59.52 0c-17.5 22.71 14.92 47.31 16.71 70.89 4.19-7.15 6.57-16.69 7.04-29.45 21.43 33.62 3.66 88.57-43.5 80.67-4.33-.72-8.5-2.09-12.3-4.13C10.27 108.8 0 88.79 0 69.68 0 57.5 5.21 46.63 11.95 37.99c.9 8.46 2.82 14.77 6.66 16.9z"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#ec6f59"
      />
      <Path
        d="M33.87 92.58c-4.86-12.55-4.19-32.82 9.42-39.93.1 23.3 23.05 26.27 18.8 51.14 3.92-4.44 5.9-11.54 6.25-17.15 6.22 14.24 1.34 25.63-7.53 31.43-26.97 17.64-50.19-18.12-34.75-37.72.47 4.38 5.83 11.14 7.81 12.23z"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#fad15c"
      />
    </Svg>
  )
}

export default SvgComponent
