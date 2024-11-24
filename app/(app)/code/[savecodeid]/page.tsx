"use client";
import Loading from "@/app/loading";
import MainBoilerPlate from "@/components/layout/MainBoilerPlate";
import { codeatom, languageatom } from "@/store/atom";
import { useMutation } from "@tanstack/react-query";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

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
  const [filename, setFilename] = useState<string>("");
  const setLanguage = useSetRecoilState(languageatom);
  const setCode = useSetRecoilState(codeatom);

  const fetchsaveCodeApi = async () => {
    const response = await axios.get(`/api/save-code?codeID=${codeid}`);
    return response.data.codeData;
  };

  const fetchsaveCodeMutaion = useMutation({
    mutationFn: fetchsaveCodeApi,
    retry: 3,
    onSuccess: (data: CodeData) => {
      setCode({ code: atob(data.code) });
      setLanguage({ language: data.language });
      setFilename(data.fileName);
    },
    onError: (error: any) => {
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

  if (fetchsaveCodeMutaion.isPending) {
    return <Loading />;
  }

  return (
    <>
      <MainBoilerPlate filename={filename} />
    </>
  );
}

export default SaveCode;
