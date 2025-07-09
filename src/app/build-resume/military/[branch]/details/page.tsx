"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { militaryOccupations, militaryRanks } from '@/data/military-data';
import { MilitaryRankVariations } from '@/types/military-rank-variations';
import { supabase } from '@/lib/supabaseClient';
import { loadResumeData, saveResumeProgress, debugResumeStorage } from '@/lib/resume-utils';

export default function MilitaryDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const branch = params.branch as keyof typeof militaryOccupations & keyof MilitaryRankVariations;
  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  
  const resumeId = searchParams.get('resumeId') || undefined;
  
  const [selectedMOS, setSelectedMOS] = useState('');
  const [selectedRank, setSelectedRank] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Check authentication
  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Store the intended destination before redirecting to sign-in
        const currentUrl = `/build-resume/military/${branch}/details${resumeId ? `?resumeId=${resumeId}` : ''}`;
        localStorage.setItem('intendedDestination', currentUrl);
        router.push('/sign-in');
        return;
      }
      setUser(user);
      setIsAuthLoading(false);
    };
    checkSession();
  }, [router, branch, resumeId]);

  // Load saved data if resumeId is provided
  useEffect(() => {
    console.log('🔍 DEBUGGING: Loading effect triggered, resumeId:', resumeId, 'user?.id:', user?.id);
    
    if (resumeId && user?.id) {
      console.log('🔍 DEBUGGING: Loading resume data for resumeId:', resumeId);
      
      // Add debugging call to check localStorage state
      debugResumeStorage(resumeId);
      
      // Check what's actually in localStorage
      console.log('🔍 DEBUGGING: Checking localStorage for key:', `resume-${resumeId}`);
      const rawData = localStorage.getItem(`resume-${resumeId}`);
      console.log('🔍 DEBUGGING: Raw localStorage data:', rawData);
      
      const savedData = loadResumeData(resumeId);
      console.log('🔍 DEBUGGING: Loaded resume data from loadResumeData:', savedData);
      
      if (savedData) {
        console.log('🔍 DEBUGGING: Setting MOS and Rank from saved data:', savedData.mos, savedData.rank);
        console.log('🔍 DEBUGGING: Full saved data structure:', JSON.stringify(savedData, null, 2));
        
        // Set the data immediately and synchronously
        if (savedData.mos) {
          console.log('🔍 DEBUGGING: Setting selectedMOS to:', savedData.mos);
          setSelectedMOS(savedData.mos);
        }
        if (savedData.rank) {
          console.log('🔍 DEBUGGING: Setting selectedRank to:', savedData.rank);
          setSelectedRank(savedData.rank);
        }
      } else {
        console.log('🔍 DEBUGGING: No saved data found for resumeId:', resumeId);
        
        // Let's also check if there are ANY resume keys in localStorage
        console.log('🔍 DEBUGGING: All localStorage keys:');
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key?.startsWith('resume-')) {
            console.log(`🔍 DEBUGGING: Found resume key: ${key}`);
            const keyData = localStorage.getItem(key);
            console.log(`🔍 DEBUGGING: Data for key ${key}:`, keyData);
          }
        }
      }
    } else {
      console.log('🔍 DEBUGGING: Not loading data - resumeId:', resumeId, 'user?.id:', user?.id);
    }
  }, [resumeId, user?.id]); // Depend on both resumeId and user?.id

  // Auto-save when selections change (but only if they're not empty)
  useEffect(() => {
    console.log('🔍 DEBUGGING: Auto-save effect triggered with:', { 
      selectedMOS, 
      selectedRank, 
      userId: user?.id, 
      resumeId,
      branch 
    });
    
    // Add detailed state tracking
    console.log('🔍 DEBUGGING: Current state values:');
    console.log('🔍 DEBUGGING: - selectedMOS value:', `"${selectedMOS}"`, 'type:', typeof selectedMOS, 'length:', selectedMOS?.length);
    console.log('🔍 DEBUGGING: - selectedRank value:', `"${selectedRank}"`, 'type:', typeof selectedRank, 'length:', selectedRank?.length);
    
    if (selectedMOS && selectedRank && user?.id) {
      console.log('🔍 DEBUGGING: All conditions met, performing auto-save');
      const mosDetails = militaryOccupations[branch]?.find(m => m.id === selectedMOS);
      const rankDetails = militaryRanks.find(r => r.id === selectedRank);
      
      // Use existing resumeId if available, otherwise create stable one
      const stableResumeId = resumeId || `resume-${user.id}-${branch}-${selectedMOS}-${selectedRank}`;
      console.log('🔍 DEBUGGING: Using stableResumeId:', stableResumeId);
      
      // Load existing data to preserve it
      let existingData = {};
      if (resumeId) {
        const savedData = loadResumeData(resumeId);
        if (savedData) {
          existingData = savedData;
          console.log('🔍 DEBUGGING: Loaded existing data for preservation:', existingData);
        }
      }
      
      const resumeData = {
        ...existingData, // Preserve all existing data
        id: stableResumeId,
        userId: user.id,
        serviceType: 'military' as const,
        branch: branch,
        mos: selectedMOS,
        mosTitle: mosDetails?.title,
        rank: selectedRank,
        rankTitle: rankDetails?.variations[branch],
        status: 'draft' as const,
        lastUpdated: new Date().toISOString()
      };
      
      console.log('🔍 DEBUGGING: Resume data to save:', JSON.stringify(resumeData, null, 2));
      
      const savedId = saveResumeProgress(resumeData);
      console.log('🔍 DEBUGGING: Auto-saved military details with ID:', savedId);
      
      // Verify the save worked
      const verifyData = localStorage.getItem(`resume-${savedId}`);
      console.log('🔍 DEBUGGING: Verification - data after save:', verifyData);
    } else {
      console.log('🔍 DEBUGGING: Auto-save conditions not met:');
      console.log('🔍 DEBUGGING: - selectedMOS:', `"${selectedMOS}"`, 'truthy:', !!selectedMOS);
      console.log('🔍 DEBUGGING: - selectedRank:', `"${selectedRank}"`, 'truthy:', !!selectedRank);
      console.log('🔍 DEBUGGING: - user?.id:', user?.id, 'truthy:', !!user?.id);
    }
  }, [selectedMOS, selectedRank, user?.id, resumeId, branch]);

  // Initial save when component mounts (only if resumeId exists but no data loaded)
  useEffect(() => {
    // Remove this effect - it's causing issues by saving empty data
    // The loading effect above should handle existing resumeIds properly
    // Only auto-save should trigger when actual selections are made
  }, []);

  // Get branch-specific MOS/Rate options
  const allMOSOptions = militaryOccupations[branch] || [];

  // Determine if selected rank is officer or enlisted
  const isOfficerRank = selectedRank.startsWith('o');
  const isEnlistedRank = selectedRank.startsWith('e');

  // Filter MOS options based on rank type
  const mosOptions = allMOSOptions.filter(mos => {
    if (!selectedRank) return true; // Show all options if no rank selected
    if (isOfficerRank) return mos.isOfficer === true;
    if (isEnlistedRank) return mos.isOfficer === false;
    return true;
  });

  // Get rank options with branch-specific variations
  const rankOptions = militaryRanks.map(rank => ({
    id: rank.id,
    title: `${rank.title} - ${rank.variations[branch]}`,
  }));

  // Handle rank selection
  const handleRankChange = (rankId: string) => {
    setSelectedRank(rankId);
    // Clear MOS selection when rank changes
    setSelectedMOS('');
  };

  const handleSaveAndContinue = () => {
    if (selectedMOS && selectedRank && user?.id) {
      setIsTransitioning(true);
      
      // Create a stable resumeId if one doesn't exist
      const stableResumeId = resumeId || `resume-${user.id}-${branch}-${selectedMOS}-${selectedRank}`;
      
      // Load existing data to preserve it
      let existingData = {};
      if (resumeId) {
        const savedData = loadResumeData(resumeId);
        if (savedData) {
          existingData = savedData;
          console.log('🔍 DEBUGGING: Loaded existing data for preservation:', existingData);
        }
      }
      
      // Ensure we save the current state before navigation
      const mosDetails = militaryOccupations[branch]?.find(m => m.id === selectedMOS);
      const rankDetails = militaryRanks.find(r => r.id === selectedRank);
      
      const resumeData = {
        ...existingData, // Preserve all existing data
        id: stableResumeId,
        userId: user.id,
        serviceType: 'military' as const,
        branch: branch,
        mos: selectedMOS,
        mosTitle: mosDetails?.title,
        rank: selectedRank,
        rankTitle: rankDetails?.variations[branch],
        status: 'draft' as const,
        lastUpdated: new Date().toISOString()
      };
      
      console.log('🔍 DEBUGGING: Saving military details before navigation:', resumeData);
      const savedId = saveResumeProgress(resumeData);
      console.log('🔍 DEBUGGING: Saved military details with ID:', savedId);
      
      // Verify the save worked by loading the data back
      const verifyData = loadResumeData(savedId);
      console.log('🔍 DEBUGGING: Verification - loaded saved data:', verifyData);
      console.log('🔍 DEBUGGING: Verification - MOS in saved data:', verifyData?.mos);
      console.log('🔍 DEBUGGING: Verification - Rank in saved data:', verifyData?.rank);
      
      // Navigate to experience page
      router.push(`/build-resume/military/${branch}/experience?mos=${selectedMOS}&rank=${selectedRank}&resumeId=${savedId}`);
    }
  };

  const handleBack = () => {
    router.push('/build-resume/military');
  };

  // Show loading state while checking auth
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-white/30 border-t-white/90 rounded-full animate-spin" />
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center mb-8">
            Select Your Military Details
          </h1>

          <div className="space-y-8">
            {/* Rank Selection */}
            <div className="space-y-4">
              <label className="block text-lg font-medium text-white">
                Rank
              </label>
              <SearchableSelect
                options={rankOptions}
                value={selectedRank}
                onChange={handleRankChange}
                placeholder="Select your rank first"
              />
            </div>

            {/* MOS/Rate Selection */}
            <div className="space-y-4">
              <label className="block text-lg font-medium text-white">
                MOS/Rate
              </label>
              <SearchableSelect
                options={mosOptions}
                value={selectedMOS}
                onChange={setSelectedMOS}
                placeholder={selectedRank ? "Select your MOS/Rate" : "Please select a rank first"}
                disabled={!selectedRank}
              />
              {selectedRank && mosOptions.length === 0 && (
                <p className="text-yellow-400 mt-2">
                  No matching MOS/Rate found for the selected rank type.
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-lg text-blue-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            
            <button
              onClick={handleSaveAndContinue}
              disabled={!selectedMOS || !selectedRank || isTransitioning}
              className={`
                px-8 py-4 rounded-lg font-medium text-lg flex items-center justify-center
                transition-all duration-200 transform
                ${selectedMOS && selectedRank && !isTransitioning
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:scale-105 hover:shadow-lg shadow-emerald-500/25'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              {isTransitioning ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white/90 rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                'Save and Continue'
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 