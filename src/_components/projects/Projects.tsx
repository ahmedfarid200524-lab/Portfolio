// components/Projects.tsx
'use client'
import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

type Direction = 'left' | 'right' | 'bottom' | 'top' | 'zoom'

type Project = {
  title: string
  description: string
  tags: string[]
  live: string
  github: string
  from: Direction
  gradient: string
}

const projects: Project[] = [
  {
    title: 'FreshCart',
    description: 'FreshCart is an e-commerce web app built with Next.js, React and Tailwind CSS. You can browse products by category and brand, view product details, and add items to a cart or wishlist. You can also register and log in, and check out with cash or online payment and view your past orders.',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    live: 'https://freshcart-blond-zeta.vercel.app',
    github: 'https://github.com/ahmedfarid200524-lab/freshcart',
    from: 'left',
    gradient: 'from-purple-500 via-pink-500 to-sky-400',
  },
  {
    title: 'modaber',
    description:
      'A smart and secure financing platform that makes managing money, exploring financing options, and tracking payments simple. Get flexible financial solutions designed to fit your needs.',
    tags: ['html', 'css'],
    live: 'https://modaber-lac.vercel.app/',
    github: 'https://github.com/ahmedfarid200524-lab/-',
    from: 'right',
    gradient: 'from-sky-400 to-indigo-600',
  },
  {
    title: 'STRAY Wear',
    description:
      'STRAY is an independent streetwear brand built around individuality, bold expression, and unconventional design.',
    tags: ['html', 'css', 'JS', 'Bootstrap', 'Design'],
    live: 'https://stray-delta.vercel.app/',
    github: 'https://github.com/ahmedfarid200524-lab/STRAY',
    from: 'bottom',
    gradient: 'from-pink-500 to-orange-400',
  },
  {
    title: 'The Art Blog',
    description:
      'An art-focused blog celebrating creativity, inspiration, and self-expression. A space for artists and art',
    tags: ['React', 'API'],
    live: 'https://blog-virid-three-24.vercel.app',
    github: 'https://github.com/ahmedfarid200524-lab/Blog',
    from: 'top',
    gradient: 'from-emerald-400 to-sky-500',
  },
  {
    title: 'PyPath',
    description:
      'PyPath is a gamified coding platform designed to make learning programming fun and interactive. Users can learn languages like Python and JavaScript through structured courses, earn XP, maintain streaks, compete on leaderboards, challenge friends in coding battles, and connect through a developer community.',
    tags: ['UI Design', 'Animations', 'AI'],
    live: 'https://pypath-lyart.vercel.app/',
    github: 'https://github.com/ahmedfarid200524-lab/pyPath',
    from: 'zoom',
    gradient: 'from-yellow-400 to-pink-500',
  },
]

const opposite: Record<Direction, Direction> = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom',
  zoom: 'zoom',
}

const clamp = (n: number, min = 0, max = 1) => Math.min(Math.max(n, min), max)
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
const smoothstep = (t: number) => t * t * (3 - 2 * t)

// remaining: 1 = fully hidden offscreen, 0 = in its final place
function enterTransform(dir: Direction, remaining: number) {
  switch (dir) {
    case 'left':
      return `translate3d(${-60 * remaining}vw,0,0) rotate(${-6 * remaining}deg)`
    case 'right':
      return `translate3d(${60 * remaining}vw,0,0) rotate(${6 * remaining}deg)`
    case 'bottom':
      return `translate3d(0,${60 * remaining}vh,0)`
    case 'top':
      return `translate3d(0,${-60 * remaining}vh,0)`
    case 'zoom':
      return `scale(${1 - 0.6 * remaining})`
    default:
      return 'none'
  }
}

/* ---------- Live site preview in a browser-style frame ---------- */

const FRAME_WIDTH = 1440 // the width the site renders at, then gets scaled down
const FRAME_HEIGHT = 900

const BrowserFrame = ({
  url,
  title,
  gradient,
}: {
  url: string
  title: string
  gradient: string
}) => {
  const boxRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.4)
  const [loaded, setLoaded] = useState(false)
  const hasSite = Boolean(url) && url !== '#'

  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const update = () => setScale(el.clientWidth / FRAME_WIDTH)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl dark:border-white/10 dark:bg-neutral-900 md:rounded-3xl">
      {/* Browser bar */}
      <div className="flex items-center gap-3 border-b border-black/10 px-4 py-2 dark:border-white/10">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <span className="mx-auto max-w-[70%] truncate rounded-full bg-black/5 px-3 py-0.5 text-xs text-black/60 dark:bg-white/10 dark:text-white/60">
          {hasSite ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'coming soon'}
        </span>
        <span className="w-10" />
      </div>

      {/* Screen: the gradient shows while loading and for projects with no link */}
      <div
        ref={boxRef}
        className={`relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br ${gradient}`}
      >
        {hasSite && (
          <>
            <iframe
              src={url}
              title={`${title} preview`}
              loading="lazy"
              tabIndex={-1}
              sandbox="allow-scripts allow-same-origin"
              onLoad={() => setLoaded(true)}
              style={{
                width: FRAME_WIDTH,
                height: FRAME_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
              }}
              className={`pointer-events-none absolute left-0 top-0 max-w-none border-0 bg-white transition-opacity duration-700 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Click anywhere on the preview to open the real site */}
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${title}`}
              className="group absolute inset-0 z-10 flex items-end justify-end p-3 transition-colors duration-300 hover:bg-black/20"
            >
              <span className="translate-y-2 rounded-full bg-black/80 px-3 py-1 text-xs text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Open live site ↗
              </span>
            </a>
          </>
        )}
      </div>
    </div>
  )
}

