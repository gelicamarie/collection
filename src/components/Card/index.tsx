import React from 'react'
import { NFTCard } from './NFTCard'
import Image from 'next/image'
import { Circle } from '../Circle'

export const Card = ({
  contractImage,
  name,
  nftImage,
  contractAddress,
  creatorName,
}: {
  contractImage?: string
  name: string
  nftImage: string
  contractAddress?: string
  creatorName?: string
}) => {
  return (
    <div className="flex flex-col gap-3 cursor-default">
      <NFTCard img={nftImage} name={name} />
      <div className="flex gap-2 items-center">
        <div className="w-5 h-5 md:w-7 md:h-7 relative ">
          {!!contractImage ? (
            <Image
              src={contractImage}
              alt={name}
              fill
              className="rounded-full object-cover"
              quality={100}
              sizes="28px"
            />
          ) : !!contractAddress ? (
            <Circle publicAddress={contractAddress} size={28} />
          ) : (
            <Circle
              publicAddress={Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}
              size={28}
            />
          )}
        </div>
        <h3 className="font-base font-medium text-xxs  md:text-sm text-slate-50">{creatorName}</h3>
      </div>
    </div>
  )
}
