export interface ResumeData {
  id?: string;
  userId: string;
  serviceType?: 'military' | 'police' | 'firefighter' | 'paramedic';
  branch?: string;
  mos: string;
  rank: string;
  mosTitle?: string;
  rankTitle?: string;
  personalInfo?: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  // Single experience for backward compatibility
  experience?: {
    startDate: string;
    endDate: string;
    duties: string;
    department?: string; // For police/firefighter/paramedic
  };
  // Multiple military experiences
  militaryExperiences?: Array<{
    id: string;
    branch: string;
    mos: string;
    mosTitle?: string;
    rank: string;
    rankTitle?: string;
    startDate: string;
    endDate: string;
    duties: string;
    isCurrent?: boolean;
  }>;
  // Civilian work experience
  civilianExperiences?: Array<{
    id: string;
    company: string;
    position: string;
    location?: string;
    startDate: string;
    endDate: string;
    duties: string;
    isCurrent?: boolean;
  }>;
  education?: Array<{
    type: 'college' | 'military' | 'police-academy' | 'training' | 'certification' | 'none';
    school: string;
    degree?: string;
    field?: string;
    startDate: string;
    endDate: string;
    isOngoing: boolean;
    description?: string;
  }>;
  skills?: Array<{
    name: string;
    type: 'soft' | 'hard';
  }>;
  status: 'draft' | 'completed';
  lastUpdated: string;
  createdAt: string;
}

export interface ResumeListItem {
  id: string;
  title: string;
  branch: string;
  mos: string;
  rank: string;
  serviceType?: 'military' | 'police' | 'firefighter' | 'paramedic';
  status: 'draft' | 'completed';
  lastUpdated: string;
}

// Save resume data to localStorage and prepare for database save
export function saveResumeProgress(data: Partial<ResumeData>) {
  // Use the provided ID or create a stable one based on user and service details
  const resumeId = data.id || (data.userId && data.branch && data.mos && data.rank 
    ? `resume-${data.userId}-${data.branch}-${data.mos}-${data.rank}`
    : `resume-${Date.now()}`);
  
  console.log('saveResumeProgress called with data:', data);
  console.log('Resume ID:', resumeId);
  
  // Load existing data to merge with new data
  let existingData: Partial<ResumeData> = {};
  const savedData = localStorage.getItem(`resume-${resumeId}`);
  if (savedData) {
    try {
      existingData = JSON.parse(savedData);
      console.log('Loaded existing data for merging:', existingData);
    } catch (error) {
      console.error('Error loading existing resume data:', error);
    }
  }
  
  // Deep merge the data, preserving existing data where new data is not provided
  const saveData = {
    ...existingData, // Start with existing data
    ...data, // Override with new data
    // Explicitly preserve specific fields from existing data if not provided in new data
    education: data.education !== undefined ? data.education : existingData.education,
    skills: data.skills !== undefined ? data.skills : existingData.skills,
    experience: data.experience !== undefined ? data.experience : existingData.experience,
    militaryExperiences: data.militaryExperiences !== undefined ? data.militaryExperiences : existingData.militaryExperiences,
    civilianExperiences: data.civilianExperiences !== undefined ? data.civilianExperiences : existingData.civilianExperiences,
    personalInfo: data.personalInfo !== undefined ? data.personalInfo : existingData.personalInfo,
    // Ensure core fields are always set correctly
    id: resumeId,
    userId: data.userId || existingData.userId || 'anonymous',
    lastUpdated: new Date().toISOString(),
    createdAt: existingData.createdAt || new Date().toISOString(),
  };

  console.log('Final save data:', saveData);
  console.log('Experience data being saved:', saveData.experience);
  console.log('Military experiences being saved:', saveData.militaryExperiences);
  console.log('Civilian experiences being saved:', saveData.civilianExperiences);
  console.log('Education data being saved:', saveData.education);
  console.log('Skills data being saved:', saveData.skills);
  console.log('Personal info being saved:', saveData.personalInfo);

  // Save to localStorage for immediate access
  localStorage.setItem(`resume-${resumeId}`, JSON.stringify(saveData));
  
  // Also save individual sections for backward compatibility
  if (data.branch && data.mos && data.rank) {
    const key = `${data.branch}-${data.mos}-${data.rank}`;
    if (data.personalInfo || saveData.personalInfo) {
      localStorage.setItem(`military-experience-${key}`, JSON.stringify({
        personalInfo: data.personalInfo || saveData.personalInfo,
        branch: data.branch,
        mos: data.mos,
        mosTitle: data.mosTitle,
        rank: data.rank,
        rankTitle: data.rankTitle,
        startDate: data.experience?.startDate || saveData.experience?.startDate,
        endDate: data.experience?.endDate || saveData.experience?.endDate,
        duties: data.experience?.duties || saveData.experience?.duties
      }));
    }
    if (data.education || saveData.education) {
      localStorage.setItem(`military-education-${key}`, JSON.stringify(data.education || saveData.education));
    }
    if (data.skills || saveData.skills) {
      localStorage.setItem(`military-skills-${key}`, JSON.stringify(data.skills || saveData.skills));
    }
  }

  return resumeId;
}

