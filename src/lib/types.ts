// Export types from our Supabase database module
export type {
  User,
  Resume,
  WorkExperience,
  Education,
  UserSubscription,
  ResumeWithRelations,
} from './supabase-db';

// Additional utility types
export interface ResumeListItem {
  id: string;
  title: string;
  description?: string;
  updatedAt: string;
  colorHex: string;
  borderStyle: string;
}

export interface ResumeFormData {
  id?: string;
  title?: string;
  description?: string;
  photoUrl?: string;
  colorHex: string;
  borderStyle: string;
  summary?: string;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  city?: string;
  country?: string;
  phone?: string;
  email?: string;
  skills: string[];
  workExperiences: WorkExperienceFormData[];
  educations: EducationFormData[];
}

export interface WorkExperienceFormData {
  id?: string;
  position?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface EducationFormData {
  id?: string;
  degree?: string;
  school?: string;
  startDate?: string;
  endDate?: string;
}
