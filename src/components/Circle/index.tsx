import React from 'react'
import { getColor } from './getColor'

export const Circle = ({ publicAddress, size = 30 }: { publicAddress: string; size?: number }) => {
  const from = getColor({ publicAddress, index: 0 })
  const to = getColor({ publicAddress, index: 1 })

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
      <defs>
        <linearGradient id={`circle-${publicAddress}`}>
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#circle-${publicAddress})`} />
    </svg>
  )
}
