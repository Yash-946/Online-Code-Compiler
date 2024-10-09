import { DownloadIcon, Share2Icon, UploadIcon } from 'lucide-react';
import React, { useState } from 'react';
import LanguagesDropdown from '../code-editor/LanguagesDropdown';
import SignInPopup from '../auth/signin-popup';

interface Navbar2Props {
  Runcode: () => void;
  processing: boolean;
  downloadCode: () => void;
  onSelectChange: (value: string) => void;
  onhandlesavecode: () => void
}

export const Navbar2 = ({ Runcode, processing, downloadCode, onSelectChange, onhandlesavecode }: Navbar2Props) => {

  const [issigninPopupOpen, setsigninPopupOpen] = useState(false);

  return (
    <div className="flex items-center justify-between shadow-md pb-4">

      <LanguagesDropdown onSelectChange={onSelectChange} />

      <div className="flex space-x-4">
        <button onClick={() => setsigninPopupOpen(true)} className="flex items-center space-x-1 bg-primary text-primary-foreground px-3 py-1 rounded-md hover:bg-secondary hover:text-secondary-foreground transition-colors duration-200 ease-in-out transform hover:scale-105 active:scale-95">
          <Share2Icon className="w-5 h-5" />
          <span>Share</span>
        </button>

        <button 
          className="flex items-center space-x-1 bg-primary text-primary-foreground px-3 py-1 rounded-md hover:bg-secondary hover:text-secondary-foreground transition-colors duration-200 ease-in-out transform hover:scale-105 active:scale-95"
          onClick={onhandlesavecode}
        >
          <UploadIcon className="w-5 h-5" />
          <span>Save</span>
        </button>

        <button
          className="flex items-center space-x-1 bg-primary text-primary-foreground px-3 py-1 rounded-md hover:bg-secondary hover:text-secondary-foreground transition-colors duration-200 ease-in-out transform hover:scale-105 active:scale-95"
          onClick={downloadCode}
        >
          <DownloadIcon className="w-5 h-5" />
          <span>Download</span>
        </button>

        <button 
          className={`flex items-center space-x-1 px-4 py-1 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 ${
            processing 
              ? 'bg-muted text-muted-foreground cursor-not-allowed' 
              : 'bg-accent text-accent-foreground hover:bg-accent/90'
          }`}
          onClick={Runcode}
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
      <SignInPopup isOpen={issigninPopupOpen} onClose={() => setsigninPopupOpen(false)} />
    </div>
  );
};