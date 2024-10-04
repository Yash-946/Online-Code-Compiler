"use client";
import React, { useEffect, useState } from "react";
import Editor, { loader } from "@monaco-editor/react";

interface CodeEditorWindowProps {
  onChange: any;
  language: any;
  code: any;
  theme: any;
}

export const CodeEditorWindow = ({
  onChange,
  language,
  code,
  theme, 
}: CodeEditorWindowProps) => {
  const [value, setValue] = useState(code || "");
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  
  
  // console.log(theme);
  
  useEffect(() => {
    loader
      .init()
      .then((monaco:any) => {
        // Load and define the theme
        import(`monaco-themes/themes/${theme}.json`).then((data) => {
          monaco.editor.defineTheme(theme, data);
          setIsThemeLoaded(true);
        });
      })
      .catch((error:any) =>
        console.error("An error occurred during initialization of Monaco: ", error)
      );
  }, [theme]); // Re-run the effect whenever the theme changes

  const handleEditorChange = (value: any) => {
    console.log("value", value);
    setValue(value);
    onChange("code", value);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={isThemeLoaded ? theme : "vs-light"}  // Use the loaded theme
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};
