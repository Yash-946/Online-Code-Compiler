"use client";
import { DownloadIcon, Share2Icon, UploadIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import SignInPopup from "./auth/signin-popup";
import { SaveFile } from "./save-code/SaveFile";
import { useSession } from "next-auth/react";
import { languageData, languageExtension } from "@/lib/Languages";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

interface Navbar2Props {
  code: string;
  language: string;
  customInput: string;
  setOutputDetails: (value: React.SetStateAction<null>) => void;
  flag: boolean;
  savecodepage: boolean;
  filename?: string;
  setFlag?: (value: boolean) => void;
}

export const Navbar2 = ({
  code,
  language,
  customInput,
  setOutputDetails,
  flag,
  savecodepage,
  filename,
  setFlag
}: Navbar2Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams<{ savecodeid: string }>();
  const codeid = params.savecodeid;

  const [isSigninPopupOpen, setSigninPopupOpen] = useState(false);
  const [isSaveFilePopupOpen, setSaveFilePopupOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSave = () => {
    if (!session) {
      setSigninPopupOpen(true);
    } else {
      setSaveFilePopupOpen(true);
    }
  };

  const handledownloadCode = () => {
    downloadCode({filename, code, language});
  };

  const handleCompile = () => {
    const currentLanguage = languageData(language);
    // console.log("currentlanguageData", currentLanguage);
    // console.log("source Code", code);
    setProcessing(true);
    const formData = {
      language_id: currentLanguage!!.id,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    // console.log(formData);
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
    // console.log(options);

    axios
      .request(options)
      .then(function (response) {
        // console.log("res.data", response.data);
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

  const SaveCodeApi = async (data: any) => {
    const response = await axios.post("/api/save-code", data);
    return response.data;
  };

  const SaveCodeMutaion = useMutation({
    mutationFn: SaveCodeApi,
    retry: 3,
    onSuccess: (data: any) => {
      const codeid = data.codeID;
      router.replace(`/code/${codeid}`);
    },
    onError: (error: any) => {
      console.error("Error saving code:", error);
      toast.error("Error while saving the code");
    },
  });

  const handleSaveCode = async (filename: String) => {
    // console.log(filename);
    try {
      if (filename) {
        const data = {
          filename,
          code: btoa(code),
          userID: session!!.user.id,
          language,
        };
        SaveCodeMutaion.mutate(data);
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const UpdateCodeApi = async (data: any) => {
    const response = await axios.put("/api/save-code", data);
    return response.data;
  };

  const UpdateCodeMutaion = useMutation({
    mutationFn: UpdateCodeApi,
    retry: 3,
    onSuccess: (data: any) => {
      toast.success("Your Code is Updated")
        setFlag!!!(false)
    },
    onError: (error: any) => {
      console.error("Error saving code:", error);
      toast.error("Error while saving the code");
    },
  });

  const handleUpdateCode = async () => {
    // console.log("Update api call",codeid, code);
    const data = {
      codeID: codeid,
      code: btoa(code),
    };
    UpdateCodeMutaion.mutate(data);
  };

  return (
    <div className="flex items-center justify-between shadow-md pb-3">
      <div className="flex space-x-4">
        <button className="flex items-center space-x-1 bg-primary text-primary-foreground px-3 py-1 rounded-md hover:bg-secondary hover:text-secondary-foreground transition-colors duration-200 ease-in-out transform hover:scale-105 active:scale-95">
          <Share2Icon className="w-5 h-5" />
          <span>Share</span>
        </button>

        <button
          className={`flex items-center space-x-1 bg-primary text-primary-foreground px-3 py-1 rounded-md hover:bg-secondary hover:text-secondary-foreground transition-colors duration-200 ease-in-out transform hover:scale-105 active:scale-95  ${
            flag ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          onClick={savecodepage ? handleUpdateCode : handleSave}
          disabled={!flag}
        >
          <UploadIcon className="w-5 h-5" />
          {flag ? (
            <span>{SaveCodeMutaion.isPending ? `saving` : `save`}</span>
          ) : (
            <span>saved</span>
          )}
        </button>

        <button
          className="flex items-center space-x-1 bg-primary text-primary-foreground px-3 py-1 rounded-md hover:bg-secondary hover:text-secondary-foreground transition-colors duration-200 ease-in-out transform hover:scale-105 active:scale-95"
          onClick={handledownloadCode}
        >
          <DownloadIcon className="w-5 h-5" />
          <span>Download</span>
        </button>

        <button
          className={`flex items-center space-x-1 px-4 py-1 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 ${
            processing
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-accent text-accent-foreground hover:bg-accent/90"
          }`}
          onClick={handleCompile}
          disabled={processing}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 3v18l15-9L5 3z"
            />
          </svg>
          <span>{processing ? "Running" : "Run"}</span>
        </button>
      </div>

      <SaveFile
        isOpen={isSaveFilePopupOpen}
        onClose={() => setSaveFilePopupOpen(false)}
        onhandlesavecode={handleSaveCode}
      />

      <SignInPopup
        isOpen={isSigninPopupOpen}
        onClose={() => setSigninPopupOpen(false)}
      />
    </div>
  );
};

interface downloadCodeprops {
  filename?: string,
  code: string,
  language: string;
}
export const downloadCode = ({
  filename,
  code,
  language,
}: downloadCodeprops) => {
  const le = languageExtension(language);
  const element = document.createElement("a");
  const file = new Blob([code], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  const name = filename || `${language}_code`;
  element.download = `${name}${le}`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};


// const handleError = (error: any) => {
  //   const status = error.response?.status;
  //   if (status === 429) {
  //     toast.error("Too many requests! Please try again later.");
  //   } else {
  //     toast.error("An error occurred. Please try again.");
  //   }
  // }