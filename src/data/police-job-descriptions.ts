// Police job descriptions with duties for different positions

interface PoliceJobDescription {
  duties: string[];
}

export const policeJobDescriptions: Record<string, PoliceJobDescription> = {
  // Patrol & General Duties
  'patrol-officer': {
    duties: [
      'Conducted routine patrols of assigned beat areas to maintain public safety',
      'Responded to emergency calls and non-emergency service requests',
      'Performed traffic stops and issued citations for violations',
      'Investigated minor crimes and prepared detailed incident reports',
      'Provided community policing services and built positive relationships with residents',
      'Enforced local, state, and federal laws within jurisdiction',
      'Maintained accurate records and documentation of all activities'
    ]
  },
  'community-officer': {
    duties: [
      'Developed and maintained positive relationships with community members',
      'Organized and participated in community outreach programs',
      'Addressed quality of life issues and neighborhood concerns',
      'Collaborated with local organizations and businesses on safety initiatives',
      'Conducted educational presentations on crime prevention',
      'Mediated disputes between community members',
      'Identified and addressed root causes of recurring problems'
    ]
  },
  'school-resource-officer': {
    duties: [
      'Maintained safety and security on school campus',
      'Built positive relationships with students, staff, and parents',
      'Investigated incidents occurring on school property',
      'Provided educational programs on law enforcement and safety',
      'Collaborated with school administrators on security matters',
      'Responded to emergencies and crisis situations',
      'Served as liaison between school and police department'
    ]
  },

  // Traffic
  'traffic-officer': {
    duties: [
      'Enforced traffic laws and regulations to ensure public safety',
      'Investigated traffic accidents and prepared detailed reports',
      'Conducted DUI checkpoints and field sobriety tests',
      'Managed traffic flow during special events and emergencies',
      'Educated the public on traffic safety through community programs',
      'Issued citations and warnings for traffic violations',
      'Testified in court regarding traffic-related cases'
    ]
  },
  'motorcycle-officer': {
    duties: [
      'Conducted high-visibility traffic enforcement on motorcycle patrol',
      'Responded rapidly to traffic incidents and emergencies',
      'Performed precision driving and pursuit operations',
      'Provided escort services for VIP motorcades and funeral processions',
      'Conducted specialized traffic enforcement in congested areas',
      'Maintained and operated specialized motorcycle equipment',
      'Participated in ceremonial and community events'
    ]
  },
  'dui-officer': {
    duties: [
      'Conducted DUI enforcement operations and checkpoints',
      'Performed standardized field sobriety tests and evaluations',
      'Operated and maintained breath analysis equipment',
      'Prepared detailed DUI reports and court documentation',
      'Testified as expert witness in DUI court proceedings',
      'Trained other officers in DUI detection techniques',
      'Collaborated with prosecutors on DUI case preparation'
    ]
  },

  // Investigations
  'detective': {
    duties: [
      'Investigated complex criminal cases including theft, fraud, and assault',
      'Conducted interviews with witnesses, victims, and suspects',
      'Collected and analyzed physical evidence from crime scenes',
      'Prepared comprehensive case files and court testimony',
      'Collaborated with other law enforcement agencies on multi-jurisdictional cases',
      'Executed search warrants and arrest warrants',
      'Maintained detailed case documentation and evidence chain of custody'
    ]
  },
  'homicide-detective': {
    duties: [
      'Investigated homicide cases and suspicious deaths',
      'Coordinated with medical examiners and forensic specialists',
      'Conducted extensive interviews with family members and witnesses',
      'Analyzed crime scene evidence and developed investigative leads',
      'Worked closely with prosecutors to build strong court cases',
      'Provided support and communication to victims\' families',
      'Maintained detailed case files and evidence documentation'
    ]
  },
  'robbery-detective': {
    duties: [
      'Investigated armed and unarmed robbery cases',
      'Analyzed crime patterns and suspect descriptions',
      'Coordinated with patrol units on active robbery investigations',
      'Conducted surveillance operations and stakeouts',
      'Interviewed victims, witnesses, and suspects',
      'Prepared cases for prosecution and testified in court',
      'Collaborated with other agencies on multi-jurisdictional cases'
    ]
  },
  'burglary-detective': {
    duties: [
      'Investigated residential and commercial burglary cases',
      'Processed crime scenes and collected physical evidence',
      'Analyzed burglary patterns and modus operandi',
      'Coordinated with crime scene investigators and forensic units',
      'Conducted follow-up investigations and suspect interviews',
      'Worked with pawn shops and second-hand dealers on stolen property',
      'Prepared comprehensive case reports and court testimony'
    ]
  },
  'fraud-detective': {
    duties: [
      'Investigated financial crimes including check fraud and embezzlement',
      'Analyzed financial records and transaction patterns',
      'Coordinated with banks and financial institutions',
      'Conducted complex interviews with suspects and victims',
      'Worked with federal agencies on large-scale fraud cases',
      'Prepared detailed financial analysis reports',
      'Testified as expert witness in financial crime cases'
    ]
  },
  'cyber-crimes-detective': {
    duties: [
      'Investigated computer-related crimes and cybercrime',
      'Analyzed digital evidence and electronic communications',
      'Conducted online undercover operations',
      'Coordinated with federal agencies on cyber investigations',
      'Maintained expertise in current technology and cyber threats',
      'Prepared technical reports and expert testimony',
      'Trained other officers in cyber crime investigation techniques'
    ]
  },
  'narcotics-detective': {
    duties: [
      'Investigated drug-related crimes and trafficking operations',
      'Conducted undercover operations and surveillance',
      'Developed and managed confidential informants',
      'Executed search warrants on suspected drug locations',
      'Collaborated with federal agencies on drug investigations',
      'Prepared cases for prosecution and testified in court',
      'Analyzed drug trends and patterns in the community'
    ]
  },
  'vice-detective': {
    duties: [
      'Investigated vice crimes including prostitution and gambling',
      'Conducted undercover operations in vice establishments',
      'Coordinated with regulatory agencies on licensing violations',
      'Developed intelligence on organized vice operations',
      'Prepared detailed surveillance reports and case documentation',
      'Worked with prosecutors on vice-related prosecutions',
      'Maintained expertise in vice laws and regulations'
    ]
  },
  'domestic-violence-detective': {
    duties: [
      'Investigated domestic violence cases and family disputes',
      'Conducted sensitive interviews with victims and children',
      'Coordinated with social services and victim advocacy groups',
      'Prepared protection orders and safety plans',
      'Provided crisis intervention and support services',
      'Testified in court on domestic violence cases',
      'Maintained specialized training in domestic violence investigation'
    ]
  },
  'juvenile-detective': {
    duties: [
      'Investigated crimes involving juvenile offenders and victims',
      'Conducted age-appropriate interviews with minors',
      'Coordinated with juvenile court and probation services',
      'Worked with schools and social services on intervention',
      'Prepared cases for juvenile court proceedings',
      'Provided education on juvenile crime prevention',
      'Maintained expertise in juvenile law and procedures'
    ]
  },
  'cold-case-detective': {
    duties: [
      'Investigated unsolved cases using new technology and techniques',
      'Reviewed and analyzed old case files and evidence',
      'Re-interviewed witnesses and family members',
      'Coordinated with forensic labs on DNA and evidence testing',
      'Utilized new investigative tools and databases',
      'Provided closure and updates to victims\' families',
      'Maintained detailed documentation of case progress'
    ]
  },

  // Tactical Units
  'swat-officer': {
    duties: [
      'Participated in high-risk tactical operations and warrant service',
      'Maintained specialized equipment and tactical gear',
      'Conducted regular training exercises and skill development',
      'Responded to hostage situations and barricaded subjects',
      'Provided security for high-profile events and dignitaries',
      'Collaborated with other specialized units and agencies',
      'Maintained physical fitness standards required for tactical operations'
    ]
  },
  'swat-sniper': {
    duties: [
      'Provided precision rifle support during tactical operations',
      'Conducted surveillance and intelligence gathering',
      'Maintained and operated specialized sniper equipment',
      'Participated in advanced marksmanship training',
      'Provided overwatch and security during high-risk operations',
      'Coordinated with tactical teams on target acquisition',
      'Maintained detailed logs of training and operations'
    ]
  },
  'swat-team-leader': {
    duties: [
      'Led tactical team operations and mission planning',
      'Coordinated with command staff on tactical deployments',
      'Supervised team training and skill development',
      'Evaluated team performance and operational effectiveness',
      'Maintained liaison with other specialized units',
      'Prepared operational reports and after-action reviews',
      'Ensured compliance with tactical policies and procedures'
    ]
  },
  'bomb-squad': {
    duties: [
      'Responded to bomb threats and suspicious device calls',
      'Conducted explosive device identification and disposal',
      'Operated specialized bomb disposal equipment and robots',
      'Provided training on explosive device recognition',
      'Coordinated with federal agencies on bomb investigations',
      'Maintained expertise in current explosive threats and devices',
      'Prepared detailed reports on explosive incidents'
    ]
  },

  // Specialized Units
  'k9-officer': {
    duties: [
      'Handled and trained police K-9 for drug detection and apprehension',
      'Conducted searches of vehicles, buildings, and open areas',
      'Responded to high-risk situations requiring K-9 assistance',
      'Maintained detailed records of K-9 training and deployments',
      'Participated in community demonstrations and educational programs',
      'Provided daily care and medical attention for K-9 partner',
      'Collaborated with handlers from other agencies on joint operations'
    ]
  },
  'crisis-negotiator': {
    duties: [
      'Negotiated with barricaded subjects and hostage takers',
      'Provided crisis intervention and de-escalation services',
      'Developed communication strategies for high-stress situations',
      'Coordinated with tactical teams during critical incidents',
      'Maintained specialized training in crisis negotiation techniques',
      'Provided post-incident counseling and support',
      'Prepared detailed reports on negotiation outcomes'
    ]
  },
  'undercover-officer': {
    duties: [
      'Conducted covert investigations and surveillance operations',
      'Developed and maintained undercover identities and personas',
      'Gathered intelligence on criminal organizations',
      'Coordinated with supervisors on undercover operations',
      'Maintained operational security and safety protocols',
      'Prepared detailed intelligence reports and case documentation',
      'Testified in court while protecting investigative methods'
    ]
  },

  // Training & Support
  'training-officer': {
    duties: [
      'Provided field training to new police officers',
      'Developed and implemented training curricula',
      'Evaluated trainee performance and provided feedback',
      'Conducted classroom instruction on police procedures',
      'Maintained training records and documentation',
      'Coordinated with academy instructors and supervisors',
      'Ensured compliance with state training requirements'
    ]
  },
  'police-instructor': {
    duties: [
      'Developed and delivered police academy training programs',
      'Instructed recruits in law enforcement procedures and techniques',
      'Evaluated student performance and progress',
      'Maintained current knowledge of law enforcement best practices',
      'Coordinated with field training officers on curriculum',
      'Prepared training materials and lesson plans',
      'Ensured compliance with state training standards'
    ]
  },
  'evidence-technician': {
    duties: [
      'Collected and processed physical evidence from crime scenes',
      'Maintained chain of custody for all evidence',
      'Operated and maintained evidence storage facilities',
      'Prepared evidence for court proceedings',
      'Coordinated with laboratories on evidence analysis',
      'Maintained detailed evidence logs and documentation',
      'Testified in court regarding evidence handling procedures'
    ]
  },
  'crime-scene-investigator': {
    duties: [
      'Processed crime scenes and collected physical evidence',
      'Photographed and documented crime scenes thoroughly',
      'Maintained chain of custody for all evidence collected',
      'Analyzed and interpreted physical evidence',
      'Prepared detailed reports and testified in court',
      'Coordinated with detectives and forensic laboratories',
      'Utilized specialized equipment for evidence collection and analysis'
    ]
  },
  'forensic-specialist': {
    duties: [
      'Analyzed physical evidence using scientific methods',
      'Operated specialized forensic equipment and instruments',
      'Prepared detailed forensic analysis reports',
      'Testified as expert witness in court proceedings',
      'Maintained laboratory quality control and standards',
      'Coordinated with investigators on evidence interpretation',
      'Stayed current with advances in forensic science'
    ]
  },

  // Communications
  'police-dispatcher': {
    duties: [
      'Received and processed emergency and non-emergency calls',
      'Dispatched appropriate units to calls for service',
      'Maintained radio communication with field units',
      'Operated computer-aided dispatch systems',
      'Coordinated with other agencies during multi-jurisdictional incidents',
      'Maintained detailed logs of all communications',
      'Provided emergency medical dispatch instructions'
    ]
  },
  'communications-supervisor': {
    duties: [
      'Supervised dispatch operations and personnel',
      'Coordinated major incident communications',
      'Maintained dispatch center equipment and systems',
      'Trained new dispatchers and communications personnel',
      'Evaluated dispatcher performance and procedures',
      'Coordinated with IT on communications technology',
      'Prepared reports on communications center operations'
    ]
  },

  // Administrative
  'records-clerk': {
    duties: [
      'Maintained and organized police department records',
      'Processed public records requests and releases',
      'Entered data into records management systems',
      'Prepared statistical reports and crime data analysis',
      'Coordinated with courts on case documentation',
      'Maintained confidentiality of sensitive information',
      'Assisted officers with records research and retrieval'
    ]
  },
  'property-evidence-clerk': {
    duties: [
      'Managed property and evidence storage facilities',
      'Processed incoming and outgoing evidence',
      'Maintained detailed inventory of all stored items',
      'Coordinated evidence releases to courts and laboratories',
      'Conducted regular audits of property and evidence',
      'Prepared items for disposal according to legal requirements',
      'Maintained security and access control for evidence areas'
    ]
  },

  // Community Relations
  'community-liaison': {
    duties: [
      'Served as primary contact between police and community groups',
      'Organized community meetings and public forums',
      'Addressed community concerns and complaints',
      'Coordinated community policing initiatives',
      'Developed partnerships with local organizations',
      'Provided crime prevention education and resources',
      'Facilitated communication between police and diverse communities'
    ]
  },
  'public-information-officer': {
    duties: [
      'Managed media relations and press communications',
      'Prepared and released official department statements',
      'Coordinated with media during major incidents',
      'Maintained department social media presence',
      'Prepared internal communications and newsletters',
      'Coordinated public education campaigns',
      'Served as department spokesperson for public events'
    ]
  },
  'crime-prevention-specialist': {
    duties: [
      'Developed and implemented crime prevention programs',
      'Conducted security assessments for businesses and residents',
      'Provided education on personal safety and security',
      'Organized neighborhood watch programs',
      'Analyzed crime patterns and trends for prevention strategies',
      'Coordinated with community groups on safety initiatives',
      'Prepared crime prevention materials and resources'
    ]
  },

  // Internal Affairs
  'internal-affairs-investigator': {
    duties: [
      'Investigated allegations of officer misconduct',
      'Conducted interviews with officers, witnesses, and complainants',
      'Reviewed body camera footage and other evidence',
      'Prepared detailed investigation reports and recommendations',
      'Maintained confidentiality of sensitive investigations',
      'Coordinated with prosecutors on criminal matters',
      'Ensured compliance with department policies and procedures'
    ]
  },
  'professional-standards': {
    duties: [
      'Monitored officer compliance with department standards',
      'Conducted policy reviews and updates',
      'Provided training on professional conduct and ethics',
      'Investigated minor policy violations',
      'Maintained early warning systems for officer performance',
      'Coordinated with training division on remedial training',
      'Prepared reports on department compliance and performance'
    ]
  },

  // Technology
  'it-specialist': {
    duties: [
      'Maintained and supported police department computer systems',
      'Provided technical support to officers and staff',
      'Managed network security and data protection',
      'Coordinated with vendors on technology procurement',
      'Trained personnel on new technology systems',
      'Maintained backup systems and disaster recovery procedures',
      'Prepared reports on technology needs and upgrades'
    ]
  },
  'digital-forensics': {
    duties: [
      'Analyzed digital evidence from computers and mobile devices',
      'Recovered deleted files and communications',
      'Prepared detailed forensic analysis reports',
      'Testified as expert witness in court proceedings',
      'Maintained specialized digital forensics equipment',
      'Coordinated with investigators on digital evidence',
      'Stayed current with advances in digital forensics technology'
    ]
  },
  'surveillance-specialist': {
    duties: [
      'Operated and maintained surveillance equipment',
      'Conducted covert surveillance operations',
      'Analyzed surveillance footage and intelligence',
      'Prepared detailed surveillance reports',
      'Coordinated with investigators on surveillance needs',
      'Maintained surveillance equipment and technology',
      'Provided training on surveillance techniques'
    ]
  },

  // Emergency Services
  'emergency-response-officer': {
    duties: [
      'Responded to natural disasters and emergency situations',
      'Coordinated with emergency management agencies',
      'Provided crowd control during emergencies',
      'Assisted with evacuations and emergency shelters',
      'Maintained emergency response equipment',
      'Participated in emergency preparedness planning',
      'Provided public safety during large-scale events'
    ]
  },
  'hazmat-officer': {
    duties: [
      'Responded to hazardous materials incidents',
      'Operated specialized hazmat detection equipment',
      'Coordinated with fire department and environmental agencies',
      'Conducted decontamination procedures',
      'Maintained hazmat response equipment and supplies',
      'Provided training on hazmat response procedures',
      'Prepared detailed incident reports and documentation'
    ]
  },
  'search-rescue': {
    duties: [
      'Conducted search and rescue operations for missing persons',
      'Operated specialized search equipment and technology',
      'Coordinated with volunteer search teams',
      'Provided wilderness and urban search capabilities',
      'Maintained search and rescue equipment',
      'Participated in multi-agency search operations',
      'Provided training on search and rescue techniques'
    ]
  },

  // Special Enforcement
  'gang-unit-officer': {
    duties: [
      'Investigated gang-related crimes and activities',
      'Developed intelligence on gang members and organizations',
      'Conducted surveillance of known gang locations',
      'Coordinated with other agencies on gang investigations',
      'Provided gang awareness training to officers',
      'Maintained database of gang members and activities',
      'Prepared cases for prosecution and testified in court'
    ]
  },
  'auto-theft-investigator': {
    duties: [
      'Investigated vehicle theft and related crimes',
      'Coordinated with auto theft task forces',
      'Worked with insurance companies on theft claims',
      'Conducted surveillance of chop shops and theft rings',
      'Maintained database of stolen vehicles and parts',
      'Coordinated vehicle recovery operations',
      'Prepared cases for prosecution and court testimony'
    ]
  },
  'organized-crime-investigator': {
    duties: [
      'Investigated organized crime groups and activities',
      'Developed long-term intelligence on criminal organizations',
      'Coordinated with federal agencies on organized crime cases',
      'Conducted complex surveillance and undercover operations',
      'Analyzed financial records and money laundering schemes',
      'Prepared comprehensive case files for prosecution',
      'Testified in court on organized crime cases'
    ]
  },
  'white-collar-investigator': {
    duties: [
      'Investigated white-collar crimes including fraud and embezzlement',
      'Analyzed complex financial records and transactions',
      'Coordinated with regulatory agencies and auditors',
      'Conducted interviews with corporate executives and employees',
      'Prepared detailed financial analysis reports',
      'Worked with prosecutors on complex financial cases',
      'Testified as expert witness in white-collar crime cases'
    ]
  },

  // Legal
  'court-liaison-officer': {
    duties: [
      'Coordinated with courts on case scheduling and procedures',
      'Served subpoenas and court documents',
      'Provided security for court proceedings',
      'Assisted attorneys with case preparation',
      'Maintained court appearance schedules for officers',
      'Coordinated witness availability for trials',
      'Prepared reports on court-related activities'
    ]
  },
  'warrant-officer': {
    duties: [
      'Served arrest warrants and court orders',
      'Conducted fugitive investigations and apprehensions',
      'Coordinated with other agencies on warrant service',
      'Maintained warrant databases and tracking systems',
      'Provided training on warrant service procedures',
      'Prepared detailed reports on warrant activities',
      'Ensured compliance with legal requirements for warrant service'
    ]
  },
  'civil-process-server': {
    duties: [
      'Served civil court documents and legal papers',
      'Attempted service on difficult-to-locate individuals',
      'Maintained detailed records of service attempts',
      'Coordinated with attorneys and court personnel',
      'Provided testimony on service of process',
      'Ensured compliance with legal requirements for service',
      'Prepared affidavits of service and court documentation'
    ]
  },

  // Transportation & Security
  'airport-security-officer': {
    duties: [
      'Provided law enforcement services at airport facilities',
      'Coordinated with TSA and federal security agencies',
      'Investigated crimes occurring on airport property',
      'Provided VIP protection and escort services',
      'Maintained security for aircraft and passengers',
      'Responded to security threats and emergencies',
      'Coordinated with airlines on security matters'
    ]
  },
  'transit-police-officer': {
    duties: [
      'Provided law enforcement on public transportation systems',
      'Investigated crimes occurring on transit property',
      'Conducted fare enforcement and quality of life enforcement',
      'Provided emergency response on transit systems',
      'Coordinated with transit operators on security matters',
      'Maintained visibility and deterrent presence',
      'Prepared reports on transit-related incidents'
    ]
  },
  'harbor-patrol-officer': {
    duties: [
      'Provided law enforcement on waterways and marine facilities',
      'Conducted marine safety inspections and enforcement',
      'Investigated marine accidents and incidents',
      'Provided search and rescue capabilities on water',
      'Coordinated with Coast Guard and marine agencies',
      'Maintained marine patrol vessels and equipment',
      'Enforced boating laws and regulations'
    ]
  },

  // Command Positions
  'watch-commander': {
    duties: [
      'Supervised patrol operations during assigned shift',
      'Coordinated response to major incidents and emergencies',
      'Made tactical decisions on resource deployment',
      'Reviewed and approved officer reports and actions',
      'Maintained communication with other shifts and units',
      'Provided guidance and support to patrol officers',
      'Prepared shift reports and briefings'
    ]
  },
  'shift-supervisor': {
    duties: [
      'Supervised officers and operations during assigned shift',
      'Responded to high-priority calls and critical incidents',
      'Conducted performance evaluations and counseling',
      'Ensured compliance with department policies and procedures',
      'Coordinated with other supervisors and command staff',
      'Provided training and mentoring to subordinate officers',
      'Prepared administrative reports and documentation'
    ]
  },
  'patrol-supervisor': {
    duties: [
      'Supervised patrol officers and daily operations',
      'Reviewed incident reports and officer performance',
      'Provided field supervision and guidance',
      'Coordinated with detectives on follow-up investigations',
      'Ensured proper deployment of patrol resources',
      'Conducted roll call briefings and training',
      'Prepared performance evaluations and disciplinary actions'
    ]
  },
  'detective-supervisor': {
    duties: [
      'Supervised detective operations and investigations',
      'Reviewed case files and investigation progress',
      'Coordinated with prosecutors on case development',
      'Assigned cases and managed detective workloads',
      'Provided guidance on complex investigations',
      'Ensured compliance with investigative procedures',
      'Prepared reports on investigative activities and outcomes'
    ]
  },
  'unit-commander': {
    duties: [
      'Commanded specialized unit operations and personnel',
      'Developed unit policies and operational procedures',
      'Coordinated with other units and agencies',
      'Managed unit budget and resource allocation',
      'Provided strategic planning and direction',
      'Evaluated unit performance and effectiveness',
      'Prepared reports for command staff and administration'
    ]
  }
};