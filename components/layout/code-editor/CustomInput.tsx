"use client"
import React from "react";
interface CustomInputProps{
  customInput:string,
  setCustomInput:(value:string) => void;
}

export const CustomInput = ({ customInput, setCustomInput }:CustomInputProps) => {
  return (
    <>
      {" "}
      <textarea
        rows={5}
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input`}
        className="focus:outline-none w-[38vw] min-h-[36vh] h-[36vh]  z-10 rounded-md resize-none px-4 py-2  bg-card  bg-opacity-15 mt-2"
      ></textarea>
    </>
  );
};

