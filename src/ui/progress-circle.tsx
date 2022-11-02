import React, { ReactNode } from 'react'
import { View } from 'react-native'
import Svg, { Circle } from 'react-native-svg'

interface Props {
  percent: number
  radius: number
  color: string
  shadowColor: string
  borderWidth: number
  bgColor: string
  children: ReactNode
}

export function ProgressCircle({ percent, radius, color, shadowColor, borderWidth, bgColor, children }: Props) {
  const r = 100 / (2 * Math.PI)
  return (
    <View
      style={{
        height: radius * 2,
        width: radius * 2,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg height='100%' width='100%' viewBox='0 0 42 42'>
        <Circle cx={21} cy={21} r={r} fill={bgColor} />
        <Circle cx={21} cy={21} r={r} fill='transparent' stroke={shadowColor} strokeWidth={borderWidth} />
        <Circle
          cx={21}
          cy={21}
          r={r}
          fill='transparent'
          stroke={color}
          strokeWidth={borderWidth}
          strokeDasharray={`${percent} ${100 - percent}`}
          strokeDashoffset='25'
        />
      </Svg>
      <View style={{ position: 'absolute' }}>{children}</View>
    </View>
  )
}
