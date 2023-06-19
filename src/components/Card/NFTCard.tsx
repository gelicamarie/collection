import React from 'react'
import Image from 'next/image'
import { NavigateArrow } from '../icons/NavigateArrow'
import VanillaTilt from 'vanilla-tilt'

export const NFTCard = ({ img, name }: { img: string; name: string }) => {
  const tiltRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!tiltRef.current) return
    const tiltNode = tiltRef.current

    VanillaTilt.init(tiltNode, {
      max: 15,
      speed: 300,
      scale: 1,
      glare: true,
    })
  }, [])

  return (
    <div
      ref={tiltRef}
      className="flex 
      cursor-pointer
      justify-center items-center mx-auto w-fit h-fit p-[1px] rounded-lg bg-[radial-gradient(55.28%_55.28%_at_0%_102.89%,_rgba(106,_123,_93,_0.2)_0%,_rgba(0,_0,_0,_0)_100%),radial-gradient(100%_99.98%_at_0%_0%,_rgba(255,_255,_255,_0.2)_0%,_rgba(106,_123,_93,_0.2)_100%)]"
    >
      <div className="flex w-fit h-fit rounded-lg bg-black">
        <div
          className="flex justify-center w-40 items-center mx-auto backdrop-blur-md rounded-lg
          sm:w-72
          xl:w-[400px] 
          bg-[radial-gradient(107.52%_105.76%_at_0%_-0.91%,_rgba(255,_255,_255,_0.4)_0%,_rgba(255,_255,_255,_0)_100%)]"
        >
          <div className="flex flex-col  w-full h-full p-2 md:p-3 gap-y-2 sm:gap-y-3">
            <div className="flex relative w-full h-full rounded-md aspect-square">
              <Image src={img} alt={name} fill className="rounded-md object-cover" quality={100} sizes="540px" />
              <div className="absolute right-1 top-1  hover:cursor-pointer">
                <NavigateArrow className="text-neutral-300 hover:text-neutral-100 stroke-[1.5]" />
              </div>
            </div>
            <h2 className="font-base whitespace-nowrap overflow-hidden text-ellipsis font-medium capitalize text-xxs md:text-xs text-slate-50 opacity-80">
              {name}
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}
