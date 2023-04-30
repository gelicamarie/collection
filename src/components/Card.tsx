import React from 'react'
import Image from 'next/image'
import { NavigateArrow } from './icons/NavigateArrow'

export const Card = ({ img, name }: { img: string; name: string }) => {
  return (
    <div
      className="flex justify-center items-center mx-auto w-fit h-fit p-[1px] rounded-lg
      bg-[radial-gradient(55.28%_55.28%_at_0%_102.89%,_rgba(106,_123,_93,_0.2)_0%,_rgba(0,_0,_0,_0)_100%),radial-gradient(100%_99.98%_at_0%_0%,_rgba(255,_255,_255,_0.2)_0%,_rgba(106,_123,_93,_0.2)_100%)]"
    >
      <div className="flex w-fit h-fit rounded-lg bg-black">
        <div
          className="flex justify-center w-64 items-center mx-auto backdrop-blur-md rounded-lg
          xl:w-[400px] 
          bg-[radial-gradient(107.52%_105.76%_at_0%_-0.91%,_rgba(255,_255,_255,_0.4)_0%,_rgba(255,_255,_255,_0)_100%)]"
        >
          <div className="flex flex-col  w-full h-full p-3 gap-y-3">
            <div className="flex relative w-full h-full rounded-md aspect-square">
              <Image src={img} alt={name} fill className="rounded-md object-cover" />
              <div className="absolute right-0  hover:cursor-pointer">
                <NavigateArrow className="opacity-50 hover:opacity-70" />
              </div>
            </div>
            <h2 className="font-base font-medium capitalize text-xs text-slate-50">{name}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
