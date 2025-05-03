'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/page');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}
