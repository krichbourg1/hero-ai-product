"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Header } from '@/components/ui/header';

export default function PolicePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Check authentication
  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Store the intended destination before redirecting to sign-in
        localStorage.setItem('intendedDestination', '/build-resume/police/details');
        router.push('/sign-in');
        return;
      }
      setUser(user);
      setIsAuthLoading(false);
      
      // Redirect authenticated users directly to details page
      router.push('/build-resume/police/details');
    };
    checkSession();
  }, [router]);

  // Show loading state while checking auth
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-white/30 border-t-white/90 rounded-full animate-spin" />
          <div className="text-xl text-white">Loading...</div>
        </div>
      </div>
    );
  }

  // This should never be reached, but just in case
  return null;
} 