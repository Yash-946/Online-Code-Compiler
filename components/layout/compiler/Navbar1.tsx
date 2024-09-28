"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

interface User {
  email: string;
  avatarUrl: string;
}


export const Navbar1: React.FC = () => {
  const { data: session, status } = useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);



  const handleGoogleSignIn = async () => {
    const result = await signIn("google", { callbackUrl: "/compiler" });
    console.log("googlesignin", result);
  };
  return (
    <nav className="bg-background p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Image
            width={1000}
            height={1000}
            src="/logo.png"
            alt="Logo"
            className="h-8 w-8"
          />
          <h1 className="text-foreground text-xl font-bold font-Josefin">
            Online Code Compiler
          </h1>
        </div>

        {/* If session exists, show avatar and dropdown */}
        {session ? (
          <div className="relative">
            <motion.img
              src={session?.user?.image || "/default-avatar.png"}
              alt="User Avatar"
              className="h-16 w-16 rounded-full cursor-pointer border-2 border-color-3 ml-48 mb-2"
              whileHover={{ scale: 1.1 }}
              onClick={() => setShowUserMenu(!showUserMenu)}
            />

            {/* User dropdown menu */}
            {showUserMenu && (
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-card rounded-md shadow-lg py-2 z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Arrow beneath avatar */}
                <div className="absolute top-[-6px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-card rotate-45 z-[-1]"></div>

                {/* Dropdown content */}
                <div className="p-2">
                  <p className="px-4 py-2 text-sm text-card-foreground text-center">
                    Name: {session.user?.name || "Guest"}
                  </p>
                  <p className="px-4 py-2 text-sm text-card-foreground text-center">
                    {session.user?.email}
                  </p>
                  <button
                    onClick={() => signOut({ callbackUrl: '/compiler' })}
                    className="block w-full text-left px-4 py-2 text-sm text-card-foreground hover:bg-accent hover:text-accent-foreground rounded-md"
                  >
                    Sign out
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          
          <motion.button
            onClick={handleGoogleSignIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex justify-center items-center py-2 px-4 border border-muted rounded-md shadow-sm bg-background text-sm font-medium text-muted-foreground hover:bg-muted/50"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            Sign in with Google
          </motion.button>
        )}
      </div>
    </nav>
  );
};
