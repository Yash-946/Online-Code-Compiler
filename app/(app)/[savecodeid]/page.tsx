"use client";
import Loading from '@/app/loading';
import { CodeEditorWindow } from '@/components/layout/code-editor/CodeEditorWindow';
import { CustomInput } from '@/components/layout/code-editor/CustomInput';
import { OutputWindow } from '@/components/layout/code-editor/OutputWindow';
import { LeftNavbar } from '@/components/layout/compiler/LeftNavbar';
import { Navbar1 } from '@/components/layout/compiler/Navbar1';
import { Navbar2 } from '@/components/layout/save-code/Navbar2';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface CodeData {
  id: string;
  fileName: string;
  code: string;
  language: string;
  createdAt: string;
}


function SaveCode() {
  const params = useParams<{ savecodeid: string }>();
  const codeid = params.savecodeid;
  const [loading, setLoading] = useState<boolean>(true);
  const [codeData, setCodeData] = useState<CodeData | null>(null);

  useEffect(() => {
    async function getSaveCode() {
      try {
        setLoading(true);
        const response = await axios.get(`/api/save-code?codeID=${codeid}`);
        console.log(response.data);
        setCodeData(response.data.codeData);
      } catch (error) {
        console.error('Error fetching saved code:', error);
      } finally {
        setLoading(false);
      }
    }

    if (codeid) {
      getSaveCode();
    }
  }, [codeid]);

  if (loading) {
    return <Loading />;
  }

  return (
    // <div>
    //   <h1>Saved Code</h1>
    // {codeData ? (
    //   <div>
    //     <h2>{codeData.fileName}</h2>
    //     <pre>{atob(codeData.code)}</pre>
    //     <p>Language: {codeData.language}</p>
    //     <p>Created At: {new Date(codeData.createdAt).toLocaleString()}</p>
    //   </div>
    // ) : (
    //   <p>No code found for this ID.</p>
    // )}
    // </div>

    <>
      <div>
        <div>

          <Navbar1 />
        </div>

        <div className='flex gap-8'>

          <LeftNavbar />



          {codeData ? (
            <div>
              <div className='flex gap-12'>

                <h2>{codeData.fileName}</h2>

                <Navbar2 />
              </div>
              <CodeEditorWindow />
            </div>
          ) : (
            <p>No code found for this ID.</p>
          )}

          <div>
            <OutputWindow />
            <CustomInput />
          </div>
        </div>
      </div>

    </>
  );
}

export default SaveCode;
