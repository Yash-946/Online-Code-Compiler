"use client";

import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";
import MainBoilerPlate from "@/components/layout/MainBoilerPlate";
import { DefaultCode } from "@/lib/Languages";
import { useParams, useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { codeatom, languageatom } from "@/store/atom";

function Compiler() {
  const router = useRouter();
  const pramas = useParams<{ language: string }>();
  const language = pramas.language;
  const [loading, setLoading] = useState<boolean>(true);
  const setLanguage = useSetRecoilState(languageatom);
  const setCode = useSetRecoilState(codeatom);

  // const enterPress = useKeyPress("Enter");
  // const ctrlPress = useKeyPress("Control");

  // const onSelectChange = useCallback((sl: any) => {
  //   setLanguage(sl);
  // }, []);

  useEffect(() => {
    // console.log("Language changed:", language);
    const key = "codecompilercodes";
    const localSaveCodes = localStorage.getItem(key);
   
    const dc: string = DefaultCode(language);
    if (dc == `LNF`) {
      router.replace(`/not-found`);
    } else {
      if (localSaveCodes) {
        const data = JSON.parse(localSaveCodes);
        console.log("getlocalsavecodes",data[language])
        setCode({ code: data[language] });
      } else {
        setCode({ code: dc });
      }
      setLanguage({ language });
      setLoading(false);
    }
  }, []);

  // const code = useRecoilValue(codeatom).code;

  // useEffect(() => {
  //   if (enterPress && ctrlPress) {
  //     handleCompile();
  //   }
  // }, [ctrlPress, enterPress]);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <MainBoilerPlate />
    </>
  );
}

export default Compiler;
