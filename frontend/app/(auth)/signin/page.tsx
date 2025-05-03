'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubSignIn = async () => {
    setIsLoading(true);
    try {
      // Redirect to the backend auth endpoint
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/getaccesstoken`;
    } catch (error) {
      console.error('Failed to sign in with GitHub:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full bg-background/80 backdrop-blur-md border-b border-border py-4">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            <span className="gradient-text">Devfolio</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card p-8 max-w-md w-full"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Sign in to Devfolio</h1>
          
          <p className="text-foreground/70 mb-8 text-center">
            Connect with GitHub to select repositories for your portfolio
          </p>

          <button
            onClick={handleGitHubSignIn}
            disabled={isLoading}
            className="w-full button flex items-center justify-center gap-2 py-3"
          >
            {isLoading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
            ) : (
              <>
                <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  className="text-white"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Sign in with GitHub
              </>
            )}
          </button>

          <div className="mt-6 text-center">
            <Link 
              href="/"
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              Back to home
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default SignInPage; 