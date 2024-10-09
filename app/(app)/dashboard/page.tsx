"use client";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

type Code = {
  id: string;
  fileName: string;
  language: string;
  code: string;
  createdAt: Date; // Use Date if you plan to parse it as a date
};


function Dashboard() {
  const [codes, setCodes] = useState([]);
  const { data: session } = useSession();
  const userID = session?.user.id;

  useEffect(() => {
    // Function to fetch saved codes for the user
    const fetchCodes = async () => {
      try {
        const response = await axios.get(`/api/save-code?userID=${userID}`); // Replace "your-endpoint" with your actual API route
        const data = await response.data
        setCodes(data.codes);
      } catch (error) {
        console.error("Error fetching codes:", error);
      }
    };

    fetchCodes();
  }, [userID]);

  if(!session){
    return(
      <>
      Loading...
      </>
    )
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="code-list">
        {codes.length > 0 ? (
          codes.map((code:Code) => (
            <div key={code.id} className="code-item">
              <h2>{code.fileName}</h2>
              <p>Language: {code.language}</p>
              <pre>{atob(code.code)}</pre>
              <p>Created at: {new Date(code.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No saved codes found.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
