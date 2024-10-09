"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { Navbar1 } from "@/components/layout/compiler/Navbar1";
import { LeftNavbar } from "@/components/layout/compiler/LeftNavbar";
import { Navbar2 } from "@/components/layout/compiler/Navbar2";
import { OutputWindow } from "@/components/layout/code-editor/OutputWindow";
import { OutputDetails } from "@/components/layout/code-editor/OutputDetails";
import { CustomInput } from "@/components/layout/code-editor/CustomInput";
import {
  languageData,
  languageOptions,
} from "@/components/layout/compiler/Languages";
import axios from "axios";
// import LanguagesDropdown from "@/components/layout/code-editor/LanguagesDropdown";
import useKeyPress from "@/hooks/useKeyPress";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { CodeEditorWindow } from "@/components/layout/code-editor/CodeEditorWindow";
import Loading from "@/app/loading";

const javascriptDefault = `console.log("hello");`;
const pythonDefault = `print("Hello, World!")`;
const javaDefault = `public class Main {
  public static void main(String[] args) {
      System.out.println("hello, world");
  }
}`;

function Compiler() {
  const router = useRouter();
  const [language1, setLanguage] = useState("");
  const pramas = useParams<{ language: string }>();
  // console.log(pramas.language);
  const language = pramas.language;

  const { data: session } = useSession();
  const [code, setCode] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(false);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = useCallback((sl: any) => {
    setLanguage(sl);
  }, []);

  useEffect(() => {
    console.log("Language changed:", language);

    if (language == "javascript") {
      // console.log("javascriptDefault");
      setCode(javascriptDefault);
      // console.log("DefautCode", code);
    } else if (language === "python") {
      setCode(pythonDefault);
    } else {
      setCode(javaDefault);
    }
  }, []);

  const onChange = useCallback((action: any, data: any) => {
    // console.log("action", action, "data", data);
    if (action === "code") setCode(data);
  }, []);

  useEffect(() => {
    if (enterPress && ctrlPress) {
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  const handleCompile = () => {
    const currentLanguage = languageData(language);
    console.log("currentlanguageData", currentLanguage);
    console.log("source Code", code);
    setProcessing(true);
    const formData = {
      language_id: currentLanguage!!.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    console.log(formData);
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
          toast.error(
            "Quota of 100 requests exceeded for the day. Please try again later."
          );
        } else {
          toast.error("An error occurred. Please try again.");
        }
        setProcessing(false);
        console.log("Error in catch block:", error);
      });
  };

  const checkStatus = useCallback(async (token: any) => {
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

  const handleError = (error: any) => {
    const status = error.response?.status;
    if (status === 429) {
      toast.error("Too many requests! Please try again later.");
    } else {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleSaveCode = async() => {
    if(!session){
      alert("You are not login")
    }
    else{
      let filename = prompt("Enter the file Name")
      console.log(filename, code, session, language);
      const data = {
        filename,
        code: btoa(code),
        userID: session.user.id,
        language
      }
      const response = await axios.post("/api/save-code", data);
      console.log(response.data);
      const codeid = response.data.codeID;
      router.replace(`/${codeid}`)
    }
  }

  if (!code) {
    return (
      <>
        <Loading />
      </>
    );
  }

  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${language}_code.code`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="bg-background">
      <Navbar1 />
      <div className="flex gap-8">
        <LeftNavbar />
        <div>
          <Navbar2
            Runcode={handleCompile}
            processing={processing}
            downloadCode={downloadCode}
            onSelectChange={onSelectChange}
            onhandlesavecode = {handleSaveCode}
          />
          {/* <LanguagesDropdown onSelectChange={onSelectChange} /> */}
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language}
            theme="Monokai"
          />
        </div>
        <div className=" flex flex-col">
          <OutputWindow outputDetails={outputDetails} />
          <CustomInput
            customInput={customInput}
            setCustomInput={setCustomInput}
          />
          {/* <div className="flex"> */}
          {/* <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                "mt-4 border-2 border-black z-10 rounded-md px-4 py-2 hover:shadow transition duration-200 flex-shrink-0",
                !code ? "opacity-50" : ""
              )}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button> */}
        </div>
        {/* <div className="bg-red-600">
            <button onClick={downloadCode}>
              download
            </button>
          </div> */}
        {/* {outputDetails && <OutputDetails outputDetails={outputDetails} />} */}
        {/* </div> */}
        {/* <div>
          <h1>Welcome, {session.user?.name}</h1>
          <p>Email: {session.user?.email}</p>
          <button onClick={() => signOut({ callbackUrl: '/sign-in' })} className="sign-out-btn">
            Sign Out
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default Compiler;
