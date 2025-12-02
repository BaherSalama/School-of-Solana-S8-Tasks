
'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface HeadingContextType {
  heading: string;
  setHeading: (value: string) => void;
}

const HeadingContext = createContext<HeadingContextType | undefined>(undefined);

export function HeadingProvider({ children }: { children: ReactNode }) {
  const [heading, setHeading] = useState('');
  return (
    <HeadingContext.Provider value={{ heading, setHeading }}>
      {children}
    </HeadingContext.Provider>
  );
}

export function useHeading() {
  const context = useContext(HeadingContext);
  if (!context) {
    throw new Error('useheading must be used within a MarkdownProvider');
  }
  return context;
}

