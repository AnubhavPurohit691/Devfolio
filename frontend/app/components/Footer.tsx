'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <Link href="/" className="text-xl font-bold">
              <span className="gradient-text">Devfolio</span>
            </Link>
            <p className="mt-2 text-sm text-foreground/70">
              Create beautiful developer portfolios with AI
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div>
              <h3 className="font-semibold mb-2">Links</h3>
              <ul className="space-y-1">
                <li>
                  <Link 
                    href="/" 
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#generator" 
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                  >
                    Generator
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#examples" 
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                  >
                    Examples
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Connect</h3>
              <ul className="space-y-1">
                <li>
                  <a 
                    href="https://github.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a 
                    href="https://twitter.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border/50 text-center text-sm text-foreground/60">
          <p>© {new Date().getFullYear()} Devfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 