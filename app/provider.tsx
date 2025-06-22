"use client";
import React from 'react';
import {HeroUIProvider} from "@heroui/react";
import { ClerkProvider } from '@clerk/nextjs';
import Header from './_components/Header';

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <HeroUIProvider>
        <Header />
        {children}
      </HeroUIProvider>
    </ClerkProvider>
  );
}

export default Provider;
