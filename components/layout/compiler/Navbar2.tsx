import React from 'react';

// Define the types for the props
interface Navbar2Props {
  selectedLanguage: string | null;
}

export const Navbar2: React.FC<Navbar2Props> = ({ selectedLanguage }) => {
  return (
    <div className="flex items-center justify-between  p-4 shadow-md">
      {/* Left Section - Display Selected Language */}
      <h1 className="text-lg font-semibold text-gray-800">
        {selectedLanguage ? `${selectedLanguage} Online Compiler` : 'Select a Language'}
      </h1>

      {/* Right Section - Buttons */}
      <div className="flex space-x-4">
        {/* Share Button */}
        <button className="flex items-center space-x-1 border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-100 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h8m0 0l-4-4m4 4l-4 4m-4-4h8"
            />
          </svg>
          <span className="text-gray-600">Share</span>
        </button>

        {/* Save Button */}
        <button className="flex items-center space-x-1 border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-100 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 11l7-7m0 0l7 7m-7-7v12"
            />
          </svg>
          <span className="text-gray-600">Save</span>
        </button>

        {/* Run Button */}
        <button className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition">
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
          <span>Run</span>
        </button>
      </div>
    </div>
  );
};

