"use client";

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

const steps = [
  { id: 'details', title: 'Police Details' },
  { id: 'experience', title: 'Experience' },
  { id: 'skills', title: 'Skills & Training' },
  { id: 'review', title: 'Review' }
];

export default function PoliceFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Extract resume data from URL parameters
  const position = searchParams.get('position');
  const rank = searchParams.get('rank');
  const resumeId = searchParams.get('resumeId');

  // Determine current step from pathname
  const currentStep = pathname.split('/').pop()?.split('?')[0] || 'details';
  const currentStepIndex = steps.findIndex(step => 
    currentStep === step.id || 
    (currentStep === 'police' && step.id === 'details')
  );

  // Build query string for navigation
  const buildQueryString = () => {
    const params = new URLSearchParams();
    if (position) params.set('position', position);
    if (rank) params.set('rank', rank);
    if (resumeId) params.set('resumeId', resumeId);
    return params.toString();
  };

  const queryString = buildQueryString();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0c1b]/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link 
              href="/" 
              className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200 hover:opacity-80 transition-opacity"
            >
              HERO.AI
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Navigation */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-[#0a0c1b]/60 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2 w-full">
              {steps.map((step, index) => {
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;
                const isClickable = isCompleted || isCurrent;
                
                // Build the correct URL for each step
                let stepUrl = `/build-resume/police`;
                if (step.id === 'details') {
                  stepUrl += '/details';
                } else {
                  stepUrl += `/${step.id}`;
                }
                
                // Add query parameters if we have resume data
                if (queryString) {
                  stepUrl += `?${queryString}`;
                }

                return (
                  <div key={step.id} className="flex items-center flex-1">
                    {isClickable ? (
                      <Link
                        href={stepUrl}
                        className={`flex-1 px-4 py-2 rounded-lg text-center text-sm font-medium transition-all duration-200 hover:bg-white/10 ${
                          isCurrent 
                            ? 'text-blue-300 bg-blue-500/20' 
                            : isCompleted 
                              ? 'text-white hover:scale-105' 
                              : 'text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <span className="flex items-center justify-center space-x-2">
                          <span className={`
                            w-6 h-6 rounded-full flex items-center justify-center text-sm transition-all
                            ${isCompleted ? 'bg-green-500' : isCurrent ? 'bg-blue-500' : 'bg-gray-700'}
                          `}>
                            {isCompleted ? '✓' : index + 1}
                          </span>
                          <span>{step.title}</span>
                        </span>
                      </Link>
                    ) : (
                      <div className={`flex-1 px-4 py-2 rounded-lg text-center text-sm font-medium ${
                        'text-gray-400 cursor-not-allowed'
                      }`}>
                        <span className="flex items-center justify-center space-x-2">
                          <span className="w-6 h-6 rounded-full flex items-center justify-center text-sm bg-gray-700">
                            {index + 1}
                          </span>
                          <span>{step.title}</span>
                        </span>
                      </div>
                    )}
                    {index < steps.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-gray-500 mx-2" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pt-36">
        {children}
      </main>
    </div>
  );
} 