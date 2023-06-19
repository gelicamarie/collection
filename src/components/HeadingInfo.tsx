import React from 'react'
import { Circle } from './Circle'
import { format, toDate } from 'date-fns'

export const HeadingInfo = ({
  publicAddress,
  lastTxnTimestamp,
}: {
  publicAddress: string
  lastTxnTimestamp: number
}) => {
  const lastTxnDate = format(toDate(lastTxnTimestamp * 1000), 'p MMM dd, yy')
  return (
    <div className="flex mx-auto items-center bg-base-700 rounded-full px-2 md:px-4 py-1 md:py-2 gap-3 max-w-md">
      <span className="flex-shrink-0">
        <Circle publicAddress={publicAddress} size={28} />
      </span>
      <div className="font-title uppercase bg-base-600 px-2.5 py-1 md:py-1.5 rounded-md opacity-70 text-xxs md:text-xs">
        gelica.eth
      </div>
      <p className="hidden md:block whitespace-nowrap overflow-hidden font-title text-xs opacity-70">
        last seen on chain on {lastTxnDate}
      </p>
    </div>
  )
}
