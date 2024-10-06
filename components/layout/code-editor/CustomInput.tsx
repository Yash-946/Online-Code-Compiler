//@ts-nocheck

"use client"


import React from "react";
import { classnames } from "../../../utils/general";

export const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      {" "}
      <textarea
        rows="5"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input`}
        className={classnames(
          "focus:outline-none w-[40vw] h-[41vh]  z-10 rounded-md resize-none px-4 py-2  bg-card  bg-opacity-15 mt-2"
        )}
      ></textarea>
    </>
  );
};

