import React from 'react'
import Bg from "./../../../public/images/bgherofinal.png"
import Lanyard from '@/components/Lanyard'
import Cardface from "../../../public/images/cardfront.jpeg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";


const Hero = () => {
  return (
<div
  className="relative h-screen text-center flex justify-center items-center w-full bg-gray-200 dark:bg-neutral-950  bg-center bg-no-repeat"
  style={{ backgroundImage: `url(${Bg.src})` }}
>
<div
  className="come-up flex gap-3 md:gap-30 text-white mix-blend-difference"
  style={{ animationDelay: '0.3s' }}
>
  <p className="text-4xl md:text-9xl">AHMED</p>
  <p className="text-4xl md:text-9xl">FARID</p>
</div>
  <div className="absolute bottom-40 md:bottom-40 left-10 mt-11 flex w-full justify-between">
    <div className="text-black dark:text-white">
      <h2 className="come-up text-lg md:text-5xl" style={{ animationDelay: '0.2s' }}>
        Front-end Developer
      </h2>
      <h2 className="come-up text-lg md:text-5xl" style={{ animationDelay: '0.4s' }}>
        ui/ux Designer
      </h2>
      <h2 className="come-up text-lg md:text-5xl" style={{ animationDelay: '0.6s' }}>
        Creative Web Experiance
      </h2>
    </div>
  </div>

  <div
    className="come-up absolute bottom-2 md:bottom-15 left-10 text-black dark:text-white"
    style={{ animationDelay: '0.9s' }}
  >
    <p className="text-lg">SCROLL</p>
 <span className="mt-4 block md:hidden">
  <FontAwesomeIcon
    icon={faChevronDown}
    className="animate-bounce text-2xl text-black dark:text-white"
  />
</span>

{/* Desktop: right */}
<span className="mt-4 hidden md:block">
  <FontAwesomeIcon
    icon={faChevronRight}
    className="animate-bounce text-2xl text-black dark:text-white"
  />
</span>

  </div>

  <div
    className="come-up absolute bottom-2 md:bottom-15 right-10 text-black dark:text-white"
    style={{ animationDelay: '1.1s' }}
  >
    <div className="h-full">
      <p className="text-xl">EGYPT,</p>
      <p className="text-xl">CAIRO</p>
    </div>
  </div>
</div>
    
  )
}

export default Hero