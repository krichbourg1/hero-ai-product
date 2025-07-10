// This is an optional migration script that requires Supabase setup
import { createClient } from '@supabase/supabase-js';
import prisma from '../src/lib/prisma';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function migrateData() {
  try {
    // Migrate Users
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*');
    
    if (usersError) throw usersError;

    for (const user of users!) {
      await prisma.user.create({
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: new Date(user.created_at),
          updatedAt: new Date(user.updated_at),
        },
      });
    }

    // Migrate Resumes
    const { data: resumes, error: resumesError } = await supabase
      .from('resumes')
      .select('*');
    
    if (resumesError) throw resumesError;

    for (const resume of resumes!) {
      await prisma.resume.create({
        data: {
          id: resume.id,
          userId: resume.user_id,
          title: resume.title,
          description: resume.description,
          photoUrl: resume.photo_url,
          colorHex: resume.color_hex,
          borderStyle: resume.border_style,
          summary: resume.summary,
          firstName: resume.first_name,
          lastName: resume.last_name,
          jobTitle: resume.job_title,
          city: resume.city,
          country: resume.country,
          phone: resume.phone,
          email: resume.email,
          skills: resume.skills || [],
          createdAt: new Date(resume.created_at),
          updatedAt: new Date(resume.updated_at),
        },
      });
    }

    // Migrate Work Experiences
    const { data: workExperiences, error: workExperiencesError } = await supabase
      .from('work_experiences')
      .select('*');
    
    if (workExperiencesError) throw workExperiencesError;

    for (const exp of workExperiences!) {
      await prisma.workExperience.create({
        data: {
          id: exp.id,
          resumeId: exp.resume_id,
          position: exp.position,
          company: exp.company,
          startDate: exp.start_date ? new Date(exp.start_date) : null,
          endDate: exp.end_date ? new Date(exp.end_date) : null,
          description: exp.description,
          createdAt: new Date(exp.created_at),
          updatedAt: new Date(exp.updated_at),
        },
      });
    }

    // Migrate Education
    const { data: educations, error: educationsError } = await supabase
      .from('educations')
      .select('*');
    
    if (educationsError) throw educationsError;

    for (const edu of educations!) {
      await prisma.education.create({
        data: {
          id: edu.id,
          resumeId: edu.resume_id,
          degree: edu.degree,
          school: edu.school,
          startDate: edu.start_date ? new Date(edu.start_date) : null,
          endDate: edu.end_date ? new Date(edu.end_date) : null,
          createdAt: new Date(edu.created_at),
          updatedAt: new Date(edu.updated_at),
        },
      });
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrateData(); 