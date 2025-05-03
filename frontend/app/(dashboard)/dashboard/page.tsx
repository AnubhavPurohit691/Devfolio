'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getRepositories } from '@/app/services/api';

interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  html_url: string;
  stargazers_count: number;
}

const Dashboard = () => {
  const router = useRouter();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedRepos, setSelectedRepos] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const data = await getRepositories();
        setRepositories(data);
      } catch (err) {
        console.error('Error fetching repositories:', err);
        setError('Failed to load your repositories. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  const toggleRepository = (id: number) => {
    if (selectedRepos.includes(id)) {
      setSelectedRepos(selectedRepos.filter(repoId => repoId !== id));
    } else {
      setSelectedRepos([...selectedRepos, id]);
    }
  };

  const handleContinue = () => {
    if (selectedRepos.length === 0) {
      setError('Please select at least one repository');
      return;
    }

    // Store selected repositories in local storage to use in portfolio generation
    localStorage.setItem('selectedRepos', JSON.stringify(
      repositories.filter(repo => selectedRepos.includes(repo.id))
    ));
    
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full bg-background/80 backdrop-blur-md border-b border-border py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            <span className="gradient-text">Devfolio</span>
          </Link>
          <Link 
            href="/"
            className="text-sm text-foreground/70 hover:text-foreground transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Select Your Projects</h1>
          <p className="text-foreground/70 mb-8">
            Choose repositories you want to highlight in your portfolio
          </p>

          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/30 rounded-md text-error">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : repositories.length === 0 ? (
            <div className="card p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">No repositories found</h2>
              <p className="text-foreground/70 mb-4">
                We couldn&apos;t find any GitHub repositories for your account.
              </p>
              <Link 
                href="/"
                className="button px-4 py-2 inline-block"
              >
                Return to Home
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {repositories.map(repo => (
                  <motion.div
                    key={repo.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`card p-4 cursor-pointer transition-all ${
                      selectedRepos.includes(repo.id) 
                        ? 'border-primary shadow-md' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => toggleRepository(repo.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <input 
                          type="checkbox" 
                          checked={selectedRepos.includes(repo.id)}
                          onChange={() => toggleRepository(repo.id)}
                          className="h-5 w-5 accent-primary cursor-pointer"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{repo.name}</h3>
                        {repo.description && (
                          <p className="text-sm text-foreground/70 mt-1">{repo.description}</p>
                        )}
                        <div className="flex items-center gap-4 mt-3">
                          {repo.language && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                              {repo.language}
                            </span>
                          )}
                          <span className="text-xs flex items-center">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-4 h-4 mr-1 text-foreground/70"
                            >
                              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                            </svg>
                            {repo.stargazers_count}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={handleContinue}
                  className="button px-6 py-2"
                >
                  Continue with Selected Repositories
                </button>
              </div>
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard; 