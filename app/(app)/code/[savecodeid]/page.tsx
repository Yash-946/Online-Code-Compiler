"use client";
import Loading from "@/app/loading";
import { CodeEditorWindow } from "@/components/layout/code-editor/CodeEditorWindow";
import { CustomInput } from "@/components/layout/code-editor/CustomInput";
import { OutputWindow } from "@/components/layout/code-editor/OutputWindow";
import { LeftNavbar } from "@/components/layout/compiler/LeftNavbar";
import { Navbar } from "@/components/layout/navbar";
import { Navbar2 } from "@/components/layout/Navbar2";
import { useMutation } from "@tanstack/react-query";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CodeData {
  id: string;
  fileName: string;
  code: string;
  language: string;
  createdAt: string;
}

function SaveCode() {
  const router = useRouter();
  const params = useParams<{ savecodeid: string }>();
  const codeid = params.savecodeid;
  // const [loading, setLoading] = useState<boolean>(true);
  const [code, setCode] = useState<string>("");
  const [filename, setFilename] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [flag, setFlag] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);

  const fetchsaveCodeApi = async () => {
    const response = await axios.get(`/api/save-code?codeID=${codeid}`);
    return response.data;
  };

  const fetchsaveCodeMutaion = useMutation({
    mutationFn: fetchsaveCodeApi,
    retry: 3,
    onSuccess: (data: any) => {
      setCode(atob(data.codeData.code));
      setFilename(data.codeData.fileName);
      setLanguage(data.codeData.language);
    },
    onError: (error: any) => {
      // console.error("Error fetching saved code:", error);
      router.replace(`/not-found`);
    },
  });

  useEffect(() => {
    function getSaveCode() {
      fetchsaveCodeMutaion.mutate();
    }

    if (codeid) {
      getSaveCode();
    }
  }, [codeid]);

  const onChange = useCallback((action: any, data: any) => {
    // console.log("action", action, "data", data);
    if (action === "code") {
      setCode(data);
      setFlag(true);
    }
  }, []);

  if (fetchsaveCodeMutaion.isPending || !code) {
    return <Loading />;
  }

  return (
    <>
      <div className="h-[100vh] overflow-hidden">
        <div>
          <Navbar homepage={false} />
        </div>

        <div className="flex w-screen gap-4">
          <LeftNavbar />

          <div className="">
            {code ? (
              <div className="flex gap-6">
                <div className="">
                  <div className="flex gap-12">
                    <h2>{filename}</h2>
                    <Navbar2
                      code={code}
                      language={language}
                      customInput={customInput}
                      setOutputDetails={setOutputDetails}
                      flag={flag}
                      savecodepage={true}
                      filename={filename}
                      setFlag={setFlag}
                    />
                  </div>
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
              </div>
            ) : (
              <p>No code found for this ID.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SaveCode;
