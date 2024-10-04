
import { DownloadIcon, Share2Icon, UploadIcon } from 'lucide-react';
import React from 'react';

interface Navbar2Props{
  Runcode: any, 
  processing: any, 
  downloadCode: any
}

export const Navbar2 = ({Runcode, processing, downloadCode}:Navbar2Props) => {
  
  return (
    <div className="flex items-center justify-between  p-4 shadow-md">
      {/* Left Section - Display Selected Language */}
      <h1 className="text-lg font-semibold text-gray-800">
      Online code compiler
      </h1>

      {/* Right Section - Buttons */}
      <div className="flex space-x-4">
        {/* Share Button */}
        <button className="flex items-center space-x-1 border border-gray-400 px-3 py-1 rounded-md">
          <Share2Icon />
          <span>Share</span>
        </button>

        {/* Save Button */}
        <button className="flex items-center space-x-1 border border-gray-300 px-3 py-1 rounded-md">
          <UploadIcon />
          <span>Save</span>
        </button>

        {/* download button */}
        <button 
          className="flex items-center space-x-1 border border-gray-300 px-3 py-1 rounded-md"
          onClick={downloadCode}
        >
          <DownloadIcon/>
          <span className="text-white">Download</span>
        </button>

        {/* Run Button */}
        <button 
          className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition"
          onClick={Runcode}
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
          <span>{processing ? "Runing" : "Run"}</span>
        </button>
      </div>
    </div>
  );
};

