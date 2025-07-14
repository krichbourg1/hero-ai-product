"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, 
  Users, 
  FileText, 
  TrendingUp, 
  Calendar,
  Shield,
  User,
  Loader2
} from 'lucide-react';

interface StatsData {
  totalGenerations: number;
  userGenerations: number;
  serviceTypeBreakdown: Record<string, number>;
  dailyStats: Record<string, number>;
  recentGenerations: Array<{
    id: string;
    resume_id: string;
    service_type: string;
    generated_at: string;
    user_email: string;
  }>;
}

export default function AdminStatsPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndLoadStats = async () => {
      try {
        // Check if user is authenticated
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          router.push('/sign-in');
          return;
        }

        // Get session for API call
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.push('/sign-in');
          return;
        }

        // Fetch stats from API
        const response = await fetch('/api/resume-stats', {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error('Error loading stats:', err);
        setError('Failed to load statistics');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndLoadStats();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0c1b] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
          <span className="text-white text-lg">Loading statistics...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0c1b] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-[#0a0c1b] flex items-center justify-center">
        <div className="text-white text-xl">No data available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c1b] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Resume Generation Statistics</h1>
          <p className="text-gray-400">Track your product's performance and user engagement</p>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Resumes Generated</p>
                <p className="text-3xl font-bold text-white">{stats.totalGenerations}</p>
              </div>
              <FileText className="w-8 h-8 text-emerald-400" />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Your Resumes</p>
                <p className="text-3xl font-bold text-white">{stats.userGenerations}</p>
              </div>
              <User className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Service Types</p>
                <p className="text-3xl font-bold text-white">{Object.keys(stats.serviceTypeBreakdown).length}</p>
              </div>
              <Shield className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Last 30 Days</p>
                <p className="text-3xl font-bold text-white">{Object.values(stats.dailyStats).reduce((a, b) => a + b, 0)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-400" />
            </div>
          </div>
        </div>

        {/* Service Type Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Service Type Breakdown
            </h2>
            <div className="space-y-3">
              {Object.entries(stats.serviceTypeBreakdown).map(([service, count]) => (
                <div key={service} className="flex items-center justify-between">
                  <span className="text-gray-300 capitalize">{service}</span>
                  <span className="text-white font-semibold">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent Activity (Last 10)
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {stats.recentGenerations.map((gen) => (
                <div key={gen.id} className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-gray-300 capitalize">{gen.service_type}</span>
                    <span className="text-gray-500 ml-2">•</span>
                    <span className="text-gray-400">{gen.user_email}</span>
                  </div>
                  <span className="text-gray-500">
                    {new Date(gen.generated_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Stats Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">Daily Generation Trend (Last 30 Days)</h2>
          <div className="grid grid-cols-7 md:grid-cols-15 gap-2">
            {Object.entries(stats.dailyStats).slice(-15).map(([date, count]) => (
              <div key={date} className="text-center">
                <div className="text-xs text-gray-400 mb-1">
                  {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="bg-emerald-500/20 rounded p-2">
                  <div className="text-white font-semibold">{count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 