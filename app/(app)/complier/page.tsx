"use client"
import React from 'react';
import { useSession, signOut } from 'next-auth/react';

function Complier() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>; // Show loading state while session is loading
  }

  if (!session) {
    return <div>You are not signed in</div>;
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name}</h1>
      <p>Email: {session.user?.email}</p>
      <p>User ID: {session.user?.id}</p>

      {/* Sign Out Button */}
      <button 
        onClick={() => signOut({ callbackUrl: '/sign-in' })} 
        style={{
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Sign Out
      </button>
    </div>
  );
}

export default Complier;
