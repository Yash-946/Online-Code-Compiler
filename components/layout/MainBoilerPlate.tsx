"use client";
import { CodeEditorWindow } from "@/components/layout/code-editor/CodeEditorWindow";
import { CustomInput } from "@/components/layout/code-editor/CustomInput";
import { OutputWindow } from "@/components/layout/code-editor/OutputWindow";
import { LeftNavbar } from "@/components/layout/compiler/LeftNavbar";
import { Navbar } from "@/components/layout/navbar";
import { Navbar2 } from "@/components/layout/Navbar2";
import { flagatom } from "@/store/atom";

import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Geminichat } from "../aiintegration/geminichat";

interface MainBoilerPlateProps {
  filename?: string;
}

function MainBoilerPlate({ filename }: MainBoilerPlateProps) {
  const [customInput, setCustomInput] = useState<string>("");
  const [outputDetails, setOutputDetails] = useState(null);
  const flag = useRecoilValue(flagatom).flag!!!;

  return (
    <>
      <div className="h-[100vh] overflow-hidden">
        <div>
          <Navbar homepage={false} />
        </div>

        <div className="flex w-screen gap-4">
          <LeftNavbar />

          <div className="">
            <div className="flex gap-6">
              <div className="">
                <div className="flex gap-12">
                  {filename && <h2>{filename}</h2>}
                  <Navbar2
                    customInput={customInput}
                    setOutputDetails={setOutputDetails}
                    flag={filename ? flag : true}
                    savecodepage={filename ? true : false}
                    filename={filename}
                  />
                </div>
                <div className="w-[53vw]">
                  <CodeEditorWindow
                    savecodepage={filename ? true : false}
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
                <Geminichat />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainBoilerPlate;
