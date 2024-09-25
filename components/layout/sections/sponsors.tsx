"use client";
import {  SiPython, SiCplusplus } from 'react-icons/si';

import { Icon } from "@/components/ui/icon";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import { icons } from "lucide-react";
interface sponsorsProps {
  icon: string;
  name: string;
}

const sponsors1 = [
  // { icon: <SiJava size={32} color="white" />, name: "Java" },
  { icon: <SiPython size={32} color="white" />, name: "Python" },
  { icon: <SiCplusplus size={32} color="white" />, name: "C++" },
];

const sponsors: sponsorsProps[] = [
  // {
  //   icon: "Code", // Using a generic code icon for Java
  //   name: "Java",
  // },
  {
    icon: "Terminal", // Representing Python with a terminal icon
    name: "Python",
  },
  {
    icon: "Cpu", // C++ represented by a CPU icon
    name: "C++",
  },
  // {
  //   icon: "Puzzle",
  //   name: "Acmeipsum",
  // },
  // {
  //   icon: "Squirrel",
  //   name: "Acme",
  // },
  // {
  //   icon: "Cookie",
  //   name: "Accmee",
  // },
  // {
  //   icon: "Drama",
  //   name: "Acmetech",
  // },
];

export const SponsorsSection = () => {
  return (
    <section id="sponsors" className="max-w-[75%] mx-auto pb-24 sm:pb-32">
      <h2 className="text-lg md:text-xl text-center mb-6">
        Our Compiler Supports
      </h2>

      <div className="mx-auto">
        <Marquee
          className="gap-[3rem]"
          fade
          innerClassName="gap-[3rem]"
          pauseOnHover
        >
          {/* {sponsors.map(({ icon, name }) => (
            <div
              key={name}
              className="flex items-center text-xl md:text-2xl font-medium"
            >
              <Icon
                name={icon as keyof typeof icons}
                size={32}
                color="white"
                className="mr-2"
              />
              {name}
            </div>
          ))} */}
          {sponsors1.map(({ icon, name }) => (
  <div
    key={name}
    className="flex items-center text-xl md:text-2xl font-medium"
  >
    {icon} {/* Now it directly renders the JSX icon */}
    <span className="ml-2">{name}</span>
  </div>
))}

        </Marquee>
      </div>
    </section>
  );
};
