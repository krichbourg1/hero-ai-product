"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, X, Briefcase, Shield } from 'lucide-react';
import { militaryOccupations, militaryRanks } from '@/data/military-data';
import { militaryJobDescriptions } from '@/data/military-job-descriptions';
import { MilitaryRankVariations } from '@/types/military-rank-variations';
import { supabase } from '@/lib/supabaseClient';
import { loadResumeData, saveResumeProgress, debugResumeStorage } from '@/lib/resume-utils';
import { Header } from '@/components/ui/header';
import { ResumeData } from '@/lib/resume-utils';

// Helper function to generate unique IDs
const generateId = () => `exp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Helper function to format military rank
const formatMilitaryRank = (rank: string): string => {
  if (!rank) return '';
  
  // Convert to uppercase first
  let formatted = rank.toUpperCase();
  
  // Handle common rank patterns
  // E-ranks: e1, e2, e3, e4, e5, e6, e7, e8, e9 -> E-1, E-2, E-3, E-4, E-5, E-6, E-7, E-8, E-9
  if (/^E\d$/.test(formatted)) {
    return formatted.replace(/^E(\d)$/, 'E-$1');
  }
  
  // O-ranks: o1, o2, o3, o4, o5, o6, o7, o8, o9, o10 -> O-1, O-2, O-3, O-4, O-5, O-6, O-7, O-8, O-9, O-10
  if (/^O\d{1,2}$/.test(formatted)) {
    return formatted.replace(/^O(\d{1,2})$/, 'O-$1');
  }
  
  // W-ranks: w1, w2, w3, w4, w5 -> W-1, W-2, W-3, W-4, W-5
  if (/^W\d$/.test(formatted)) {
    return formatted.replace(/^W(\d)$/, 'W-$1');
  }
  
  // If it already has a dash, just return uppercase
  if (formatted.includes('-')) {
    return formatted;
  }
  
  // For other ranks, just return uppercase
  return formatted;
};

export default function MilitaryExperiencePage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  
  const branch = params.branch as keyof typeof militaryOccupations & keyof MilitaryRankVariations;
  const mos = searchParams.get('mos') || undefined;
  const rank = searchParams.get('rank') || undefined;
  const resumeId = searchParams.get('resumeId') || undefined;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  // Single military experience
  const [militaryExperience, setMilitaryExperience] = useState({
    id: generateId(),
    branch: branch as keyof typeof militaryOccupations & keyof MilitaryRankVariations,
    mos: mos || '',
    mosTitle: '',
    rank: rank || '',
    rankTitle: '',
    startDate: '',
    endDate: '',
    duties: '',
    isCurrent: false
  });
  
  // Civilian experiences
  const [civilianExperiences, setCivilianExperiences] = useState<ResumeData['civilianExperiences']>([]);

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

  // Get MOS and Rank details
  const mosDetails = militaryOccupations[branch]?.find(m => m.id === mos);
  const rankDetails = militaryRanks.find(r => r.id === rank);

  // Load saved data if resumeId is provided
  useEffect(() => {
    if (resumeId && user?.id) {
      console.log('=== LOADING EXPERIENCE DATA DEBUG ===');
      console.log('Loading military experience data for resumeId:', resumeId);
      console.log('Current user ID:', user?.id);
      
      // Add debugging call to check localStorage state
      debugResumeStorage(resumeId);
      
      const savedData = loadResumeData(resumeId);
      console.log('Loaded military experience data:', savedData);
      if (savedData) {
        console.log('Setting form data from saved experience:');
        console.log('- Personal Info:', savedData.personalInfo);
        console.log('- Military Experiences:', savedData.militaryExperiences);
        console.log('- Civilian Experiences:', savedData.civilianExperiences);
        
        setFirstName(savedData.personalInfo?.firstName || '');
        setLastName(savedData.personalInfo?.lastName || '');
        setEmail(savedData.personalInfo?.email || user?.email || '');
        
        // Load military experience
        if (savedData.militaryExperiences && savedData.militaryExperiences.length > 0) {
          const firstExp = savedData.militaryExperiences[0];
          setMilitaryExperience({
            id: firstExp.id || generateId(),
            branch: (firstExp.branch || branch) as keyof typeof militaryOccupations & keyof MilitaryRankVariations,
            mos: firstExp.mos || mos || '',
            mosTitle: firstExp.mosTitle || '',
            rank: formatMilitaryRank(firstExp.rank || rank || ''),
            rankTitle: firstExp.rankTitle || '',
            startDate: firstExp.startDate || '',
            endDate: firstExp.endDate || '',
            duties: firstExp.duties || '',
            isCurrent: firstExp.isCurrent || false
          });
        } else if (savedData.experience) {
          // Convert legacy single experience
          setMilitaryExperience({
            id: generateId(),
            branch: (savedData.branch || branch) as keyof typeof militaryOccupations & keyof MilitaryRankVariations,
            mos: savedData.mos || mos || '',
            mosTitle: savedData.mosTitle || '',
            rank: formatMilitaryRank(savedData.rank || rank || ''),
            rankTitle: savedData.rankTitle || '',
            startDate: savedData.experience.startDate || '',
            endDate: savedData.experience.endDate || '',
            duties: savedData.experience.duties || '',
            isCurrent: false
          });
        }
        
        // Load civilian experiences
        if (savedData.civilianExperiences) {
          setCivilianExperiences(savedData.civilianExperiences);
        }
        
        console.log('Form fields set to:');
        console.log('- firstName:', savedData.personalInfo?.firstName || '');
        console.log('- lastName:', savedData.personalInfo?.lastName || '');
        console.log('- email:', savedData.personalInfo?.email || user?.email || '');
        console.log('- civilianExperiences count:', savedData.civilianExperiences?.length || 0);
      } else {
        console.log('No saved experience data found, using defaults');
        // Set defaults from user data
        setFirstName('');
        setLastName('');
        setEmail(user?.email || '');
      }
      console.log('=== END LOADING EXPERIENCE DATA DEBUG ===');
    } else {
      console.log('Not loading data - resumeId:', resumeId, 'user?.id:', user?.id);
    }
  }, [resumeId, user?.id, user?.email, branch, mos, rank]);

  // Auto-populate military experience when MOS changes
  useEffect(() => {
    if (branch && mos && !militaryExperience.duties) {
      console.log('Auto-populating military experience for MOS:', mos);
      const jobDescription = militaryJobDescriptions[branch]?.[mos];
      const autoDuties = jobDescription ? jobDescription.duties.join('\n') : '';
      
      setMilitaryExperience(prev => ({
        ...prev,
        branch,
        mos,
        mosTitle: mosDetails?.title || '',
        rank: formatMilitaryRank(rank || ''),
        rankTitle: rankDetails?.variations[branch] || '',
        duties: autoDuties
      }));
    }
  }, [branch, mos, rank, militaryExperience.duties, mosDetails?.title, rankDetails?.variations]);

  useEffect(() => {
    // Redirect if no MOS or rank is selected
    if (!mos || !rank) {
      router.push(`/build-resume/military/${branch}/details`);
    }
  }, [mos, rank, branch, router]);

  // Show loading state
  if (isAuthLoading) {
    return <div className="flex items-center justify-center">
      <div className="text-xl">Loading...</div>
    </div>;
  }

  // Military experience management functions
  const updateMilitaryExperience = (field: string, value: string | boolean) => {
    setMilitaryExperience(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-capitalize rank field
      if (field === 'rank' && typeof value === 'string') {
        updated.rank = value.toUpperCase();
      }
      
      // Auto-populate duties when MOS/Rate or Rank changes
      if ((field === 'mos' || field === 'rank') && updated.branch && updated.mos && updated.rank) {
        const branchKey = updated.branch as keyof typeof militaryJobDescriptions;
        const jobDescription = militaryJobDescriptions[branchKey]?.[updated.mos];
        if (jobDescription) {
          const formattedDuties = jobDescription.duties.join('\n');
          updated.duties = formattedDuties;
          console.log(`Auto-populated duties for ${updated.branch} ${updated.mos} ${updated.rank}:`, formattedDuties);
        }
      }
      
      return updated;
    });
  };

  // Civilian experience management functions
  const addCivilianExperience = () => {
    const newExperience = {
      id: generateId(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      duties: '',
      isCurrent: false
    };
    setCivilianExperiences([...(civilianExperiences || []), newExperience]);
  };

  const updateCivilianExperience = (id: string, field: string, value: string | boolean) => {
    setCivilianExperiences((civilianExperiences || []).map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeCivilianExperience = (id: string) => {
    setCivilianExperiences((civilianExperiences || []).filter(exp => exp.id !== id));
  };

  const handleSaveAndContinue = () => {
    // Use stable resumeId pattern
    const stableResumeId = resumeId || `resume-${user?.id}-${branch}-${mos}-${rank}`;
    
    console.log('=== SAVE AND CONTINUE DEBUG ===');
    console.log('Current resumeId:', resumeId);
    console.log('Stable resumeId:', stableResumeId);
    console.log('User ID:', user?.id);
    console.log('Branch:', branch);
    console.log('MOS:', mos);
    console.log('Rank:', rank);
    
    // Validate that we have the required data
    if (!firstName || !lastName || !email) {
      console.error('Missing required personal info:', { firstName, lastName, email });
      alert('Please fill in all required personal information.');
      return;
    }
    
    if (!militaryExperience.mos || !militaryExperience.rank) {
      console.error('Missing required military experience info:', militaryExperience);
      alert('Please fill in MOS/Rate and Rank for your military experience.');
      return;
    }
    
    // Save the experience data
    const experienceData: Partial<ResumeData> = {
      id: stableResumeId,
      userId: user?.id || '',
      serviceType: 'military' as const,
      branch,
      mos,
      mosTitle: mosDetails?.title,
      rank,
      rankTitle: rankDetails?.variations[branch],
      personalInfo: {
        firstName,
        lastName,
        email
      },
      militaryExperiences: [militaryExperience],
      civilianExperiences: civilianExperiences || [],
      status: 'draft' as const,
      lastUpdated: new Date().toISOString()
    };

    console.log('About to save experience data:', experienceData);
    console.log('Military experience to save:', militaryExperience);
    console.log('Civilian experiences to save:', civilianExperiences);
    console.log('Civilian experiences count:', (civilianExperiences || []).length);

    // Load existing data to preserve education and skills
    let existingData: Partial<ResumeData> = {};
    if (resumeId) {
      const savedData = loadResumeData(resumeId);
      if (savedData) {
        existingData = savedData;
        console.log('Loaded existing data to preserve:', existingData);
      }
    }

    // Merge with existing data to preserve education and skills
    const completeData = {
      ...existingData,
      ...experienceData,
      // Explicitly preserve education and skills from existing data
      education: existingData.education || experienceData.education,
      skills: existingData.skills || experienceData.skills,
    };

    console.log('Complete data to save (with preserved fields):', completeData);

    // Save to localStorage using the new utility
    const savedResumeId = saveResumeProgress(completeData);
    
    console.log('Experience saved with ID:', savedResumeId);
    console.log('Civilian experiences saved:', (civilianExperiences || []).length);
    
    // Verify the data was saved correctly
    const savedData = loadResumeData(savedResumeId);
    console.log('Verification - loaded saved data:', savedData);
    console.log('Verification - military experiences in saved data:', savedData?.militaryExperiences);
    console.log('Verification - civilian experiences in saved data:', savedData?.civilianExperiences);
    console.log('Verification - military experiences count in saved data:', savedData?.militaryExperiences?.length || 0);
    console.log('Verification - civilian experiences count in saved data:', savedData?.civilianExperiences?.length || 0);
    
    // Additional verification - check localStorage directly
    const localStorageKey = `resume-${savedResumeId}`;
    const localStorageData = localStorage.getItem(localStorageKey);
    console.log('Direct localStorage check - key:', localStorageKey);
    console.log('Direct localStorage check - data:', localStorageData);
    
    if (localStorageData) {
      try {
        const parsedData = JSON.parse(localStorageData);
        console.log('Direct localStorage check - parsed data:', parsedData);
        console.log('Direct localStorage check - military experiences:', parsedData.militaryExperiences);
        console.log('Direct localStorage check - civilian experiences:', parsedData.civilianExperiences);
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
      }
    }
    
    console.log('=== END SAVE AND CONTINUE DEBUG ===');
    
    // Navigate to the skills step with the resumeId
    router.push(`/build-resume/military/${branch}/skills?mos=${mos}&rank=${rank}&resumeId=${savedResumeId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center mb-8">
            Add Your Experience
          </h1>

          <div className="space-y-8">
            {/* Personal Information Section */}
            <div className="bg-white/5 rounded-lg p-6 space-y-6">
              <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-lg font-medium text-white">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-lg font-medium text-white">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-lg font-medium text-white">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Military Experience Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-emerald-400 flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  Military Experience
                </h2>
              </div>

              <div className="bg-white/5 rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-semibold text-white">Military Experience</h3>

                {/* Branch Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">Branch</label>
                  <select
                    value={militaryExperience.branch}
                    onChange={(e) => updateMilitaryExperience('branch', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Select Branch</option>
                    <option value="army">Army</option>
                    <option value="navy">Navy</option>
                    <option value="airForce">Air Force</option>
                    <option value="marines">Marines</option>
                    <option value="coastGuard">Coast Guard</option>
                    <option value="spaceForce">Space Force</option>
                  </select>
                </div>

                {/* MOS/Rate and Rank */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white">MOS/Rate</label>
                    <input
                      type="text"
                      value={militaryExperience.mos}
                      onChange={(e) => updateMilitaryExperience('mos', e.target.value)}
                      placeholder="e.g., 11B, AB, 0311"
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white">Rank</label>
                    <input
                      type="text"
                      value={militaryExperience.rank}
                      onChange={(e) => updateMilitaryExperience('rank', e.target.value)}
                      placeholder="e.g., E-4, O-3, Sergeant"
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                
                {/* Auto-population notice */}
                <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-3 flex items-start gap-2">
                  <span className="text-blue-300 text-sm">💡</span>
                  <p className="text-sm text-blue-200">
                    <strong>Auto-population:</strong> Duties will be automatically filled when you select a valid MOS/Rate and Rank combination.
                  </p>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white">Start Date</label>
                    <input
                      type="date"
                      value={militaryExperience.startDate}
                      onChange={(e) => updateMilitaryExperience('startDate', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white">End Date</label>
                    <input
                      type="date"
                      value={militaryExperience.endDate}
                      onChange={(e) => updateMilitaryExperience('endDate', e.target.value)}
                      disabled={militaryExperience.isCurrent}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Current Position Checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={militaryExperience.isCurrent}
                    onChange={(e) => updateMilitaryExperience('isCurrent', e.target.checked)}
                    className="w-4 h-4 text-emerald-600 bg-white/10 border-white/20 rounded focus:ring-emerald-500"
                  />
                  <label className="text-sm text-white">Current position</label>
                </div>

                {/* Duties */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">Duties and Responsibilities</label>
                  <textarea
                    value={militaryExperience.duties}
                    onChange={(e) => updateMilitaryExperience('duties', e.target.value)}
                    rows={4}
                    placeholder="Describe your main duties, achievements, and responsibilities..."
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Civilian Experience Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-emerald-400 flex items-center gap-2">
                  <Briefcase className="w-6 h-6" />
                  Civilian Work Experience (Optional)
                </h2>
                <button
                  onClick={addCivilianExperience}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-500/30 rounded-lg text-blue-300 hover:text-white transition-all duration-200 transform hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                  Add Civilian Experience
                </button>
              </div>
              
              {/* Manual entry notice */}
              <div className="bg-amber-500/10 border border-amber-400/30 rounded-lg p-3 flex items-start gap-2">
                <span className="text-amber-300 text-sm">📝</span>
                <p className="text-sm text-amber-200">
                  <strong>Manual Entry:</strong> Civilian experience requires manual entry of all details including duties and responsibilities.
                </p>
              </div>

              {(civilianExperiences || []).map((exp, index) => (
                <div key={exp.id} className="bg-white/5 rounded-lg p-6 space-y-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-white">Civilian Experience #{index + 1}</h3>
                    <button
                      onClick={() => removeCivilianExperience(exp.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Company and Position */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-white">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateCivilianExperience(exp.id, 'company', e.target.value)}
                        placeholder="Company name"
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-white">Position</label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => updateCivilianExperience(exp.id, 'position', e.target.value)}
                        placeholder="Job title"
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white">Location (Optional)</label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => updateCivilianExperience(exp.id, 'location', e.target.value)}
                      placeholder="City, State"
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-white">Start Date</label>
                      <input
                        type="date"
                        value={exp.startDate}
                        onChange={(e) => updateCivilianExperience(exp.id, 'startDate', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-white">End Date</label>
                      <input
                        type="date"
                        value={exp.endDate}
                        onChange={(e) => updateCivilianExperience(exp.id, 'endDate', e.target.value)}
                        disabled={exp.isCurrent}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Current Position Checkbox */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={exp.isCurrent}
                      onChange={(e) => updateCivilianExperience(exp.id, 'isCurrent', e.target.checked)}
                      className="w-4 h-4 text-emerald-600 bg-white/10 border-white/20 rounded focus:ring-emerald-500"
                    />
                    <label className="text-sm text-white">Current position</label>
                  </div>

                  {/* Duties */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white">Duties and Responsibilities</label>
                    <textarea
                      value={exp.duties}
                      onChange={(e) => updateCivilianExperience(exp.id, 'duties', e.target.value)}
                      rows={4}
                      placeholder="Describe your main duties, achievements, and responsibilities..."
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              ))}

              {(civilianExperiences || []).length === 0 && (
                <div className="bg-white/5 rounded-lg p-8 text-center">
                  <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No civilian experience added yet</p>
                  <button
                    onClick={addCivilianExperience}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                  >
                    Add Civilian Experience
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pt-8">
            <Link
              href={`/build-resume/military/${branch}/details?resumeId=${resumeId}`}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-lg text-blue-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </Link>
            
            <button
              onClick={handleSaveAndContinue}
              disabled={!firstName || !lastName || !email || !militaryExperience.mos || !militaryExperience.rank}
              className={`
                px-8 py-3 rounded-lg font-medium text-lg flex items-center justify-center
                transition-all duration-200 transform
                ${firstName && lastName && email && militaryExperience.mos && militaryExperience.rank
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:scale-105 hover:shadow-lg shadow-emerald-500/25'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              Save and Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 