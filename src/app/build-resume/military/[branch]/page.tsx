"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { militaryOccupations, militaryRanks } from '@/data/military-data';
import { MilitaryRankVariations } from '@/types/military-rank-variations';
import { supabase } from '@/lib/supabaseClient';

export default function MilitaryDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const branch = params.branch as keyof typeof militaryOccupations & keyof MilitaryRankVariations;
  
  const [selectedMOS, setSelectedMOS] = useState('');
  const [selectedRank, setSelectedRank] = useState('');
  const [showSignIn, setShowSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

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

  const handleContinue = () => {
    if (selectedMOS && selectedRank) {
      // Navigate to next step with selected data
      router.push(`/build-resume/military/${branch}/experience?mos=${selectedMOS}&rank=${selectedRank}`);
    }
  };

  // Show loading state
  if (isLoading) {
    return <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center">
      <div className="text-xl">Loading...</div>
    </div>;
  }

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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto space-y-8">
          {showSignIn ? (
            <>
              <h1 className="text-4xl font-bold text-center mb-8">
                Sign in to Continue
              </h1>
              <div className="flex justify-center">
                <p className="text-gray-300">Please sign in to continue building your resume.</p>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => router.push('/sign-in')}
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  Go to Sign In
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-center mb-8">
                Select Your Military Details
              </h1>

              <div className="space-y-8">
                {/* Rank Selection - Move this before MOS/Rate */}
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

              <div className="flex justify-between items-center pt-8">
                <Link
                  href={`/build-resume/military`}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-lg text-blue-200 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </Link>
                
                <button
                  onClick={handleContinue}
                  disabled={!selectedMOS || !selectedRank}
                  className={`
                    px-8 py-4 rounded-lg font-medium text-lg flex items-center justify-center
                    transition-all duration-200 transform
                    ${selectedMOS && selectedRank
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:scale-105 hover:shadow-lg shadow-emerald-500/25'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  Continue
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
} 