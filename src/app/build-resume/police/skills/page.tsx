"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, X, GraduationCap, Award, BookOpen } from 'lucide-react';
import { policePositions, policeRanks } from '@/data/police-data';
import { supabase } from '@/lib/supabaseClient';
import { loadResumeData, saveResumeProgress, ResumeData } from '@/lib/resume-utils';

// Police-specific education types
const policeEducationTypes = [
  { value: 'police-academy', label: 'Police Academy', icon: Award },
  { value: 'training', label: 'Professional Training', icon: BookOpen },
  { value: 'certification', label: 'Certification', icon: Award },
  { value: 'college', label: 'College/University', icon: GraduationCap },
  { value: 'none', label: 'No Additional Education', icon: X }
];

// Common police skills
const commonPoliceSkills = [
  // Law Enforcement Skills
  'Criminal Investigation', 'Report Writing', 'Evidence Collection', 'Crime Scene Processing',
  'Interview Techniques', 'Surveillance', 'Traffic Enforcement', 'Emergency Response',
  'Community Policing', 'Crisis Intervention', 'De-escalation Techniques', 'Conflict Resolution',
  
  // Technical Skills
  'Firearms Proficiency', 'Defensive Tactics', 'First Aid/CPR', 'Radio Communications',
  'Computer Skills', 'Database Management', 'Digital Evidence', 'Photography',
  'GPS Navigation', 'Mobile Data Terminal', 'Records Management Systems',
  
  // Specialized Skills
  'K-9 Handling', 'SWAT Operations', 'Narcotics Investigation', 'Financial Crimes',
  'Cyber Crime Investigation', 'Undercover Operations', 'Crowd Control', 'VIP Protection',
  'Traffic Accident Investigation', 'Domestic Violence Response', 'Juvenile Procedures',
  
  // Soft Skills
  'Leadership', 'Communication', 'Problem Solving', 'Critical Thinking', 'Attention to Detail',
  'Time Management', 'Stress Management', 'Cultural Sensitivity', 'Public Speaking',
  'Team Collaboration', 'Mentoring', 'Decision Making', 'Adaptability', 'Integrity'
];

export default function PoliceSkillsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  
  const position = searchParams.get('position') || undefined;
  const rank = searchParams.get('rank') || undefined;
  const resumeId = searchParams.get('resumeId') || undefined;

  const [education, setEducation] = useState<ResumeData['education']>([]);
  const [skills, setSkills] = useState<ResumeData['skills']>([]);
  const [newSkill, setNewSkill] = useState('');

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

  // Load saved data if resumeId is provided
  useEffect(() => {
    if (resumeId && user?.id) {
      const savedData = loadResumeData(resumeId);
      if (savedData) {
        setEducation(savedData.education || []);
        setSkills(savedData.skills || []);
      }
    }
  }, [resumeId, user?.id]);

  useEffect(() => {
    // Redirect if no position or rank is selected
    if (!position || !rank) {
      router.push('/build-resume/police/details');
    }
  }, [position, rank, router]);

  // Show loading state
  if (isAuthLoading) {
    return <div className="flex items-center justify-center">
      <div className="text-xl">Loading...</div>
    </div>;
  }

  const addEducation = () => {
    const newEducation = {
      type: 'police-academy' as const,
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
        type: 'hard' as const // Default to hard skill for police
      };
      setSkills([...(skills || []), newSkillObj]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillName: string) => {
    setSkills(skills?.filter(s => s.name !== skillName) || []);
  };

  const handleSaveAndContinue = () => {
    // Save the skills data
    const skillsData: Partial<ResumeData> = {
      id: resumeId, // Preserve the existing resumeId
      userId: user?.id || '',
      serviceType: 'police',
      mos: position,
      mosTitle: positionDetails?.title,
      rank,
      rankTitle: rankDetails?.title,
      education,
      skills,
      status: 'draft' as const,
      lastUpdated: new Date().toISOString()
    };

    // Save to localStorage using the new utility
    const savedResumeId = saveResumeProgress(skillsData);
    
    console.log('Police skills and education saved with ID:', savedResumeId);
    
    // Navigate to the review step with the resumeId
    router.push(`/build-resume/police/review?position=${position}&rank=${rank}&resumeId=${savedResumeId}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Add Your Skills & Training
      </h1>

      {/* Selected Position and Rank Display */}
      <div className="bg-white/5 rounded-lg p-6 space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-emerald-400">Selected Position</h2>
          <p className="text-lg mt-2">{positionDetails?.title || 'Unknown Position'}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-emerald-400">Rank</h2>
          <p className="text-lg mt-2">{rankDetails?.title || 'Unknown Rank'}</p>
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
                {policeEducationTypes.map((type) => {
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
                    {edu.type === 'police-academy' ? 'Academy Name' : 
                     edu.type === 'training' ? 'Training Provider' :
                     edu.type === 'certification' ? 'Certifying Organization' : 'School/Institution'}
                  </label>
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => updateEducation(index, 'school', e.target.value)}
                    placeholder={
                      edu.type === 'police-academy' ? 'e.g., Metro Police Academy' :
                      edu.type === 'training' ? 'e.g., FBI Training Center' :
                      edu.type === 'certification' ? 'e.g., National Certification Board' :
                      'e.g., State University'
                    }
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Degree/Program */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">
                    {edu.type === 'police-academy' ? 'Program' :
                     edu.type === 'training' ? 'Training Course' :
                     edu.type === 'certification' ? 'Certification' : 'Degree'}
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    placeholder={
                      edu.type === 'police-academy' ? 'e.g., Basic Law Enforcement Training' :
                      edu.type === 'training' ? 'e.g., Advanced Investigation Techniques' :
                      edu.type === 'certification' ? 'e.g., Crime Scene Investigation Certification' :
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
                      placeholder="e.g., Criminal Justice, Psychology"
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
          <h3 className="text-lg font-medium text-white mb-3">Common Police Skills (Click to add/remove)</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {commonPoliceSkills.map((skill) => {
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
          href={`/build-resume/police/experience?position=${position}&rank=${rank}${resumeId ? `&resumeId=${resumeId}` : ''}`}
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