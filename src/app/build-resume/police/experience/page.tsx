"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { policePositions, policeRanks } from '@/data/police-data';
import { policeJobDescriptions } from '@/data/police-job-descriptions';
import { supabase } from '@/lib/supabaseClient';
import { loadResumeData, saveResumeProgress, ResumeData } from '@/lib/resume-utils';

export default function PoliceExperiencePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  
  const position = searchParams.get('position') || undefined;
  const rank = searchParams.get('rank') || undefined;
  const resumeId = searchParams.get('resumeId') || undefined;

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [duties, setDuties] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [department, setDepartment] = useState('');

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
        setFirstName(savedData.personalInfo?.firstName || '');
        setLastName(savedData.personalInfo?.lastName || '');
        setEmail(savedData.personalInfo?.email || user?.email || '');
        setPhone(savedData.personalInfo?.phone || '');
        setAddress(savedData.personalInfo?.address || '');
        setCity(savedData.personalInfo?.city || '');
        setState(savedData.personalInfo?.state || '');
        setZipCode(savedData.personalInfo?.zipCode || '');
        setDepartment(savedData.experience?.department || '');
        setStartDate(savedData.experience?.startDate || '');
        setEndDate(savedData.experience?.endDate || '');
        setDuties(savedData.experience?.duties || '');
      }
    }
  }, [resumeId, user?.id, user?.email]);

  // Auto-populate duties when position changes
  useEffect(() => {
    if (position && !duties) {
      const jobDescription = policeJobDescriptions[position];
      if (jobDescription) {
        const formattedDuties = jobDescription.duties.join('\n');
        setDuties(formattedDuties);
      }
    }
  }, [position, duties]);

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

  const handleSaveAndContinue = () => {
    // Save the experience data
    const experienceData: Partial<ResumeData> = {
      id: resumeId,
      userId: user?.id || '',
      serviceType: 'police',
      mos: position,
      mosTitle: positionDetails?.title,
      rank,
      rankTitle: rankDetails?.title,
      personalInfo: {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        zipCode
      },
      experience: {
        startDate,
        endDate,
        duties,
        department
      },
      status: 'draft' as const,
      lastUpdated: new Date().toISOString()
    };

    // Save to localStorage using the new utility
    const savedResumeId = saveResumeProgress(experienceData);
    
    console.log('Police experience saved with ID:', savedResumeId);
    
    // Save personal information to user profile
    try {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          address: address,
          city: city,
          state: state,
          zip_code: zipCode,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });

      if (profileError) {
        console.error('Error saving profile:', profileError);
      } else {
        console.log('Personal information saved to user profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
    
    // Navigate to the skills step with the resumeId
    router.push(`/build-resume/police/skills?position=${position}&rank=${rank}&resumeId=${savedResumeId}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Add Your Police Experience
      </h1>

      <div className="space-y-8">
        {/* Personal Information Section */}
        <div className="bg-white/5 rounded-lg p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-lg font-medium text-white">
                First Name *
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className={`w-full px-4 py-2 rounded-lg border text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                  firstName 
                    ? 'bg-white/10 border-emerald-500/50 focus:ring-emerald-500' 
                    : 'bg-white/10 border-red-400/50 focus:ring-red-400'
                }`}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-lg font-medium text-white">
                Last Name *
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                className={`w-full px-4 py-2 rounded-lg border text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                  lastName 
                    ? 'bg-white/10 border-emerald-500/50 focus:ring-emerald-500' 
                    : 'bg-white/10 border-red-400/50 focus:ring-red-400'
                }`}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-lg font-medium text-white">
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className={`w-full px-4 py-2 rounded-lg border text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                  email 
                    ? 'bg-white/10 border-emerald-500/50 focus:ring-emerald-500' 
                    : 'bg-white/10 border-red-400/50 focus:ring-red-400'
                }`}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-lg font-medium text-white">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-lg font-medium text-white">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your street address"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-lg font-medium text-white">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-lg font-medium text-white">
                State
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Enter your state"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-lg font-medium text-white">
                Zip Code
              </label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Enter your zip code"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-lg font-medium text-white flex items-center gap-2">
              Department/Agency *
              <span className="text-red-400 text-base">⚠️</span>
            </label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="e.g., Metro Police Department, Sheriff's Office"
              className={`w-full px-4 py-2 rounded-lg border text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                department 
                  ? 'bg-white/10 border-emerald-500/50 focus:ring-emerald-500' 
                  : 'bg-white/10 border-red-400/50 focus:ring-red-400'
              }`}
            />
            <p className="text-sm text-blue-200">
              📍 This is important! Specify the law enforcement agency where you served.
            </p>
          </div>
        </div>

        {/* Department/Agency Emphasis Section */}
        {!department && (
          <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-4 flex items-start gap-3">
            <span className="text-red-400 text-xl">⚠️</span>
            <div>
              <h3 className="text-red-400 font-semibold mb-1">Department/Agency Required</h3>
              <p className="text-red-200 text-sm">
                Please specify which law enforcement agency you worked for. This information helps employers understand your background and experience.
              </p>
              <p className="text-red-200 text-sm mt-2">
                Examples: &ldquo;Metro Police Department&rdquo;, &ldquo;County Sheriff&apos;s Office&rdquo;, &ldquo;State Highway Patrol&rdquo;, &ldquo;FBI Field Office&rdquo;
              </p>
            </div>
          </div>
        )}

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

        {/* Service Dates Section */}
        <div className="bg-white/5 rounded-lg p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Service Dates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-lg font-medium text-white">
                Start Date *
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border text-white focus:outline-none focus:ring-2 transition-all ${
                  startDate 
                    ? 'bg-white/10 border-emerald-500/50 focus:ring-emerald-500' 
                    : 'bg-white/10 border-red-400/50 focus:ring-red-400'
                }`}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-lg font-medium text-white">
                End Date *
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border text-white focus:outline-none focus:ring-2 transition-all ${
                  endDate 
                    ? 'bg-white/10 border-emerald-500/50 focus:ring-emerald-500' 
                    : 'bg-white/10 border-red-400/50 focus:ring-red-400'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Duties/Responsibilities */}
        <div className="bg-white/5 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Duties and Responsibilities</h2>
          <div className="space-y-2">
            <label className="block text-lg font-medium text-white">
              Duties and Responsibilities *
            </label>
            <textarea
              value={duties}
              onChange={(e) => setDuties(e.target.value)}
              rows={6}
              placeholder="Describe your main duties, achievements, and responsibilities..."
              className={`w-full px-4 py-2 rounded-lg border text-white placeholder-white/50 focus:outline-none focus:ring-2 font-mono leading-relaxed transition-all ${
                duties 
                  ? 'bg-white/10 border-emerald-500/50 focus:ring-emerald-500' 
                  : 'bg-white/10 border-red-400/50 focus:ring-red-400'
              }`}
              style={{ whiteSpace: 'pre-line' }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8">
        <Link
          href={`/build-resume/police/details?position=${position}&rank=${rank}&resumeId=${resumeId}`}
          className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-lg text-blue-200 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>
        
        <button
          onClick={handleSaveAndContinue}
          disabled={!startDate || !endDate || !duties || !firstName || !lastName || !email || !department}
          className={`
            px-8 py-3 rounded-lg font-medium text-lg flex items-center justify-center
            transition-all duration-200 transform
            ${startDate && endDate && duties && firstName && lastName && email && department
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:scale-105 hover:shadow-lg shadow-emerald-500/25'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
}