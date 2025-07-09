"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { policePositions, policeRanks, policeCategories } from '@/data/police-data';
import { supabase } from '@/lib/supabaseClient';
import { loadResumeData, saveResumeProgress } from '@/lib/resume-utils';

export default function PoliceDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  
  const resumeId = searchParams.get('resumeId') || undefined;
  
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedRank, setSelectedRank] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Check authentication
  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Store the intended destination before redirecting to sign-in
        const currentUrl = `/build-resume/police/details${resumeId ? `?resumeId=${resumeId}` : ''}`;
        localStorage.setItem('intendedDestination', currentUrl);
        router.push('/sign-in');
        return;
      }
      setUser(user);
      setIsAuthLoading(false);
    };
    checkSession();
  }, [router, resumeId]);

  // Load saved data if resumeId is provided
  useEffect(() => {
    if (resumeId) {
      console.log('Loading police details for resumeId:', resumeId);
      const savedData = loadResumeData(resumeId);
      if (savedData) {
        console.log('Setting form data from saved details:', savedData);
        setSelectedPosition(savedData.mos || '');
        setSelectedRank(savedData.rank || '');
      }
    }
  }, [resumeId]);

  // Show loading state
  if (isAuthLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-xl">Loading...</div>
    </div>;
  }

  // Prepare options for SearchableSelect
  const positionOptions = policePositions
    .filter(position => !selectedCategory || position.category === selectedCategory)
    .map(position => ({
      id: position.id,
      title: position.title
    }));

  const rankOptions = policeRanks.map(rank => ({
    id: rank.id,
    title: rank.title
  }));

  const categoryOptions = policeCategories.map(category => ({
    id: category,
    title: category
  }));

  const handleSaveAndContinue = () => {
    if (selectedPosition && selectedRank && user?.id) {
      const positionDetails = policePositions.find(p => p.id === selectedPosition);
      const rankDetails = policeRanks.find(r => r.id === selectedRank);
      
      // Create a stable resumeId if one doesn't exist
      const stableResumeId = resumeId || `resume-${user.id}-police-${selectedPosition}-${selectedRank}`;
      
      const resumeData = {
        id: stableResumeId,
        userId: user.id,
        serviceType: 'police' as const,
        mos: selectedPosition,
        mosTitle: positionDetails?.title,
        rank: selectedRank,
        rankTitle: rankDetails?.title,
        status: 'draft' as const,
        lastUpdated: new Date().toISOString()
      };
      
      // Save the data
      const savedId = saveResumeProgress(resumeData);
      console.log('Police details saved with ID:', savedId);
      
      // Navigate to experience page
      const continueUrl = `/build-resume/police/experience?position=${selectedPosition}&rank=${selectedRank}&resumeId=${savedId}`;
      router.push(continueUrl);
    }
  };

  const clearCategory = () => {
    setSelectedCategory('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Select Your Police Position and Rank
      </h1>

      <div className="space-y-8">
        {/* Category Filter (Optional) */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-white">
            Filter by Category (Optional)
          </label>
          <div className="flex gap-2">
            <SearchableSelect
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="All Categories"
            />
            {selectedCategory && (
              <button
                onClick={clearCategory}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          <p className="text-sm text-blue-200">
            Filter positions by department or specialization to narrow your search.
          </p>
        </div>

        {/* Position Selection */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-white">
            Select Your Position *
          </label>
          <SearchableSelect
            options={positionOptions}
            value={selectedPosition}
            onChange={setSelectedPosition}
            placeholder="Search for your police position..."
          />
          <p className="text-sm text-blue-200">
            Type to search through {positionOptions.length} available police positions. 
            {selectedCategory && ` Showing positions in: ${selectedCategory}`}
          </p>
        </div>

        {/* Rank Selection */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-white">
            Select Your Rank *
          </label>
          <SearchableSelect
            options={rankOptions}
            value={selectedRank}
            onChange={setSelectedRank}
            placeholder="Search for your rank..."
          />
          <p className="text-sm text-blue-200">
            Choose your current or highest achieved rank in law enforcement.
          </p>
        </div>

        {/* Selected Items Display */}
        {(selectedPosition || selectedRank) && (
          <div className="bg-white/5 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold text-emerald-400">Your Selection</h3>
            {selectedPosition && (
              <div>
                <p className="text-gray-400">Position:</p>
                <p className="text-lg">{policePositions.find(p => p.id === selectedPosition)?.title}</p>
              </div>
            )}
            {selectedRank && (
              <div>
                <p className="text-gray-400">Rank:</p>
                <p className="text-lg">{policeRanks.find(r => r.id === selectedRank)?.title}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-8">
        <button
          onClick={() => router.push('/build-resume')}
          className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-lg text-blue-200 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        
        <button
          onClick={handleSaveAndContinue}
          disabled={!selectedPosition || !selectedRank}
          className={`
            px-8 py-3 rounded-lg font-medium text-lg flex items-center justify-center
            transition-all duration-200 transform
            ${selectedPosition && selectedRank
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