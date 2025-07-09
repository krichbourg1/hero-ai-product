"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { ArrowLeft, Check } from 'lucide-react';
import { militaryOccupations, militaryRanks } from '@/data/military-data';
import { MilitaryRankVariations } from '@/types/military-rank-variations';
import { loadResumeData, saveResumeProgress, debugResumeStorage } from '@/lib/resume-utils';

interface EducationEntry {
  type: 'college' | 'military' | 'police-academy' | 'training' | 'certification' | 'none';
  school: string;
  degree?: string;
  field?: string;
  startDate: string;
  endDate: string;
  isOngoing: boolean;
  description?: string;
}

interface Skill {
  name: string;
  type: 'soft' | 'hard';
}

interface ExperienceEntry {
  type: 'military' | 'civilian';
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  duties: string;
  mos?: string;
  rank?: string;
}

interface ExperienceData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
  };
  branch: string;
  militaryExperiences: Array<{
    id: string;
    branch: string;
    mos: string;
    mosTitle?: string;
    rank: string;
    rankTitle?: string;
    startDate: string;
    endDate: string;
    duties: string;
    isCurrent?: boolean;
  }>;
  civilianExperiences: Array<{
    id: string;
    company: string;
    position: string;
    location?: string;
    startDate: string;
    endDate: string;
    duties: string;
    isCurrent?: boolean;
  }>;
}