// Load resume data from localStorage
export function loadResumeData(resumeId: string): ResumeData | null {
  const savedData = localStorage.getItem(`resume-${resumeId}`);
  if (!savedData) return null;
  
  try {
    return JSON.parse(savedData);
  } catch (error) {
    console.error('Error loading resume data:', error);
    return null;
  }
}

// Load resume data by branch, mos, and rank (for backward compatibility)
export function loadResumeDataByKey(branch: string, mos: string, rank: string): Partial<ResumeData> {
  const key = `${branch}-${mos}-${rank}`;
  
  const experienceData = localStorage.getItem(`military-experience-${key}`);
  const educationData = localStorage.getItem(`military-education-${key}`);
  const skillsData = localStorage.getItem(`military-skills-${key}`);
  
  const data: Partial<ResumeData> = {
    branch,
    mos,
    rank,
  };

  if (experienceData) {
    try {
      const parsed = JSON.parse(experienceData);
      data.personalInfo = parsed.personalInfo;
      data.mosTitle = parsed.mosTitle;
      data.rankTitle = parsed.rankTitle;
      data.experience = {
        startDate: parsed.startDate,
        endDate: parsed.endDate,
        duties: parsed.duties
      };
    } catch (error) {
      console.error('Error parsing experience data:', error);
    }
  }

  if (educationData) {
    try {
      data.education = JSON.parse(educationData);
    } catch (error) {
      console.error('Error parsing education data:', error);
    }
  }

  if (skillsData) {
    try {
      data.skills = JSON.parse(skillsData);
    } catch (error) {
      console.error('Error parsing skills data:', error);
    }
  }

  return data;
}

// Get all saved resumes from localStorage (filtered by user if userId provided)
export function getAllSavedResumes(userId?: string): ResumeListItem[] {
  console.log('Getting all saved resumes for userId:', userId);
  const resumes: ResumeListItem[] = [];
  
  // Check for resume-* keys
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('resume-') && key !== 'resume-') {
      console.log('Found resume key:', key);
      try {
        const data = JSON.parse(localStorage.getItem(key)!);
        console.log('Resume data:', data);
        
        // Check if this is a valid resume (military or police)
        const isValidMilitaryResume = data.branch && data.mos && data.rank;
        const isValidPoliceResume = data.serviceType === 'police' && data.mos && data.rank;
        
        if (isValidMilitaryResume || isValidPoliceResume) {
          // Filter by user if userId is provided
          if (userId && data.userId && data.userId !== userId) {
            console.log('Skipping resume - wrong user:', data.userId, 'vs', userId);
            continue;
          }
          
          // Generate appropriate title based on service type
          let title: string;
          if (data.serviceType === 'police') {
            title = `Police ${data.mosTitle || data.mos} Resume`;
          } else {
            title = `${data.branch} ${data.mosTitle || data.mos} Resume`;
          }
          
          const resumeItem: ResumeListItem = {
            id: data.id || key,
            title: title,
            branch: data.branch || 'Police Department',
            mos: data.mos,
            rank: data.rank,
            serviceType: data.serviceType,
            status: data.status || 'draft',
            lastUpdated: data.lastUpdated || new Date().toISOString()
          };
          
          console.log('Adding resume to list:', resumeItem);
          resumes.push(resumeItem);
        } else {
          console.log('Invalid resume data, skipping');
        }
      } catch (error) {
        console.error('Error parsing resume data:', error);
      }
    }
  }

  // Sort by last updated (newest first)
  const result = resumes.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
  console.log('Final resumes list:', result);
  return result;
}

// Delete a resume
export function deleteResume(resumeId: string) {
  console.log('Deleting resume with ID:', resumeId);
  
  // Remove the main resume data
  localStorage.removeItem(`resume-${resumeId}`);
  console.log('Removed main resume key: resume-' + resumeId);
  
  // Also clean up individual section keys if they exist
  const allKeys = Object.keys(localStorage);
  const keysToRemove: string[] = [];
  
  allKeys.forEach(key => {
    // Check for any key that contains the resumeId
    if (key.includes(resumeId)) {
      keysToRemove.push(key);
    }
    
    // Also check for legacy keys that might be related
    if (key.startsWith('military-experience-') || 
        key.startsWith('military-education-') || 
        key.startsWith('military-skills-') ||
        key.startsWith('police-experience-') ||
        key.startsWith('police-education-') ||
        key.startsWith('police-skills-')) {
      try {
        const data = JSON.parse(localStorage.getItem(key)!);
        // If this key contains data that matches our resumeId, remove it
        if (data && (data.id === resumeId || data.resumeId === resumeId)) {
          keysToRemove.push(key);
        }
      } catch {
        // If we can't parse the data, skip it
      }
    }
  });
  
  // Remove all related keys
  keysToRemove.forEach(key => {
    console.log('Removing localStorage key:', key);
    localStorage.removeItem(key);
  });
  
  console.log('Deleted resume and', keysToRemove.length, 'related keys');
  
  // Double-check that the resume is actually gone
  const remainingResume = localStorage.getItem(`resume-${resumeId}`);
  if (remainingResume) {
    console.error('WARNING: Resume still exists after deletion!');
  } else {
    console.log('Confirmed: Resume successfully deleted');
  }
  
  // Force a small delay to ensure localStorage operations are complete
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log('Delete operation completed');
      resolve();
    }, 100);
  });
}

