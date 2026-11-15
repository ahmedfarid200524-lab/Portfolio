'use client'
import React, { useEffect, useRef } from 'react'

const HorizontalScroll = ({ children }: { children: React.ReactNode }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const panels = React.Children.toArray(children)

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current
      const track = trackRef.current
      if (!section || !track) return

      if (window.innerWidth < 1024) {
        track.style.transform = ''
        return
      }

      const { top, height } = section.getBoundingClientRect()
      const scrollable = height - window.innerHeight
      const progress = Math.min(Math.max(-top / scrollable, 0), 1)
      const distance = (panels.length - 1) * window.innerWidth

      track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [panels.length])

  return (
    <div
      ref={sectionRef}
      className="relative lg:h-[calc(var(--panels)*100vh)]"
      style={{ '--panels': panels.length } as React.CSSProperties}
    >
      <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col will-change-transform lg:h-full lg:w-[calc(var(--panels)*100vw)] lg:flex-row"
        >
          {panels.map((panel, i) => (
            <div key={i} className="w-full lg:h-full lg:w-screen lg:shrink-0">
              {panel}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HorizontalScroll