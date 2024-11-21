"use client";

import React, { useEffect, useState, useCallback } from "react";
import { LeftNavbar } from "@/components/layout/compiler/LeftNavbar";
import { Navbar2 } from "@/components/layout/Navbar2";
import { OutputWindow } from "@/components/layout/code-editor/OutputWindow";
import { CustomInput } from "@/components/layout/code-editor/CustomInput";
import { DefaultCode } from "@/lib/Languages";
import useKeyPress from "@/hooks/useKeyPress";
import { useParams, useRouter } from "next/navigation";
import { CodeEditorWindow } from "@/components/layout/code-editor/CodeEditorWindow";
import Loading from "@/app/loading";
import { Navbar } from "@/components/layout/navbar";
import { Geminichat } from "@/components/aiintegration/geminichat";

function Compiler() {
  const router = useRouter();
  const pramas = useParams<{ language: string }>();
  // console.log(pramas.language);
  const language = pramas.language;
  const [code, setCode] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  // const onSelectChange = useCallback((sl: any) => {
  //   setLanguage(sl);
  // }, []);

  useEffect(() => {
    console.log("Language changed:", language);
    const dc: string = DefaultCode(language);
    console.log(dc);
    if (dc == `LNF`) {
      router.replace(`/not-found`);
    } else {
      setCode(dc);
    }
  }, []);

  const onChange = useCallback((action: any, data: any) => {
    // console.log("action", action, "data", data);
    if (action === "code") setCode(data);
  }, []);

  // useEffect(() => {
  //   if (enterPress && ctrlPress) {
  //     handleCompile();
  //   }
  // }, [ctrlPress, enterPress]);

  if (!code) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <div className="bg-background h-[100vh] overflow-hidden">
        <Navbar homepage={false} />

        <div className="flex w-screen gap-4">
          <LeftNavbar />

          <div className="flex gap-6">
            <div className="">
              <Navbar2
                code={code}
                language={language}
                customInput={customInput}
                setOutputDetails={setOutputDetails}
                flag={true}
                savecodepage={false}
              />
              <div className="w-[53vw]">
                <CodeEditorWindow
                  code={code}
                  onChange={onChange}
                  language={language}
                  theme="Monokai"
                />
              </div>
            </div>
            <div className="">
              <OutputWindow outputDetails={outputDetails} />
              <CustomInput
                customInput={customInput}
                setCustomInput={setCustomInput}
              />
            </div>
            <div>
              <Geminichat />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Compiler;