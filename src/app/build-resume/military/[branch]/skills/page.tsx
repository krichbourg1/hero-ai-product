"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, X, GraduationCap, Award, BookOpen, Shield } from 'lucide-react';
import { militaryRanks, militaryOccupations } from '@/data/military-data';
import { supabase } from '@/lib/supabaseClient';
import { loadResumeData, saveResumeProgress, debugResumeStorage, ResumeData } from '@/lib/resume-utils';

// Military-specific education types
const militaryEducationTypes = [
  { value: 'college', label: 'College/University', icon: GraduationCap },
  { value: 'military', label: 'Military Schools', icon: Shield },
  { value: 'training', label: 'Professional Training', icon: BookOpen },
  { value: 'certification', label: 'Certification', icon: Award },
  { value: 'none', label: 'No Additional Education', icon: X }
];

// Common military skills
const commonMilitarySkills = [
  // Leadership & Management
  'Leadership', 'Team Management', 'Strategic Planning', 'Decision Making', 'Problem Solving',
  'Project Management', 'Resource Management', 'Performance Management', 'Mentoring',
  
  // Technical Skills
  'Technical Analysis', 'Systems Administration', 'Network Security', 'Cybersecurity',
  'Data Analysis', 'Intelligence Analysis', 'Communications Systems', 'Electronics',
  'Mechanical Systems', 'Aviation Systems', 'Weapons Systems', 'Navigation Systems',
  
  // Operational Skills
  'Mission Planning', 'Tactical Operations', 'Combat Operations', 'Reconnaissance',
  'Surveillance', 'Counterintelligence', 'Force Protection', 'Emergency Response',
  'Crisis Management', 'Risk Assessment', 'Security Operations', 'Logistics Management',
  
  // Communication & Coordination
  'Communication', 'Public Speaking', 'Briefing', 'Report Writing', 'Documentation',
  'Cross-functional Coordination', 'Interagency Cooperation', 'International Relations',
  'Cultural Awareness', 'Foreign Language Skills', 'Diplomatic Relations',
  
  // Administrative & Support
  'Administrative Management', 'Budget Management', 'Personnel Management', 'Training Development',
  'Policy Development', 'Compliance Management', 'Quality Assurance', 'Process Improvement',
  'Strategic Communications', 'Media Relations', 'Public Affairs',
  
  // Specialized Military Skills
  'Combat Medicine', 'Field Medicine', 'Search and Rescue', 'Explosive Ordnance Disposal',
  'Military Police', 'Criminal Investigation', 'Forensic Analysis', 'Intelligence Collection',
  'Signal Intelligence', 'Human Intelligence', 'Geospatial Intelligence', 'Cyber Operations',
  
  // Soft Skills
  'Adaptability', 'Resilience', 'Attention to Detail', 'Time Management', 'Stress Management',
  'Critical Thinking', 'Analytical Skills', 'Creativity', 'Innovation', 'Integrity',
  'Discipline', 'Professionalism', 'Work Ethic', 'Teamwork', 'Collaboration'
];

const branchDisplayNames: Record<string, string> = {
  army: "Army",
  navy: "Navy",
  airForce: "Air Force",
  marines: "Marines",
  coastGuard: "Coast Guard",
  spaceForce: "Space Force"
};

