import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify the user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get total generations
    const { data: totalGenerations, error: totalError } = await supabase
      .from('resume_generations')
      .select('*');

    if (totalError) {
      console.error('Error fetching total generations:', totalError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // Get user's generations
    const { data: userGenerations, error: userError } = await supabase
      .from('resume_generations')
      .select('*')
      .eq('user_id', user.id);

    if (userError) {
      console.error('Error fetching user generations:', userError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // Calculate service type breakdown
    const serviceTypeStats = totalGenerations?.reduce((acc, gen) => {
      acc[gen.service_type] = (acc[gen.service_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    // Calculate daily stats for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: recentGenerations, error: recentError } = await supabase
      .from('resume_generations')
      .select('generated_at')
      .gte('generated_at', thirtyDaysAgo.toISOString());

    if (recentError) {
      console.error('Error fetching recent generations:', recentError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // Group by date
    const dailyStats = recentGenerations?.reduce((acc, gen) => {
      const date = new Date(gen.generated_at).toDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    return NextResponse.json({
      totalGenerations: totalGenerations?.length || 0,
      userGenerations: userGenerations?.length || 0,
      serviceTypeBreakdown: serviceTypeStats,
      dailyStats: dailyStats,
      recentGenerations: userGenerations?.slice(-10) || [] // Last 10 user generations
    });

  } catch (error) {
    console.error('Error in resume stats API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 