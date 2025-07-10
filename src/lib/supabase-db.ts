import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Server-side Supabase client with service role key
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Types for our database
export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
  updated_at: string;
}

export interface Resume {
  id: string;
  user_id: string;
  title?: string;
  description?: string;
  photo_url?: string;
  color_hex: string;
  border_style: string;
  summary?: string;
  first_name?: string;
  last_name?: string;
  job_title?: string;
  city?: string;
  country?: string;
  phone?: string;
  email?: string;
  skills: string[];
  created_at: string;
  updated_at: string;
}

export interface WorkExperience {
  id: string;
  resume_id: string;
  position?: string;
  company?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: string;
  resume_id: string;
  degree?: string;
  school?: string;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  stripe_price_id: string;
  stripe_current_period_end: string;
  stripe_cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export type ResumeWithRelations = Resume & {
  work_experiences: WorkExperience[];
  educations: Education[];
};

// Database functions
export async function getResumesByUserId(userId: string): Promise<ResumeWithRelations[]> {
  const { data, error } = await supabaseAdmin
    .from('resumes')
    .select(`
      *,
      work_experiences (*),
      educations (*)
    `)
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getResumeById(id: string): Promise<ResumeWithRelations | null> {
  const { data, error } = await supabaseAdmin
    .from('resumes')
    .select(`
      *,
      work_experiences (*),
      educations (*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // No rows returned
    throw error;
  }
  return data;
}

export async function createResume(userId: string, data: Partial<Resume>): Promise<ResumeWithRelations> {
  const { data: resume, error } = await supabaseAdmin
    .from('resumes')
    .insert({
      ...data,
      user_id: userId,
      color_hex: data.color_hex || '#000000',
      border_style: data.border_style || 'squircle',
      skills: data.skills || [],
    })
    .select(`
      *,
      work_experiences (*),
      educations (*)
    `)
    .single();

  if (error) throw error;
  return resume;
}

export async function updateResume(id: string, data: Partial<Resume>): Promise<ResumeWithRelations> {
  const { data: resume, error } = await supabaseAdmin
    .from('resumes')
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select(`
      *,
      work_experiences (*),
      educations (*)
    `)
    .single();

  if (error) throw error;
  return resume;
}

export async function deleteResume(id: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('resumes')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function createWorkExperience(resumeId: string, data: Partial<WorkExperience>): Promise<WorkExperience> {
  const { data: workExp, error } = await supabaseAdmin
    .from('work_experiences')
    .insert({
      ...data,
      resume_id: resumeId,
    })
    .select()
    .single();

  if (error) throw error;
  return workExp;
}

export async function updateWorkExperience(id: string, data: Partial<WorkExperience>): Promise<WorkExperience> {
  const { data: workExp, error } = await supabaseAdmin
    .from('work_experiences')
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return workExp;
}

export async function deleteWorkExperience(id: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('work_experiences')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function createEducation(resumeId: string, data: Partial<Education>): Promise<Education> {
  const { data: education, error } = await supabaseAdmin
    .from('educations')
    .insert({
      ...data,
      resume_id: resumeId,
    })
    .select()
    .single();

  if (error) throw error;
  return education;
}

export async function updateEducation(id: string, data: Partial<Education>): Promise<Education> {
  const { data: education, error } = await supabaseAdmin
    .from('educations')
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return education;
}

export async function deleteEducation(id: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('educations')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function getUserSubscription(userId: string): Promise<UserSubscription | null> {
  const { data, error } = await supabaseAdmin
    .from('user_subscriptions')
    .select()
    .eq('user_id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // No rows returned
    throw error;
  }
  return data;
}

export async function updateUserSubscription(
  userId: string, 
  data: Partial<Omit<UserSubscription, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
): Promise<UserSubscription> {
  const { data: subscription, error } = await supabaseAdmin
    .from('user_subscriptions')
    .upsert({
      ...data,
      user_id: userId,
    })
    .select()
    .single();

  if (error) throw error;
  return subscription;
} 