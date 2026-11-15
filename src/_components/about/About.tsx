'use client'
import React from 'react'
import Reveal from '@/components/Reveal'
import ElasticMesh from '@/components/ElasticMesh'
import { useIsDark } from '@/hooks/useIsDark'

const stats = [
  { value: '1+', label: 'Years Experience' },
  { value: '20+', label: 'Projects' },
  { value: '100%', label: 'Passion' },
]

const About = () => {
  const isDark = useIsDark()

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black md:h-screen md:min-h-0">
      <div className="flex h-full w-full flex-col md:flex-row">
        {/* Left: mesh */}
        <div className="relative h-64 w-full md:h-full md:w-1/2">
          <div className="absolute inset-0">
            <ElasticMesh
              key={isDark ? 'dark' : 'light'}
              text="ABOUT"
              material="balloon"
              color={isDark ? '#ffffff' : '#000000'}
              inflate={1}
              stiffness={0.5}
              wobble={0.6}
              theme={isDark ? 'dark' : 'light'}
            />
          </div>
        </div>

        {/* Right: text */}
        <div className="flex w-full flex-col justify-between gap-8 p-6 md:h-full md:w-1/2 md:px-12 md:py-20 xl:px-16 xl:py-24">
          <Reveal>
            <p className="text-lg text-black dark:text-white md:text-2xl">WHO AM I</p>
          </Reveal>

          <div className="flex flex-col gap-8 xl:gap-12">
            <Reveal delay={150}>
              <p className="text-5xl leading-tight text-black dark:text-white md:text-6xl lg:text-7xl xl:text-8xl">
                I&apos;m Ahmed Farid.
              </p>
            </Reveal>

            <Reveal delay={300} className="w-full">
              <p className="text-base leading-relaxed text-black dark:text-white lg:text-xl xl:text-2xl">
                I design and develop modern digital experiences that combine clean
                aesthetics with intuitive functionality. <br /> My passion lies in
                building high-performance websites with a strong focus on user
                experience, interaction, and minimal design
              </p>
            </Reveal>
          </div>

          <Reveal delay={450} className="border-y-2 border-black py-6 dark:border-white xl:py-8">
            <div className="flex justify-around">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-2 xl:gap-4">
                  <p className="text-3xl text-black dark:text-white lg:text-4xl xl:text-5xl">
                    {stat.value}
                  </p>
                  <p className="text-sm text-black dark:text-white lg:text-base xl:text-lg">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}

export default About