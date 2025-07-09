// Add type definitions at the top of the file
interface MilitaryOccupation {
  id: string;
  title: string;
  isOfficer?: boolean;
}

interface MilitaryRankVariations {
  army: string;
  navy: string;
  airForce: string;
  marines: string;
  coastGuard: string;
  spaceForce: string;
}

interface MilitaryRank {
  id: string;
  title: string;
  variations: MilitaryRankVariations;
}

// Military Ranks (Common across all branches with some naming variations)
export const militaryRanks: MilitaryRank[] = [
  // Enlisted
  { id: 'e1', title: 'E-1', variations: {
    army: 'Private',
    navy: 'Seaman Recruit',
    airForce: 'Airman Basic',
    marines: 'Private',
    coastGuard: 'Seaman Recruit',
    spaceForce: 'Specialist 1',
  }},
  { id: 'e2', title: 'E-2', variations: {
    army: 'Private E-2',
    navy: 'Seaman Apprentice',
    airForce: 'Airman',
    marines: 'Private First Class',
    coastGuard: 'Seaman Apprentice',
    spaceForce: 'Specialist 2',
  }},
  { id: 'e3', title: 'E-3', variations: {
    army: 'Private First Class',
    navy: 'Seaman',
    airForce: 'Airman First Class',
    marines: 'Lance Corporal',
    coastGuard: 'Seaman',
    spaceForce: 'Specialist 3',
  }},
  { id: 'e4', title: 'E-4', variations: {
    army: 'Specialist/Corporal',
    navy: 'Petty Officer Third Class',
    airForce: 'Senior Airman',
    marines: 'Corporal',
    coastGuard: 'Petty Officer Third Class',
    spaceForce: 'Specialist 4',
  }},
  { id: 'e5', title: 'E-5', variations: {
    army: 'Sergeant',
    navy: 'Petty Officer Second Class',
    airForce: 'Staff Sergeant',
    marines: 'Sergeant',
    coastGuard: 'Petty Officer Second Class',
    spaceForce: 'Sergeant',
  }},
  { id: 'e6', title: 'E-6', variations: {
    army: 'Staff Sergeant',
    navy: 'Petty Officer First Class',
    airForce: 'Technical Sergeant',
    marines: 'Staff Sergeant',
    coastGuard: 'Petty Officer First Class',
    spaceForce: 'Technical Sergeant',
  }},
  { id: 'e7', title: 'E-7', variations: {
    army: 'Sergeant First Class',
    navy: 'Chief Petty Officer',
    airForce: 'Master Sergeant/First Sergeant',
    marines: 'Gunnery Sergeant',
    coastGuard: 'Chief Petty Officer',
    spaceForce: 'Master Sergeant',
  }},
  { id: 'e8', title: 'E-8', variations: {
    army: 'Master Sergeant/First Sergeant',
    navy: 'Senior Chief Petty Officer',
    airForce: 'Senior Master Sergeant',
    marines: 'Master Sergeant/First Sergeant',
    coastGuard: 'Senior Chief Petty Officer',
    spaceForce: 'Senior Master Sergeant',
  }},
  { id: 'e9', title: 'E-9', variations: {
    army: 'Sergeant Major',
    navy: 'Master Chief Petty Officer',
    airForce: 'Chief Master Sergeant',
    marines: 'Master Gunnery Sergeant/Sergeant Major',
    coastGuard: 'Master Chief Petty Officer',
    spaceForce: 'Chief Master Sergeant',
  }},
  
  // Officers
  { id: 'o1', title: 'O-1', variations: {
    army: 'Second Lieutenant',
    navy: 'Ensign',
    airForce: 'Second Lieutenant',
    marines: 'Second Lieutenant',
    coastGuard: 'Ensign',
    spaceForce: 'Second Lieutenant',
  }},
  { id: 'o2', title: 'O-2', variations: {
    army: 'First Lieutenant',
    navy: 'Lieutenant Junior Grade',
    airForce: 'First Lieutenant',
    marines: 'First Lieutenant',
    coastGuard: 'Lieutenant Junior Grade',
    spaceForce: 'First Lieutenant',
  }},
  { id: 'o3', title: 'O-3', variations: {
    army: 'Captain',
    navy: 'Lieutenant',
    airForce: 'Captain',
    marines: 'Captain',
    coastGuard: 'Lieutenant',
    spaceForce: 'Captain',
  }},
  { id: 'o4', title: 'O-4', variations: {
    army: 'Major',
    navy: 'Lieutenant Commander',
    airForce: 'Major',
    marines: 'Major',
    coastGuard: 'Lieutenant Commander',
    spaceForce: 'Major',
  }},
  { id: 'o5', title: 'O-5', variations: {
    army: 'Lieutenant Colonel',
    navy: 'Commander',
    airForce: 'Lieutenant Colonel',
    marines: 'Lieutenant Colonel',
    coastGuard: 'Commander',
    spaceForce: 'Lieutenant Colonel',
  }},
  { id: 'o6', title: 'O-6', variations: {
    army: 'Colonel',
    navy: 'Captain',
    airForce: 'Colonel',
    marines: 'Colonel',
    coastGuard: 'Captain',
    spaceForce: 'Colonel',
  }},
  { id: 'o7', title: 'O-7', variations: {
    army: 'Brigadier General',
    navy: 'Rear Admiral Lower Half',
    airForce: 'Brigadier General',
    marines: 'Brigadier General',
    coastGuard: 'Rear Admiral Lower Half',
    spaceForce: 'Brigadier General',
  }},
  { id: 'o8', title: 'O-8', variations: {
    army: 'Major General',
    navy: 'Rear Admiral Upper Half',
    airForce: 'Major General',
    marines: 'Major General',
    coastGuard: 'Rear Admiral Upper Half',
    spaceForce: 'Major General',
  }},
  { id: 'o9', title: 'O-9', variations: {
    army: 'Lieutenant General',
    navy: 'Vice Admiral',
    airForce: 'Lieutenant General',
    marines: 'Lieutenant General',
    coastGuard: 'Vice Admiral',
    spaceForce: 'Lieutenant General',
  }},
  { id: 'o10', title: 'O-10', variations: {
    army: 'General',
    navy: 'Admiral',
    airForce: 'General',
    marines: 'General',
    coastGuard: 'Admiral',
    spaceForce: 'General',
  }},
  { id: 'o11', title: 'O-11', variations: {
    army: 'General of the Army',
    navy: 'Fleet Admiral',
    airForce: 'General of the Air Force',
    marines: 'N/A',
    coastGuard: 'N/A',
    spaceForce: 'N/A',
  }},
];

