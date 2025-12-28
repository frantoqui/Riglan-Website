'use client';

import { Amplify } from 'aws-amplify';
import { amplifyConfig } from './config';
import { useEffect } from 'react';

// Configure Amplify
Amplify.configure(amplifyConfig, { ssr: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Additional client-side initialization if needed
  }, []);

  return <>{children}</>;
}