import React from 'react'
import Image from 'next/image'
import { NavigateArrow } from './icons/NavigateArrow'
import VanillaTilt from 'vanilla-tilt'

export const Card = ({ img, name }: { img: string; name: string }) => {
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
      className="flex justify-center items-center mx-auto w-fit h-fit p-[1px] rounded-lg bg-[radial-gradient(55.28%_55.28%_at_0%_102.89%,_rgba(106,_123,_93,_0.2)_0%,_rgba(0,_0,_0,_0)_100%),radial-gradient(100%_99.98%_at_0%_0%,_rgba(255,_255,_255,_0.2)_0%,_rgba(106,_123,_93,_0.2)_100%)]"
    >
      <div className="flex w-fit h-fit rounded-lg bg-black">
        <div
          className="flex justify-center w-64 items-center mx-auto backdrop-blur-md rounded-lg
          xl:w-[500px] 
          bg-[radial-gradient(107.52%_105.76%_at_0%_-0.91%,_rgba(255,_255,_255,_0.4)_0%,_rgba(255,_255,_255,_0)_100%)]"
        >
          <div className="flex flex-col  w-full h-full p-3 gap-y-3">
            <div className="flex relative w-full h-full rounded-md aspect-square">
              <Image src={img} alt={name} fill className="rounded-md object-cover" quality={100} sizes="540px" />
              {/* <div className="absolute w-full rounded-md h-full bg-[radial-gradient(50%_47.88%_at_50.08%_50%,_rgba(2,_2,_2,_0)_0%,_rgba(0,_0,_0,_0.06)_50%,_rgba(0,_0,_0,_0.40)_100%)]" /> */}
              <div className="absolute right-1 top-1  hover:cursor-pointer">
                <NavigateArrow className="text-neutral-300 hover:text-neutral-100 stroke-[1.5]" />
              </div>
            </div>
            <h2 className="font-base font-medium capitalize text-xs text-slate-50">{name}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