// Clear all resume data (for debugging/testing)
export function clearAllResumeData() {
  console.log('Clearing all resume data from localStorage');
  const allKeys = Object.keys(localStorage);
  const keysToRemove: string[] = [];
  
  allKeys.forEach(key => {
    if (key.startsWith('resume-') || 
        key.startsWith('military-') || 
        key.startsWith('police-')) {
      keysToRemove.push(key);
    }
  });
  
  keysToRemove.forEach(key => {
    console.log('Removing key:', key);
    localStorage.removeItem(key);
  });
  
  console.log('Cleared', keysToRemove.length, 'resume-related keys');
}

// Auto-save function to be called periodically
export function autoSaveResume(data: Partial<ResumeData>) {
  if (data.branch && data.mos && data.rank) {
    saveResumeProgress(data);
  }
}

// Debug function to check localStorage state
export function debugResumeStorage(resumeId?: string) {
  console.log('🔍 DEBUGGING: LocalStorage Resume State Check');
  console.log('=============================================');
  
  if (resumeId) {
    console.log('🔍 Checking specific resume:', resumeId);
    const mainKey = `resume-${resumeId}`;
    const mainData = localStorage.getItem(mainKey);
    
    if (mainData) {
      try {
        const parsed = JSON.parse(mainData);
        console.log('🔍 Main resume data:', parsed);
        console.log('🔍 Personal Info:', parsed.personalInfo);
        console.log('🔍 Experience:', parsed.experience);
        console.log('🔍 Military Experiences:', parsed.militaryExperiences);
        console.log('🔍 Civilian Experiences:', parsed.civilianExperiences);
        console.log('🔍 Education:', parsed.education);
        console.log('🔍 Skills:', parsed.skills);
      } catch (error) {
        console.error('🔍 Error parsing main data:', error);
      }
    } else {
      console.log('🔍 No main resume data found for key:', mainKey);
    }
  }
  
  // Show all resume keys in localStorage
  console.log('🔍 All resume keys in localStorage:');
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('resume-')) {
      console.log(`🔍 - ${key}`);
      try {
        const data = JSON.parse(localStorage.getItem(key)!);
        console.log(`🔍   - User: ${data.userId}`);
        console.log(`🔍   - Service: ${data.serviceType}`);
        console.log(`🔍   - Branch: ${data.branch}`);
        console.log(`🔍   - MOS: ${data.mos}`);
        console.log(`🔍   - Rank: ${data.rank}`);
        console.log(`🔍   - Has Experience: ${!!data.experience}`);
        console.log(`🔍   - Has Military Experiences: ${!!data.militaryExperiences && data.militaryExperiences.length > 0}`);
        console.log(`🔍   - Has Civilian Experiences: ${!!data.civilianExperiences && data.civilianExperiences.length > 0}`);
        console.log(`🔍   - Has Education: ${!!data.education && data.education.length > 0}`);
        console.log(`🔍   - Has Skills: ${!!data.skills && data.skills.length > 0}`);
        console.log(`🔍   - Has Personal Info: ${!!data.personalInfo}`);
      } catch (error) {
        console.log(`🔍   - Error parsing: ${error}`);
      }
    }
  }
  
  console.log('=============================================');
}

// Function to verify data persistence for a specific resume
export function verifyResumeDataPersistence(resumeId: string) {
  console.log('🔍 VERIFYING DATA PERSISTENCE FOR RESUME:', resumeId);
  console.log('=============================================');
  
  const data = loadResumeData(resumeId);
  if (!data) {
    console.log('🔍 No data found for resume:', resumeId);
    return false;
  }
  
  console.log('🔍 Resume Data Summary:');
  console.log(`🔍 - Personal Info: ${data.personalInfo ? 'Present' : 'Missing'}`);
  console.log(`🔍 - Military Experiences: ${data.militaryExperiences?.length || 0} entries`);
  console.log(`🔍 - Civilian Experiences: ${data.civilianExperiences?.length || 0} entries`);
  console.log(`🔍 - Education: ${data.education?.length || 0} entries`);
  console.log(`🔍 - Skills: ${data.skills?.length || 0} entries`);
  console.log(`🔍 - Last Updated: ${data.lastUpdated}`);
  
  const hasCompleteData = data.personalInfo && 
    (data.militaryExperiences?.length || 0) > 0 && 
    (data.education?.length || 0) > 0 && 
    (data.skills?.length || 0) > 0;
  
  console.log(`🔍 - Data Completeness: ${hasCompleteData ? 'COMPLETE' : 'INCOMPLETE'}`);
  console.log('=============================================');
  
  return hasCompleteData;
} 