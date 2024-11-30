"use client";
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface Language {
  name: string;
  logo: string;
}

const languages: Language[] = [
  { name: "Java", logo: "/svg/java.svg" },
  { name: "Python", logo: "/svg/python.svg" },
  { name: "Cpp", logo: "/svg/c++.svg" },
  { name: "C", logo: "/svg/c.svg" },
  { name: "JavaScript", logo: "/svg/javascript.svg" },
  { name: "R", logo: "/svg/r.svg" },
  { name: "Rust", logo: "/svg/rust.svg" },
  { name: "Go", logo: "/svg/go.svg" },
  { name: "PHP", logo: "/svg/php.svg" },
  { name: "Swift", logo: "/svg/swift.svg" },
];

export const LanguageIcons: React.FC = () => (
  <>
    <section id="sponsors" className="max-w-[75%] mx-auto pb-10 sm:pb-16">
      <h2 className="text-lg md:text-xl text-center mb-6">
        Our Compiler Supports
      </h2>
    </section>

    <div className="w-[100%] flex flex-wrap justify-center gap-10 px-24">
      {languages.map((language, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="flex justify-center items-center"
        >
          <Badge variant="outline" className="cursor-pointer py-2 h-20 w-56 flex justify-center items-center gap-2">
            <Image width={1000} height={1000} src={language.logo} alt={language.name} className="h-10 w-12 " />
            <span className="text-3xl">{language.name}</span>
          </Badge>
        </motion.div>
      ))}
    </div>
  </>
);

export default LanguageIcons;
