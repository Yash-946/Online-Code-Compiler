import Image from 'next/image';
import React, { useState } from 'react';

interface Language {
  name: string;
  svgPath: string;
}

const languages: Language[] = [
  {
    name: 'Java',
    svgPath: '/java.svg',
  },
  {
    name: 'Python',
    svgPath: '/python.svg',
  },
  {
    name: 'JavaScript',
    svgPath: '/javascript.svg',
  },
];

export const LeftNavbar: React.FC = () => {
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);

  const handleLanguageClick = (languageName: string) => {
    const url = `/compiler/${languageName.toLowerCase()}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col items-center bg-background h-screen w-20 p-4 space-y-10 border-4 ">
      {languages.map((language, index) => (
        <div
          key={index}
          className="relative group flex flex-col items-center cursor-pointer"
          onMouseEnter={() => setHoveredLang(language.name)}
          onMouseLeave={() => setHoveredLang(null)}
          onClick={() => handleLanguageClick(language.name)}
        >
          {/* Language Icon */}
          <Image
            height={1000}
            width={1000}
            src={language.svgPath}
            alt={`${language.name} logo`}
            className="h-10 w-10 transition-transform transform hover:scale-110"
          />

          {/* Language name on hover */}
          {hoveredLang === language.name && (
            <div className="absolute bottom-0 mb-12 bg-card text-card-foreground text-xs rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {language.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