// Complete MOS/Rate data for all branches
export const militaryOccupations: Record<string, MilitaryOccupation[]> = {
  army: [
    // Infantry & Combat
    { id: '11A', title: '11A - Infantry Officer', isOfficer: true },
    { id: '11B', title: '11B - Infantryman', isOfficer: false },
    { id: '11C', title: '11C - Indirect Fire Infantryman', isOfficer: false },
    { id: '11Z', title: '11Z - Infantry Senior Sergeant', isOfficer: false },
    { id: '12A', title: '12A - Engineer Officer', isOfficer: true },
    { id: '12B', title: '12B - Combat Engineer', isOfficer: false },
    { id: '12C', title: '12C - Bridge Crewmember', isOfficer: false },
    { id: '12D', title: '12D - Diver', isOfficer: false },
    { id: '12H', title: '12H - Construction Engineering Supervisor', isOfficer: false },
    { id: '12K', title: '12K - Plumber', isOfficer: false },
    { id: '12M', title: '12M - Firefighter', isOfficer: false },
    { id: '12N', title: '12N - Horizontal Construction Engineer', isOfficer: false },
    { id: '12P', title: '12P - Prime Power Production Specialist', isOfficer: false },
    { id: '12R', title: '12R - Interior Electrician', isOfficer: false },
    { id: '12T', title: '12T - Technical Engineer', isOfficer: false },
    { id: '12V', title: '12V - Concrete and Asphalt Equipment Operator', isOfficer: false },
    { id: '12W', title: '12W - Carpentry and Masonry Specialist', isOfficer: false },
    { id: '12Y', title: '12Y - Geospatial Engineer', isOfficer: false },
    { id: '12Z', title: '12Z - Combat Engineering Senior Sergeant', isOfficer: false },

    // Artillery & Air Defense
    { id: '13A', title: '13A - Field Artillery Officer', isOfficer: true },
    { id: '13B', title: '13B - Cannon Crewmember', isOfficer: false },
    { id: '13F', title: '13F - Fire Support Specialist', isOfficer: false },
    { id: '13J', title: '13J - Fire Control Specialist', isOfficer: false },
    { id: '13M', title: '13M - Multiple Launch Rocket System Crewmember', isOfficer: false },
    { id: '13R', title: '13R - Field Artillery Firefinder Radar Operator', isOfficer: false },
    { id: '13Z', title: '13Z - Field Artillery Senior Sergeant', isOfficer: false },
    { id: '14E', title: '14E - Patriot Fire Control Enhanced Operator/Maintainer', isOfficer: false },
    { id: '14G', title: '14G - Air Defense Battle Management System Operator', isOfficer: false },
    { id: '14H', title: '14H - Air Defense Enhanced Early Warning System Operator', isOfficer: false },
    { id: '14P', title: '14P - Air and Missile Defense Crewmember', isOfficer: false },
    { id: '14S', title: '14S - Air and Missile Defense (AMD) Crewmember', isOfficer: false },
    { id: '14T', title: '14T - Patriot Launching Station Enhanced Operator/Maintainer', isOfficer: false },
    { id: '14Z', title: '14Z - Air Defense Artillery Senior Sergeant', isOfficer: false },

    // Aviation
    { id: '15A', title: '15A - Aviation Officer', isOfficer: true },
    { id: '15B', title: '15B - Aircraft Powerplant Repairer', isOfficer: false },
    { id: '15D', title: '15D - Aircraft Powertrain Repairer', isOfficer: false },
    { id: '15E', title: '15E - Unmanned Aircraft Systems Repairer', isOfficer: false },
    { id: '15F', title: '15F - Aircraft Electrician', isOfficer: false },
    { id: '15G', title: '15G - Aircraft Structural Repairer', isOfficer: false },
    { id: '15H', title: '15H - Aircraft Pneudraulics Repairer', isOfficer: false },
    { id: '15N', title: '15N - Avionic Mechanic', isOfficer: false },
    { id: '15P', title: '15P - Aviation Operations Specialist', isOfficer: false },
    { id: '15Q', title: '15Q - Air Traffic Control Operator', isOfficer: false },
    { id: '15R', title: '15R - AH-64 Attack Helicopter Repairer', isOfficer: false },
    { id: '15S', title: '15S - OH-58D Helicopter Repairer', isOfficer: false },
    { id: '15T', title: '15T - UH-60 Helicopter Repairer', isOfficer: false },
    { id: '15U', title: '15U - CH-47 Helicopter Repairer', isOfficer: false },
    { id: '15W', title: '15W - Unmanned Aircraft Systems Operator', isOfficer: false },
    { id: '15Y', title: '15Y - AH-64D Armament/Electrical/Avionics Systems Repairer', isOfficer: false },
    { id: '15Z', title: '15Z - Aircraft Maintenance Senior Sergeant', isOfficer: false },

    // Intelligence & Cyber
    { id: '17C', title: '17C - Cyber Operations Specialist', isOfficer: false },
    { id: '17E', title: '17E - Electronic Warfare Specialist', isOfficer: false },
    { id: '35F', title: '35F - Intelligence Analyst', isOfficer: false },
    { id: '35G', title: '35G - Geospatial Intelligence Imagery Analyst', isOfficer: false },
    { id: '35L', title: '35L - Counterintelligence Agent', isOfficer: false },
    { id: '35M', title: '35M - Human Intelligence Collector', isOfficer: false },
    { id: '35N', title: '35N - Signals Intelligence Analyst', isOfficer: false },
    { id: '35P', title: '35P - Cryptologic Linguist', isOfficer: false },
    { id: '35T', title: '35T - Military Intelligence Systems Maintainer/Integrator', isOfficer: false },

    // Special Operations
    { id: '18B', title: '18B - Special Forces Weapons Sergeant', isOfficer: false },
    { id: '18C', title: '18C - Special Forces Engineer Sergeant', isOfficer: false },
    { id: '18D', title: '18D - Special Forces Medical Sergeant', isOfficer: false },
    { id: '18E', title: '18E - Special Forces Communications Sergeant', isOfficer: false },
    { id: '18F', title: '18F - Special Forces Intelligence Sergeant', isOfficer: false },

    // Signal & Communications
    { id: '25B', title: '25B - Information Technology Specialist', isOfficer: false },
    { id: '25C', title: '25C - Radio Operator-Maintainer', isOfficer: false },
    { id: '25D', title: '25D - Cyber Network Defender', isOfficer: false },
    { id: '25E', title: '25E - Electromagnetic Spectrum Manager', isOfficer: false },
    { id: '25N', title: '25N - Nodal Network Systems Operator-Maintainer', isOfficer: false },
    { id: '25S', title: '25S - Satellite Communication Systems Operator-Maintainer', isOfficer: false },
    { id: '25U', title: '25U - Signal Support Systems Specialist', isOfficer: false },

    // Medical
    { id: '68A', title: '68A - Biomedical Equipment Specialist', isOfficer: false },
    { id: '68C', title: '68C - Practical Nursing Specialist', isOfficer: false },
    { id: '68D', title: '68D - Operating Room Specialist', isOfficer: false },
    { id: '68E', title: '68E - Dental Specialist', isOfficer: false },
    { id: '68K', title: '68K - Medical Laboratory Specialist', isOfficer: false },
    { id: '68P', title: '68P - Radiology Specialist', isOfficer: false },
    { id: '68Q', title: '68Q - Pharmacy Specialist', isOfficer: false },
    { id: '68W', title: '68W - Health Care Specialist (Combat Medic)', isOfficer: false },
    { id: '68X', title: '68X - Behavioral Health Specialist', isOfficer: false },

    // Support & Logistics
    { id: '88H', title: '88H - Cargo Specialist', isOfficer: false },
    { id: '88M', title: '88M - Motor Transport Operator', isOfficer: false },
    { id: '88N', title: '88N - Transportation Management Coordinator', isOfficer: false },
    { id: '89B', title: '89B - Ammunition Specialist', isOfficer: false },
    { id: '89D', title: '89D - Explosive Ordnance Disposal Specialist', isOfficer: false },
    { id: '91B', title: '91B - Wheeled Vehicle Mechanic', isOfficer: false },
    { id: '91D', title: '91D - Power Generation Equipment Repairer', isOfficer: false },
    { id: '91E', title: '91E - Allied Trade Specialist', isOfficer: false },
    { id: '92A', title: '92A - Automated Logistical Specialist', isOfficer: false },
    { id: '92F', title: '92F - Petroleum Supply Specialist', isOfficer: false },
    { id: '92G', title: '92G - Culinary Specialist', isOfficer: false },
    { id: '92Y', title: '92Y - Unit Supply Specialist', isOfficer: false },

    // Military Police & Legal
    { id: '27D', title: '27D - Paralegal Specialist', isOfficer: false },
    { id: '31B', title: '31B - Military Police', isOfficer: false },
    { id: '31E', title: '31E - Internment/Resettlement Specialist', isOfficer: false },
    { id: '31K', title: '31K - Military Working Dog Handler', isOfficer: false },

    // Other Specialties
    { id: '09L', title: '09L - Interpreter/Translator', isOfficer: false },
    { id: '36B', title: '36B - Financial Management Technician', isOfficer: false },
    { id: '37F', title: '37F - Psychological Operations Specialist', isOfficer: false },
    { id: '38B', title: '38B - Civil Affairs Specialist', isOfficer: false },
    { id: '42A', title: '42A - Human Resources Specialist', isOfficer: false },
    { id: '46Q', title: '46Q - Public Affairs Specialist', isOfficer: false },
    { id: '56M', title: '56M - Religious Affairs Specialist', isOfficer: false },
    { id: '74D', title: '74D - Chemical, Biological, Radiological and Nuclear Specialist', isOfficer: false },
    { id: '79R', title: '79R - Recruiter', isOfficer: false },
    { id: '79S', title: '79S - Career Counselor', isOfficer: false }
  ],
  navy: [
    // Officers
    { id: 'LDO', title: 'LDO - Limited Duty Officer', isOfficer: true },
    { id: 'CWO', title: 'CWO - Chief Warrant Officer', isOfficer: true },
    { id: 'URL', title: 'URL - Unrestricted Line Officer', isOfficer: true },
    { id: 'RL', title: 'RL - Restricted Line Officer', isOfficer: true },
    { id: 'SC', title: 'SC - Supply Corps Officer', isOfficer: true },
    { id: 'MC', title: 'MC - Medical Corps Officer', isOfficer: true },
    { id: 'DC', title: 'DC - Dental Corps Officer', isOfficer: true },
    { id: 'NC', title: 'NC - Nurse Corps Officer', isOfficer: true },
    { id: 'JAG', title: 'JAG - Judge Advocate General Corps Officer', isOfficer: true },
    { id: 'MSC', title: 'MSC - Medical Service Corps Officer', isOfficer: true },
    { id: 'CEC', title: 'CEC - Civil Engineer Corps Officer', isOfficer: true },
    { id: 'INTEL-O', title: 'INTEL - Intelligence Officer', isOfficer: true },
    { id: 'NFO', title: 'NFO - Naval Flight Officer', isOfficer: true },
    { id: 'PILOT', title: 'PILOT - Naval Aviator', isOfficer: true },
    { id: 'SWO', title: 'SWO - Surface Warfare Officer', isOfficer: true },
    { id: 'SUB', title: 'SUB - Submarine Officer', isOfficer: true },
    { id: 'EOD-O', title: 'EOD - Explosive Ordnance Disposal Officer', isOfficer: true },
    { id: 'SEAL-O', title: 'SEAL - Naval Special Warfare Officer', isOfficer: true },

    // Aviation (Enlisted)
    { id: 'AB', title: 'AB - Aviation Boatswain\'s Mate', isOfficer: false },
    { id: 'ABE', title: 'ABE - Aviation Boatswain\'s Mate (Launching & Recovery)', isOfficer: false },
    { id: 'ABF', title: 'ABF - Aviation Boatswain\'s Mate (Fuels)', isOfficer: false },
    { id: 'ABH', title: 'ABH - Aviation Boatswain\'s Mate (Aircraft Handling)', isOfficer: false },
    { id: 'AC', title: 'AC - Air Traffic Controller', isOfficer: false },
    { id: 'AD', title: 'AD - Aviation Machinist\'s Mate', isOfficer: false },
    { id: 'AE', title: 'AE - Aviation Electrician\'s Mate', isOfficer: false },
    { id: 'AF', title: 'AF - Aviation Photographer\'s Mate', isOfficer: false },
    { id: 'AG', title: 'AG - Aerographer\'s Mate', isOfficer: false },
    { id: 'AM', title: 'AM - Aviation Structural Mechanic', isOfficer: false },
    { id: 'AME', title: 'AME - Aviation Structural Mechanic (Safety Equipment)', isOfficer: false },
    { id: 'AO', title: 'AO - Aviation Ordnanceman', isOfficer: false },
    { id: 'AS', title: 'AS - Aviation Support Equipment Technician', isOfficer: false },
    { id: 'AT', title: 'AT - Aviation Electronics Technician', isOfficer: false },
    { id: 'AW', title: 'AW - Naval Aircrewman', isOfficer: false },
    { id: 'AZ', title: 'AZ - Aviation Maintenance Administrationman', isOfficer: false },

    // Engineering & Hull (Enlisted)
    { id: 'BM', title: 'BM - Boatswain\'s Mate', isOfficer: false },
    { id: 'BR', title: 'BR - Boiler Technician', isOfficer: false },
    { id: 'BU', title: 'BU - Builder', isOfficer: false },
    { id: 'CE', title: 'CE - Construction Electrician', isOfficer: false },
    { id: 'CM', title: 'CM - Construction Mechanic', isOfficer: false },
    { id: 'DC', title: 'DC - Damage Controlman', isOfficer: false },
    { id: 'EA', title: 'EA - Engineering Aid', isOfficer: false },
    { id: 'EM', title: 'EM - Electrician\'s Mate', isOfficer: false },
    { id: 'EN', title: 'EN - Engineman', isOfficer: false },
    { id: 'EO', title: 'EO - Equipment Operator', isOfficer: false },
    { id: 'ET', title: 'ET - Electronics Technician', isOfficer: false },
    { id: 'FC', title: 'FC - Fire Controlman', isOfficer: false },
    { id: 'FT', title: 'FT - Fire Control Technician', isOfficer: false },
    { id: 'GM', title: 'GM - Gunner\'s Mate', isOfficer: false },
    { id: 'GS', title: 'GS - Gas Turbine Systems Technician', isOfficer: false },
    { id: 'HT', title: 'HT - Hull Maintenance Technician', isOfficer: false },
    { id: 'IC', title: 'IC - Interior Communications Electrician', isOfficer: false },
    { id: 'MM', title: 'MM - Machinist\'s Mate', isOfficer: false },
    { id: 'MN', title: 'MN - Mineman', isOfficer: false },
    { id: 'MR', title: 'MR - Machinery Repairman', isOfficer: false },
    { id: 'MT', title: 'MT - Missile Technician', isOfficer: false },
    { id: 'OS', title: 'OS - Operations Specialist', isOfficer: false },
    { id: 'QM', title: 'QM - Quartermaster', isOfficer: false },
    { id: 'SW', title: 'SW - Steelworker', isOfficer: false },
    { id: 'UT', title: 'UT - Utilitiesman', isOfficer: false },

    // Nuclear Power (Enlisted)
    { id: 'MMN', title: 'MMN - Machinist\'s Mate (Nuclear)', isOfficer: false },
    { id: 'EMN', title: 'EMN - Electrician\'s Mate (Nuclear)', isOfficer: false },
    { id: 'ETN', title: 'ETN - Electronics Technician (Nuclear)', isOfficer: false },
    { id: 'ELT', title: 'ELT - Engineering Laboratory Technician', isOfficer: false },

    // Medical (Enlisted)
    { id: 'HM', title: 'HM - Hospital Corpsman', isOfficer: false },
    { id: 'HM-ATF', title: 'HM-ATF - Advanced Technical Field', isOfficer: false },
    { id: 'HM-SARC', title: 'HM-SARC - Special Amphibious Reconnaissance Corpsman', isOfficer: false },
    { id: 'HM-DMT', title: 'HM-DMT - Dive Medical Technician', isOfficer: false },
    { id: 'HM-SMT', title: 'HM-SMT - Special Operations Medical Technician', isOfficer: false },
    { id: 'DT', title: 'DT - Dental Technician', isOfficer: false },

    // Administrative & Technical (Enlisted)
    { id: 'CTI', title: 'CTI - Cryptologic Technician Interpretive', isOfficer: false },
    { id: 'CTM', title: 'CTM - Cryptologic Technician Maintenance', isOfficer: false },
    { id: 'CTN', title: 'CTN - Cryptologic Technician Networks', isOfficer: false },
    { id: 'CTR', title: 'CTR - Cryptologic Technician Collection', isOfficer: false },
    { id: 'CTT', title: 'CTT - Cryptologic Technician Technical', isOfficer: false },
    { id: 'IS', title: 'IS - Intelligence Specialist', isOfficer: false },
    { id: 'IT', title: 'IT - Information Systems Technician', isOfficer: false },
    { id: 'LN', title: 'LN - Legalman', isOfficer: false },
    { id: 'MA', title: 'MA - Master-at-Arms', isOfficer: false },
    { id: 'MC', title: 'MC - Mass Communication Specialist', isOfficer: false },
    { id: 'NC', title: 'NC - Navy Counselor', isOfficer: false },
    { id: 'PS', title: 'PS - Personnel Specialist', isOfficer: false },
    { id: 'RP', title: 'RP - Religious Program Specialist', isOfficer: false },
    { id: 'SH', title: 'SH - Ship\'s Serviceman', isOfficer: false },
    { id: 'YN', title: 'YN - Yeoman', isOfficer: false },

    // Supply & Logistics (Enlisted)
    { id: 'CS', title: 'CS - Culinary Specialist', isOfficer: false },
    { id: 'LS', title: 'LS - Logistics Specialist', isOfficer: false },
    { id: 'RS', title: 'RS - Retail Services Specialist', isOfficer: false },
    { id: 'SK', title: 'SK - Storekeeper', isOfficer: false },

    // Special Warfare/Operations (Enlisted)
    { id: 'EOD', title: 'EOD - Explosive Ordnance Disposal', isOfficer: false },
    { id: 'ND', title: 'ND - Navy Diver', isOfficer: false },
    { id: 'SB', title: 'SB - Special Warfare Boat Operator', isOfficer: false },
    { id: 'SO', title: 'SO - Special Warfare Operator', isOfficer: false },
    { id: 'SEAL', title: 'SEAL - Sea, Air, and Land', isOfficer: false },
    { id: 'SWCC', title: 'SWCC - Special Warfare Combatant-craft Crewmen', isOfficer: false },
    { id: 'AIRR', title: 'AIRR - Naval Aircrewman Rescue Swimmer', isOfficer: false }
  ],
  airForce: [
    // Officers
    { id: '11X', title: '11X - Pilot', isOfficer: true },
    { id: '12X', title: '12X - Combat Systems Officer', isOfficer: true },
    { id: '13X', title: '13X - Space Operations', isOfficer: true },
    { id: '14X', title: '14X - Intelligence', isOfficer: true },
    { id: '15X', title: '15X - Weather', isOfficer: true },
    { id: '17X', title: '17X - Cyberspace Operations', isOfficer: true },
    { id: '21X', title: '21X - Aircraft Maintenance', isOfficer: true },
    { id: '31P', title: '31P - Security Forces', isOfficer: true },
    { id: '38F', title: '38F - Force Support', isOfficer: true },
    { id: '61X', title: '61X - Scientific Research', isOfficer: true },
    { id: '62X', title: '62X - Developmental Engineering', isOfficer: true },
    { id: '63X', title: '63X - Acquisition', isOfficer: true },
    { id: '64X', title: '64X - Contracting', isOfficer: true },
    { id: '65X', title: '65X - Financial Management', isOfficer: true },

    // Operations (Enlisted)
    { id: '1A0X1', title: '1A0X1 - In-Flight Refueling', isOfficer: false },
    { id: '1A1X1', title: '1A1X1 - Flight Engineer', isOfficer: false },
    { id: '1A2X1', title: '1A2X1 - Aircraft Loadmaster', isOfficer: false },
    { id: '1A3X1', title: '1A3X1 - Airborne Mission Systems Specialist', isOfficer: false },
    { id: '1A4X1', title: '1A4X1 - Airborne Operations', isOfficer: false },
    { id: '1A6X1', title: '1A6X1 - Flight Attendant', isOfficer: false },
    { id: '1A8X1', title: '1A8X1 - Airborne Cryptologic Language Analyst', isOfficer: false },
    { id: '1A8X2', title: '1A8X2 - Airborne Intelligence, Surveillance, and Reconnaissance (ISR) Operator', isOfficer: false },
    { id: '1A9X1', title: '1A9X1 - Special Missions Aviation', isOfficer: false },

    // Maintenance (Enlisted)
    { id: '2A0X1', title: '2A0X1 - Avionics Test Station and Components', isOfficer: false },
    { id: '2A2X1', title: '2A2X1 - Special Operations Forces/Personnel Recovery (SOF/PR) Integrated Communication/Navigation/Mission Systems', isOfficer: false },
    { id: '2A3X3', title: '2A3X3 - Tactical Aircraft Maintenance', isOfficer: false },
    { id: '2A3X4', title: '2A3X4 - Fighter Aircraft Integrated Avionics', isOfficer: false },
    { id: '2A3X5', title: '2A3X5 - Advanced Fighter Aircraft Integrated Avionics', isOfficer: false },
    { id: '2A5X1', title: '2A5X1 - Airlift/Special Mission Aircraft Maintenance', isOfficer: false },
    { id: '2A5X2', title: '2A5X2 - Helicopter/Tiltrotor Aircraft Maintenance', isOfficer: false },
    { id: '2A5X4', title: '2A5X4 - Refuel/Bomber Aircraft Maintenance', isOfficer: false },
    { id: '2A6X1', title: '2A6X1 - Aerospace Propulsion', isOfficer: false },
    { id: '2A6X2', title: '2A6X2 - Aerospace Ground Equipment', isOfficer: false },
    { id: '2A6X3', title: '2A6X3 - Aircrew Egress Systems', isOfficer: false },
    { id: '2A6X4', title: '2A6X4 - Aircraft Fuel Systems', isOfficer: false },
    { id: '2A6X5', title: '2A6X5 - Aircraft Hydraulic Systems', isOfficer: false },
    { id: '2A6X6', title: '2A6X6 - Aircraft Electrical and Environmental Systems', isOfficer: false },
    { id: '2A7X1', title: '2A7X1 - Aircraft Metals Technology', isOfficer: false },
    { id: '2A7X2', title: '2A7X2 - Nondestructive Inspection', isOfficer: false },
    { id: '2A7X3', title: '2A7X3 - Aircraft Structural Maintenance', isOfficer: false },
    { id: '2A7X5', title: '2A7X5 - Low Observable Aircraft Structural Maintenance', isOfficer: false },
    { id: '2A8X1', title: '2A8X1 - Mobility Air Forces Integrated Communication/Navigation/Mission Systems', isOfficer: false },
    { id: '2A8X2', title: '2A8X2 - Mobility Air Forces Integrated Instrument and Flight Control Systems', isOfficer: false },
    { id: '2A9X1', title: '2A9X1 - Bomber/Special Integrated Communication/Navigation/Mission Systems', isOfficer: false },
    { id: '2A9X2', title: '2A9X2 - Bomber/Special Electronic Warfare and Radar Surveillance Integrated Avionics', isOfficer: false },
    { id: '2A9X3', title: '2A9X3 - Bomber/Special Electronic Warfare and Radar Surveillance Integrated Avionics', isOfficer: false },

    // Support (Enlisted)
    { id: '2F0X1', title: '2F0X1 - Fuels', isOfficer: false },
    { id: '2G0X1', title: '2G0X1 - Logistics Plans', isOfficer: false },
    { id: '2M0X1', title: '2M0X1 - Missile and Space Systems Electronic Maintenance', isOfficer: false },
    { id: '2M0X2', title: '2M0X2 - Missile and Space Systems Maintenance', isOfficer: false },
    { id: '2M0X3', title: '2M0X3 - Missile and Space Facilities', isOfficer: false },
    { id: '2P0X1', title: '2P0X1 - Precision Measurement Equipment Laboratory', isOfficer: false },
    { id: '2R0X1', title: '2R0X1 - Maintenance Management Analysis', isOfficer: false },
    { id: '2R1X1', title: '2R1X1 - Maintenance Management Production', isOfficer: false },
    { id: '2S0X1', title: '2S0X1 - Materiel Management', isOfficer: false },
    { id: '2T0X1', title: '2T0X1 - Traffic Management', isOfficer: false },
    { id: '2T1X1', title: '2T1X1 - Vehicle Operations', isOfficer: false },
    { id: '2T2X1', title: '2T2X1 - Air Transportation', isOfficer: false },
    { id: '2T3X1', title: '2T3X1 - Mission Generation Vehicular Equipment Maintenance', isOfficer: false },
    { id: '2T3X2', title: '2T3X2 - Special Vehicle Maintenance', isOfficer: false },
    { id: '2T3X7', title: '2T3X7 - Vehicle Management and Analysis', isOfficer: false },
    { id: '2W0X1', title: '2W0X1 - Munitions Systems', isOfficer: false },
    { id: '2W1X1', title: '2W1X1 - Aircraft Armament Systems', isOfficer: false },
    { id: '2W2X1', title: '2W2X1 - Nuclear Weapons', isOfficer: false },

    // Medical (Enlisted)
    { id: '4A0X1', title: '4A0X1 - Health Services Management', isOfficer: false },
    { id: '4A1X1', title: '4A1X1 - Medical Materiel', isOfficer: false },
    { id: '4A2X1', title: '4A2X1 - Biomedical Equipment', isOfficer: false },
    { id: '4B0X1', title: '4B0X1 - Bioenvironmental Engineering', isOfficer: false },
    { id: '4C0X1', title: '4C0X1 - Mental Health Service', isOfficer: false },
    { id: '4D0X1', title: '4D0X1 - Diet Therapy', isOfficer: false },
    { id: '4E0X1', title: '4E0X1 - Public Health', isOfficer: false },
    { id: '4H0X1', title: '4H0X1 - Cardiopulmonary Laboratory', isOfficer: false },
    { id: '4J0X2', title: '4J0X2 - Physical Medicine', isOfficer: false },
    { id: '4N0X1', title: '4N0X1 - Aerospace Medical Service', isOfficer: false },
    { id: '4P0X1', title: '4P0X1 - Pharmacy', isOfficer: false },
    { id: '4R0X1', title: '4R0X1 - Diagnostic Imaging', isOfficer: false },
    { id: '4T0X1', title: '4T0X1 - Medical Laboratory', isOfficer: false },
    { id: '4T0X2', title: '4T0X2 - Histopathology', isOfficer: false },
    { id: '4V0X1', title: '4V0X1 - Ophthalmic', isOfficer: false },
    { id: '4Y0X1', title: '4Y0X1 - Dental Assistant', isOfficer: false },
    { id: '4Y0X2', title: '4Y0X2 - Dental Laboratory', isOfficer: false }
  ],
  marines: [
    // Officers
    { id: '0102', title: '0102 - Ground Intelligence Officer', isOfficer: true },
    { id: '0180', title: '0180 - Adjutant', isOfficer: true },
    { id: '0202', title: '0202 - Intelligence Officer', isOfficer: true },
    { id: '0302', title: '0302 - Infantry Officer', isOfficer: true },
    { id: '0402', title: '0402 - Logistics Officer', isOfficer: true },
    { id: '0602', title: '0602 - Communications Officer', isOfficer: true },
    { id: '0802', title: '0802 - Field Artillery Officer', isOfficer: true },
    { id: '1302', title: '1302 - Combat Engineer Officer', isOfficer: true },
    { id: '1802', title: '1802 - Tank Officer', isOfficer: true },
    { id: '7502', title: '7502 - Aviation Ground Support Officer', isOfficer: true },
    { id: '7509', title: '7509 - Pilot', isOfficer: true },
    { id: '7563', title: '7563 - Air Traffic Controller Officer', isOfficer: true },

    // Infantry (Enlisted)
    { id: '0311', title: '0311 - Rifleman', isOfficer: false },
    { id: '0313', title: '0313 - LAV Crewman', isOfficer: false },
    { id: '0321', title: '0321 - Reconnaissance Marine', isOfficer: false },
    { id: '0331', title: '0331 - Machine Gunner', isOfficer: false },
    { id: '0341', title: '0341 - Mortarman', isOfficer: false },
    { id: '0351', title: '0351 - Infantry Assault Marine', isOfficer: false },
    { id: '0352', title: '0352 - Antitank Missile Gunner', isOfficer: false },
    { id: '0369', title: '0369 - Infantry Unit Leader', isOfficer: false },

    // Artillery (Enlisted)
    { id: '0811', title: '0811 - Field Artillery Cannoneer', isOfficer: false },
    { id: '0842', title: '0842 - Field Artillery Radar Operator', isOfficer: false },
    { id: '0844', title: '0844 - Field Artillery Fire Control Marine', isOfficer: false },
    { id: '0847', title: '0847 - Artillery Sensor Support Marine', isOfficer: false },
    { id: '0861', title: '0861 - Fire Support Marine', isOfficer: false },

    // Combat Engineering (Enlisted)
    { id: '1371', title: '1371 - Combat Engineer', isOfficer: false },
    { id: '1391', title: '1391 - Bulk Fuel Specialist', isOfficer: false },

    // Tank and Assault Amphibious Vehicle (Enlisted)
    { id: '1812', title: '1812 - M1A1 Tank Crewman', isOfficer: false },
    { id: '1833', title: '1833 - Assault Amphibious Vehicle (AAV) Crewmember', isOfficer: false },

    // Aviation (Enlisted)
    { id: '6042', title: '6042 - Individual Material Readiness List (IMRL) Asset Manager', isOfficer: false },
    { id: '6046', title: '6046 - Aviation Maintenance Administration Specialist', isOfficer: false },
    { id: '6048', title: '6048 - Flight Equipment Technician', isOfficer: false },
    { id: '6051', title: '6051 - Aviation Meteorological Equipment Technician', isOfficer: false },
    { id: '6111', title: '6111 - Helicopter/Tiltrotor Mechanic - Trainee', isOfficer: false },
    { id: '6112', title: '6112 - Helicopter Mechanic - CH-46', isOfficer: false },
    { id: '6113', title: '6113 - Helicopter Mechanic - CH-53', isOfficer: false },
    { id: '6114', title: '6114 - Helicopter Mechanic - UH-1', isOfficer: false },
    { id: '6116', title: '6116 - Tiltrotor Mechanic - MV-22', isOfficer: false },
    { id: '6122', title: '6122 - Helicopter Power Plants Mechanic - T58', isOfficer: false },
    { id: '6123', title: '6123 - Helicopter Power Plants Mechanic - T64', isOfficer: false },
    { id: '6124', title: '6124 - Helicopter Power Plants Mechanic - T400/T700', isOfficer: false },
    { id: '6132', title: '6132 - Helicopter/Tiltrotor Dynamic Components Mechanic', isOfficer: false },
    { id: '6152', title: '6152 - Helicopter Airframe Mechanic - CH-46', isOfficer: false },
    { id: '6153', title: '6153 - Helicopter Airframe Mechanic - CH-53', isOfficer: false },
    { id: '6154', title: '6154 - Helicopter Airframe Mechanic - UH-1', isOfficer: false },
    { id: '6156', title: '6156 - Tiltrotor Airframe Mechanic - MV-22', isOfficer: false },
    { id: '6172', title: '6172 - Helicopter Crew Chief - CH-46', isOfficer: false },
    { id: '6173', title: '6173 - Helicopter Crew Chief - CH-53', isOfficer: false },
    { id: '6174', title: '6174 - Helicopter Crew Chief - UH-1', isOfficer: false },
    { id: '6176', title: '6176 - Tiltrotor Crew Chief - MV-22', isOfficer: false },

    // Communications (Enlisted)
    { id: '0621', title: '0621 - Field Radio Operator', isOfficer: false },
    { id: '0627', title: '0627 - Ground Mobile Forces Satellite Transmissions System Operator', isOfficer: false },
    { id: '0631', title: '0631 - Network Administrator', isOfficer: false },
    { id: '0671', title: '0671 - Data Systems Administrator', isOfficer: false },
    { id: '0689', title: '0689 - Information Assurance Technician', isOfficer: false },

    // Intelligence (Enlisted)
    { id: '0231', title: '0231 - Intelligence Specialist', isOfficer: false },
    { id: '0241', title: '0241 - Imagery Analysis Specialist', isOfficer: false },
    { id: '0261', title: '0261 - Geographic Intelligence Specialist', isOfficer: false },
    { id: '0271', title: '0271 - Aviation Intelligence Specialist', isOfficer: false },

    // Logistics & Supply (Enlisted)
    { id: '0411', title: '0411 - Maintenance Management Specialist', isOfficer: false },
    { id: '0431', title: '0431 - Logistics/Embarkation Specialist', isOfficer: false },
    { id: '0481', title: '0481 - Landing Support Specialist', isOfficer: false },
    { id: '3051', title: '3051 - Warehouse Clerk', isOfficer: false },
    { id: '3052', title: '3052 - Packaging Specialist', isOfficer: false },

    // Motor Transport (Enlisted)
    { id: '3521', title: '3521 - Automotive Maintenance Technician', isOfficer: false },
    { id: '3531', title: '3531 - Motor Vehicle Operator', isOfficer: false },
    { id: '3537', title: '3537 - Motor Transport Operations Chief', isOfficer: false },

    // Military Police & Corrections (Enlisted)
    { id: '5811', title: '5811 - Military Police', isOfficer: false },
    { id: '5831', title: '5831 - Correctional Specialist', isOfficer: false },

    // Aircraft Maintenance (Enlisted)
    { id: '6217', title: '6217 - Fixed-Wing Aircraft Mechanic - F/A-18', isOfficer: false },
    { id: '6257', title: '6257 - Fixed-Wing Aircraft Airframe Mechanic - F/A-18', isOfficer: false },
    { id: '6287', title: '6287 - Fixed-Wing Aircraft Crew Chief - F/A-18', isOfficer: false },

    // Avionics (Enlisted)
    { id: '6317', title: '6317 - Aircraft Communications/Navigation/Radar Systems Technician - F/A-18', isOfficer: false },
    { id: '6337', title: '6337 - Aircraft Electronic Countermeasures Systems Technician - EA-6', isOfficer: false },
    { id: '6386', title: '6386 - Aircraft Electronic Countermeasures Systems Technician - F/A-18', isOfficer: false },

    // Ordnance (Enlisted)
    { id: '6531', title: '6531 - Aircraft Ordnance Technician', isOfficer: false },
    { id: '6541', title: '6541 - Aviation Ordnance Systems Technician', isOfficer: false },

    // Weather Services (Enlisted)
    { id: '6842', title: '6842 - Meteorological and Oceanographic (METOC) Analyst Forecaster', isOfficer: false },

    // Air Traffic Control (Enlisted)
    { id: '7251', title: '7251 - Air Traffic Controller', isOfficer: false },
    { id: '7257', title: '7257 - Air Traffic Controller - Tower', isOfficer: false },
    { id: '7236', title: '7236 - Tactical Air Defense Controller', isOfficer: false },

    // Aircraft Rescue & Firefighting (Enlisted)
    { id: '7051', title: '7051 - Aircraft Rescue and Firefighting Specialist', isOfficer: false }
  ],
  coastGuard: [
    // Officers
    { id: 'CWO-OPS', title: 'CWO - Operations Specialty', isOfficer: true },
    { id: 'CWO-ENG', title: 'CWO - Engineering Specialty', isOfficer: true },
    { id: 'CWO-COMMS', title: 'CWO - Communications Specialty', isOfficer: true },
    { id: 'CWO-CRYPTO', title: 'CWO - Cryptology Specialty', isOfficer: true },
    { id: 'CWO-ITMS', title: 'CWO - Information Technology/Management Specialty', isOfficer: true },
    { id: 'CWO-INTEL', title: 'CWO - Intelligence Systems Specialty', isOfficer: true },
    { id: 'CWO-MAT', title: 'CWO - Material Maintenance Specialty', isOfficer: true },
    { id: 'CWO-SEC', title: 'CWO - Security Specialty', isOfficer: true },
    { id: 'CWO-WEPS', title: 'CWO - Weapons Specialty', isOfficer: true },

    // Aviation & Operations
    { id: 'AMT', title: 'AMT - Aviation Maintenance Technician', isOfficer: false },
    { id: 'AET', title: 'AET - Avionics Electrical Technician', isOfficer: false },
    { id: 'AST', title: 'AST - Aviation Survival Technician', isOfficer: false },
    { id: 'OS', title: 'OS - Operations Specialist', isOfficer: false },

    // Deck & Weapons
    { id: 'BM', title: 'BM - Boatswain\'s Mate', isOfficer: false },
    { id: 'GM', title: 'GM - Gunner\'s Mate', isOfficer: false },
    { id: 'MK', title: 'MK - Machinery Technician', isOfficer: false },

    // Engineering & Hull
    { id: 'DC', title: 'DC - Damage Controlman', isOfficer: false },
    { id: 'EM', title: 'EM - Electrician\'s Mate', isOfficer: false },
    { id: 'ET', title: 'ET - Electronics Technician', isOfficer: false },
    { id: 'FT', title: 'FT - Fire Control Technician', isOfficer: false },

    // Administrative & Medical
    { id: 'HS', title: 'HS - Health Services Technician', isOfficer: false },
    { id: 'IT', title: 'IT - Information Systems Technician', isOfficer: false },
    { id: 'IV', title: 'IV - Investigator', isOfficer: false },
    { id: 'PA', title: 'PA - Public Affairs Specialist', isOfficer: false },
    { id: 'SK', title: 'SK - Storekeeper', isOfficer: false },
    { id: 'YN', title: 'YN - Yeoman', isOfficer: false },

    // Maritime Law Enforcement & Safety
    { id: 'ME', title: 'ME - Maritime Enforcement Specialist', isOfficer: false },
    { id: 'MST', title: 'MST - Marine Science Technician', isOfficer: false },
    { id: 'IS', title: 'IS - Intelligence Specialist', isOfficer: false },
    { id: 'CS', title: 'CS - Culinary Specialist', isOfficer: false },

    // Special Units & Teams
    { id: 'MSRT', title: 'MSRT - Maritime Security Response Team', isOfficer: false },
    { id: 'TACLET', title: 'TACLET - Tactical Law Enforcement Team', isOfficer: false },
    { id: 'PSU', title: 'PSU - Port Security Unit', isOfficer: false },
    { id: 'MSST', title: 'MSST - Maritime Safety and Security Team', isOfficer: false },
    { id: 'DSF', title: 'DSF - Deployable Specialized Forces', isOfficer: false },
    { id: 'HITRON', title: 'HITRON - Helicopter Interdiction Tactical Squadron', isOfficer: false },
    { id: 'PATFORSWA', title: 'PATFORSWA - Patrol Forces Southwest Asia', isOfficer: false },

    // Intelligence & Cyber
    { id: 'IT-C', title: 'IT-C - Information Technology - Cyber', isOfficer: false },
    { id: 'IT-I', title: 'IT-I - Information Technology - Information Assurance', isOfficer: false },
    { id: 'IT-N', title: 'IT-N - Information Technology - Network Specialist', isOfficer: false },
    { id: 'IS-I', title: 'IS-I - Intelligence Specialist - Imagery', isOfficer: false },
    { id: 'IS-C', title: 'IS-C - Intelligence Specialist - Cryptology', isOfficer: false }
  ],
  spaceForce: [
    // Officers
    { id: '13S', title: '13S - Space Operations Officer', isOfficer: true },
    { id: '14N', title: '14N - Intelligence Officer', isOfficer: true },
    { id: '17S', title: '17S - Cyberspace Operations Officer', isOfficer: true },
    { id: '62E', title: '62E - Developmental Engineer', isOfficer: true },
    { id: '63A', title: '63A - Acquisition Manager', isOfficer: true },

    // Space Operations (Enlisted)
    { id: '1C6', title: '1C6 - Space Systems Operations', isOfficer: false },
    { id: '1N0', title: '1N0 - All Source Intelligence Analyst', isOfficer: false },
    { id: '1N1', title: '1N1 - Geospatial Intelligence Analyst', isOfficer: false },
    { id: '1N2', title: '1N2 - Signals Intelligence Analyst', isOfficer: false },
    { id: '1N4', title: '1N4 - Fusion Analyst', isOfficer: false },

    // Cyber Operations (Enlisted)
    { id: '3D0', title: '3D0 - Cyberspace Operations', isOfficer: false },
    { id: '3D1', title: '3D1 - Client Systems', isOfficer: false },
    { id: '1B4', title: '1B4 - Cyber Warfare Operations', isOfficer: false },

    // Engineering (Enlisted)
    { id: '5C0', title: '5C0 - Space Systems Engineering', isOfficer: false },
    { id: '5C1', title: '5C1 - Space Systems Maintenance', isOfficer: false },

    // Command and Control (Enlisted)
    { id: '1C5', title: '1C5 - Command and Control Operations', isOfficer: false },
    { id: '1C6X1', title: '1C6X1 - Space Systems Operations', isOfficer: false },

    // Intelligence (Enlisted)
    { id: '1N0X1', title: '1N0X1 - Operations Intelligence', isOfficer: false },
    { id: '1N1X1', title: '1N1X1 - Geospatial Intelligence', isOfficer: false },
    { id: '1N2X1', title: '1N2X1 - Signals Intelligence Analysis', isOfficer: false },

    // Communications (Enlisted)
    { id: '3D1X1', title: '3D1X1 - Client Systems', isOfficer: false },
    { id: '3D1X2', title: '3D1X2 - Cyber Transport Systems', isOfficer: false },
    { id: '3D0X2', title: '3D0X2 - Cyber Systems Operations', isOfficer: false },
    { id: '3D0X3', title: '3D0X3 - Cyber Surety', isOfficer: false },

    // Acquisition and Engineering (Enlisted)
    { id: '2S0X1', title: '2S0X1 - Materiel Management', isOfficer: false },
    { id: '6C0X1', title: '6C0X1 - Contracting', isOfficer: false }
  ]
}; 