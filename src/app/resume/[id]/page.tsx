"use client";

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Download, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
}

interface WorkExperience {
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  school: string;
  degree?: string;
  field?: string;
  startDate: string;
  endDate: string;
  isOngoing: boolean;
  description?: string;
}

interface Skill {
  name: string;
  type: 'soft' | 'hard';
}

interface ResumeData {
  personalInfo: PersonalInfo;
  workExperience?: WorkExperience; // For backward compatibility
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
  education: Education[];
  skills: Skill[];
  branch?: string;
  mos?: string;
  mosTitle?: string;
  rank?: string;
  rankTitle?: string;
  serviceType?: string;
}

export default function ResumePage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const resumeRef = useRef<HTMLDivElement>(null);
  
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication and load resume data
  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/sign-in');
        return;
      }
      setUser(user);
      
      if (params.id) {
        const savedData = localStorage.getItem(`resume-${params.id}`);
        if (savedData) {
          setResumeData(JSON.parse(savedData));
        } else {
          // If no data found, redirect to dashboard
          router.push('/dashboard');
        }
      }
      setIsLoading(false);
    };
    checkSession();
  }, [params.id, router]);

  const handleDownloadPDF = async () => {
    if (!resumeData) return;
    
    setIsDownloading(true);
    try {
      // Import html2pdf dynamically to avoid SSR issues
      const html2pdf = (await import('html2pdf.js')).default;
      
      const element = resumeRef.current;
      if (!element) return;

      const opt = {
        margin: 0.5,
        filename: `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
      
      toast({
        title: "Success!",
        description: "Resume downloaded successfully.",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "There was an error downloading your resume. Please try again.",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleEmailPDF = async () => {
    if (!resumeData || !user) return;
    
    setIsEmailSending(true);
    try {
      // Import html2pdf dynamically
      const html2pdf = (await import('html2pdf.js')).default;
      
      const element = resumeRef.current;
      if (!element) return;

      const opt = {
        margin: 0.5,
        filename: `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      // Generate PDF as blob
      const pdfBlob = await html2pdf().set(opt).from(element).outputPdf('blob');
      
      // Create FormData for API call
      const formData = new FormData();
      formData.append('pdf', pdfBlob, `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`);
      formData.append('email', user.email);
      formData.append('name', `${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}`);

      // Send to API endpoint
      const response = await fetch('/api/send-resume-email', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      toast({
        title: "Email Sent!",
        description: `Resume has been sent to ${user.email}`,
      });
    } catch (error) {
      console.error('Email error:', error);
      toast({
        variant: "destructive",
        title: "Email Failed",
        description: "There was an error sending your resume. Please try again.",
      });
    } finally {
      setIsEmailSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Resume Not Found</h1>
          <p className="text-gray-400 mb-6">The resume you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Button onClick={() => router.push('/dashboard')} variant="outline">
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short'
    });
  };

  // Helper function to format date range
  const formatDateRange = (startDate: string, endDate: string, isCurrent: boolean = false) => {
    const start = formatDate(startDate);
    const end = isCurrent ? 'Present' : formatDate(endDate);
    return `${start} – ${end}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0c1b]">
      {/* Header with actions */}
      <div className="bg-[#1a1f35] border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.push('/dashboard')}
            className="text-white hover:text-gray-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex gap-3">
            <Button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Resume content */}
      <div className="max-w-4xl mx-auto p-8">
        <div 
          ref={resumeRef}
          className="mx-auto"
          style={{ 
            width: '8.5in', 
            minHeight: '11in', 
            padding: '1in', 
            fontFamily: 'Times New Roman, Times, serif',
            color: '#222',
            background: 'white',
            fontSize: '12pt',
            lineHeight: '1.4',
            boxShadow: 'none',
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: '0.5em' }}>
            <div style={{ fontSize: '22pt', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', textAlign: 'center' }}>
              {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
            </div>
            {/* City, State ZIP | Phone */}
            <div style={{ fontSize: '11pt', marginTop: '0.2em', textAlign: 'center' }}>
              {(() => {
                // Try to extract city, state, zip from address
                const address = resumeData.personalInfo.address || '';
                // Simple regex for City, State ZIP
                const match = address.match(/([\w\s\.-]+),\s*([A-Z]{2})\s*(\d{5})?/);
                if (match) {
                  const city = match[1].trim();
                  const state = match[2];
                  const zip = match[3] ? match[3] : '';
                  return (
                    <>
                      {city}, {state}{zip && ` ${zip}`} {resumeData.personalInfo.phone && (
                        <> | {resumeData.personalInfo.phone}</>
                      )}
                    </>
                  );
                } else {
                  // Fallback: show address as-is, then phone
                  return (
                    <>
                      {address}{resumeData.personalInfo.phone && (
                        <> | {resumeData.personalInfo.phone}</>
                      )}
                    </>
                  );
                }
              })()}
            </div>
            {/* Email */}
            <div style={{ fontSize: '11pt', marginTop: '0.1em', textAlign: 'center' }}>{resumeData.personalInfo.email}</div>
          </div>

          {/* SUMMARY */}
          <div style={{ marginBottom: '0.7em' }}>
            <div style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '13pt', letterSpacing: '1px', marginBottom: '0.1em', textAlign: 'center' }}>Summary</div>
            <div style={{ textAlign: 'justify', fontSize: '11.5pt', marginBottom: '0.2em' }}>
              {resumeData.serviceType === 'police' ? (
                `Dedicated ${resumeData.rankTitle || 'Police Officer'} with proven experience as a ${resumeData.mosTitle || 'Law Enforcement Professional'} in the ${resumeData.branch || 'Police Department'}. Demonstrated expertise in leadership, problem-solving, and operational excellence. Seeking to leverage law enforcement experience and skills in a civilian career.`
              ) : (
                `Mathematically driven Data Scientist and Software Engineer with a background in nuclear engineering and a track record of applying advanced statistical methods, machine learning, and data-driven insights to solve complex problems. U.S. Navy veteran with experience operating in high-stress environments, bringing a disciplined, analytical approach to cybersecurity, network security, and information security. Proficient in Python, SQL, Splunk, and data warehousing, developing efficient machine learning models, predictive analytics, and automated security insights. Passionate about leveraging statistical modeling, algorithm optimization, and automation to drive efficiency and innovation in fast-paced technical environments.`
              )}
            </div>
          </div>

          {/* SKILLS */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div style={{ marginBottom: '0.7em' }}>
              <div style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '13pt', letterSpacing: '1px', marginBottom: '0.1em', textAlign: 'center' }}>Skills</div>
              <div style={{ fontSize: '11pt', marginBottom: '0.1em' }}>
                {resumeData.skills.map((skill, index) => (
                  <span key={index} style={{ marginRight: '1em' }}>
                    {skill.name}{index < resumeData.skills.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* EDUCATION */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div style={{ marginBottom: '0.7em' }}>
              <div style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '13pt', letterSpacing: '1px', marginBottom: '0.1em', textAlign: 'center' }}>Education</div>
              {resumeData.education.map((edu, index) => (
                <div key={index} style={{ fontSize: '11pt', marginBottom: '0.1em' }}>
                  <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{edu.school}</span>
                  {edu.degree && <span style={{ fontWeight: 'bold' }}>, {edu.degree}</span>}
                  {edu.field && <span> {edu.field}</span>}
                </div>
              ))}
            </div>
          )}

          {/* EXPERIENCE */}
          <div style={{ marginBottom: '0.7em' }}>
            <div style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '13pt', letterSpacing: '1px', marginBottom: '0.1em', textAlign: 'center' }}>Experience</div>
            {/* Military Experiences */}
            {resumeData.militaryExperiences && resumeData.militaryExperiences.length > 0 && (
              resumeData.militaryExperiences.map((experience, index) => (
                <div key={`military-${index}`} style={{ marginBottom: '0.5em' }}>
                  <div style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '11.5pt' }}>
                    {experience.branch}
                  </div>
                  <div style={{ fontWeight: 'bold', fontSize: '11pt', marginBottom: '0.1em' }}>
                    {experience.rankTitle || experience.rank} / {experience.mosTitle || experience.mos} {experience.startDate && (
                      <span style={{ fontWeight: 'normal', fontStyle: 'normal', marginLeft: '0.5em', fontSize: '11pt' }}>
                        {formatDateRange(experience.startDate, experience.endDate, experience.isCurrent)}
                      </span>
                    )}
                  </div>
                  <ul style={{ marginLeft: '1.2em', marginTop: 0, marginBottom: 0, paddingLeft: 0 }}>
                    {experience.duties.split('\n').map((line, lineIndex) => (
                      <li key={lineIndex} style={{ fontSize: '11pt', marginBottom: 0, paddingLeft: 0, listStyleType: 'disc' }}>{line.trim()}</li>
                    ))}
                  </ul>
                </div>
              ))
            )}
            {/* Civilian Experiences */}
            {resumeData.civilianExperiences && resumeData.civilianExperiences.length > 0 && (
              resumeData.civilianExperiences.map((experience, index) => (
                <div key={`civilian-${index}`} style={{ marginBottom: '0.5em' }}>
                  <div style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '11.5pt' }}>
                    {experience.company}{experience.location ? `, ${experience.location}` : ''}
                  </div>
                  <div style={{ fontWeight: 'bold', fontSize: '11pt', marginBottom: '0.1em' }}>
                    {experience.position} {experience.startDate && (
                      <span style={{ fontWeight: 'normal', fontStyle: 'normal', marginLeft: '0.5em', fontSize: '11pt' }}>
                        {formatDateRange(experience.startDate, experience.endDate, experience.isCurrent)}
                      </span>
                    )}
                  </div>
                  <ul style={{ marginLeft: '1.2em', marginTop: 0, marginBottom: 0, paddingLeft: 0 }}>
                    {experience.duties.split('\n').map((line, lineIndex) => (
                      <li key={lineIndex} style={{ fontSize: '11pt', marginBottom: 0, paddingLeft: 0, listStyleType: 'disc' }}>{line.trim()}</li>
                    ))}
                  </ul>
                </div>
              ))
            )}
            {/* Fallback to single experience for backward compatibility */}
            {(!resumeData.militaryExperiences || resumeData.militaryExperiences.length === 0) && 
             (!resumeData.civilianExperiences || resumeData.civilianExperiences.length === 0) && 
             resumeData.workExperience && (
              <div style={{ marginBottom: '0.5em' }}>
                <div style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '11.5pt' }}>
                  {resumeData.branch}
                </div>
                <div style={{ fontWeight: 'bold', fontSize: '11pt', marginBottom: '0.1em' }}>
                  {resumeData.rankTitle} / {resumeData.mosTitle} {resumeData.workExperience.startDate && (
                    <span style={{ fontWeight: 'normal', fontStyle: 'normal', marginLeft: '0.5em', fontSize: '11pt' }}>
                      {formatDateRange(resumeData.workExperience.startDate, resumeData.workExperience.endDate)}
                    </span>
                  )}
                </div>
                <ul style={{ marginLeft: '1.2em', marginTop: 0, marginBottom: 0, paddingLeft: 0 }}>
                  {resumeData.workExperience.description.split('\n').map((line, index) => (
                    <li key={index} style={{ fontSize: '11pt', marginBottom: 0, paddingLeft: 0, listStyleType: 'disc' }}>{line.trim()}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 