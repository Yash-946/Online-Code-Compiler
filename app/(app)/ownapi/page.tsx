"use client";
import React, { useState } from 'react';

function OwnAPI() {
  // const [rapidApiUrl, setRapidApiUrl] = useState('');
  // const [rapidApiHost, setRapidApiHost] = useState('');
  const [rapidApiKey, setRapidApiKey] = useState('');
  const [geminiApiKey, setGeminiApiKey] = useState('');

  const handleSave = (e:any) => {
    e.preventDefault();
    // localStorage.setItem('NEXT_PUBLIC_RAPID_API_URL', rapidApiUrl);
    // localStorage.setItem('NEXT_PUBLIC_RAPID_API_HOST', rapidApiHost);
    localStorage.setItem('NEXT_PUBLIC_RAPID_API_KEY', rapidApiKey);
    localStorage.setItem('NEXT_PUBLIC_GEMINI_API_KEY', geminiApiKey);
    alert('API keys saved successfully!');
  };

  return (
    <div>
      <h2>Save API Keys</h2>
      <form onSubmit={handleSave} className='space-y-4'>
        {/* <div>
          <label>Rapid API URL:</label>
          <input
            type="text"
            value={rapidApiUrl}
            onChange={(e) => setRapidApiUrl(e.target.value)}
          />
        </div> */}
        {/* <div>
          <label>Rapid API Host:</label>
          <input
            type="text"
            value={rapidApiHost}
            onChange={(e) => setRapidApiHost(e.target.value)}
            required
          />
        </div> */}
        <div>
          <label>Rapid API Key:</label>
          <input
            type="text"
            value={rapidApiKey}
            onChange={(e) => setRapidApiKey(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Gemini API Key:</label>
          <input
            type="text"
            value={geminiApiKey}
            onChange={(e) => setGeminiApiKey(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save Keys</button>
      </form>
    </div>
  );
}

export default OwnAPI;


// NEXT_PUBLIC_RAPID_API_URL
// NEXT_PUBLIC_RAPID_API_HOST=
// NEXT_PUBLIC_RAPID_API_KEY=
// NEXT_PUBLIC_GEMINI_API_KEY=