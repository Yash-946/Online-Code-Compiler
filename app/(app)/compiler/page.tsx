//@ts-nocheck
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { Navbar1 } from "@/components/layout/compiler/Navbar1";
import { LeftNavbar } from "@/components/layout/compiler/LeftNavbar";
import { Navbar2 } from "@/components/layout/compiler/Navbar2";
import { CodeEditorWindow } from "@/components/layout/code-editor/CodeEditorWindow";
import { OutputWindow } from "@/components/layout/code-editor/OutputWindow";
import { OutputDetails } from "@/components/layout/code-editor/OutputDetails";
import { CustomInput } from "@/components/layout/code-editor/CustomInput";
import { languageOptions } from "@/components/layout/compiler/Languages";
import { classnames } from "../../../utils/general";

import axios from "axios";
import LanguagesDropdown from "@/components/layout/code-editor/LanguagesDropdown";
import useKeyPress from "@/hooks/useKeyPress";
import toast from "react-hot-toast";

const javascriptDefault = `
console.log("hello");
`;

function Compiler() {
  const { data: session } = useSession();
  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [language, setLanguage] = useState(languageOptions[0]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = useCallback((sl) => {
    setLanguage(sl);
  }, []);

  const onChange = useCallback((action, data) => {
    if (action === "code") setCode(data);
  }, []);

  useEffect(() => {
    if (enterPress && ctrlPress) {
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: process.env.NEXT_PUBLIC_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      },
      data: formData,
    };
    console.log(options);

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response?.status;
  
        if (status === 429) {
          toast.error("Quota of 100 requests exceeded for the day. Please try again later.");
        } else {
          toast.error("An error occurred. Please try again.");
        }
        setProcessing(false);
        console.log("Error in catch block:", error);
      });
  };
  
  

  const checkStatus = useCallback(async (token) => {
    const options = {
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_RAPID_API_URL}/${token}`,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      if (response.data.status?.id === 1 || response.data.status?.id === 2) {
        setTimeout(() => checkStatus(token), 2000);
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        toast.success("Compiled successfully!");
      }
    } catch (err) {
      setProcessing(false);
      toast.error("Failed to compile. Please try again.");
    }
  }, []);

  const handleError = (error) => {
    const status = error.response?.status;
    if (status === 429) {
      toast.error("Too many requests! Please try again later.");
    } else {
      toast.error("An error occurred. Please try again.");
    }
  };

  if (!session) {
    return (
      <div>
        You are not signed in
        <Navbar1 />
      </div>
    );
  }

  return (
    <div>
      <Navbar1 />
      <div className="flex gap-10">
        <LeftNavbar />
        <div>
          <Navbar2 />
          <LanguagesDropdown onSelectChange={onSelectChange} />
          <CodeEditorWindow code={code} onChange={onChange} language={language?.value} />
        </div>
        <div className="right-container flex flex-col">
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-end">
            <CustomInput customInput={customInput} setCustomInput={setCustomInput} />
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                "mt-4 border-2 border-black z-10 rounded-md px-4 py-2 hover:shadow transition duration-200 flex-shrink-0",
                !code ? "opacity-50" : ""
              )}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
        <div>
          <h1>Welcome, {session.user?.name}</h1>
          <p>Email: {session.user?.email}</p>
          <button onClick={() => signOut({ callbackUrl: '/sign-in' })} className="sign-out-btn">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Compiler;
