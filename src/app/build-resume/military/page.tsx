"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { getAllSavedResumes } from '@/lib/resume-utils';

const branchOptions = [
  {
    id: 'army',
    title: 'Army',
  },
  {
    id: 'navy',
    title: 'Navy',
  },
  {
    id: 'airForce',
    title: 'Air Force',
  },
  {
    id: 'marines',
    title: 'Marine Corps',
  },
  {
    id: 'coastGuard',
    title: 'Coast Guard',
  },
  {
    id: 'spaceForce',
    title: 'Space Force',
  },
];

export default function MilitaryBranchSelection() {
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsAuthLoading(false);
    };
    checkSession();
  }, []);

  // Store selected branch in localStorage when it changes
  useEffect(() => {
    if (selectedBranch) {
      localStorage.setItem('selectedBranch', selectedBranch);
    }
  }, [selectedBranch]);

  // Handle continue button click
  const handleContinue = async () => {
    if (!selectedBranch) return;
    
    // If user is already signed in, proceed directly
    if (user) {
      setIsLoading(true);
      router.push(`/build-resume/military/${selectedBranch}/details`);
      return;
    }
    
    // If user is not signed in, store the intended destination and redirect to sign-in
    const intendedDestination = `/build-resume/military/${selectedBranch}/details`;
    console.log('Storing intended destination:', intendedDestination); // Debug log
    localStorage.setItem('intendedDestination', intendedDestination);
    router.push('/sign-in');
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-center text-white mb-4">
              Select Your Branch of Service
            </h1>
            <p className="text-xl text-center text-gray-400">
              Choose your military branch to get started with your resume
            </p>
          </div>

          {/* Branch Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {branchOptions.map((branch) => (
              <button
                key={branch.id}
                onClick={() => setSelectedBranch(branch.id)}
                className={`
                  p-6 rounded-xl border transition-all duration-200 relative
                  ${selectedBranch === branch.id
                    ? 'bg-white/10 border-emerald-500/50 shadow-lg transform scale-105'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${selectedBranch === branch.id
                        ? 'border-emerald-500'
                        : 'border-white/30'
                      }
                    `}
                  >
                    {selectedBranch === branch.id && (
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {branch.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Link
              href="/build-resume"
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-lg text-blue-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </Link>
            
            <button
              onClick={handleContinue}
              disabled={!selectedBranch || isLoading}
              className={`
                px-8 py-4 rounded-lg font-medium text-lg flex items-center justify-center
                transition-all duration-200 transform relative
                ${selectedBranch && !isLoading
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:scale-105 hover:shadow-lg shadow-emerald-500/25'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white/90 rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                user ? 'Continue' : 'Sign In to Continue'
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 