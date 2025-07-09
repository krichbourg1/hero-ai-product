// Police job titles and ranks data

interface PolicePosition {
  id: string;
  title: string;
  category: string;
  isCommand?: boolean;
}

interface PoliceRank {
  id: string;
  title: string;
  level: number;
  isCommand: boolean;
}

// Police Ranks (from entry level to command)
export const policeRanks: PoliceRank[] = [
  // Entry Level
  { id: 'recruit', title: 'Police Recruit', level: 1, isCommand: false },
  { id: 'officer', title: 'Police Officer', level: 2, isCommand: false },
  { id: 'officer-first-class', title: 'Police Officer First Class', level: 3, isCommand: false },
  
  // Supervisory
  { id: 'senior-officer', title: 'Senior Police Officer', level: 4, isCommand: false },
  { id: 'corporal', title: 'Corporal', level: 5, isCommand: true },
  { id: 'sergeant', title: 'Sergeant', level: 6, isCommand: true },
  { id: 'staff-sergeant', title: 'Staff Sergeant', level: 7, isCommand: true },
  
  // Command Staff
  { id: 'lieutenant', title: 'Lieutenant', level: 8, isCommand: true },
  { id: 'captain', title: 'Captain', level: 9, isCommand: true },
  { id: 'major', title: 'Major', level: 10, isCommand: true },
  { id: 'deputy-chief', title: 'Deputy Chief', level: 11, isCommand: true },
  { id: 'assistant-chief', title: 'Assistant Chief', level: 12, isCommand: true },
  { id: 'chief', title: 'Chief of Police', level: 13, isCommand: true },
];

