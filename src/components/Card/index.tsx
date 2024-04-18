import React from 'react'
import { NFTCard } from './NFTCard'
import Image from 'next/image'
import { Circle } from '../Circle'
import { shortenHash } from '@/utils/shortenHash'

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
    <div
      className="flex flex-col gap-3 cursor-default w-40         sm:w-72
    xl:w-[400px]"
    >
      <NFTCard img={nftImage} name={name} />
      <div className="flex gap-4 items-center">
        <div className="w-5 h-5 md:w-7 md:h-7 relative ">
          {!!contractAddress ? (
            <Circle publicAddress={contractAddress} size={28} />
          ) : (
            <Circle
              publicAddress={Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}
              size={28}
            />
          )}
        </div>
        <h3 className="font-base font-medium text-xxs  md:text-sm text-slate-50 line-clamp-2">{description}</h3>
      </div>
    </div>
  )
}