export default function MilitarySkillsPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const branch = params.branch as string;
  const mos = searchParams.get('mos') || undefined;
  const rank = searchParams.get('rank') || undefined;
  const resumeId = searchParams.get('resumeId') || undefined;

  const [education, setEducation] = useState<ResumeData['education']>([]);
  const [skills, setSkills] = useState<ResumeData['skills']>([]);
  const [newSkill, setNewSkill] = useState('');
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get branch and rank details
  const rankDetails = militaryRanks.find(r => r.id === rank);

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

  // Load saved data if resumeId is provided
  useEffect(() => {
    if (resumeId && user?.id) {
      console.log('=== LOADING SKILLS DATA DEBUG ===');
      console.log('Loading military skills data for resumeId:', resumeId);
      console.log('Current user ID:', user?.id);
      
      // Add debugging call to check localStorage state
      debugResumeStorage(resumeId);
      
      const savedData = loadResumeData(resumeId);
      console.log('Loaded military skills data:', savedData);
      if (savedData) {
        console.log('Setting form data from saved skills:');
        console.log('- Education:', savedData.education);
        console.log('- Skills:', savedData.skills);
        console.log('- Military Experiences:', savedData.militaryExperiences);
        console.log('- Civilian Experiences:', savedData.civilianExperiences);
        console.log('- Personal Info:', savedData.personalInfo);
        
        // Load education and skills
        if (savedData.education) {
          setEducation(savedData.education);
        }
        if (savedData.skills) {
          setSkills(savedData.skills);
        }
        
        console.log('Form fields set to:');
        console.log('- education count:', savedData.education?.length || 0);
        console.log('- skills count:', savedData.skills?.length || 0);
        console.log('- military experiences count:', savedData.militaryExperiences?.length || 0);
        console.log('- civilian experiences count:', savedData.civilianExperiences?.length || 0);
      } else {
        console.log('No saved skills data found, using defaults');
      }
      console.log('=== END LOADING SKILLS DATA DEBUG ===');
    } else {
      console.log('Not loading skills data - resumeId:', resumeId, 'user?.id:', user?.id);
    }
  }, [resumeId, user?.id]);

  useEffect(() => {
    // Redirect if no MOS or rank is selected
    if (!mos || !rank) {
      router.push(`/build-resume/military/${branch}/details`);
    }
  }, [mos, rank, branch, router]);

  // Show loading state
  if (isLoading) {
    return <div className="flex items-center justify-center">
      <div className="text-xl">Loading...</div>
    </div>;
  }

  const addEducation = () => {
    const newEducation = {
      type: 'college' as const,
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      isOngoing: false,
      description: ''
    };
    setEducation([...(education || []), newEducation]);
  };

  const updateEducation = (index: number, field: string, value: string | boolean) => {
    if (!education) return;
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    setEducation(updated);
  };

  const removeEducation = (index: number) => {
    if (!education) return;
    setEducation(education.filter((_, i) => i !== index));
  };

  const addSkill = (skillName?: string) => {
    const skill = skillName || newSkill.trim();
    if (skill && !skills?.some(s => s.name === skill)) {
      const newSkillObj = {
        name: skill,
        type: 'hard' as const // Default to hard skill for military
      };
      setSkills([...(skills || []), newSkillObj]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillName: string) => {
    setSkills(skills?.filter(s => s.name !== skillName) || []);
  };

  const handleSaveAndContinue = () => {
    console.log('=== SAVE SKILLS AND CONTINUE DEBUG ===');
    console.log('Current resumeId:', resumeId);
    console.log('User ID:', user?.id);
    console.log('Branch:', branch);
    console.log('MOS:', mos);
    console.log('Rank:', rank);
    
    // Save the skills data
    const skillsData: Partial<ResumeData> = {
      id: resumeId, // Preserve the existing resumeId
      userId: user?.id || '',
      serviceType: 'military',
      branch,
      mos,
      rank,
      education,
      skills,
      status: 'draft' as const,
      lastUpdated: new Date().toISOString()
    };

    console.log('About to save skills data:', skillsData);
    console.log('Education entries to save:', education);
    console.log('Skills to save:', skills);
    console.log('Education count:', (education || []).length);
    console.log('Skills count:', (skills || []).length);

    // Load existing data to preserve personal info and experiences
    let existingData: Partial<ResumeData> = {};
    if (resumeId) {
      const savedData = loadResumeData(resumeId);
      if (savedData) {
        existingData = savedData;
        console.log('Loaded existing data to preserve:', existingData);
      }
    }

    // Merge with existing data to preserve personal info and experiences
    const completeData = {
      ...existingData,
      ...skillsData,
      // Explicitly preserve personal info and experiences from existing data
      personalInfo: existingData.personalInfo || skillsData.personalInfo,
      militaryExperiences: existingData.militaryExperiences || skillsData.militaryExperiences,
      civilianExperiences: existingData.civilianExperiences || skillsData.civilianExperiences,
    };

    console.log('Complete data to save (with preserved fields):', completeData);

    // Save to localStorage using the new utility
    const savedResumeId = saveResumeProgress(completeData);
    
    console.log('Military skills and education saved with ID:', savedResumeId);
    
    // Verify the data was saved correctly
    const savedData = loadResumeData(savedResumeId);
    console.log('Verification - loaded saved skills data:', savedData);
    console.log('Verification - education in saved data:', savedData?.education);
    console.log('Verification - skills in saved data:', savedData?.skills);
    console.log('Verification - education count in saved data:', savedData?.education?.length || 0);
    console.log('Verification - skills count in saved data:', savedData?.skills?.length || 0);
    
    // Additional verification - check localStorage directly
    const localStorageKey = `resume-${savedResumeId}`;
    const localStorageData = localStorage.getItem(localStorageKey);
    console.log('Direct localStorage check - key:', localStorageKey);
    console.log('Direct localStorage check - data:', localStorageData);
    
    if (localStorageData) {
      try {
        const parsedData = JSON.parse(localStorageData);
        console.log('Direct localStorage check - parsed data:', parsedData);
        console.log('Direct localStorage check - education:', parsedData.education);
        console.log('Direct localStorage check - skills:', parsedData.skills);
        console.log('Direct localStorage check - military experiences:', parsedData.militaryExperiences);
        console.log('Direct localStorage check - civilian experiences:', parsedData.civilianExperiences);
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
      }
    }
    
    console.log('=== END SAVE SKILLS AND CONTINUE DEBUG ===');
    
    // Navigate to the review step with the resumeId
    router.push(`/build-resume/military/${branch}/review?mos=${mos}&rank=${rank}&resumeId=${savedResumeId}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Add Your Skills & Training
      </h1>

      {/* Selected Branch, Rank, and MOS/Rate Display */}
      <div className="bg-white/5 rounded-lg p-6 space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-emerald-400">Selected Branch</h2>
          <p className="text-lg mt-2">{branchDisplayNames[branch] || branch || 'Unknown Branch'}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-emerald-400">Rank</h2>
          <p className="text-lg mt-2">{rankDetails?.title || 'Unknown Rank'}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-emerald-400">MOS/Rate</h2>
          <p className="text-lg mt-2">
            {mos ? (
              (() => {
                const mosDetails = militaryOccupations[branch]?.find((m: { id: string; title: string }) => m.id === mos);
                return mosDetails?.title || mos;
              })()
            ) : (
              'No MOS/Rate selected'
            )}
          </p>
        </div>
      </div>

      {/* Education Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-emerald-400">Education & Training</h2>
          <button
            onClick={addEducation}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 hover:from-emerald-500/30 hover:to-green-500/30 border border-emerald-500/30 rounded-lg text-emerald-300 hover:text-white transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Add Education/Training
          </button>
        </div>

        {(education || []).map((edu, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-white">Education/Training #{index + 1}</h3>
              <button
                onClick={() => removeEducation(index)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Education Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">Type</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {militaryEducationTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      onClick={() => updateEducation(index, 'type', type.value)}
                      className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                        edu.type === type.value
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {edu.type !== 'none' && (
              <>
                {/* School/Institution */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">
                    {edu.type === 'military' ? 'Military School/Institution' : 
                     edu.type === 'training' ? 'Training Provider' :
                     edu.type === 'certification' ? 'Certifying Organization' : 'School/Institution'}
                  </label>
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => updateEducation(index, 'school', e.target.value)}
                    placeholder={
                      edu.type === 'military' ? 'e.g., Army War College, Naval Academy' :
                      edu.type === 'training' ? 'e.g., Defense Acquisition University' :
                      edu.type === 'certification' ? 'e.g., CompTIA, PMI' :
                      'e.g., University of Maryland, Community College'
                    }
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Degree/Program */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">
                    {edu.type === 'military' ? 'Program/Course' :
                     edu.type === 'training' ? 'Training Course' :
                     edu.type === 'certification' ? 'Certification' : 'Degree'}
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    placeholder={
                      edu.type === 'military' ? 'e.g., Command and General Staff Course' :
                      edu.type === 'training' ? 'e.g., Project Management for Defense' :
                      edu.type === 'certification' ? 'e.g., Project Management Professional (PMP)' :
                      'e.g., Bachelor of Science'
                    }
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Field of Study (for college) */}
                {edu.type === 'college' && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white">Field of Study</label>
                    <input
                      type="text"
                      value={edu.field}
                      onChange={(e) => updateEducation(index, 'field', e.target.value)}
                      placeholder="e.g., Computer Science, Business Administration, International Relations"
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                )}

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white">Start Date</label>
                    <input
                      type="date"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white">End Date</label>
                    <input
                      type="date"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                      disabled={edu.isOngoing}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Ongoing checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={edu.isOngoing}
                    onChange={(e) => updateEducation(index, 'isOngoing', e.target.checked)}
                    className="w-4 h-4 text-emerald-600 bg-white/10 border-white/20 rounded focus:ring-emerald-500"
                  />
                  <label className="text-sm text-white">Currently ongoing</label>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">Description (Optional)</label>
                  <textarea
                    value={edu.description}
                    onChange={(e) => updateEducation(index, 'description', e.target.value)}
                    rows={2}
                    placeholder="Brief description of coursework, achievements, or relevant details..."
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </>
            )}
          </div>
        ))}

        {(!education || education.length === 0) && (
          <div className="bg-white/5 rounded-lg p-8 text-center">
            <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">No education or training added yet</p>
            <button
              onClick={addEducation}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              Add Your First Education/Training
            </button>
          </div>
        )}
      </div>

      {/* Skills Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-emerald-400">Skills</h2>
        
        {/* Add Custom Skill */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a custom skill..."
            className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
          />
          <button
            onClick={() => addSkill()}
            disabled={!newSkill.trim()}
            className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>

        {/* Common Skills */}
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Common Military Skills (Click to add/remove)</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {commonMilitarySkills.map((skill) => {
              const isSelected = skills?.some(s => s.name === skill);
              return (
                <button
                  key={skill}
                  onClick={() => isSelected ? removeSkill(skill) : addSkill(skill)}
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${
                    isSelected
                      ? 'bg-emerald-500/30 text-emerald-300 hover:bg-red-500/30 hover:text-red-300'
                      : 'bg-white/10 text-white hover:bg-emerald-500/20 hover:text-emerald-300'
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Skills */}
        {skills && skills.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Your Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm"
                >
                  {skill.name}
                  <button
                    onClick={() => removeSkill(skill.name)}
                    className="text-emerald-300 hover:text-red-300 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-8">
        <Link
          href={`/build-resume/military/${branch}/experience?mos=${mos}&rank=${rank}${resumeId ? `&resumeId=${resumeId}` : ''}`}
          className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-lg text-blue-200 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>
        
        <button
          onClick={handleSaveAndContinue}
          className="px-8 py-3 rounded-lg font-medium text-lg flex items-center justify-center transition-all duration-200 transform bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:scale-105 hover:shadow-lg shadow-emerald-500/25"
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
}