export default function MilitaryReviewPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const branch = params.branch as keyof typeof militaryOccupations & keyof MilitaryRankVariations;
  const mos = searchParams.get('mos');
  const rank = searchParams.get('rank');
  const resumeId = searchParams.get('resumeId') || undefined;
  
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get MOS and Rank details
  const mosDetails = militaryOccupations[branch]?.find(m => m.id === mos);
  const rankDetails = militaryRanks.find(r => r.id === rank);

  // State for all the data
  const [experienceData, setExperienceData] = useState<ExperienceData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: ''
    },
    branch: branch || '',
    militaryExperiences: [],
    civilianExperiences: []
  });

  const [educationEntries, setEducationEntries] = useState<EducationEntry[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  // Check authentication
  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/sign-in');
        return;
      }
      setUser(user);
      setIsLoading(false);
    };
    checkSession();
  }, [router]);

  // Load data from resumeId when component mounts
  useEffect(() => {
    if (resumeId && user?.id) {
      console.log('Loading saved military review data for resumeId:', resumeId);
      console.log('Current user ID:', user?.id);
      
      // Add debugging call to check localStorage state
      debugResumeStorage(resumeId);
      
      const savedData = loadResumeData(resumeId);
      console.log('Loading saved military review data:', savedData);
      if (savedData) {
        console.log('Review page - setting data from saved resume:');
        console.log('- Personal Info:', savedData.personalInfo);
        console.log('- Military Experiences:', savedData.militaryExperiences);
        console.log('- Civilian Experiences:', savedData.civilianExperiences);
        console.log('- Education count:', savedData.education?.length || 0);
        console.log('- Skills count:', savedData.skills?.length || 0);
        
        // Update experience data
        setExperienceData(prev => ({
          ...prev,
          personalInfo: savedData.personalInfo || prev.personalInfo,
          militaryExperiences: savedData.militaryExperiences || prev.militaryExperiences,
          civilianExperiences: savedData.civilianExperiences || prev.civilianExperiences
        }));

        // Update education and skills
        if (savedData.education) {
          console.log('Setting education entries:', savedData.education);
          setEducationEntries(savedData.education);
        }
        if (savedData.skills) {
          console.log('Setting skills:', savedData.skills);
          setSkills(savedData.skills);
        }
      } else {
        console.log('No saved data found for review page');
      }
    } else {
      console.log('Not loading review data - resumeId:', resumeId, 'user?.id:', user?.id);
    }
  }, [resumeId, user]);

  // Debug skills state
  useEffect(() => {
    console.log('Skills state in review page:', skills);
  }, [skills]);

  // Show loading state
  if (isLoading) {
    return <div className="flex items-center justify-center">
      <div className="text-xl">Loading...</div>
    </div>;
  }

  const handleBack = () => {
    const backUrl = resumeId 
      ? `/build-resume/military/${branch}/skills?mos=${mos}&rank=${rank}&resumeId=${resumeId}`
      : `/build-resume/military/${branch}/skills?mos=${mos}&rank=${rank}`;
    router.push(backUrl);
  };

  const handleGenerateResume = () => {
    // Use the existing resumeId instead of generating a new one
    const finalResumeId = resumeId || `${branch}-${mos}-${rank}-${Date.now()}`;
    
    // Prepare the complete resume data with multiple experiences
    const completeResumeData = {
      id: finalResumeId,
      userId: user?.id || 'anonymous',
      serviceType: 'military' as const,
      personalInfo: experienceData.personalInfo,
      militaryExperiences: experienceData.militaryExperiences,
      civilianExperiences: experienceData.civilianExperiences,
      education: educationEntries,
      skills: skills,
      branch: experienceData.branch,
      mos: mos || '',
      mosTitle: mosDetails?.title || '',
      rank: rank || '',
      rankTitle: rankDetails?.variations[branch] || '',
      status: 'completed' as const,
      lastUpdated: new Date().toISOString()
    };

    // Save the complete resume data using saveResumeProgress
    saveResumeProgress(completeResumeData);

    // Navigate to the formatted resume page
    router.push(`/resume/${finalResumeId}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pt-8">
      <h1 className="text-4xl font-bold mb-12 text-center">
        Review Your Military Experience
      </h1>

      {/* Personal Information */}
      <div className="bg-white/5 rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-emerald-400">Personal Information</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-400">Name</p>
            <p className="text-lg font-bold">{experienceData.personalInfo.firstName} {experienceData.personalInfo.lastName}</p>
          </div>
          <div>
            <p className="text-gray-400">Email</p>
            <p className="text-lg">{experienceData.personalInfo.email}</p>
          </div>
        </div>
      </div>

      {/* Military Service */}
      <div className="bg-white/5 rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-emerald-400">Military Service</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-400">Branch</p>
            <p className="text-lg capitalize">{branch?.replace(/([A-Z])/g, ' $1').trim()}</p>
          </div>
          <div>
            <p className="text-gray-400">Primary Rank</p>
            <p className="text-lg">{rankDetails?.variations[branch] || rank}</p>
          </div>
          <div>
            <p className="text-gray-400">Primary MOS/Rate</p>
            <p className="text-lg">{mosDetails?.title || mos}</p>
          </div>
        </div>
      </div>

      {/* Work Experience */}
      <div className="bg-white/5 rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-emerald-400">Work Experience</h2>
        {(experienceData.militaryExperiences.length > 0 || experienceData.civilianExperiences.length > 0) ? (
          <div className="space-y-6">
            {/* Military Experiences */}
            {experienceData.militaryExperiences.map((experience, index) => (
              <div key={`military-${index}`} className="border-b border-white/10 pb-6 last:border-0">
                <div className="mb-2">
                  <h3 className="text-xl font-semibold text-emerald-300">
                    {experience.rankTitle || experience.rank} - {experience.mosTitle || experience.mos}
                  </h3>
                  <span className="text-gray-400 text-sm">
                    {experience.startDate} - {experience.isCurrent ? 'Present' : experience.endDate}
                  </span>
                </div>
                <p className="text-lg text-gray-300 mb-2">{experience.branch}</p>
                <div className="mt-3">
                  <p className="text-gray-400 text-sm mb-2">Duties and Responsibilities:</p>
                  <p className="text-gray-300 whitespace-pre-wrap text-sm">{experience.duties}</p>
                </div>
              </div>
            ))}
            {/* Civilian Experiences */}
            {experienceData.civilianExperiences.map((experience, index) => (
              <div key={`civilian-${index}`} className="border-b border-white/10 pb-6 last:border-0">
                <div className="mb-2">
                  <h3 className="text-xl font-semibold text-emerald-300">
                    {experience.position}
                  </h3>
                  <span className="text-gray-400 text-sm">
                    {experience.startDate} - {experience.isCurrent ? 'Present' : experience.endDate}
                  </span>
                </div>
                <p className="text-lg text-gray-300 mb-2">{experience.company}</p>
                {experience.location && (
                  <p className="text-gray-400 text-sm mb-3">{experience.location}</p>
                )}
                <div className="mt-3">
                  <p className="text-gray-400 text-sm mb-2">Duties and Responsibilities:</p>
                  <p className="text-gray-300 whitespace-pre-wrap text-sm">{experience.duties}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No work experience entries added.</p>
        )}
      </div>

      {/* Education and Training */}
      <div className="bg-white/5 rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-emerald-400">Education and Training</h2>
        {educationEntries.length > 0 ? (
          <div className="space-y-4">
            {educationEntries.map((entry, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-0">
                <h3 className="text-xl font-semibold">
                  {entry.type === 'college' ? 'College Education' : 'Military Training'}
                </h3>
                <p className="text-lg">{entry.school}</p>
                {entry.type === 'college' && entry.degree && (
                  <p className="text-gray-300">{entry.degree} in {entry.field}</p>
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
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  skill.type === 'hard'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-blue-500/20 text-blue-300'
                }`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No skills added.</p>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8">
        <button
          onClick={handleBack}
          className="px-6 py-3 rounded-lg font-medium text-lg flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Skills
        </button>

        <button
          onClick={handleGenerateResume}
          className="px-8 py-4 rounded-lg font-medium text-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:scale-105 hover:shadow-lg shadow-emerald-500/25 transition-all duration-200 transform flex items-center gap-2"
        >
          <Check className="w-5 h-5" />
          Generate Resume
        </button>
      </div>
    </div>
  );
} 