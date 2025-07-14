import { supabase } from './supabaseClient';

export interface ResumeGenerationData {
  resumeId: string;
  serviceType: 'military' | 'police' | 'civilian';
  branch?: string;
  mos?: string;
  rank?: string;
  position?: string;
}

export async function trackResumeGeneration(data: ResumeGenerationData) {
  try {
    console.log('🚀 Starting resume generation tracking...', data);
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    console.log('👤 Current user:', user?.email);
    
    // Get user agent and IP (if available)
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : null;
    
    const trackingData = {
      user_id: user?.id || null,
      resume_id: data.resumeId,
      service_type: data.serviceType,
      branch: data.branch || null,
      mos: data.mos || null,
      rank: data.rank || null,
      position: data.position || null,
      user_email: user?.email || null,
      user_agent: userAgent,
      ip_address: null // Will be captured by server-side tracking if needed
    };

    console.log('📊 Inserting tracking data:', trackingData);

    // Insert tracking record
    const { data: insertData, error } = await supabase
      .from('resume_generations')
      .insert(trackingData)
      .select();

    if (error) {
      console.error('❌ Error tracking resume generation:', error);
      // Don't throw error to avoid breaking the user experience
    } else {
      console.log('✅ Resume generation tracked successfully:', insertData);
    }
  } catch (error) {
    console.error('💥 Error in trackResumeGeneration:', error);
    // Don't throw error to avoid breaking the user experience
  }
}

// Analytics functions for dashboard
export async function getResumeGenerationStats() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Get total generations for the user
    const { data: userGenerations, error: userError } = await supabase
      .from('resume_generations')
      .select('*')
      .eq('user_id', user.id);

    if (userError) throw userError;

    // Get total generations across all users (admin only)
    const { data: totalGenerations, error: totalError } = await supabase
      .from('resume_generations')
      .select('*');

    if (totalError) throw totalError;

    // Get service type breakdown
    const serviceTypeStats = totalGenerations?.reduce((acc, gen) => {
      acc[gen.service_type] = (acc[gen.service_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    return {
      userTotal: userGenerations?.length || 0,
      totalGenerations: totalGenerations?.length || 0,
      serviceTypeBreakdown: serviceTypeStats,
      recentGenerations: userGenerations?.slice(-5) || [] // Last 5 generations
    };
  } catch (error) {
    console.error('Error getting resume generation stats:', error);
    return {
      userTotal: 0,
      totalGenerations: 0,
      serviceTypeBreakdown: {},
      recentGenerations: []
    };
  }
}

// Get daily generation count for the last 30 days
export async function getDailyGenerationCount() {
  try {
    const { data, error } = await supabase
      .from('resume_generations')
      .select('generated_at')
      .gte('generated_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

    if (error) throw error;

    // Group by date
    const dailyCounts = data?.reduce((acc, gen) => {
      const date = new Date(gen.generated_at).toDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    return dailyCounts;
  } catch (error) {
    console.error('Error getting daily generation count:', error);
    return {};
  }
} 