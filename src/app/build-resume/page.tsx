"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Shield, Flame, Sword, Users, Home } from 'lucide-react';
import { getAllSavedResumes, ResumeListItem } from '@/lib/resume-utils';
import { canCreateResume } from '@/lib/subscription-utils';

const serviceOptions = [
  {
    id: 'military',
    title: 'Military',
    icon: Sword,
    description: 'Served in any branch of the armed forces',
  },
  {
    id: 'police',
    title: 'Police Officer',
    icon: Shield,
    description: 'Law enforcement and public safety service',
  },
  {
    id: 'firefighter',
    title: 'Firefighter',
    icon: Flame,
    description: 'Fire service and emergency response',
  },
  {
    id: 'paramedic',
    title: 'Paramedic',
    icon: Users,
    description: 'Emergency medical services and patient care',
  },
];

export default function ServiceSelection() {
  const [selectedService, setSelectedService] = useState<string>('');
  const [resumes, setResumes] = useState<ResumeListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        // Load saved resumes to check count (filtered by current user)
        const savedResumes = getAllSavedResumes(user.id);
        setResumes(savedResumes);
      }
      setIsLoading(false);
    };
    checkSession();
  }, []);

  const handleContinue = () => {
    if (!selectedService) return;
    
    // Only check resume limits for signed-in users
    if (userId) {
      const canCreate = canCreateResume(userId, resumes.length);
      
      if (!canCreate) {
        // Redirect to dashboard with upgrade prompt
        alert('You have reached your resume limit on the free plan. Please upgrade to create more resumes.');
        router.push('/dashboard');
        return;
      }
    }
    
    // Navigate directly to the selected service
    router.push(selectedService === 'military' ? '/build-resume/military' : `/build-resume/${selectedService}`);
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0c1b] flex items-center justify-center">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c1b]">
      {/* Header with Home Button */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0c1b]/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200 hover:opacity-80 transition-opacity"
            >
              HERO.AI
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-200 hover:scale-105"
            >
              <Home className="w-4 h-4" />
              <span className="font-medium">Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Describe Your Service
            </h1>
            <p className="text-xl text-blue-200">
              Select your service background to help us tailor your resume
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {serviceOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleServiceSelect(option.id)}
                className={`
                  glass-effect rounded-xl p-8 relative cursor-pointer group transition-all duration-200
                  ${selectedService === option.id
                    ? 'bg-white/10 border border-blue-400/50 transform scale-105'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                  }
                `}
                tabIndex={0}
                role="button"
                aria-pressed={selectedService === option.id}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleServiceSelect(option.id);
                  }
                }}
              >
                {/* Radio Circle */}
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-blue-400 flex items-center justify-center">
                  <div className={`w-4 h-4 rounded-full transition-all duration-200 ${
                    selectedService === option.id 
                    ? 'bg-blue-400 scale-100' 
                    : 'bg-transparent scale-0'
                  }`} />
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <option.icon className={`transition-colors duration-200 ${
                      selectedService === option.id ? 'text-blue-400' : 'text-blue-300'
                    }`} size={32} />
                  </div>
                  <h2 className={`text-2xl font-bold mb-3 transition-colors duration-200 ${
                    selectedService === option.id ? 'text-white' : 'text-blue-100'
                  }`}>
                    {option.title}
                  </h2>
                  <p className={`transition-colors duration-200 ${
                    selectedService === option.id ? 'text-blue-200' : 'text-blue-300'
                  }`}>
                    {option.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleContinue}
              disabled={!selectedService}
              className={`
                px-8 py-4 rounded-lg font-medium text-lg flex items-center justify-center
                transition-all duration-200 transform
                ${selectedService
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:scale-105 hover:shadow-lg shadow-emerald-500/25'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 