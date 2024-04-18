import React from 'react'
import { NFTCard } from './NFTCard'
import { Circle } from '../Circle'

export const Card = ({
  name,
  nftImage,
  contractAddress,
  description,
}: {
  name: string
  nftImage: string
  contractAddress?: string
  description?: string
}) => {
  return (
    <div className="flex flex-col gap-3 cursor-default w-40 sm:w-72 xl:w-[400px]">
      <NFTCard img={nftImage} name={name} />
      <div className="flex gap-2 md:gap-4 items-center">
        <div className="w-7 h-7 relative flex-shrink-0">
          {!!contractAddress ? (
            <Circle publicAddress={contractAddress} size={28} />
          ) : (
            <Circle
              publicAddress={Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}
              size={28}
            />
          )}
        </div>
        <h3 className="font-base font-medium text-xxs md:text-sm text-slate-50 line-clamp-2">{description}</h3>
      </div>
    </div>
  )
}
