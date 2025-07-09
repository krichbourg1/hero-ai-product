"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { getAllSavedResumes, ResumeListItem } from '@/lib/resume-utils';
import { 
  canCreateResume, 
  getUserSubscriptionTier, 
  getRemainingResumes,
  SUBSCRIPTION_TIERS 
} from '@/lib/subscription-utils';
import { 
  FileText, 
  Plus, 
  Loader2, 
  Crown, 
  Star, 
  Calendar, 
  Edit3, 
  Eye,
  Trash2,
  Zap,
  Shield,
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export default function DashboardPage() {
  const [resumes, setResumes] = useState<ResumeListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/sign-in');
        return;
      }
      setUserId(user.id);
      const savedResumes = getAllSavedResumes(user.id);
      setResumes(savedResumes);
      setIsLoading(false);
    };
    checkSession();
  }, [router]);

  const handleCreateResume = () => {
    if (userId) {
      const canCreate = canCreateResume(userId, resumes.length);
      if (!canCreate) {
        alert('You have reached your resume limit on the free plan. Please upgrade to create more resumes.');
        return;
      }
    }
    router.push('/build-resume');
  };

  const handleDeleteResume = (resumeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this resume? This action cannot be undone.')) {
      // Remove from localStorage
      localStorage.removeItem(`resume-${resumeId}`);
      // Update state
      setResumes(prev => prev.filter(resume => resume.id !== resumeId));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0c1b] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
          <span className="text-white text-lg">Loading your dashboard...</span>
        </div>
      </div>
    );
  }

  const currentTier = getUserSubscriptionTier();
  const remainingResumes = getRemainingResumes(userId || '', resumes.length);
  const canCreate = canCreateResume(userId || '', resumes.length);

  return (
    <div className="px-4 py-8 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              My Resumes
            </h1>
            <p className="text-gray-400 text-lg">
              Create and manage your professional resumes
            </p>
          </div>
          <button
            onClick={handleCreateResume}
            disabled={!canCreate}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 transform
              ${canCreate
                ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white hover:scale-105 hover:shadow-lg shadow-emerald-500/25'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            <Plus className="w-5 h-5" />
            Create New Resume
          </button>
        </div>
      </div>

      {/* Subscription Status Card */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  {currentTier.name} Plan
                </h3>
                <p className="text-gray-300">
                  {remainingResumes === -1 
                    ? 'Unlimited resumes available' 
                    : `${remainingResumes} resume${remainingResumes !== 1 ? 's' : ''} remaining`
                  }
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {resumes.length}
              </div>
              <div className="text-gray-400 text-sm">
                Created
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          {currentTier.maxResumes !== -1 && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Progress</span>
                <span>{resumes.length} / {currentTier.maxResumes}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((resumes.length / currentTier.maxResumes) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Upgrade CTA */}
          {currentTier.id === 'free' && (
            <div className="mt-4 p-4 bg-gradient-to-r from-emerald-600/10 to-green-600/10 border border-emerald-500/20 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white mb-1">Upgrade to Professional</h4>
                  <p className="text-gray-300 text-sm">Get unlimited resumes and premium features</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-green-700 transition-all duration-200">
                  Upgrade
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Resumes Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl shadow-lg shadow-emerald-500/25">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">
                Your Resumes
              </h2>
              <p className="text-gray-400">
                Manage and edit your professional resumes
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">
              {resumes.length}
            </div>
            <div className="text-gray-400 text-sm">
              resume{resumes.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {resumes.length === 0 ? (
          <div className="text-center py-20 bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-3xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-600"></div>
            
            <div className="relative z-10">
              <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-500/25">
                <FileText className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                No resumes yet
              </h3>
              <p className="text-gray-300 mb-10 max-w-lg mx-auto text-lg leading-relaxed">
                Create your first professional resume to showcase your military and civilian experience with our AI-powered builder
              </p>
              <button
                onClick={handleCreateResume}
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-emerald-500/25 flex items-center gap-3 mx-auto text-lg"
              >
                <Plus className="w-6 h-6" />
                Create Your First Resume
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resumes.map((resume, index) => (
              <div
                key={resume.id}
                className="group bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-3xl p-8 hover:bg-gradient-to-br hover:from-white/10 hover:to-white/15 hover:border-emerald-500/30 transition-all duration-500 cursor-pointer relative overflow-hidden transform hover:scale-105 hover:shadow-2xl shadow-emerald-500/10"
                onClick={() => router.push(`/resume/${resume.id}`)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Header */}
                <div className="relative z-10 flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl shadow-lg shadow-emerald-500/25">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {resume.title || `${resume.serviceType} Resume`}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-blue-500/30 text-blue-200 text-sm rounded-full font-medium">
                          {resume.serviceType}
                        </span>
                        {resume.branch && (
                          <span className="px-3 py-1 bg-purple-500/30 text-purple-200 text-sm rounded-full font-medium">
                            {resume.branch}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="flex items-center gap-2 bg-emerald-500/20 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-emerald-200 font-medium">Active</span>
                  </div>
                </div>

                {/* Details */}
                <div className="relative z-10 space-y-4 mb-6">
                  {resume.mos && (
                    <div className="flex items-center gap-3 text-sm text-gray-200">
                      <div className="p-1.5 bg-blue-500/20 rounded-lg">
                        <Shield className="w-4 h-4 text-blue-300" />
                      </div>
                      <span className="font-medium">{resume.mos}</span>
                    </div>
                  )}
                  {resume.rank && (
                    <div className="flex items-center gap-3 text-sm text-gray-200">
                      <div className="p-1.5 bg-yellow-500/20 rounded-lg">
                        <Star className="w-4 h-4 text-yellow-300" />
                      </div>
                      <span className="font-medium">{resume.rank}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="p-1.5 bg-gray-500/20 rounded-lg">
                      <Calendar className="w-4 h-4 text-gray-400" />
                    </div>
                    <span>Last updated: {new Date(resume.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="relative z-10 flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Navigate to edit page with correct path for military resumes
                      if (resume.serviceType === 'military' && resume.branch) {
                        router.push(`/build-resume/military/${resume.branch}/details?resumeId=${resume.id}`);
                      } else {
                        router.push(`/build-resume/${resume.serviceType}/details?resumeId=${resume.id}`);
                      }
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg shadow-emerald-500/25"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Resume
                  </button>
                  <button
                    onClick={(e) => handleDeleteResume(resume.id, e)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-sm font-semibold transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 border-2 border-emerald-500/0 group-hover:border-emerald-500/30 rounded-3xl transition-all duration-500"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      {resumes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white">Total Resumes</h3>
            </div>
            <div className="text-3xl font-bold text-white">{resumes.length}</div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-white">Available</h3>
            </div>
            <div className="text-3xl font-bold text-white">
              {remainingResumes === -1 ? '∞' : remainingResumes}
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Zap className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white">Plan</h3>
            </div>
            <div className="text-3xl font-bold text-white">{currentTier.name}</div>
          </div>
        </div>
      )}
    </div>
  );
} 