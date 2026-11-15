// components/Skills.tsx
'use client'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCode,
  faLayerGroup,
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons'
import Reveal from '@/components/Reveal'
import BorderGlow from '@/components/BorderGlow';

const skillCards = [
  {
    title: 'Frontend',
    icon: faCode,
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Responsive', 'APIs'],
  },
  {
    title: 'Frameworks',
    icon: faLayerGroup,
    skills: ['Bootstrap', 'Tailwind', 'React', 'Next'],
  },
  {
    title: 'Design',
    icon: faWandMagicSparkles,
    skills: ['UI Design', 'UX Research', 'Prototyping', 'Animations'],
  },
]

const Skills = () => {
  return (
 <section className="flex w-full flex-col justify-center bg-black px-6 py-16 dark:bg-white md:h-full md:px-14">
  <p className="mb-6 text-3xl uppercase tracking-wide text-white dark:text-black">
    My Skills
  </p>

  <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {skillCards.map((card, i) => (
      <Reveal key={card.title} delay={i * 150} className="h-full">
        <div className="h-full [&>*]:h-full">
          <BorderGlow
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#120F17"
            borderRadius={28}
            glowRadius={40}
            glowIntensity={1}
            coneSpread={25}
            animated={false}
            colors={['#c084fc', '#f472b6', '#38bdf8']}
          >
            <div className="h-full p-6 md:p-8">
              <FontAwesomeIcon icon={card.icon} className="text-2xl text-white" />

              <h3 className="mt-4 text-2xl text-white">{card.title}</h3>

              <ul className="mt-4 space-y-2.5">
                {card.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3 text-lg text-white">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-white" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </BorderGlow>
        </div>
      </Reveal>
    ))}
  </div>
</section>
  )
}

export default Skills