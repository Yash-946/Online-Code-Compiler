"use client"
import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Navbar1 } from '@/components/layout/compiler/Navbar1';
import { LeftNavbar } from '@/components/layout/compiler/LeftNavbar';
import { Navbar2 } from '@/components/layout/compiler/Navbar2';


function compiler() {
  const { data: session, status } = useSession();

  console.log(session);

  if (status === "loading") {
    return <div>Loading...</div>; // Show loading state while session is loading
  }

  if (!session) {
    return <div>You are not signed in
      <Navbar1 />
    </div>;
  }

  return (
    <div>
      <Navbar1 />



<div className='flex gap-10'>


      <div>

        <LeftNavbar />
      </div>


      <div>
        <Navbar2 />
      </div>
      <div>


      <div>Checking github</div>
      <h1>Welcome, {session.user?.name}</h1>
      <p>Email: {session.user?.email}</p>
      <p>User ID: {session.user?.id}</p>


      {/* Sign Out Button */}
      <button
        onClick={() => signOut({ callbackUrl: '/sign-in' })}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Sign Out
      </button>
      </div>

      </div>
    </div>
  );
}

export default compiler;
