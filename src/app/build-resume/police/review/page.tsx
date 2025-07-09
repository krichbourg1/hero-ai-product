"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { policePositions, policeRanks } from '@/data/police-data';
import { loadResumeData, ResumeData } from '@/lib/resume-utils';
import { useNotification, Notification } from '@/components/ui/notification';
import { saveResumeProgress } from '@/lib/resume-utils';
import { supabase } from '@/lib/supabaseClient';

export default function PoliceReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const { notification, hideNotification } = useNotification();
  
  const position = searchParams.get('position') || undefined;
  const rank = searchParams.get('rank') || undefined;
  const resumeId = searchParams.get('resumeId') || undefined;

  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  // Check authentication
  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/sign-in');
        return;
      }
      setUser(user);
      setIsAuthLoading(false);
    };
    checkSession();
  }, [router]);

  // Get position and rank details
  const positionDetails = policePositions.find(p => p.id === position);
  const rankDetails = policeRanks.find(r => r.id === rank);

  // Load data from localStorage when component mounts
  useEffect(() => {
    if (resumeId) {
      console.log('Loading resume data for ID:', resumeId);
      const savedData = loadResumeData(resumeId);
      console.log('Loaded resume data:', savedData);
      if (savedData) {
        setResumeData(savedData);
      } else {
        console.error('No resume data found for ID:', resumeId);
      }
    }
  }, [resumeId]);

  // Show loading state
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Redirect to details if not authenticated
  if (!user) {
    router.push('/sign-in');
    return null;
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className="text-xl">No resume data found</div>
      </div>
    );
  }

  const handleBack = () => {
    router.push(`/build-resume/police/skills?position=${position}&rank=${rank}&resumeId=${resumeId}`);
  };

  const handleGenerateResume = () => {
    // Use the existing resumeId instead of generating a new one
    const finalResumeId = resumeId || `police-${position}-${rank}-${Date.now()}`;
    
    // Prepare the complete resume data for the formatted resume
    const completeResumeData = {
      id: finalResumeId,
      userId: user?.id || 'anonymous',
      personalInfo: resumeData.personalInfo,
      workExperience: {
        position: resumeData.rankTitle || rankDetails?.title,
        company: resumeData.experience?.department || 'Police Department',
        startDate: resumeData.experience?.startDate,
        endDate: resumeData.experience?.endDate,
        description: resumeData.experience?.duties
      },
      education: resumeData.education || [],
      skills: resumeData.skills || [],
      // Add the required fields for the resume page
      branch: resumeData.experience?.department || 'Police Department',
      mos: resumeData.mos || position,
      mosTitle: resumeData.mosTitle || positionDetails?.title,
      rank: resumeData.rank || rank,
      rankTitle: resumeData.rankTitle || rankDetails?.title,
      serviceType: 'police' as const,
      position: resumeData.mos || position,
      positionTitle: resumeData.mosTitle || positionDetails?.title,
      status: 'completed' as const,
      lastUpdated: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    console.log('Generating resume with data:', completeResumeData);

    // Save the complete resume data using the saveResumeProgress function
    saveResumeProgress(completeResumeData);

    // Navigate to the formatted resume page
    router.push(`/resume/${finalResumeId}`);
  };

  const educationTypes = [
    { value: 'college', label: 'College/University' },
    { value: 'police-academy', label: 'Police Academy' },
    { value: 'training', label: 'Professional Training' },
    { value: 'certification', label: 'Certification' },
    { value: 'none', label: 'Other' }
  ];

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}
      
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto p-6 space-y-8">
          <h1 className="text-4xl font-bold text-center mb-12">
            Review Your Police Experience
          </h1>

          {/* Personal Information */}
          <div className="bg-white/5 rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-emerald-400">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Name</p>
                <p className="text-lg">
                  {resumeData.personalInfo?.firstName && resumeData.personalInfo?.lastName 
                    ? `${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}`
                    : 'Not provided'
                  }
                </p>
              </div>
              <div>
                <p className="text-gray-400">Email</p>
                <p className="text-lg">{resumeData.personalInfo?.email || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Police Service */}
          <div className="bg-white/5 rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-emerald-400">Police Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Department/Agency</p>
                <p className="text-lg">{resumeData.experience?.department || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-gray-400">Rank</p>
                <p className="text-lg">{resumeData.rankTitle || rankDetails?.title || 'Not specified'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-400">Position</p>
                <p className="text-lg">{resumeData.mosTitle || positionDetails?.title || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-gray-400">Service Period</p>
                <p className="text-lg">
                  {resumeData.experience?.startDate && resumeData.experience?.endDate
                    ? `${resumeData.experience.startDate} - ${resumeData.experience.endDate}`
                    : 'Not specified'
                  }
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-400">Duties and Responsibilities</p>
              <p className="text-lg whitespace-pre-wrap">
                {resumeData.experience?.duties || 'No duties specified'}
              </p>
            </div>
          </div>

          {/* Education and Training */}
          <div className="bg-white/5 rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-emerald-400">Education and Training</h2>
            {resumeData.education && resumeData.education.length > 0 ? (
              <div className="space-y-4">
                {resumeData.education.map((entry, index) => (
                  <div key={index} className="border-b border-white/10 pb-4 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">
                        {educationTypes.find(t => t.value === entry.type)?.label}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold">{entry.school}</h3>
                    {entry.degree && (
                      <p className="text-blue-200">{entry.degree} {entry.field && `in ${entry.field}`}</p>
                    )}
                    <p className="text-gray-400">
                      {entry.startDate} - {entry.isOngoing ? 'Present' : entry.endDate}
                    </p>
                    {entry.description && (
                      <p className="text-gray-300 mt-2">{entry.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No education or training entries added.</p>
            )}
          </div>

          {/* Skills */}
          <div className="bg-white/5 rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-emerald-400">Skills</h2>
            {resumeData.skills && resumeData.skills.length > 0 ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-blue-400">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.filter(skill => skill.type === 'hard').map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-green-400">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.filter(skill => skill.type === 'soft').map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">No skills added.</p>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-lg text-blue-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            
            <button
              onClick={handleGenerateResume}
              className="px-8 py-4 rounded-lg font-medium text-lg flex items-center justify-center transition-all duration-200 transform bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:scale-105 hover:shadow-lg shadow-emerald-500/25"
            >
              Generate Resume
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 