import React from "react";
import LogoLoop from "@/components/LogoLoop";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";
import { SiUpwork } from "react-icons/si";

const Links = () => {
  const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev", hoverColor: "#61dafb" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org", hoverColor: "#3178c6" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com", hoverColor: "#38bdf8" },
  ];

const socialLogos = [
  {
    node: <FaGithub className="transition-colors duration-200 hover:text-black dark:hover:text-white" />,
    title: "GitHub",
    href: "https://github.com/ahmedfarid200524-lab",
  },
  {
    node: <SiUpwork className="transition-colors duration-200 hover:text-black dark:hover:text-white" />,
    title: "Upwork",
    href: "https://www.upwork.com/freelancers/~010cd2ebb61191a7c2",
  },
  {
    node: <FaLinkedin />,
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/ahmed-farid-708791369",
    hoverColor: "#0a66c2",
  },
  {
    node: <FaInstagram />,
    title: "Instagram",
    href: "https://www.instagram.com/ahmedfaariid",
    hoverColor: "#e4405f",
  },
];

  return (
    <div style={{ height: "200px", position: "relative", overflow: "hidden" }}>
      <LogoLoop
        logos={socialLogos}
        speed={100}
        direction="left"
        logoHeight={48}
        gap={56}
        hoverSpeed={0}
        scaleOnHover
        ariaLabel="Social links"
      />
    </div>
  );
};

export default Links;