/* ---------- One full-screen project ---------- */

const ProjectScreen = ({ project, index }: { project: Project; index: number }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const SMOOTHING = reduceMotion ? 1 : 0.09 // lower = floatier, higher = snappier

    let target = 0 // where the scroll really is
    let current = 0 // where the animation is (chases target)
    let scrollable = 1
    let frame = 0
    let running = false

    const measure = () => {
      const wrapper = wrapperRef.current
      if (!wrapper) return
      const { top, height } = wrapper.getBoundingClientRect()
      target = -top
      scrollable = height - window.innerHeight
    }

    const render = (s: number) => {
      const text = textRef.current
      const visual = visualRef.current
      if (!text || !visual) return

      const vh = window.innerHeight

      const enter = reduceMotion ? 1 : easeOutCubic(clamp((s + 0.9 * vh) / vh))
      const leaveStart = 0.5 * vh
      const leave = smoothstep(clamp((s - leaveStart) / Math.max(scrollable - leaveStart, 1)))

      const opacity = smoothstep(enter) * (1 - leave)
      const exit = `translate3d(0,${-6 * leave}vh,0) scale(${1 - 0.08 * leave})`

      text.style.opacity = opacity.toFixed(3)
      text.style.transform = `${enterTransform(project.from, 1 - enter)} ${exit}`
      text.style.pointerEvents = opacity > 0.4 ? 'auto' : 'none'

      visual.style.opacity = opacity.toFixed(3)
      visual.style.transform = `${enterTransform(opposite[project.from], 1 - enter)} ${exit}`
      visual.style.pointerEvents = opacity > 0.4 ? 'auto' : 'none'
    }

    const tick = () => {
      current += (target - current) * SMOOTHING
      if (Math.abs(target - current) < 0.1) {
        current = target
        running = false
      }
      render(current)
      if (running) frame = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      measure()
      if (!running) {
        running = true
        frame = requestAnimationFrame(tick)
      }
    }

    measure()
    current = target // start in the right place, no jump on load
    render(current)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [project.from])

  const flip = index % 2 === 1

  return (
    <div ref={wrapperRef} className="relative h-[240vh]">
      <div className="sticky top-0 flex h-dvh items-center overflow-hidden px-5 md:h-screen md:px-14">
        <div className="grid w-full items-center gap-4 md:grid-cols-2 md:gap-16">
          {/* Preview: on top on phones, alternating sides on desktop */}
          <div
            ref={visualRef}
            style={{ opacity: 0 }}
            className={`order-1 will-change-transform ${flip ? 'md:order-1' : 'md:order-2'}`}
          >
            <BrowserFrame url={project.live} title={project.title} gradient={project.gradient} />
          </div>

          {/* Text */}
          <div
            ref={textRef}
            style={{ opacity: 0 }}
            className={`order-2 flex flex-col gap-3 will-change-transform md:gap-6 ${
              flip ? 'md:order-2' : 'md:order-1'
            }`}
          >
            <p className="text-sm text-black/60 dark:text-white/60 md:text-lg">
              {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </p>

            <h3 className="text-4xl leading-tight text-black dark:text-white md:text-7xl">
              {project.title}
            </h3>

            <p className="line-clamp-4 max-w-xl text-sm text-black/70 dark:text-white/70 md:line-clamp-none md:text-xl">
              {project.description}
            </p>

            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-black/30 px-3 py-0.5 text-xs text-black dark:border-white/30 dark:text-white md:px-4 md:py-1 md:text-base"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-5 pt-1 text-black dark:text-white md:gap-6 md:pt-2">
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-base transition-transform duration-300 hover:translate-x-1 md:text-lg"
              >
                Live demo
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-sm" />
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="text-2xl transition-transform duration-300 hover:scale-110 md:text-3xl"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Section ---------- */

const Projects = () => {
  return (
    <section className="w-full bg-white dark:bg-black">
     

      {projects.map((project, i) => (
        <ProjectScreen key={project.title} project={project} index={i} />
      ))}
    </section>
  )
}

export default Projects