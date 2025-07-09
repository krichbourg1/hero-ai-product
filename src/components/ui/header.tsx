"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

interface HeaderProps {
  showAccountButton?: boolean;
}

export function Header({ showAccountButton = true }: HeaderProps) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsSignedIn(!!user);
      setIsLoading(false);
    };
    checkSession();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0c1b]/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200 hover:opacity-80 transition-opacity"
          >
            HERO.AI
          </Link>
          
          {showAccountButton && !isLoading && isSignedIn && (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-white/10 hover:bg-white/20 transition-all duration-200"
            >
              <User className="w-4 h-4" />
              My Account
            </Link>
          )}
        </div>
      </div>
    </header>
  );
} 