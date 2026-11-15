import React from 'react'
import FluidGlass from '@/components/FluidGlass';

const ProjectsTitle = () => {
  return (
   <div style={{ width: '100%', height: '1000px', position: 'relative' }}>
  <FluidGlass
    text="PROJECTS"
    src="/hero.jpg"
    shape="torus"
    size={260}
    refraction={1}
    dispersion={0.35}
    interaction="follow"
    frost={0}
    color="#ffffff"
    tint={0}
    reflection={1}
    shadow={0.5}
    elevation={0.4}
    smoothness={0.5}
    wobble={0.5}
    spin={0.3}
    idle
    morphOnClick
    intro
/>
</div>
  )
}

export default ProjectsTitle