// Police job positions/specializations
export const policePositions: PolicePosition[] = [
  // Patrol & General Duties
  { id: 'patrol-officer', title: 'Patrol Officer', category: 'Patrol' },
  { id: 'community-officer', title: 'Community Police Officer', category: 'Patrol' },
  { id: 'school-resource-officer', title: 'School Resource Officer', category: 'Patrol' },
  { id: 'traffic-officer', title: 'Traffic Enforcement Officer', category: 'Traffic' },
  { id: 'motorcycle-officer', title: 'Motorcycle Officer', category: 'Traffic' },
  { id: 'dui-officer', title: 'DUI Enforcement Officer', category: 'Traffic' },
  
  // Investigations
  { id: 'detective', title: 'Detective', category: 'Investigations' },
  { id: 'homicide-detective', title: 'Homicide Detective', category: 'Investigations' },
  { id: 'robbery-detective', title: 'Robbery Detective', category: 'Investigations' },
  { id: 'burglary-detective', title: 'Burglary Detective', category: 'Investigations' },
  { id: 'fraud-detective', title: 'Financial Crimes Detective', category: 'Investigations' },
  { id: 'cyber-crimes-detective', title: 'Cyber Crimes Detective', category: 'Investigations' },
  { id: 'narcotics-detective', title: 'Narcotics Detective', category: 'Investigations' },
  { id: 'vice-detective', title: 'Vice Detective', category: 'Investigations' },
  { id: 'domestic-violence-detective', title: 'Domestic Violence Detective', category: 'Investigations' },
  { id: 'juvenile-detective', title: 'Juvenile Detective', category: 'Investigations' },
  { id: 'cold-case-detective', title: 'Cold Case Detective', category: 'Investigations' },
  
  // Specialized Units
  { id: 'swat-officer', title: 'SWAT Team Member', category: 'Tactical' },
  { id: 'swat-sniper', title: 'SWAT Sniper', category: 'Tactical' },
  { id: 'swat-team-leader', title: 'SWAT Team Leader', category: 'Tactical' },
  { id: 'k9-officer', title: 'K-9 Officer', category: 'Specialized' },
  { id: 'bomb-squad', title: 'Bomb Squad Technician', category: 'Tactical' },
  { id: 'crisis-negotiator', title: 'Crisis Negotiator', category: 'Specialized' },
  { id: 'undercover-officer', title: 'Undercover Officer', category: 'Investigations' },
  
  // Support & Administrative
  { id: 'training-officer', title: 'Field Training Officer', category: 'Training' },
  { id: 'police-instructor', title: 'Police Academy Instructor', category: 'Training' },
  { id: 'evidence-technician', title: 'Evidence Technician', category: 'Support' },
  { id: 'crime-scene-investigator', title: 'Crime Scene Investigator', category: 'Investigations' },
  { id: 'forensic-specialist', title: 'Forensic Specialist', category: 'Investigations' },
  { id: 'police-dispatcher', title: 'Police Dispatcher', category: 'Communications' },
  { id: 'communications-supervisor', title: 'Communications Supervisor', category: 'Communications' },
  { id: 'records-clerk', title: 'Records Clerk', category: 'Administrative' },
  { id: 'property-evidence-clerk', title: 'Property & Evidence Clerk', category: 'Administrative' },
  
  // Community Relations
  { id: 'community-liaison', title: 'Community Liaison Officer', category: 'Community Relations' },
  { id: 'public-information-officer', title: 'Public Information Officer', category: 'Community Relations' },
  { id: 'crime-prevention-specialist', title: 'Crime Prevention Specialist', category: 'Community Relations' },
  
  // Internal Affairs & Professional Standards
  { id: 'internal-affairs-investigator', title: 'Internal Affairs Investigator', category: 'Internal Affairs' },
  { id: 'professional-standards', title: 'Professional Standards Officer', category: 'Internal Affairs' },
  
  // Technology & Cyber
  { id: 'it-specialist', title: 'Police IT Specialist', category: 'Technology' },
  { id: 'digital-forensics', title: 'Digital Forensics Examiner', category: 'Technology' },
  { id: 'surveillance-specialist', title: 'Surveillance Specialist', category: 'Technology' },
  
  // Emergency Response
  { id: 'emergency-response-officer', title: 'Emergency Response Officer', category: 'Emergency Services' },
  { id: 'hazmat-officer', title: 'Hazmat Response Officer', category: 'Emergency Services' },
  { id: 'search-rescue', title: 'Search and Rescue Officer', category: 'Emergency Services' },
  
  // Special Enforcement
  { id: 'gang-unit-officer', title: 'Gang Unit Officer', category: 'Special Enforcement' },
  { id: 'auto-theft-investigator', title: 'Auto Theft Investigator', category: 'Special Enforcement' },
  { id: 'organized-crime-investigator', title: 'Organized Crime Investigator', category: 'Special Enforcement' },
  { id: 'white-collar-investigator', title: 'White Collar Crime Investigator', category: 'Special Enforcement' },
  
  // Court & Legal
  { id: 'court-liaison-officer', title: 'Court Liaison Officer', category: 'Legal' },
  { id: 'warrant-officer', title: 'Warrant Officer', category: 'Legal' },
  { id: 'civil-process-server', title: 'Civil Process Server', category: 'Legal' },
  
  // Transportation & Security
  { id: 'airport-security-officer', title: 'Airport Security Officer', category: 'Transportation' },
  { id: 'transit-police-officer', title: 'Transit Police Officer', category: 'Transportation' },
  { id: 'harbor-patrol-officer', title: 'Harbor Patrol Officer', category: 'Transportation' },
  
  // Administrative Command
  { id: 'watch-commander', title: 'Watch Commander', category: 'Command', isCommand: true },
  { id: 'shift-supervisor', title: 'Shift Supervisor', category: 'Command', isCommand: true },
  { id: 'patrol-supervisor', title: 'Patrol Supervisor', category: 'Command', isCommand: true },
  { id: 'detective-supervisor', title: 'Detective Supervisor', category: 'Command', isCommand: true },
  { id: 'unit-commander', title: 'Unit Commander', category: 'Command', isCommand: true },
];

// Categories for filtering
export const policeCategories = [
  'Patrol',
  'Traffic',
  'Investigations',
  'Tactical',
  'Specialized',
  'Training',
  'Support',
  'Communications',
  'Administrative',
  'Community Relations',
  'Internal Affairs',
  'Technology',
  'Emergency Services',
  'Special Enforcement',
  'Legal',
  'Transportation',
  'Command'
]; 