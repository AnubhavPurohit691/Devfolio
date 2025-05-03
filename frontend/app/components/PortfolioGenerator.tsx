/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { generatePortfolio } from '../services/api';

interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  html_url: string;
  stargazers_count: number;
}

interface Portfolio {
  name: string;
  bio: string;
  skills: string[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
  }[];
  education: string;
  experience: string;
  contact: string;
}

const PortfolioGenerator = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [error, setError] = useState('');
  const [selectedRepos, setSelectedRepos] = useState<Repository[]>([]);
  const [isGitHubAuthed, setIsGitHubAuthed] = useState(false);

  useEffect(() => {
    // Check if we have stored repositories from GitHub
    const storedRepos = localStorage.getItem('selectedRepos');
    if (storedRepos) {
      try {
        const repos = JSON.parse(storedRepos);
        setSelectedRepos(repos);
        setIsGitHubAuthed(true);
      } catch (err) {
        console.error('Error parsing stored repositories:', err);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    
    // Append repository information to the prompt if available
    let enhancedPrompt = prompt;
    if (selectedRepos.length > 0) {
      enhancedPrompt += "\n\nGitHub Repositories:\n";
      selectedRepos.forEach(repo => {
        enhancedPrompt += `\n- ${repo.name}: ${repo.description || 'No description'} (Language: ${repo.language || 'Not specified'})`;
      });
    }
    
    try {
      const response = await generatePortfolio(enhancedPrompt);
      
      if (response && response.message) {
        try {
          // Try parsing the response as JSON
          const portfolioData = JSON.parse(response.message);
          setPortfolio(portfolioData);
        } catch (_error) {
          // If not JSON, use it as a text response
          setPortfolio({
            name: "AI Generated Portfolio",
            bio: response.message,
            skills: [],
            projects: [],
            education: "",
            experience: "",
            contact: ""
          });
        }
      } else {
        setError('Received an invalid response from the server');
      }
    } catch (err) {
      setError('Failed to generate portfolio. Please try again.');
      console.error('Error generating portfolio:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (portfolio) {
      const portfolioText = JSON.stringify(portfolio, null, 2);
      navigator.clipboard.writeText(portfolioText)
        .then(() => alert('Portfolio copied to clipboard!'))
        .catch(err => console.error('Failed to copy: ', err));
    }
  };

  const handleGitHubConnect = () => {
    router.push('/signin');
  };

  return (
    <section id="generator" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card p-6 md:p-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Create Your Portfolio</h2>
            
            {!isGitHubAuthed && (
              <div className="mb-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-primary" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-primary">Enhance your portfolio</h3>
                    <div className="mt-2 text-sm text-foreground/70">
                      <p>Connect your GitHub account to automatically include your repositories in your portfolio.</p>
                    </div>
                    <div className="mt-3">
                      <button
                        onClick={handleGitHubConnect}
                        className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="currentColor"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Connect GitHub
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isGitHubAuthed && selectedRepos.length > 0 && (
              <div className="mb-6 bg-success/5 border border-success/20 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-success" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-success">GitHub Connected</h3>
                    <div className="mt-2 text-sm text-foreground/70">
                      <p>{selectedRepos.length} repositories will be included in your portfolio.</p>
                    </div>
                    <div className="mt-3">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Change Selected Repositories
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium mb-2">
                  Tell us about yourself
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your skills, experience, projects, and what you want to highlight in your portfolio..."
                  className="w-full min-h-[150px] p-3 rounded-md border border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading} 
                className="button px-4 py-2 w-full md:w-auto"
              >
                {loading ? 'Generating...' : 'Generate Portfolio'}
              </button>
            </form>
            
            {error && (
              <div className="mt-6 p-4 bg-error/10 border border-error/30 rounded-md text-error">
                {error}
              </div>
            )}
            
            {portfolio && !loading && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
                className="mt-8 border-t border-border pt-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Generated Portfolio</h3>
                  <button 
                    onClick={copyToClipboard}
                    className="px-3 py-1 text-sm bg-secondary text-white rounded-md hover:bg-secondary-hover transition-colors"
                  >
                    Copy to Clipboard
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-primary mb-2">Name</h4>
                    <p>{portfolio.name}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-primary mb-2">Bio</h4>
                    <p className="whitespace-pre-wrap">{portfolio.bio}</p>
                  </div>
                  
                  {portfolio.skills && portfolio.skills.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-primary mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {portfolio.skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {portfolio.projects && portfolio.projects.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-primary mb-2">Projects</h4>
                      <div className="space-y-4">
                        {portfolio.projects.map((project, index) => (
                          <div key={index} className="p-4 border border-border rounded-md">
                            <h5 className="font-semibold">{project.title}</h5>
                            <p className="text-sm text-foreground/80 mt-1">{project.description}</p>
                            {project.technologies && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {project.technologies.map((tech, techIndex) => (
                                  <span 
                                    key={techIndex}
                                    className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {portfolio.education && (
                    <div>
                      <h4 className="text-lg font-semibold text-primary mb-2">Education</h4>
                      <p className="whitespace-pre-wrap">{portfolio.education}</p>
                    </div>
                  )}
                  
                  {portfolio.experience && (
                    <div>
                      <h4 className="text-lg font-semibold text-primary mb-2">Experience</h4>
                      <p className="whitespace-pre-wrap">{portfolio.experience}</p>
                    </div>
                  )}
                  
                  {portfolio.contact && (
                    <div>
                      <h4 className="text-lg font-semibold text-primary mb-2">Contact</h4>
                      <p>{portfolio.contact}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioGenerator; 