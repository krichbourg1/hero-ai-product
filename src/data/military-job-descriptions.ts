interface JobDescription {
  duties: string[];
}

interface BranchJobDescriptions {
  [key: string]: JobDescription;
}

interface MilitaryJobDescriptions {
  navy: BranchJobDescriptions;
  army: BranchJobDescriptions;
  airForce: BranchJobDescriptions;
  marines: BranchJobDescriptions;
  coastGuard: BranchJobDescriptions;
  spaceForce: BranchJobDescriptions;
}

export const militaryJobDescriptions: MilitaryJobDescriptions = {
  navy: {
    // Aviation Boatswain's Mate (AB)
    'AB': {
      duties: [
        'Directed and coordinated aircraft launch and recovery operations on flight deck, ensuring safe and efficient operations',
        'Supervised a team of 15 personnel in the maintenance and operation of catapults, arresting gear, and visual landing aids',
        'Conducted daily equipment inspections and preventive maintenance on aviation fueling systems',
        'Maintained accurate logs and records of all flight deck operations and equipment maintenance'
      ]
    },
    // Aviation Electronics Technician (AT)
    'AT': {
      duties: [
        'Performed maintenance and repair of complex aviation electronic systems and equipment',
        'Conducted diagnostic testing using advanced electronic test equipment and technical documentation',
        'Installed and calibrated new aviation electronic systems according to specifications',
        'Trained junior technicians in troubleshooting procedures and safety protocols'
      ]
    },
    // Machinist's Mate Nuclear (MMN)
    'MMN': {
      duties: [
        'Operated and maintained nuclear propulsion plant machinery and auxiliary equipment',
        'Conducted complex maintenance procedures on steam turbines, generators, and reactor control systems',
        'Monitored nuclear plant parameters and performed necessary adjustments to maintain optimal performance',
        'Ensured compliance with all nuclear safety protocols and radiation control procedures'
      ]
    },
    // Hospital Corpsman (HM)
    'HM': {
      duties: [
        'Provided emergency medical care and treatment to military personnel and their families',
        'Assisted medical officers in patient examinations, surgical procedures, and medical treatments',
        'Maintained medical records and prepared reports on treatments, medications, and patient status',
        'Conducted health and wellness education programs for military personnel'
      ]
    },
    // Aviation Machinist's Mate (AD)
    'AD': {
      duties: [
        'Performed maintenance and repair on aircraft engines, propellers, and related systems',
        'Conducted operational tests and troubleshooting of aircraft power plant systems',
        'Documented maintenance actions and maintained detailed service records',
        'Coordinated with other aviation ratings to ensure aircraft readiness'
      ]
    },
    // Fire Controlman (FC)
    'FC': {
      duties: [
        'Operated and maintained advanced combat systems and weapons control equipment',
        'Performed complex troubleshooting on radar systems, digital computers, and missile launchers',
        'Conducted weapons system alignment and calibration procedures',
        'Trained personnel in combat systems operation and maintenance procedures'
      ]
    },
    // Electronics Technician (ET)
    'ET': {
      duties: [
        'Maintained and repaired electronic equipment including communications, radar, and navigation systems',
        'Performed complex troubleshooting using electronic test equipment and technical documentation',
        'Conducted preventive maintenance on shipboard electronic systems',
        'Provided technical training to junior personnel on electronic equipment operation'
      ]
    },
    // Gunner's Mate (GM)
    'GM': {
      duties: [
        'Operated and maintained shipboard weapon systems and small arms',
        'Conducted weapons training and qualification courses for ships crew',
        'Performed maintenance on gun mounts, missile launchers, and ammunition handling equipment',
        'Managed weapons inventory and maintained armory security'
      ]
    },
    // Information Systems Technician (IT)
    'IT': {
      duties: [
        'Maintained shipboard computer networks and communication systems',
        'Administered network security protocols and user access controls',
        'Troubleshot hardware and software issues across multiple platforms',
        'Managed information security and cybersecurity compliance'
      ]
    },
    // Yeoman (YN)
    'YN': {
      duties: [
        'Managed administrative functions and office operations',
        'Processed personnel actions and maintained service records',
        'Prepared official correspondence and naval messages',
        'Coordinated travel arrangements and maintained command calendars'
      ]
    },
    // Logistics Specialist (LS)
    'LS': {
      duties: [
        'Managed inventory control and supply chain operations',
        'Processed requisitions and tracked shipment status',
        'Conducted financial management and budget tracking',
        'Maintained logistics databases and prepared supply reports'
      ]
    },
    // Construction Mechanic (CM)
    'CM': {
      duties: [
        'Repaired and maintained construction and automotive equipment',
        'Performed preventive maintenance on heavy machinery',
        'Diagnosed mechanical problems using diagnostic equipment',
        'Maintained repair records and parts inventory'
      ]
    },
    // OFFICER RATES
    // Limited Duty Officer (LDO)
    'LDO': {
      duties: [
        'Led specialized technical departments and supervised enlisted personnel in complex operations',
        'Developed and implemented technical procedures and training programs for advanced systems',
        'Coordinated with senior leadership on strategic planning and resource allocation',
        'Mentored junior officers and provided technical expertise for mission-critical operations'
      ]
    },
    // Chief Warrant Officer (CWO)
    'CWO': {
      duties: [
        'Provided technical leadership and expertise in specialized warfare areas',
        'Managed complex technical systems and supervised maintenance operations',
        'Developed training curricula and conducted advanced technical instruction',
        'Advised commanding officers on technical matters and operational capabilities'
      ]
    },
    // Unrestricted Line Officer (URL)
    'URL': {
      duties: [
        'Commanded naval vessels and led combat operations in maritime environments',
        'Managed ship operations including navigation, weapons systems, and crew coordination',
        'Developed tactical plans and executed complex naval missions',
        'Supervised department heads and ensured operational readiness of all ship systems'
      ]
    },
    // Restricted Line Officer (RL)
    'RL': {
      duties: [
        'Led specialized technical departments in aviation, intelligence, or engineering fields',
        'Managed complex technical programs and coordinated with multiple departments',
        'Developed operational procedures and safety protocols for specialized equipment',
        'Provided technical expertise and strategic planning for mission-critical operations'
      ]
    },
    // Supply Corps Officer (SC)
    'SC': {
      duties: [
        'Managed logistics operations and supply chain management for naval units',
        'Coordinated procurement activities and maintained inventory control systems',
        'Developed budget plans and managed financial resources for operational requirements',
        'Led supply department personnel and ensured compliance with procurement regulations'
      ]
    },
    // Medical Corps Officer (MC)
    'MC': {
      duties: [
        'Provided comprehensive medical care and treatment to naval personnel and families',
        'Led medical departments and supervised healthcare delivery in military environments',
        'Developed medical protocols and emergency response procedures for shipboard operations',
        'Coordinated with other medical professionals to ensure optimal patient care and outcomes'
      ]
    },
    // Dental Corps Officer (DC)
    'DC': {
      duties: [
        'Provided comprehensive dental care and oral health services to military personnel',
        'Managed dental clinics and supervised dental technicians and support staff',
        'Developed preventive dental health programs and conducted oral health education',
        'Coordinated emergency dental care and maintained dental readiness standards'
      ]
    },
    // Nurse Corps Officer (NC)
    'NC': {
      duties: [
        'Provided advanced nursing care in military medical facilities and field environments',
        'Led nursing teams and managed patient care coordination across multiple departments',
        'Developed nursing protocols and quality improvement initiatives for patient safety',
        'Trained and mentored junior nursing staff in military healthcare procedures'
      ]
    },
    // Judge Advocate General Corps Officer (JAG)
    'JAG': {
      duties: [
        'Provided legal counsel and representation for military personnel and command staff',
        'Conducted military justice proceedings and advised on legal matters',
        'Developed legal policies and procedures for compliance with military regulations',
        'Managed legal offices and supervised paralegal staff in complex legal operations'
      ]
    },
    // Medical Service Corps Officer (MSC)
    'MSC': {
      duties: [
        'Managed healthcare administration and medical support services for military facilities',
        'Coordinated medical logistics and healthcare technology implementation',
        'Developed healthcare policies and quality assurance programs',
        'Led interdisciplinary teams in healthcare delivery and medical research initiatives'
      ]
    },
    // Civil Engineer Corps Officer (CEC)
    'CEC': {
      duties: [
        'Managed construction projects and infrastructure development for naval facilities',
        'Led engineering teams in design and implementation of complex construction projects',
        'Coordinated with contractors and government agencies on facility improvements',
        'Developed engineering standards and supervised maintenance of critical infrastructure'
      ]
    },
    // Intelligence Officer (INTEL-O)
    'INTEL-O': {
      duties: [
        'Analyzed intelligence data and prepared strategic assessments for command decision-making',
        'Led intelligence teams and coordinated collection operations across multiple platforms',
        'Developed intelligence products and briefed senior leadership on threat assessments',
        'Managed classified information systems and ensured compliance with security protocols'
      ]
    },
    // Naval Flight Officer (NFO)
    'NFO': {
      duties: [
        'Operated advanced aircraft systems and weapons platforms in combat and training missions',
        'Coordinated tactical operations and provided navigation support for flight operations',
        'Managed aircraft sensors and communication systems during complex missions',
        'Trained and mentored junior aircrew in advanced tactical procedures and safety protocols'
      ]
    },
    // Naval Aviator (PILOT)
    'PILOT': {
      duties: [
        'Piloted military aircraft in combat, training, and support missions',
        'Led flight operations and coordinated with air traffic control and mission commanders',
        'Conducted pre-flight planning and post-flight debriefings for mission effectiveness',
        'Trained junior pilots and maintained proficiency in advanced flight procedures'
      ]
    },
    // Surface Warfare Officer (SWO)
    'SWO': {
      duties: [
        'Led surface ship operations and managed complex naval warfare systems',
        'Coordinated tactical operations and supervised department heads in ship operations',
        'Developed operational plans and executed surface warfare missions',
        'Managed ship navigation, weapons systems, and crew training for combat readiness'
      ]
    },
    // Submarine Officer (SUB)
    'SUB': {
      duties: [
        'Led submarine operations and managed underwater warfare systems',
        'Coordinated stealth operations and supervised complex submarine systems',
        'Developed tactical plans for underwater missions and strategic operations',
        'Managed nuclear propulsion systems and ensured submarine safety protocols'
      ]
    },
    // Explosive Ordnance Disposal Officer (EOD-O)
    'EOD-O': {
      duties: [
        'Led explosive ordnance disposal operations and managed EOD teams',
        'Coordinated bomb disposal missions and provided technical expertise on explosive devices',
        'Developed EOD procedures and trained personnel in explosive hazard mitigation',
        'Managed EOD equipment and ensured compliance with safety protocols'
      ]
    },
    // Naval Special Warfare Officer (SEAL-O)
    'SEAL-O': {
      duties: [
        'Led special operations missions and commanded SEAL teams in combat environments',
        'Coordinated complex tactical operations and provided strategic planning for special missions',
        'Developed training programs and maintained elite physical and tactical standards',
        'Managed special operations equipment and ensured team readiness for high-risk missions'
      ]
    },
    // SEAL - Sea, Air, and Land (Enlisted)
    'SEAL': {
      duties: [
        'Conducted special operations missions including direct action, special reconnaissance, and counter-terrorism operations',
        'Performed high-risk combat operations in maritime, air, and land environments',
        'Operated advanced weapons systems and specialized equipment for special warfare missions',
        'Maintained peak physical condition and tactical proficiency through rigorous training programs'
      ]
    },
    // Explosive Ordnance Disposal (EOD)
    'EOD': {
      duties: [
        'Identified and disposed of explosive hazards and ordnance in maritime and land environments',
        'Conducted post-blast analysis and evidence collection for forensic investigations',
        'Performed render-safe procedures on various explosive devices and improvised explosive devices',
        'Provided EOD support for VIP protection, special events, and military operations'
      ]
    },
    // Navy Diver (ND)
    'ND': {
      duties: [
        'Performed underwater salvage operations and diving missions in support of naval operations',
        'Conducted underwater construction, repair, and maintenance of ships and underwater structures',
        'Operated diving equipment and maintained diving systems for safe underwater operations',
        'Provided underwater search and recovery capabilities for military and humanitarian missions'
      ]
    },
    // Special Warfare Boat Operator (SB)
    'SB': {
      duties: [
        'Operated specialized watercraft for special operations missions and maritime security',
        'Conducted high-speed boat operations in support of SEAL and special warfare teams',
        'Maintained and operated advanced navigation and communication systems on special operations craft',
        'Provided maritime transportation and support for special operations forces'
      ]
    },
    // Special Warfare Operator (SO)
    'SO': {
      duties: [
        'Conducted special operations missions including direct action and special reconnaissance',
        'Performed high-risk combat operations in maritime and land environments',
        'Operated advanced weapons systems and specialized equipment for special warfare missions',
        'Maintained peak physical condition and tactical proficiency through rigorous training programs'
      ]
    },
    // Special Warfare Combatant-craft Crewmen (SWCC)
    'SWCC': {
      duties: [
        'Operated and maintained special operations craft for maritime missions',
        'Conducted high-speed boat operations and maritime interdiction operations',
        'Provided tactical support and transportation for special operations forces',
        'Maintained proficiency in advanced maritime navigation and combat tactics'
      ]
    },
    // Aviation Boatswain's Mate (Launching & Recovery) (ABE)
    'ABE': {
      duties: [
        'Operated and maintained catapults and arresting gear for aircraft launch and recovery',
        'Performed inspections and repairs on hydraulic and mechanical systems',
        'Ensured safety protocols during flight deck operations',
        'Trained personnel in launch and recovery procedures'
      ]
    },
    // Aviation Boatswain's Mate (Fuels) (ABF)
    'ABF': {
      duties: [
        'Managed fueling and defueling operations for carrier-based aircraft',
        'Maintained aviation fuel systems and storage facilities',
        'Conducted fuel quality testing and safety checks',
        'Supervised fuel handling teams on the flight deck'
      ]
    },
    // Aviation Boatswain's Mate (Aircraft Handling) (ABH)
    'ABH': {
      duties: [
        'Directed movement and parking of aircraft on carrier decks and hangars',
        'Operated aircraft handling equipment and firefighting gear',
        'Ensured safe aircraft operations during launch and recovery',
        'Trained crew in aircraft handling and emergency procedures'
      ]
    },
    // Air Traffic Controller (AC)
    'AC': {
      duties: [
        'Controlled and directed aircraft movements on runways and in airspace',
        'Coordinated takeoffs, landings, and flight plans',
        'Monitored radar and communication systems',
        'Ensured safety and efficiency of air operations'
      ]
    },
    // Aviation Electrician's Mate (AE)
    'AE': {
      duties: [
        'Maintained and repaired aircraft electrical systems',
        'Troubleshot wiring, lighting, and power distribution issues',
        'Performed inspections and preventive maintenance',
        'Documented repairs and system upgrades'
      ]
    },
    // Aviation Photographer's Mate (AF)
    'AF': {
      duties: [
        'Captured and processed aerial and ground photographs for military operations',
        'Maintained photographic equipment and digital imaging systems',
        'Supported reconnaissance and intelligence missions',
        'Archived and cataloged photographic records'
      ]
    },
    // Aerographer's Mate (AG)
    'AG': {
      duties: [
        'Collected and analyzed meteorological and oceanographic data',
        'Prepared weather forecasts and briefings for flight operations',
        'Operated weather monitoring instruments',
        'Supported mission planning with environmental data'
      ]
    },
    // Aviation Structural Mechanic (AM)
    'AM': {
      duties: [
        'Repaired and maintained aircraft structural components',
        'Performed sheet metal work and corrosion control',
        'Inspected and tested hydraulic and pneumatic systems',
        'Ensured airworthiness of aircraft structures'
      ]
    },
    // Aviation Structural Mechanic (Safety Equipment) (AME)
    'AME': {
      duties: [
        'Maintained and repaired aircraft safety and survival equipment',
        'Inspected ejection seats, oxygen systems, and fire extinguishers',
        'Ensured compliance with safety regulations',
        'Trained aircrew in use of survival equipment'
      ]
    },
    // Aviation Ordnanceman (AO)
    'AO': {
      duties: [
        'Handled, maintained, and loaded aircraft ordnance and munitions',
        'Inspected and tested bomb racks, missile launchers, and gun systems',
        'Ensured safe storage and transport of explosives',
        'Trained personnel in ordnance handling procedures'
      ]
    },
    // Aviation Support Equipment Technician (AS)
    'AS': {
      duties: [
        'Maintained and repaired aviation ground support equipment',
        'Troubleshot electrical and hydraulic systems on support vehicles',
        'Performed preventive maintenance and safety checks',
        'Documented equipment repairs and upgrades'
      ]
    },
    // Naval Aircrewman (AW)
    'AW': {
      duties: [
        'Operated aircraft systems during flight missions',
        'Conducted search and rescue, anti-submarine, and surveillance operations',
        'Maintained aircrew equipment and performed in-flight troubleshooting',
        'Trained in emergency procedures and survival skills'
      ]
    },
    // Aviation Maintenance Administrationman (AZ)
    'AZ': {
      duties: [
        'Managed aircraft maintenance records and technical publications',
        'Scheduled and tracked maintenance actions',
        'Coordinated logistics for parts and supplies',
        'Supported maintenance planning and reporting'
      ]
    },
    // Boatswain's Mate (BM)
    'BM': {
      duties: [
        'Directed shipboard seamanship operations including anchoring and mooring',
        'Maintained deck equipment and supervised line handling',
        'Trained crew in shipboard safety and emergency procedures',
        'Conducted underway replenishment and small boat operations'
      ]
    },
    // Boiler Technician (BR)
    'BR': {
      duties: [
        'Operated and maintained shipboard boilers and steam systems',
        'Performed water chemistry tests and boiler inspections',
        'Repaired and replaced boiler components',
        'Ensured safe operation of propulsion systems'
      ]
    },
    // Builder (BU)
    'BU': {
      duties: [
        'Constructed and repaired buildings, bridges, and other structures',
        'Operated carpentry and masonry tools',
        'Read and interpreted construction blueprints',
        'Supervised construction teams on projects'
      ]
    },
    // Construction Electrician (CE)
    'CE': {
      duties: [
        'Installed and maintained electrical wiring and systems in facilities',
        'Troubleshot electrical faults and performed repairs',
        'Ensured compliance with electrical codes and safety standards',
        'Supported construction projects with electrical expertise'
      ]
    },
    // Damage Controlman (DC-DAMAGE)
    'DC-DAMAGE': {
      duties: [
        'Maintained shipboard firefighting and damage control equipment',
        'Trained crew in emergency response and repair procedures',
        'Repaired watertight fittings and hull breaches',
        'Conducted fire drills and safety inspections'
      ]
    },
    // Engineering Aid (EA)
    'EA': {
      duties: [
        'Assisted in surveying, drafting, and construction planning',
        'Prepared maps, charts, and blueprints for engineering projects',
        'Conducted soil and material testing',
        'Supported project management and quality control'
      ]
    },
    // Electrician's Mate (EM)
    'EM': {
      duties: [
        'Installed, maintained, and repaired shipboard electrical systems',
        'Troubleshot power distribution and lighting circuits',
        'Performed preventive maintenance on electrical equipment',
        'Ensured electrical safety and compliance'
      ]
    },
    // Engineman (EN)
    'EN': {
      duties: [
        'Operated and maintained diesel engines and auxiliary machinery',
        'Performed repairs on propulsion and power generation systems',
        'Monitored engine performance and conducted inspections',
        'Maintained engine room logs and records'
      ]
    },
    // Equipment Operator (EO)
    'EO': {
      duties: [
        'Operated heavy construction equipment for building and repair projects',
        'Performed preventive maintenance on vehicles and machinery',
        'Assisted in earthmoving, grading, and excavation operations',
        'Ensured safe operation of all equipment'
      ]
    },
    // Electronics Technician (Nuclear) (ETN)
    'ETN': {
      duties: [
        'Maintained and repaired nuclear propulsion plant electronic systems',
        'Troubleshot reactor instrumentation and control circuits',
        'Performed preventive maintenance on nuclear electronics',
        'Ensured compliance with nuclear safety standards'
      ]
    },
    // Engineering Laboratory Technician (ELT)
    'ELT': {
      duties: [
        'Conducted chemical and radiological analysis in nuclear propulsion plants',
        'Maintained laboratory equipment and performed water chemistry tests',
        'Monitored radiation levels and ensured safety compliance',
        'Supported nuclear plant operations with technical expertise'
      ]
    },
    // Electrician's Mate (Nuclear) (EMN)
    'EMN': {
      duties: [
        'Operated and maintained nuclear propulsion electrical systems',
        'Troubleshot and repaired reactor electrical circuits',
        'Performed preventive maintenance on nuclear electrical equipment',
        'Ensured safe operation of nuclear power systems'
      ]
    },
    // Fire Control Technician (FT)
    'FT': {
      duties: [
        'Operated and maintained submarine fire control and weapons systems',
        'Troubleshot digital and analog fire control equipment',
        'Conducted system tests and calibrations',
        'Supported submarine combat operations'
      ]
    },
    // Gas Turbine Systems Technician (GS)
    'GS': {
      duties: [
        'Operated and maintained gas turbine engines and propulsion systems',
        'Performed inspections and repairs on turbine components',
        'Monitored engine performance and conducted preventive maintenance',
        'Ensured safe and efficient operation of propulsion systems'
      ]
    },
    // Hull Maintenance Technician (HT)
    'HT': {
      duties: [
        'Repaired and maintained shipboard structures and piping systems',
        'Performed welding, brazing, and metal fabrication',
        'Inspected and tested hull integrity',
        'Supported shipboard damage control efforts'
      ]
    },
    // Interior Communications Electrician (IC)
    'IC': {
      duties: [
        'Installed and maintained shipboard communication and alarm systems',
        'Troubleshot audio, video, and control circuits',
        'Performed preventive maintenance on interior communications equipment',
        'Ensured operational readiness of communication systems'
      ]
    },
    // Machinist's Mate (MM)
    'MM': {
      duties: [
        'Operated and maintained shipboard engines and auxiliary machinery',
        'Performed repairs on pumps, compressors, and steam turbines',
        'Monitored system performance and conducted preventive maintenance',
        'Maintained engineering logs and records'
      ]
    },
    // Mineman (MN)
    'MN': {
      duties: [
        'Maintained and operated underwater mines and mine countermeasure systems',
        'Conducted mine assembly, testing, and deployment',
        'Performed preventive maintenance on mine warfare equipment',
        'Supported mine clearance and detection operations'
      ]
    },
    // Machinery Repairman (MR)
    'MR': {
      duties: [
        'Operated machine tools to fabricate and repair metal parts',
        'Performed precision machining and fitting of components',
        'Maintained shop equipment and tools',
        'Supported shipboard repair and maintenance operations'
      ]
    },
    // Missile Technician (MT)
    'MT': {
      duties: [
        'Maintained and repaired submarine-launched ballistic missile systems',
        'Troubleshot guidance, control, and launch equipment',
        'Performed system tests and calibrations',
        'Ensured security and readiness of missile systems'
      ]
    },
    // Operations Specialist (OS)
    'OS': {
      duties: [
        'Operated radar, navigation, and communication systems',
        'Monitored ship movements and coordinated tactical operations',
        'Maintained operational logs and plotted ship positions',
        'Supported mission planning and execution'
      ]
    },
    // Quartermaster (QM)
    'QM': {
      duties: [
        'Assisted in ship navigation and piloting',
        'Maintained navigational charts and equipment',
        'Plotted courses and monitored ship positions',
        'Supported bridge operations and watchstanding'
      ]
    },
    // Steelworker (SW)
    'SW': {
      duties: [
        'Fabricated and erected steel structures for construction projects',
        'Performed welding, cutting, and metalworking tasks',
        'Read and interpreted blueprints and construction plans',
        'Ensured structural integrity and safety compliance'
      ]
    },
    // Utilitiesman (UT)
    'UT': {
      duties: [
        'Installed and maintained plumbing, heating, and air conditioning systems',
        'Troubleshot and repaired utility systems in facilities',
        'Performed preventive maintenance and safety checks',
        'Supported construction and repair projects'
      ]
    },
    // Hospital Corpsman - Advanced Technical Field (HM-ATF)
    'HM-ATF': {
      duties: [
        'Provided advanced medical care and emergency treatment in field and operational settings',
        'Assisted in advanced trauma procedures and surgeries',
        'Trained in specialized medical techniques for combat environments',
        'Supported medical readiness and training programs'
      ]
    },
    // Special Amphibious Reconnaissance Corpsman (HM-SARC)
    'HM-SARC': {
      duties: [
        'Provided medical support to special operations and reconnaissance teams',
        'Trained in advanced trauma and field medicine',
        'Supported amphibious and special warfare missions',
        'Maintained medical readiness for high-risk operations'
      ]
    },
    // Dive Medical Technician (HM-DMT)
    'HM-DMT': {
      duties: [
        'Provided medical care for diving and undersea operations',
        'Trained in hyperbaric medicine and diving accident management',
        'Supported diving teams with emergency medical response',
        'Maintained medical equipment for dive operations'
      ]
    },
    // Special Operations Medical Technician (HM-SMT)
    'HM-SMT': {
      duties: [
        'Delivered advanced medical care in special operations environments',
        'Trained in trauma management and emergency procedures',
        'Supported special warfare teams during missions',
        'Maintained medical readiness and equipment for operations'
      ]
    },
    // Dental Technician (DT)
    'DT': {
      duties: [
        'Assisted dentists in providing oral health care to personnel',
        'Prepared patients and dental instruments for procedures',
        'Maintained dental records and managed supplies',
        'Supported dental readiness and preventive care programs'
      ]
    },
    // Cryptologic Technician Interpretive (CTI)
    'CTI': {
      duties: [
        'Translated and analyzed foreign language communications',
        'Provided linguistic support for intelligence operations',
        'Maintained proficiency in assigned languages',
        'Supported signals intelligence and cryptologic missions'
      ]
    },
    // Cryptologic Technician Maintenance (CTM)
    'CTM': {
      duties: [
        'Maintained and repaired cryptologic and electronic equipment',
        'Troubleshot secure communication systems',
        'Performed preventive maintenance on cryptologic devices',
        'Supported intelligence and information security operations'
      ]
    },
    // Cryptologic Technician Networks (CTN)
    'CTN': {
      duties: [
        'Conducted computer network operations and cyber defense',
        'Monitored and analyzed network traffic for security threats',
        'Supported cyber operations and information assurance',
        'Maintained network security tools and protocols'
      ]
    },
    // Cryptologic Technician Collection (CTR)
    'CTR': {
      duties: [
        'Collected and analyzed signals intelligence data',
        'Operated electronic surveillance and collection equipment',
        'Supported intelligence gathering and analysis',
        'Maintained logs and reports of collection activities'
      ]
    },
    // Cryptologic Technician Technical (CTT)
    'CTT': {
      duties: [
        'Operated and maintained electronic warfare and signals intelligence equipment',
        'Detected and analyzed electronic emissions',
        'Supported electronic countermeasures and defense',
        'Trained in electronic warfare tactics and procedures'
      ]
    },
    // Intelligence Specialist (IS)
    'IS': {
      duties: [
        'Collected, analyzed, and disseminated intelligence information',
        'Prepared intelligence reports and briefings',
        'Supported mission planning with intelligence data',
        'Maintained security of classified information'
      ]
    },
    // Legalman (LN)
    'LN': {
      duties: [
        'Assisted attorneys in legal research and case preparation',
        'Prepared legal documents and maintained case files',
        'Supported military justice and administrative law functions',
        'Maintained confidentiality and legal compliance'
      ]
    },
    // Master-at-Arms (MA)
    'MA': {
      duties: [
        'Enforced law and order on naval installations and ships',
        'Conducted security patrols and investigations',
        'Provided physical security and access control',
        'Trained personnel in security and emergency procedures'
      ]
    },
    // Mass Communication Specialist (MC-COMM)
    'MC-COMM': {
      duties: [
        'Produced and distributed multimedia content for public affairs',
        'Photographed and documented naval operations and events',
        'Managed social media and public relations campaigns',
        'Supported internal and external communications'
      ]
    },
    // Navy Counselor (NC-COUNSEL)
    'NC-COUNSEL': {
      duties: [
        'Provided career counseling and guidance to sailors',
        'Assisted with retention and transition programs',
        'Conducted interviews and maintained counseling records',
        'Supported professional development and advancement'
      ]
    },
    // Personnel Specialist (PS)
    'PS': {
      duties: [
        'Processed personnel actions and maintained service records',
        'Assisted with pay, benefits, and leave administration',
        'Prepared official correspondence and reports',
        'Supported human resources and administrative functions'
      ]
    },
    // Religious Program Specialist (RP)
    'RP': {
      duties: [
        'Assisted chaplains in providing religious support and counseling',
        'Coordinated religious services and events',
        'Maintained religious program materials and facilities',
        'Supported morale and welfare programs'
      ]
    },
    // Ship's Serviceman (SH)
    'SH': {
      duties: [
        'Operated shipboard retail and service activities',
        'Managed inventory and sales of supplies and merchandise',
        'Provided laundry, barber, and hospitality services',
        'Maintained financial records and customer service standards'
      ]
    },
    // Culinary Specialist (CS)
    'CS': {
      duties: [
        'Prepared and served meals for shipboard and shore-based personnel',
        'Managed food inventory and galley operations',
        'Ensured compliance with food safety and sanitation standards',
        'Supported special events and catering operations'
      ]
    },
    // Retail Services Specialist (RS)
    'RS': {
      duties: [
        'Operated and managed shipboard retail stores and services',
        'Maintained inventory and sales records',
        'Provided customer service and support',
        'Assisted with financial management and merchandising'
      ]
    },
    // Storekeeper (SK)
    'SK': {
      duties: [
        'Managed supply inventories and logistics operations',
        'Processed requisitions and tracked shipments',
        'Maintained supply records and conducted audits',
        'Supported procurement and distribution of materials'
      ]
    },
    // Naval Aircrewman Rescue Swimmer (AIRR)
    'AIRR': {
      duties: [
        'Performed search and rescue operations as a helicopter crew member',
        'Provided emergency medical care and recovery in maritime environments',
        'Maintained rescue equipment and survival gear',
        'Trained in advanced swimming and lifesaving techniques'
      ]
    },
    // Operations Specialist (OS-CG)
    'OS-CG': {
      duties: [
        'Operated sophisticated radar and navigation equipment',
        'Coordinated search and rescue operations from command centers',
        'Monitored vessel traffic and maintained maritime domain awareness',
        'Provided tactical information to response units during operations'
      ]
    },
    // Logistics Plans (2G0X1)
    '2G0X1': {
      duties: [
        'Developed and coordinated logistics plans for military operations',
        'Analyzed supply chain requirements and transportation needs',
        'Coordinated with multiple agencies for logistics support',
        'Maintained logistics databases and planning documentation'
      ]
    },
    // Missile and Space Systems Electronic Maintenance (2M0X1)
    '2M0X1': {
      duties: [
        'Maintained and repaired electronic systems for missile and space systems',
        'Troubleshot complex electronic malfunctions and performed repairs',
        'Performed system upgrades and preventive maintenance',
        'Documented electronic maintenance actions and test results'
      ]
    },
    // Missile and Space Systems Maintenance (2M0X2)
    '2M0X2': {
      duties: [
        'Performed maintenance and repair on missile and space systems',
        'Conducted system inspections and preventive maintenance',
        'Troubleshot system malfunctions and performed repairs',
        'Maintained missile and space systems service records'
      ]
    },
    // Missile and Space Facilities (2M0X3)
    '2M0X3': {
      duties: [
        'Maintained and operated missile and space facilities',
        'Performed facility inspections and preventive maintenance',
        'Troubleshot facility system malfunctions and performed repairs',
        'Maintained facility service records and safety logs'
      ]
    },
    // Precision Measurement Equipment Laboratory (2P0X1)
    '2P0X1': {
      duties: [
        'Operated precision measurement equipment laboratory',
        'Calibrated and maintained measurement standards and equipment',
        'Performed precision measurements and quality control testing',
        'Documented calibration procedures and measurement results'
      ]
    },
    // Maintenance Management Analysis (2R0X1)
    '2R0X1': {
      duties: [
        'Analyzed maintenance data and performance metrics',
        'Developed maintenance management reports and recommendations',
        'Coordinated maintenance planning and resource allocation',
        'Maintained maintenance databases and analytical tools'
      ]
    },
    // Maintenance Management Production (2R1X1)
    '2R1X1': {
      duties: [
        'Managed maintenance production schedules and workflows',
        'Coordinated maintenance activities and resource utilization',
        'Monitored maintenance progress and quality control',
        'Maintained production records and performance metrics'
      ]
    },
    // Materiel Management (2S0X1)
    '2S0X1': {
      duties: [
        'Managed materiel inventory and supply chain operations',
        'Coordinated procurement and distribution of materials',
        'Maintained inventory records and conducted audits',
        'Provided materiel support for maintenance operations'
      ]
    },
    // Traffic Management (2T0X1)
    '2T0X1': {
      duties: [
        'Managed traffic operations and transportation planning',
        'Coordinated vehicle movements and route planning',
        'Maintained traffic control systems and equipment',
        'Documented traffic operations and safety procedures'
      ]
    },
    // Vehicle Operations (2T1X1)
    '2T1X1': {
      duties: [
        'Operated military vehicles for personnel and cargo transportation',
        'Maintained vehicle equipment and performed preventive maintenance',
        'Coordinated vehicle operations and route planning',
        'Provided vehicle support for military operations'
      ]
    },
    // Air Transportation (2T2X1)
    '2T2X1': {
      duties: [
        'Coordinated air transportation operations and logistics',
        'Managed cargo loading and unloading operations',
        'Maintained air transportation records and documentation',
        'Provided air transportation support for military operations'
      ]
    },
    // Mission Generation Vehicular Equipment Maintenance (2T3X1)
    '2T3X1': {
      duties: [
        'Maintained and repaired mission generation vehicular equipment',
        'Performed equipment inspections and preventive maintenance',
        'Troubleshot equipment malfunctions and performed repairs',
        'Maintained equipment service records and maintenance logs'
      ]
    },
    // Special Vehicle Maintenance (2T3X2)
    '2T3X2': {
      duties: [
        'Maintained and repaired special purpose vehicles',
        'Performed specialized vehicle inspections and maintenance',
        'Troubleshot special vehicle malfunctions and performed repairs',
        'Maintained special vehicle service records and maintenance logs'
      ]
    },
    // Vehicle Management and Analysis (2T3X7)
    '2T3X7': {
      duties: [
        'Analyzed vehicle fleet performance and maintenance data',
        'Developed vehicle management strategies and recommendations',
        'Coordinated vehicle fleet operations and resource allocation',
        'Maintained vehicle management databases and analytical tools'
      ]
    },
    // Munitions Systems (2W0X1)
    '2W0X1': {
      duties: [
        'Managed munitions systems and explosive ordnance',
        'Maintained munitions storage facilities and safety procedures',
        'Coordinated munitions distribution and inventory control',
        'Provided munitions support for military operations'
      ]
    },
    // Aircraft Armament Systems (2W1X1)
    '2W1X1': {
      duties: [
        'Maintained and repaired aircraft armament systems',
        'Performed armament system inspections and preventive maintenance',
        'Troubleshot armament system malfunctions and performed repairs',
        'Maintained armament system service records and safety logs'
      ]
    },
    // Nuclear Weapons (2W2X1)
    '2W2X1': {
      duties: [
        'Maintained and secured nuclear weapons systems',
        'Performed nuclear weapons inspections and safety procedures',
        'Coordinated nuclear weapons logistics and security protocols',
        'Maintained nuclear weapons service records and security logs'
      ]
    },
    // Health Services Management (4A0X1)
    '4A0X1': {
      duties: [
        'Managed health services operations and administrative functions',
        'Coordinated medical facility operations and patient care',
        'Maintained health services records and administrative systems',
        'Provided administrative support for medical operations'
      ]
    },
    // Medical Materiel (4A1X1)
    '4A1X1': {
      duties: [
        'Managed medical materiel inventory and supply chain operations',
        'Coordinated procurement and distribution of medical supplies',
        'Maintained medical inventory records and conducted audits',
        'Provided medical materiel support for healthcare operations'
      ]
    },
    // Biomedical Equipment (4A2X1)
    '4A2X1': {
      duties: [
        'Maintained and repaired biomedical equipment and medical devices',
        'Troubleshot medical equipment malfunctions and performed repairs',
        'Performed equipment inspections and preventive maintenance',
        'Maintained medical equipment service records and maintenance logs'
      ]
    },
    // Bioenvironmental Engineering (4B0X1)
    '4B0X1': {
      duties: [
        'Conducted environmental health assessments and monitoring',
        'Analyzed workplace hazards and environmental conditions',
        'Developed environmental health recommendations and protocols',
        'Maintained environmental health records and monitoring data'
      ]
    },
    // Diet Therapy (4D0X1)
    '4D0X1': {
      duties: [
        'Provided diet therapy and nutritional counseling services',
        'Developed and implemented therapeutic diet plans',
        'Coordinated with medical staff for patient nutrition care',
        'Maintained nutrition records and dietary documentation'
      ]
    },
    // Public Health (4E0X1)
    '4E0X1': {
      duties: [
        'Conducted public health assessments and disease prevention programs',
        'Coordinated public health initiatives and community outreach',
        'Maintained public health records and epidemiological data',
        'Provided public health support for military communities'
      ]
    },
    // Cardiopulmonary Laboratory (4H0X1)
    '4H0X1': {
      duties: [
        'Conducted cardiopulmonary diagnostic testing and procedures',
        'Operated cardiopulmonary laboratory equipment and systems',
        'Maintained laboratory equipment and performed quality control',
        'Documented test results and maintained patient records'
      ]
    },
    // Physical Medicine (4J0X2)
    '4J0X2': {
      duties: [
        'Provided physical medicine and rehabilitation services',
        'Conducted physical therapy assessments and treatments',
        'Maintained physical medicine equipment and facilities',
        'Coordinated with medical staff for patient rehabilitation care'
      ]
    },
    // Aerospace Medical Service (4N0X1)
    '4N0X1': {
      duties: [
        'Provided aerospace medical services and flight medicine support',
        'Conducted flight physical examinations and medical assessments',
        'Maintained aerospace medical records and documentation',
        'Coordinated with flight medicine teams for medical support'
      ]
    },
    // Pharmacy (4P0X1)
    '4P0X1': {
      duties: [
        'Assisted pharmacists in dispensing medications and pharmaceutical care',
        'Maintained pharmacy inventory and managed pharmaceutical supplies',
        'Prepared medication orders and maintained patient records',
        'Coordinated with medical staff for pharmaceutical support'
      ]
    },
    // Diagnostic Imaging (4R0X1)
    '4R0X1': {
      duties: [
        'Operated diagnostic imaging equipment and performed medical imaging',
        'Maintained imaging equipment and performed quality control',
        'Prepared imaging reports and maintained patient records',
        'Coordinated with medical staff for diagnostic imaging support'
      ]
    },
    // Medical Laboratory (4T0X1)
    '4T0X1': {
      duties: [
        'Conducted medical laboratory tests and analysis',
        'Maintained laboratory equipment and performed quality control',
        'Prepared laboratory reports and maintained patient records',
        'Coordinated with medical staff for laboratory support'
      ]
    },
    // Histopathology (4T0X2)
    '4T0X2': {
      duties: [
        'Conducted histopathological analysis and tissue examination',
        'Maintained histopathology laboratory equipment and procedures',
        'Prepared histopathology reports and maintained patient records',
        'Coordinated with medical staff for histopathology support'
      ]
    },
    // Ophthalmic (4V0X1)
    '4V0X1': {
      duties: [
        'Provided ophthalmic services and eye care support',
        'Conducted eye examinations and vision testing',
        'Maintained ophthalmic equipment and facilities',
        'Coordinated with medical staff for ophthalmic care'
      ]
    },
    // Dental Assistant (4Y0X1)
    '4Y0X1': {
      duties: [
        'Assisted dentists in providing oral health care to personnel',
        'Prepared patients and dental instruments for procedures',
        'Maintained dental records and managed supplies',
        'Supported dental readiness and preventive care programs'
      ]
    },
    // Dental Laboratory (4Y0X2)
    '4Y0X2': {
      duties: [
        'Fabricated dental prosthetics and laboratory restorations',
        'Maintained dental laboratory equipment and materials',
        'Performed dental laboratory procedures and quality control',
        'Coordinated with dental staff for laboratory support'
      ]
    },
    // Aviation Maintenance Technician (AMT)
    'AMT': {
      duties: [
        'Maintained and repaired aircraft systems and components',
        'Conducted aircraft inspections and preventive maintenance',
        'Troubleshot aircraft malfunctions and performed repairs',
        'Ensured aircraft operational readiness for Coast Guard missions'
      ]
    },
    // Avionics Electrical Technician (AET)
    'AET': {
      duties: [
        'Maintained and repaired aircraft avionics and electrical systems',
        'Troubleshot avionics malfunctions and performed repairs',
        'Conducted system inspections and preventive maintenance',
        'Ensured avionics system operational readiness'
      ]
    },
    // Aviation Survival Technician (AST)
    'AST': {
      duties: [
        'Provided search and rescue operations as helicopter crew member',
        'Conducted emergency medical care and recovery in maritime environments',
        'Maintained rescue equipment and survival gear',
        'Trained in advanced swimming and lifesaving techniques'
      ]
    },
    // Machinery Technician (MK)
    'MK': {
      duties: [
        'Maintained and repaired shipboard machinery and propulsion systems',
        'Conducted engine room operations and equipment maintenance',
        'Troubleshot machinery malfunctions and performed repairs',
        'Ensured vessel propulsion and auxiliary system readiness'
      ]
    },
    // Health Services Technician (HS)
    'HS': {
      duties: [
        'Provided medical care and health services to Coast Guard personnel',
        'Conducted medical examinations and preventive health programs',
        'Maintained medical records and managed medical supplies',
        'Supported Coast Guard medical readiness and health programs'
      ]
    },
    // Investigator (IV)
    'IV': {
      duties: [
        'Conducted criminal investigations and law enforcement operations',
        'Gathered evidence and interviewed witnesses for investigations',
        'Maintained investigative records and case documentation',
        'Supported Coast Guard law enforcement and security missions'
      ]
    },
    // Marine Science Technician (MST)
    'MST': {
      duties: [
        'Conducted marine environmental protection and pollution response',
        'Monitored marine safety and environmental compliance',
        'Maintained environmental monitoring equipment and procedures',
        'Supported Coast Guard environmental protection missions'
      ]
    },
    // Maritime Security Response Team (MSRT)
    'MSRT': {
      duties: [
        'Conducted maritime security and counter-terrorism operations',
        'Performed tactical law enforcement and security missions',
        'Maintained specialized security equipment and tactical skills',
        'Supported Coast Guard maritime security and protection missions'
      ]
    },
    // Tactical Law Enforcement Team (TACLET)
    'TACLET': {
      duties: [
        'Conducted tactical law enforcement operations in maritime environments',
        'Performed drug interdiction and maritime law enforcement',
        'Maintained tactical equipment and law enforcement skills',
        'Supported Coast Guard law enforcement and interdiction missions'
      ]
    },
    // Port Security Unit (PSU)
    'PSU': {
      duties: [
        'Provided port security and maritime protection operations',
        'Conducted security patrols and threat assessments',
        'Maintained security equipment and operational procedures',
        'Supported Coast Guard port security and protection missions'
      ]
    },
    // Maritime Safety and Security Team (MSST)
    'MSST': {
      duties: [
        'Conducted maritime safety and security operations',
        'Performed security assessments and protective operations',
        'Maintained security equipment and operational readiness',
        'Supported Coast Guard maritime safety and security missions'
      ]
    },
    // Deployable Specialized Forces (DSF)
    'DSF': {
      duties: [
        'Conducted specialized maritime operations and missions',
        'Performed tactical operations and specialized training',
        'Maintained specialized equipment and operational capabilities',
        'Supported Coast Guard specialized mission requirements'
      ]
    },
    // Helicopter Interdiction Tactical Squadron (HITRON)
    'HITRON': {
      duties: [
        'Conducted helicopter interdiction operations for law enforcement',
        'Performed aerial surveillance and interdiction missions',
        'Maintained helicopter systems and tactical equipment',
        'Supported Coast Guard aerial law enforcement operations'
      ]
    },
    // Patrol Forces Southwest Asia (PATFORSWA)
    'PATFORSWA': {
      duties: [
        'Conducted maritime patrol operations in Southwest Asia',
        'Performed security and law enforcement missions',
        'Maintained patrol vessel systems and operational readiness',
        'Supported Coast Guard international maritime operations'
      ]
    },
    // Information Technology - Cyber (IT-C)
    'IT-C': {
      duties: [
        'Conducted cybersecurity operations and cyber defense',
        'Managed cyber security systems and threat response',
        'Maintained cybersecurity policies and procedures',
        'Supported Coast Guard cyber security and information assurance'
      ]
    },
    // Information Technology - Information Assurance (IT-I)
    'IT-I': {
      duties: [
        'Ensured information assurance and security compliance',
        'Conducted security assessments and vulnerability analysis',
        'Maintained information security policies and procedures',
        'Supported Coast Guard information security and assurance'
      ]
    },
    // Information Technology - Network Specialist (IT-N)
    'IT-N': {
      duties: [
        'Maintained and operated Coast Guard network systems',
        'Troubleshot network connectivity and performance issues',
        'Managed network infrastructure and communication systems',
        'Supported Coast Guard information technology operations'
      ]
    },
    // Intelligence Specialist - Imagery (IS-I)
    'IS-I': {
      duties: [
        'Analyzed imagery intelligence for Coast Guard operations',
        'Processed and interpreted aerial and satellite imagery',
        'Maintained imagery analysis databases and tools',
        'Provided imagery intelligence support for Coast Guard missions'
      ]
    },
    // Intelligence Specialist - Cryptology (IS-C)
    'IS-C': {
      duties: [
        'Conducted cryptologic analysis for Coast Guard operations',
        'Processed and analyzed encrypted communications and signals',
        'Maintained cryptologic databases and analytical tools',
        'Provided cryptologic intelligence support for Coast Guard missions'
      ]
    }
  },
  army: {
    // Infantry (11B)
    '11B': {
      duties: [
        'Led and participated in tactical ground operations and combat missions',
        'Operated and maintained various weapon systems and combat vehicles',
        'Conducted reconnaissance operations and gathered intelligence in tactical environments',
        'Trained and mentored junior soldiers in combat tactics and procedures'
      ]
    },
    // Combat Medic (68W)
    '68W': {
      duties: [
        'Provided emergency medical care in combat and non-combat environments',
        'Managed and operated battalion aid stations and medical treatment facilities',
        'Conducted medical evacuations and casualty transport operations',
        'Trained unit personnel in combat lifesaver and first aid procedures'
      ]
    },
    // Military Intelligence (35F)
    '35F': {
      duties: [
        'Analyzed and evaluated intelligence data from multiple sources',
        'Prepared detailed intelligence reports and briefings for command staff',
        'Maintained intelligence databases and tracking systems',
        'Coordinated with other intelligence agencies and units'
      ]
    },
    // Signal Support Systems Specialist (25U)
    '25U': {
      duties: [
        'Installed, operated, and maintained tactical communication systems',
        'Provided technical assistance for network systems and cryptographic devices',
        'Performed preventive maintenance on communications equipment',
        'Trained personnel on proper use of communication systems'
      ]
    },
    // Cyber Operations Specialist (17C)
    '17C': {
      duties: [
        'Conducted defensive and offensive cyber operations',
        'Analyzed cyber threats and implemented security measures',
        'Performed digital forensics and malware analysis',
        'Developed and maintained cyber security tools and procedures'
      ]
    },
    // Human Intelligence Collector (35M)
    '35M': {
      duties: [
        'Conducted human intelligence collection operations',
        'Performed screening and interrogation of sources',
        'Prepared intelligence reports and briefings',
        'Managed source operations and maintained source networks'
      ]
    },
    // Explosive Ordnance Disposal (89D)
    '89D': {
      duties: [
        'Identified and disposed of explosive hazards and ordnance',
        'Conducted post-blast analysis and evidence collection',
        'Performed render-safe procedures on various explosive devices',
        'Provided EOD support for VIP protection and special events'
      ]
    },
    // Financial Management Technician (36B)
    '36B': {
      duties: [
        'Processed military pay and travel transactions',
        'Maintained financial records and accounting systems',
        'Performed internal control procedures and audits',
        'Provided customer service for pay-related issues'
      ]
    },
    // Public Affairs Specialist (46Q)
    '46Q': {
      duties: [
        'Wrote and edited content for military publications',
        'Conducted interviews and covered military events',
        'Managed social media and public relations campaigns',
        'Coordinated with media outlets and community organizations'
      ]
    },
    // Chemical Operations Specialist (74D)
    '74D': {
      duties: [
        'Performed chemical, biological, and radiological detection operations',
        'Conducted decontamination procedures and operations',
        'Maintained CBRN detection and protective equipment',
        'Trained personnel in CBRN defense procedures'
      ]
    },
    // OFFICER RATES
    // Infantry Officer (11A)
    '11A': {
      duties: [
        'Led infantry units in combat operations and tactical missions',
        'Developed tactical plans and coordinated with supporting units',
        'Managed personnel and equipment readiness for combat deployments',
        'Trained and mentored subordinate leaders in infantry tactics and leadership'
      ]
    },
    // Engineer Officer (12A)
    '12A': {
      duties: [
        'Led engineering units in construction and combat engineering operations',
        'Planned and supervised infrastructure projects and facility construction',
        'Coordinated explosive ordnance disposal and route clearance operations',
        'Managed engineering resources and equipment for mission success'
      ]
    },
    // Field Artillery Officer (13A)
    '13A': {
      duties: [
        'Led artillery units and coordinated fire support operations',
        'Developed fire plans and managed artillery targeting procedures',
        'Coordinated with infantry and armor units for integrated fire support',
        'Supervised artillery equipment maintenance and crew training'
      ]
    },
    // Aviation Officer (15A)
    '15A': {
      duties: [
        'Led aviation units and managed flight operations',
        'Coordinated air support missions and tactical aviation operations',
        'Supervised aircraft maintenance and crew training programs',
        'Developed flight plans and ensured aviation safety protocols'
      ]
    },
    // Geospatial Engineer (12Y)
    '12Y': {
      duties: [
        'Collected and analyzed geospatial data for military operations',
        'Created maps, charts, and terrain analysis products',
        'Operated surveying and mapping equipment',
        'Provided geospatial support for mission planning and execution'
      ]
    },
    // Combat Engineering Senior Sergeant (12Z)
    '12Z': {
      duties: [
        'Led combat engineering operations and supervised engineering teams',
        'Coordinated construction, demolition, and obstacle operations',
        'Managed engineering equipment and resources',
        'Trained and mentored junior engineering personnel'
      ]
    },
    // Cannon Crewmember (13B)
    '13B': {
      duties: [
        'Operated and maintained field artillery cannon systems',
        'Performed ammunition handling and loading procedures',
        'Conducted fire direction and targeting operations',
        'Maintained artillery equipment and performed preventive maintenance'
      ]
    },
    // Fire Support Specialist (13F)
    '13F': {
      duties: [
        'Coordinated fire support operations and artillery missions',
        'Calculated firing data and target coordinates',
        'Communicated with artillery units and forward observers',
        'Maintained fire support equipment and communication systems'
      ]
    },
    // Fire Control Specialist (13J)
    '13J': {
      duties: [
        'Operated fire control systems for artillery and missile units',
        'Calculated firing solutions and target data',
        'Maintained fire control equipment and computer systems',
        'Coordinated with artillery crews for accurate fire missions'
      ]
    },
    // Multiple Launch Rocket System Crewmember (13M)
    '13M': {
      duties: [
        'Operated and maintained Multiple Launch Rocket System (MLRS)',
        'Performed rocket loading and firing procedures',
        'Conducted system checks and preventive maintenance',
        'Coordinated with fire direction centers for rocket missions'
      ]
    },
    // Field Artillery Firefinder Radar Operator (13R)
    '13R': {
      duties: [
        'Operated radar systems to detect and track enemy artillery',
        'Calculated enemy artillery positions and provided counter-fire data',
        'Maintained radar equipment and performed system calibrations',
        'Coordinated with fire support teams for counter-battery operations'
      ]
    },
    // Field Artillery Senior Sergeant (13Z)
    '13Z': {
      duties: [
        'Led field artillery operations and supervised artillery crews',
        'Coordinated fire support missions and artillery planning',
        'Managed artillery equipment and ammunition resources',
        'Trained and mentored artillery personnel in firing procedures'
      ]
    },
    // Patriot Fire Control Enhanced Operator/Maintainer (14E)
    '14E': {
      duties: [
        'Operated and maintained Patriot missile fire control systems',
        'Performed system diagnostics and troubleshooting procedures',
        'Conducted missile tracking and engagement operations',
        'Maintained fire control equipment and communication systems'
      ]
    },
    // Air Defense Battle Management System Operator (14G)
    '14G': {
      duties: [
        'Operated air defense battle management systems',
        'Monitored airspace and tracked potential threats',
        'Coordinated air defense operations and missile engagements',
        'Maintained battle management equipment and communication systems'
      ]
    },
    // Air Defense Enhanced Early Warning System Operator (14H)
    '14H': {
      duties: [
        'Operated early warning radar systems for air defense',
        'Detected and tracked aircraft and missile threats',
        'Provided early warning data to air defense command centers',
        'Maintained radar equipment and performed system calibrations'
      ]
    },
    // Air and Missile Defense Crewmember (14P)
    '14P': {
      duties: [
        'Operated air and missile defense systems',
        'Performed system checks and preventive maintenance',
        'Conducted missile loading and firing procedures',
        'Coordinated with air defense command centers for engagements'
      ]
    },
    // Air and Missile Defense (AMD) Crewmember (14S)
    '14S': {
      duties: [
        'Operated advanced air and missile defense systems',
        'Performed system diagnostics and troubleshooting',
        'Conducted missile tracking and engagement operations',
        'Maintained AMD equipment and communication systems'
      ]
    },
    // Patriot Launching Station Enhanced Operator/Maintainer (14T)
    '14T': {
      duties: [
        'Operated and maintained Patriot missile launching stations',
        'Performed missile loading and launching procedures',
        'Conducted system diagnostics and preventive maintenance',
        'Coordinated with fire control teams for missile engagements'
      ]
    },
    // Air Defense Artillery Senior Sergeant (14Z)
    '14Z': {
      duties: [
        'Led air defense artillery operations and supervised crews',
        'Coordinated air defense missions and missile planning',
        'Managed air defense equipment and missile resources',
        'Trained and mentored air defense personnel in operations'
      ]
    },
    // Aircraft Powerplant Repairer (15B)
    '15B': {
      duties: [
        'Repaired and maintained aircraft engines and powerplant systems',
        'Performed engine inspections and preventive maintenance',
        'Troubleshot engine malfunctions and performed repairs',
        'Maintained engine maintenance records and service logs'
      ]
    },
    // Aircraft Powertrain Repairer (15D)
    '15D': {
      duties: [
        'Repaired and maintained aircraft transmission and powertrain systems',
        'Performed powertrain inspections and preventive maintenance',
        'Troubleshot transmission and gearbox malfunctions',
        'Maintained powertrain service records and maintenance logs'
      ]
    },
    // Unmanned Aircraft Systems Repairer (15E)
    '15E': {
      duties: [
        'Repaired and maintained unmanned aircraft systems (UAS)',
        'Performed UAS inspections and preventive maintenance',
        'Troubleshot UAS malfunctions and performed repairs',
        'Maintained UAS service records and maintenance logs'
      ]
    },
    // Aircraft Electrician (15F)
    '15F': {
      duties: [
        'Repaired and maintained aircraft electrical systems',
        'Troubleshot electrical malfunctions and performed repairs',
        'Performed electrical system inspections and preventive maintenance',
        'Maintained electrical system service records and maintenance logs'
      ]
    },
    // Aircraft Structural Repairer (15G)
    '15G': {
      duties: [
        'Repaired and maintained aircraft structural components',
        'Performed structural inspections and preventive maintenance',
        'Conducted sheet metal work and corrosion control',
        'Maintained structural repair records and service logs'
      ]
    },
    // Aircraft Pneudraulics Repairer (15H)
    '15H': {
      duties: [
        'Repaired and maintained aircraft pneumatic and hydraulic systems',
        'Troubleshot pneudraulic malfunctions and performed repairs',
        'Performed system inspections and preventive maintenance',
        'Maintained pneudraulic system service records and maintenance logs'
      ]
    },
    // Avionic Mechanic (15N)
    '15N': {
      duties: [
        'Repaired and maintained aircraft avionics systems',
        'Troubleshot avionics malfunctions and performed repairs',
        'Performed avionics system inspections and preventive maintenance',
        'Maintained avionics service records and maintenance logs'
      ]
    },
    // Aviation Operations Specialist (15P)
    '15P': {
      duties: [
        'Coordinated aviation operations and flight scheduling',
        'Managed flight plans and aviation resources',
        'Maintained aviation records and operational logs',
        'Provided administrative support for aviation units'
      ]
    },
    // Air Traffic Control Operator (15Q)
    '15Q': {
      duties: [
        'Operated air traffic control systems and equipment',
        'Provided air traffic control services for military aircraft',
        'Coordinated with civilian air traffic control facilities',
        'Maintained air traffic control records and operational logs'
      ]
    },
    // AH-64 Attack Helicopter Repairer (15R)
    '15R': {
      duties: [
        'Repaired and maintained AH-64 Apache attack helicopters',
        'Performed helicopter inspections and preventive maintenance',
        'Troubleshot helicopter malfunctions and performed repairs',
        'Maintained helicopter service records and maintenance logs'
      ]
    },
    // OH-58D Helicopter Repairer (15S)
    '15S': {
      duties: [
        'Repaired and maintained OH-58D Kiowa Warrior helicopters',
        'Performed helicopter inspections and preventive maintenance',
        'Troubleshot helicopter malfunctions and performed repairs',
        'Maintained helicopter service records and maintenance logs'
      ]
    },
    // UH-60 Helicopter Repairer (15T)
    '15T': {
      duties: [
        'Repaired and maintained UH-60 Black Hawk helicopters',
        'Performed helicopter inspections and preventive maintenance',
        'Troubleshot helicopter malfunctions and performed repairs',
        'Maintained helicopter service records and maintenance logs'
      ]
    },
    // CH-47 Helicopter Repairer (15U)
    '15U': {
      duties: [
        'Repaired and maintained CH-47 Chinook helicopters',
        'Performed helicopter inspections and preventive maintenance',
        'Troubleshot helicopter malfunctions and performed repairs',
        'Maintained helicopter service records and maintenance logs'
      ]
    },
    // Unmanned Aircraft Systems Operator (15W)
    '15W': {
      duties: [
        'Operated unmanned aircraft systems (UAS) for reconnaissance and surveillance',
        'Conducted UAS flight operations and mission planning',
        'Maintained UAS equipment and performed system checks',
        'Analyzed UAS data and prepared mission reports'
      ]
    },
    // AH-64D Armament/Electrical/Avionics Systems Repairer (15Y)
    '15Y': {
      duties: [
        'Repaired and maintained AH-64D Apache armament, electrical, and avionics systems',
        'Performed system inspections and preventive maintenance',
        'Troubleshot system malfunctions and performed repairs',
        'Maintained system service records and maintenance logs'
      ]
    },
    // Aircraft Maintenance Senior Sergeant (15Z)
    '15Z': {
      duties: [
        'Led aircraft maintenance operations and supervised maintenance teams',
        'Coordinated aircraft maintenance schedules and resources',
        'Managed maintenance equipment and parts inventory',
        'Trained and mentored aircraft maintenance personnel'
      ]
    },
    // Electronic Warfare Specialist (17E)
    '17E': {
      duties: [
        'Conducted electronic warfare operations and electronic countermeasures',
        'Operated electronic warfare equipment and systems',
        'Analyzed electronic signals and provided electronic warfare support',
        'Maintained electronic warfare equipment and performed system checks'
      ]
    },
    // Geospatial Intelligence Imagery Analyst (35G)
    '35G': {
      duties: [
        'Analyzed geospatial intelligence imagery and satellite data',
        'Created detailed imagery analysis reports and briefings',
        'Maintained geospatial intelligence databases and tracking systems',
        'Coordinated with other intelligence agencies for imagery support'
      ]
    },
    // Counterintelligence Agent (35L)
    '35L': {
      duties: [
        'Conducted counterintelligence investigations and operations',
        'Identified and neutralized security threats and espionage activities',
        'Maintained counterintelligence databases and case files',
        'Coordinated with law enforcement and security agencies'
      ]
    },
    // Signals Intelligence Analyst (35N)
    '35N': {
      duties: [
        'Analyzed signals intelligence data and electronic communications',
        'Maintained signals intelligence databases and tracking systems',
        'Prepared signals intelligence reports and briefings',
        'Coordinated with other intelligence agencies for signals support'
      ]
    },
    // Cryptologic Linguist (35P)
    '35P': {
      duties: [
        'Translated and analyzed foreign language communications',
        'Provided linguistic support for intelligence operations',
        'Maintained proficiency in assigned languages',
        'Supported signals intelligence and cryptologic missions'
      ]
    },
    // Military Intelligence Systems Maintainer/Integrator (35T)
    '35T': {
      duties: [
        'Maintained and integrated military intelligence systems and equipment',
        'Troubleshot intelligence system malfunctions and performed repairs',
        'Performed system inspections and preventive maintenance',
        'Maintained intelligence system service records and maintenance logs'
      ]
    },
    // Special Forces Weapons Sergeant (18B)
    '18B': {
      duties: [
        'Led special forces weapons training and operations',
        'Maintained and operated advanced weapons systems',
        'Conducted weapons training for special forces teams',
        'Coordinated weapons support for special operations missions'
      ]
    },
    // Special Forces Engineer Sergeant (18C)
    '18C': {
      duties: [
        'Led special forces engineering operations and demolitions',
        'Conducted construction, demolition, and obstacle operations',
        'Trained special forces teams in engineering techniques',
        'Coordinated engineering support for special operations missions'
      ]
    },
    // Special Forces Medical Sergeant (18D)
    '18D': {
      duties: [
        'Provided advanced medical care in special operations environments',
        'Conducted medical training for special forces teams',
        'Maintained medical equipment and supplies for operations',
        'Coordinated medical support for special operations missions'
      ]
    },
    // Special Forces Communications Sergeant (18E)
    '18E': {
      duties: [
        'Maintained and operated communications systems for special forces',
        'Trained special forces teams in communications procedures',
        'Coordinated communications support for special operations missions',
        'Maintained communications equipment and performed system checks'
      ]
    },
    // Special Forces Intelligence Sergeant (18F)
    '18F': {
      duties: [
        'Conducted intelligence operations for special forces teams',
        'Analyzed intelligence data and prepared mission briefings',
        'Coordinated with intelligence agencies for special operations support',
        'Maintained intelligence databases and tracking systems'
      ]
    },
    // Information Technology Specialist (25B)
    '25B': {
      duties: [
        'Maintained and operated information technology systems and networks',
        'Troubleshot IT system malfunctions and performed repairs',
        'Performed system inspections and preventive maintenance',
        'Maintained IT system service records and maintenance logs'
      ]
    },
    // Radio Operator-Maintainer (25C)
    '25C': {
      duties: [
        'Operated and maintained radio communication systems',
        'Troubleshot radio malfunctions and performed repairs',
        'Performed radio system inspections and preventive maintenance',
        'Maintained radio system service records and maintenance logs'
      ]
    },
    // Cyber Network Defender (25D)
    '25D': {
      duties: [
        'Conducted cyber network defense operations and security monitoring',
        'Analyzed cyber threats and implemented security measures',
        'Performed digital forensics and malware analysis',
        'Maintained cyber security tools and protocols'
      ]
    },
    // Electromagnetic Spectrum Manager (25E)
    '25E': {
      duties: [
        'Managed electromagnetic spectrum operations and frequency allocation',
        'Coordinated spectrum use and interference mitigation',
        'Maintained spectrum management databases and tracking systems',
        'Provided spectrum support for military operations'
      ]
    },
    // Nodal Network Systems Operator-Maintainer (25N)
    '25N': {
      duties: [
        'Operated and maintained nodal network systems and equipment',
        'Troubleshot network malfunctions and performed repairs',
        'Performed network system inspections and preventive maintenance',
        'Maintained network system service records and maintenance logs'
      ]
    },
    // Satellite Communication Systems Operator-Maintainer (25S)
    '25S': {
      duties: [
        'Operated and maintained satellite communication systems',
        'Troubleshot satellite communication malfunctions and performed repairs',
        'Performed satellite system inspections and preventive maintenance',
        'Maintained satellite system service records and maintenance logs'
      ]
    },
    // Biomedical Equipment Specialist (68A)
    '68A': {
      duties: [
        'Maintained and repaired biomedical equipment and medical devices',
        'Troubleshot medical equipment malfunctions and performed repairs',
        'Performed equipment inspections and preventive maintenance',
        'Maintained medical equipment service records and maintenance logs'
      ]
    },
    // Practical Nursing Specialist (68C)
    '68C': {
      duties: [
        'Provided practical nursing care in military medical facilities',
        'Assisted medical officers in patient care and treatment',
        'Maintained patient records and medical documentation',
        'Coordinated with medical staff for patient care'
      ]
    },
    // Operating Room Specialist (68D)
    '68D': {
      duties: [
        'Assisted in surgical procedures and operating room operations',
        'Maintained operating room equipment and sterile environments',
        'Prepared surgical instruments and supplies',
        'Coordinated with surgical teams for patient care'
      ]
    },
    // Dental Specialist (68E)
    '68E': {
      duties: [
        'Assisted dentists in providing oral health care to personnel',
        'Prepared patients and dental instruments for procedures',
        'Maintained dental records and managed supplies',
        'Supported dental readiness and preventive care programs'
      ]
    },
    // Medical Laboratory Specialist (68K)
    '68K': {
      duties: [
        'Conducted medical laboratory tests and analysis',
        'Maintained laboratory equipment and performed quality control',
        'Prepared laboratory reports and maintained patient records',
        'Coordinated with medical staff for laboratory support'
      ]
    },
    // Radiology Specialist (68P)
    '68P': {
      duties: [
        'Operated radiology equipment and performed diagnostic imaging',
        'Maintained radiology equipment and performed quality control',
        'Prepared radiology reports and maintained patient records',
        'Coordinated with medical staff for radiology support'
      ]
    },
    // Pharmacy Specialist (68Q)
    '68Q': {
      duties: [
        'Assisted pharmacists in dispensing medications and pharmaceutical care',
        'Maintained pharmacy inventory and managed pharmaceutical supplies',
        'Prepared medication orders and maintained patient records',
        'Coordinated with medical staff for pharmaceutical support'
      ]
    },
    // Behavioral Health Specialist (68X)
    '68X': {
      duties: [
        'Provided behavioral health services and counseling support',
        'Conducted mental health evaluations and assessments',
        'Maintained patient records and treatment plans',
        'Coordinated with medical staff for behavioral health care'
      ]
    },
    // Cargo Specialist (88H)
    '88H': {
      duties: [
        'Managed cargo operations and transportation logistics',
        'Coordinated cargo loading and unloading operations',
        'Maintained cargo documentation and tracking systems',
        'Provided cargo support for military operations'
      ]
    },
    // Motor Transport Operator (88M)
    '88M': {
      duties: [
        'Operated military vehicles for personnel and cargo transportation',
        'Maintained vehicle equipment and performed preventive maintenance',
        'Coordinated transportation operations and route planning',
        'Provided motor transport support for military operations'
      ]
    },
    // Transportation Management Coordinator (88N)
    '88N': {
      duties: [
        'Coordinated transportation operations and logistics planning',
        'Managed transportation resources and route planning',
        'Maintained transportation documentation and tracking systems',
        'Provided transportation support for military operations'
      ]
    },
    // Ammunition Specialist (89B)
    '89B': {
      duties: [
        'Managed ammunition operations and explosive ordnance',
        'Maintained ammunition inventory and storage facilities',
        'Coordinated ammunition distribution and safety procedures',
        'Provided ammunition support for military operations'
      ]
    },
    // Wheeled Vehicle Mechanic (91B)
    '91B': {
      duties: [
        'Repaired and maintained wheeled military vehicles',
        'Troubleshot vehicle malfunctions and performed repairs',
        'Performed vehicle inspections and preventive maintenance',
        'Maintained vehicle service records and maintenance logs'
      ]
    },
    // Power Generation Equipment Repairer (91D)
    '91D': {
      duties: [
        'Repaired and maintained power generation equipment',
        'Troubleshot power equipment malfunctions and performed repairs',
        'Performed equipment inspections and preventive maintenance',
        'Maintained power equipment service records and maintenance logs'
      ]
    },
    // Allied Trade Specialist (91E)
    '91E': {
      duties: [
        'Performed specialized trade work in various technical fields',
        'Maintained specialized equipment and tools',
        'Coordinated with other maintenance personnel for repairs',
        'Maintained trade equipment service records and maintenance logs'
      ]
    },
    // Automated Logistical Specialist (92A)
    '92A': {
      duties: [
        'Managed automated logistics systems and supply operations',
        'Maintained logistics databases and tracking systems',
        'Coordinated supply operations and inventory management',
        'Provided logistics support for military operations'
      ]
    },
    // Petroleum Supply Specialist (92F)
    '92F': {
      duties: [
        'Managed petroleum supply operations and fuel distribution',
        'Maintained fuel storage facilities and safety procedures',
        'Coordinated fuel distribution and quality control',
        'Provided petroleum support for military operations'
      ]
    },
    // Culinary Specialist (92G)
    '92G': {
      duties: [
        'Prepared and served meals in military dining facilities',
        'Maintained food service equipment and sanitary standards',
        'Coordinated meal planning and food preparation',
        'Provided food service support for military operations'
      ]
    },
    // Unit Supply Specialist (92Y)
    '92Y': {
      duties: [
        'Managed unit supply operations and inventory control',
        'Maintained supply records and documentation systems',
        'Coordinated supply distribution and resource management',
        'Provided supply support for military units'
      ]
    },
    // Paralegal Specialist (27D)
    '27D': {
      duties: [
        'Assisted attorneys in legal research and case preparation',
        'Prepared legal documents and maintained case files',
        'Supported military justice and administrative law functions',
        'Maintained confidentiality and legal compliance'
      ]
    },
    // Military Police (31B)
    '31B': {
      duties: [
        'Enforced law and order on military installations',
        'Conducted security patrols and investigations',
        'Provided physical security and access control',
        'Trained personnel in security and emergency procedures'
      ]
    },
    // Internment/Resettlement Specialist (31E)
    '31E': {
      duties: [
        'Managed internment and resettlement operations',
        'Maintained security and order in detention facilities',
        'Coordinated with humanitarian organizations for resettlement',
        'Provided administrative support for internment operations'
      ]
    },
    // Military Working Dog Handler (31K)
    '31K': {
      duties: [
        'Handled and trained military working dogs for security operations',
        'Conducted security patrols and detection operations',
        'Maintained working dog health and training records',
        'Coordinated with security teams for detection support'
      ]
    },
    // Interpreter/Translator (09L)
    '09L': {
      duties: [
        'Provided interpretation and translation services for military operations',
        'Maintained proficiency in assigned languages',
        'Supported communication between military personnel and local populations',
        'Coordinated with intelligence and civil affairs units'
      ]
    },
    // Psychological Operations Specialist (37F)
    '37F': {
      duties: [
        'Conducted psychological operations and information campaigns',
        'Developed and disseminated informational materials',
        'Coordinated with civil affairs and public affairs units',
        'Maintained psychological operations equipment and resources'
      ]
    },
    // Civil Affairs Specialist (38B)
    '38B': {
      duties: [
        'Conducted civil affairs operations and community engagement',
        'Coordinated with local governments and organizations',
        'Supported humanitarian assistance and reconstruction efforts',
        'Maintained civil affairs databases and operational records'
      ]
    },
    // Human Resources Specialist (42A)
    '42A': {
      duties: [
        'Managed human resources operations and personnel administration',
        'Maintained personnel records and administrative systems',
        'Coordinated personnel actions and administrative support',
        'Provided human resources support for military units'
      ]
    },
    // Religious Affairs Specialist (56M)
    '56M': {
      duties: [
        'Provided religious support and pastoral care to military personnel',
        'Coordinated religious services and ceremonies',
        'Maintained religious facilities and equipment',
        'Supported chaplaincy operations and religious programs'
      ]
    },
    // Recruiter (79R)
    '79R': {
      duties: [
        'Conducted military recruitment operations and community outreach',
        'Screened and processed potential military candidates',
        'Maintained recruitment records and administrative systems',
        'Coordinated with schools and community organizations'
      ]
    },
    // Career Counselor (79S)
    '79S': {
      duties: [
        'Provided career counseling and guidance to military personnel',
        'Maintained career development records and administrative systems',
        'Coordinated career planning and professional development',
        'Supported personnel retention and career progression programs'
      ]
    },
    // Indirect Fire Infantryman (11C)
    '11C': {
      duties: [
        'Operated and maintained indirect fire weapons systems',
        'Conducted mortar operations and fire support missions',
        'Performed weapon maintenance and ammunition handling',
        'Coordinated with fire support teams for indirect fire missions'
      ]
    },
    // Infantry Senior Sergeant (11Z)
    '11Z': {
      duties: [
        'Led infantry operations and supervised infantry teams',
        'Coordinated tactical operations and mission planning',
        'Managed infantry equipment and training programs',
        'Trained and mentored infantry personnel in combat tactics'
      ]
    },
    // Combat Engineer (12B)
    '12B': {
      duties: [
        'Conducted combat engineering operations and obstacle construction',
        'Performed demolition operations and mine clearing',
        'Built and maintained combat positions and fortifications',
        'Supported infantry and armor units with engineering support'
      ]
    },
    // Bridge Crewmember (12C)
    '12C': {
      duties: [
        'Constructed and maintained military bridges and crossing sites',
        'Operated bridge construction equipment and vehicles',
        'Performed bridge inspections and maintenance procedures',
        'Supported river crossing operations and mobility missions'
      ]
    },
    // Diver (12D)
    '12D': {
      duties: [
        'Conducted underwater operations and diving missions',
        'Performed underwater construction and salvage operations',
        'Maintained diving equipment and safety procedures',
        'Supported special operations and reconnaissance missions'
      ]
    },
    // Construction Engineering Supervisor (12H)
    '12H': {
      duties: [
        'Supervised construction engineering operations and projects',
        'Coordinated construction planning and resource management',
        'Managed construction equipment and personnel',
        'Ensured quality control and safety compliance on construction projects'
      ]
    },
    // Plumber (12K)
    '12K': {
      duties: [
        'Installed and maintained plumbing systems in military facilities',
        'Repaired plumbing fixtures and water distribution systems',
        'Performed preventive maintenance on plumbing equipment',
        'Supported construction and maintenance projects with plumbing expertise'
      ]
    },
    // Firefighter (12M)
    '12M': {
      duties: [
        'Responded to fire emergencies and conducted firefighting operations',
        'Maintained firefighting equipment and performed safety inspections',
        'Conducted fire prevention training and safety briefings',
        'Supported emergency response and disaster relief operations'
      ]
    },
    // Horizontal Construction Engineer (12N)
    '12N': {
      duties: [
        'Operated heavy construction equipment for horizontal construction projects',
        'Performed earthmoving, grading, and road construction operations',
        'Maintained construction equipment and performed preventive maintenance',
        'Supported infrastructure development and construction missions'
      ]
    },
    // Prime Power Production Specialist (12P)
    '12P': {
      duties: [
        'Operated and maintained power generation equipment and electrical systems',
        'Troubleshot power equipment malfunctions and performed repairs',
        'Conducted power system inspections and preventive maintenance',
        'Supported electrical infrastructure and power distribution operations'
      ]
    },
    // Interior Electrician (12R)
    '12R': {
      duties: [
        'Installed and maintained electrical systems in military facilities',
        'Troubleshot electrical malfunctions and performed repairs',
        'Performed electrical system inspections and preventive maintenance',
        'Supported construction and maintenance projects with electrical expertise'
      ]
    },
    // Technical Engineer (12T)
    '12T': {
      duties: [
        'Provided technical engineering support and surveying services',
        'Conducted topographic surveys and prepared engineering drawings',
        'Operated surveying equipment and performed technical calculations',
        'Supported engineering projects with technical expertise and planning'
      ]
    },
    // Concrete and Asphalt Equipment Operator (12V)
    '12V': {
      duties: [
        'Operated concrete and asphalt mixing and paving equipment',
        'Performed concrete and asphalt placement and finishing operations',
        'Maintained concrete and asphalt equipment and performed preventive maintenance',
        'Supported construction projects with concrete and asphalt expertise'
      ]
    },
    // Carpentry and Masonry Specialist (12W)
    '12W': {
      duties: [
        'Performed carpentry and masonry work for construction projects',
        'Built and repaired wooden structures and masonry components',
        'Operated carpentry and masonry tools and equipment',
        'Supported construction projects with carpentry and masonry expertise'
      ]
    }
  },
  airForce: {
    // Aircraft Loadmaster (1A2X1)
    '1A2X1': {
      duties: [
        'Planned and executed aircraft cargo loading operations for military transport missions',
        'Calculated and verified aircraft weight and balance for safe flight operations',
        'Conducted preflight and post-flight inspections of aircraft cargo systems',
        'Managed passenger safety and emergency procedures during flight operations'
      ]
    },
    // Cyber Transport Systems (3D1X2)
    '3D1X2': {
      duties: [
        'Installed and maintained cyber transport systems and network infrastructure',
        'Configured and optimized network devices for maximum performance and security',
        'Troubleshot complex network issues and implemented corrective actions',
        'Managed network security protocols and access control systems'
      ]
    },
    // Security Forces (3P0X1)
    '3P0X1': {
      duties: [
        'Conducted base defense operations and law enforcement duties',
        'Performed security checks and maintained access control points',
        'Responded to security incidents and emergencies',
        'Trained personnel in security procedures and use of force protocols'
      ]
    },
    // Aircraft Maintenance (2A5X1)
    '2A5X1': {
      duties: [
        'Performed aircraft maintenance and repair operations',
        'Conducted pre-flight and post-flight inspections',
        'Troubleshot complex aircraft system malfunctions',
        'Documented maintenance actions and maintained service records'
      ]
    },
    // Pararescue (1T2X1)
    '1T2X1': {
      duties: [
        'Conducted combat search and rescue operations',
        'Provided emergency medical treatment in hostile environments',
        'Performed tactical recovery operations of personnel and equipment',
        'Maintained proficiency in advanced parachuting and diving techniques'
      ]
    },
    // Air Traffic Control (1C1X1)
    '1C1X1': {
      duties: [
        'Controlled air traffic in military airspace and facilities',
        'Provided radar approach control services',
        'Managed ground control operations',
        'Coordinated with civilian air traffic control facilities'
      ]
    },
    // Mental Health Service (4C0X1)
    '4C0X1': {
      duties: [
        'Provided mental health services and counseling support',
        'Conducted mental health evaluations and assessments',
        'Maintained patient records and treatment plans',
        'Coordinated with medical staff for patient care'
      ]
    },
    // Survival Specialist (1T0X1)
    '1T0X1': {
      duties: [
        'Trained personnel in survival, evasion, resistance, and escape techniques',
        'Conducted survival training in various environments',
        'Maintained survival equipment and training facilities',
        'Developed and updated survival training programs'
      ]
    },
    // Financial Management (6F0X1)
    '6F0X1': {
      duties: [
        'Managed financial accounts and budget execution',
        'Processed military pay and travel vouchers',
        'Conducted financial analysis and audits',
        'Provided customer service for financial matters'
      ]
    },
    // OFFICER RATES
    // Pilot (11X)
    '11X': {
      duties: [
        'Piloted military aircraft in combat, training, and support missions',
        'Led flight operations and coordinated mission planning with ground forces',
        'Conducted air-to-air and air-to-ground combat operations',
        'Trained junior pilots and maintained proficiency in advanced flight procedures'
      ]
    },
    // Combat Systems Officer (12X)
    '12X': {
      duties: [
        'Operated advanced aircraft weapons and sensor systems',
        'Coordinated tactical operations and provided navigation support',
        'Managed electronic warfare and countermeasures systems',
        'Trained aircrew in combat systems operation and tactical procedures'
      ]
    },
    // Space Operations (13X)
    '13X': {
      duties: [
        'Managed satellite operations and space-based communication systems',
        'Coordinated space surveillance and missile warning operations',
        'Developed space mission plans and executed orbital operations',
        'Led space operations teams and maintained space situational awareness'
      ]
    },
    // Intelligence (14X)
    '14X': {
      duties: [
        'Analyzed intelligence data and prepared strategic assessments',
        'Led intelligence teams and coordinated collection operations',
        'Developed intelligence products and briefed senior leadership',
        'Managed classified systems and ensured information security protocols'
      ]
    },
    // Weather (15X)
    '15X': {
      duties: [
        'Provided meteorological support for flight operations and mission planning',
        'Analyzed weather data and prepared forecasts for military operations',
        'Operated weather observation equipment and maintained weather databases',
        'Coordinated with other agencies to provide comprehensive weather support'
      ]
    },
    // Cyberspace Operations (17X)
    '17X': {
      duties: [
        'Led cyber operations teams and managed network defense operations',
        'Developed cyber security policies and implemented protection measures',
        'Coordinated cyber incident response and threat mitigation',
        'Managed cyber warfare capabilities and offensive operations'
      ]
    },
    // Aircraft Maintenance (21X)
    '21X': {
      duties: [
        'Led aircraft maintenance operations and managed maintenance teams',
        'Developed maintenance schedules and ensured aircraft readiness',
        'Coordinated with logistics and supply for parts and equipment',
        'Supervised quality control and safety procedures in maintenance operations'
      ]
    },
    // Security Forces (31P)
    '31P': {
      duties: [
        'Led security forces operations and managed base defense activities',
        'Developed security procedures and coordinated law enforcement operations',
        'Managed personnel security and access control systems',
        'Coordinated with other agencies on security and emergency response'
      ]
    },
    // Force Support (38F)
    '38F': {
      duties: [
        'Managed personnel services and force support operations',
        'Coordinated morale, welfare, and recreation programs',
        'Supervised food service and lodging operations',
        'Developed policies for personnel support and quality of life programs'
      ]
    },
    // Scientific Research (61X)
    '61X': {
      duties: [
        'Led scientific research projects and managed research teams',
        'Developed research proposals and coordinated with academic institutions',
        'Analyzed research data and prepared technical reports',
        'Managed research budgets and laboratory operations'
      ]
    },
    // Developmental Engineering (62X)
    '62X': {
      duties: [
        'Led engineering development projects and managed technical teams',
        'Coordinated with contractors and industry partners on system development',
        'Developed technical specifications and managed system testing',
        'Supervised engineering analysis and design validation processes'
      ]
    },
    // Acquisition (63X)
    '63X': {
      duties: [
        'Managed acquisition programs and coordinated with defense contractors',
        'Developed procurement strategies and negotiated contracts',
        'Supervised program management and cost control activities',
        'Coordinated with stakeholders on requirements and delivery schedules'
      ]
    },
    // Contracting (64X)
    '64X': {
      duties: [
        'Managed contracting operations and negotiated government contracts',
        'Developed procurement policies and ensured compliance with regulations',
        'Supervised contract administration and vendor performance',
        'Coordinated with legal and financial teams on contract matters'
      ]
    },
    // Financial Management (65X)
    '65X': {
      duties: [
        'Led financial management operations and managed budget execution',
        'Developed financial policies and coordinated with accounting teams',
        'Supervised financial analysis and reporting activities',
        'Managed financial systems and ensured compliance with regulations'
      ]
    },
    // In-Flight Refueling (1A0X1)
    '1A0X1': {
      duties: [
        'Operated in-flight refueling systems on tanker aircraft',
        'Coordinated with receiver aircraft for safe and efficient fuel transfer',
        'Performed preflight and postflight inspections of refueling equipment',
        'Maintained records of refueling operations and equipment maintenance'
      ]
    },
    // Flight Engineer (1A1X1)
    '1A1X1': {
      duties: [
        'Monitored and operated aircraft systems during flight',
        'Assisted pilots with aircraft performance calculations and emergency procedures',
        'Conducted preflight and postflight inspections of aircraft systems',
        'Maintained flight logs and technical records'
      ]
    },
    // Airborne Mission Systems Specialist (1A3X1)
    '1A3X1': {
      duties: [
        'Operated and maintained airborne communication, radar, and electronic systems',
        'Monitored mission systems and provided technical support during flight',
        'Troubleshot and repaired mission equipment as needed',
        'Documented system performance and mission data'
      ]
    },
    // Airborne Operations (1A4X1)
    '1A4X1': {
      duties: [
        'Operated airborne surveillance and reconnaissance systems',
        'Supported mission planning and execution for airborne operations',
        'Monitored and reported on mission-critical data during flight',
        'Maintained and tested airborne operations equipment'
      ]
    },
    // Flight Attendant (1A6X1)
    '1A6X1': {
      duties: [
        'Provided in-flight passenger service and safety briefings',
        'Ensured passenger comfort and responded to emergencies',
        'Maintained cabin safety and security during flight',
        'Assisted with preflight and postflight cabin inspections'
      ]
    },
    // Airborne Cryptologic Language Analyst (1A8X1)
    '1A8X1': {
      duties: [
        'Intercepted and analyzed foreign language communications during flight',
        'Provided real-time translation and intelligence support to mission crews',
        'Maintained proficiency in assigned languages and mission systems',
        'Prepared intelligence reports and mission summaries'
      ]
    },
    // Airborne ISR Operator (1A8X2)
    '1A8X2': {
      duties: [
        'Operated airborne intelligence, surveillance, and reconnaissance (ISR) systems',
        'Collected and analyzed ISR data during flight missions',
        'Supported mission planning and execution for ISR operations',
        'Maintained and tested ISR equipment and systems'
      ]
    },
    // Special Missions Aviation (1A9X1)
    '1A9X1': {
      duties: [
        'Operated and maintained special mission aircraft systems',
        'Supported airdrop, airlift, and special operations missions',
        'Conducted preflight and postflight inspections of mission equipment',
        'Documented mission activities and equipment status'
      ]
    },
    // Avionics Test Station and Components (2A0X1)
    '2A0X1': {
      duties: [
        'Maintained and repaired avionics test stations and components',
        'Troubleshot and tested electronic systems for aircraft',
        'Performed preventive maintenance and system upgrades',
        'Documented maintenance actions and test results'
      ]
    },
    // SOF/PR Integrated Comm/Nav/Mission Systems (2A2X1)
    '2A2X1': {
      duties: [
        'Maintained and repaired special operations and personnel recovery communication, navigation, and mission systems',
        'Supported SOF/PR aircraft with technical expertise and troubleshooting',
        'Performed system upgrades and preventive maintenance',
        'Documented maintenance actions and mission support activities'
      ]
    },
    // Tactical Aircraft Maintenance (2A3X3)
    '2A3X3': {
      duties: [
        'Performed maintenance and repair on tactical aircraft systems',
        'Conducted preflight and postflight inspections of tactical aircraft',
        'Troubleshot and repaired aircraft malfunctions',
        'Maintained aircraft maintenance records and service logs'
      ]
    },
    // Fighter Aircraft Integrated Avionics (2A3X4)
    '2A3X4': {
      duties: [
        'Maintained and repaired integrated avionics systems on fighter aircraft',
        'Troubleshot complex avionics malfunctions and performed repairs',
        'Performed system upgrades and preventive maintenance',
        'Documented avionics maintenance actions and test results'
      ]
    },
    // Advanced Fighter Aircraft Integrated Avionics (2A3X5)
    '2A3X5': {
      duties: [
        'Maintained and repaired advanced integrated avionics systems on modern fighter aircraft',
        'Troubleshot sophisticated avionics systems and performed complex repairs',
        'Performed system upgrades and software updates',
        'Documented advanced avionics maintenance and testing procedures'
      ]
    },
    // Helicopter/Tiltrotor Aircraft Maintenance (2A5X2)
    '2A5X2': {
      duties: [
        'Performed maintenance and repair on helicopter and tiltrotor aircraft',
        'Conducted preflight and postflight inspections of rotary-wing aircraft',
        'Troubleshot and repaired helicopter and tiltrotor systems',
        'Maintained rotary-wing aircraft maintenance records'
      ]
    },
    // Refuel/Bomber Aircraft Maintenance (2A5X4)
    '2A5X4': {
      duties: [
        'Performed maintenance and repair on refueling and bomber aircraft',
        'Conducted preflight and postflight inspections of large aircraft',
        'Troubleshot and repaired refueling and bombing systems',
        'Maintained large aircraft maintenance records and service logs'
      ]
    },
    // Aerospace Propulsion (2A6X1)
    '2A6X1': {
      duties: [
        'Maintained and repaired aircraft propulsion systems and engines',
        'Performed engine inspections and preventive maintenance',
        'Troubleshot propulsion system malfunctions and performed repairs',
        'Maintained engine maintenance records and service logs'
      ]
    },
    // Aerospace Ground Equipment (2A6X2)
    '2A6X2': {
      duties: [
        'Maintained and repaired aerospace ground support equipment',
        'Performed preventive maintenance on ground equipment',
        'Troubleshot equipment malfunctions and performed repairs',
        'Maintained ground equipment service records and maintenance logs'
      ]
    },
    // Aircrew Egress Systems (2A6X3)
    '2A6X3': {
      duties: [
        'Maintained and repaired aircraft ejection seats and egress systems',
        'Performed safety inspections and testing of egress equipment',
        'Troubleshot egress system malfunctions and performed repairs',
        'Maintained egress system safety records and maintenance logs'
      ]
    },
    // Aircraft Fuel Systems (2A6X4)
    '2A6X4': {
      duties: [
        'Maintained and repaired aircraft fuel systems and components',
        'Performed fuel system inspections and preventive maintenance',
        'Troubleshot fuel system malfunctions and performed repairs',
        'Maintained fuel system service records and safety logs'
      ]
    },
    // Aircraft Hydraulic Systems (2A6X5)
    '2A6X5': {
      duties: [
        'Maintained and repaired aircraft hydraulic systems and components',
        'Performed hydraulic system inspections and preventive maintenance',
        'Troubleshot hydraulic system malfunctions and performed repairs',
        'Maintained hydraulic system service records and maintenance logs'
      ]
    },
    // Aircraft Electrical and Environmental Systems (2A6X6)
    '2A6X6': {
      duties: [
        'Maintained and repaired aircraft electrical and environmental systems',
        'Performed system inspections and preventive maintenance',
        'Troubleshot electrical and environmental system malfunctions',
        'Maintained system service records and maintenance logs'
      ]
    },
    // Aircraft Metals Technology (2A7X1)
    '2A7X1': {
      duties: [
        'Performed metal fabrication and repair on aircraft components',
        'Conducted welding, brazing, and metalworking operations',
        'Maintained metalworking equipment and tools',
        'Documented metal fabrication and repair procedures'
      ]
    },
    // Nondestructive Inspection (2A7X2)
    '2A7X2': {
      duties: [
        'Conducted nondestructive inspection of aircraft components',
        'Used advanced testing equipment to detect defects and damage',
        'Performed ultrasonic, radiographic, and other inspection methods',
        'Documented inspection results and maintained quality control records'
      ]
    },
    // Aircraft Structural Maintenance (2A7X3)
    '2A7X3': {
      duties: [
        'Performed structural maintenance and repair on aircraft',
        'Conducted sheet metal work and structural inspections',
        'Repaired aircraft structural components and assemblies',
        'Maintained structural maintenance records and service logs'
      ]
    },
    // Low Observable Aircraft Structural Maintenance (2A7X5)
    '2A7X5': {
      duties: [
        'Maintained and repaired stealth aircraft structural components',
        'Applied specialized coatings and materials for low observability',
        'Performed structural repairs while maintaining stealth characteristics',
        'Documented stealth maintenance procedures and material applications'
      ]
    },
    // Mobility Air Forces Integrated Comm/Nav/Mission Systems (2A8X1)
    '2A8X1': {
      duties: [
        'Maintained and repaired integrated communication, navigation, and mission systems on mobility aircraft',
        'Supported airlift and tanker operations with technical expertise',
        'Performed system upgrades and preventive maintenance',
        'Documented maintenance actions and mission support activities'
      ]
    },
    // Mobility Air Forces Integrated Instrument and Flight Control Systems (2A8X2)
    '2A8X2': {
      duties: [
        'Maintained and repaired integrated instrument and flight control systems on mobility aircraft',
        'Troubleshot complex flight control and instrumentation systems',
        'Performed system upgrades and preventive maintenance',
        'Documented flight control maintenance and testing procedures'
      ]
    },
    // Bomber/Special Integrated Comm/Nav/Mission Systems (2A9X1)
    '2A9X1': {
      duties: [
        'Maintained and repaired integrated communication, navigation, and mission systems on bomber and special aircraft',
        'Supported strategic bombing and special operations missions',
        'Performed system upgrades and preventive maintenance',
        'Documented maintenance actions and mission support activities'
      ]
    },
    // Bomber/Special Electronic Warfare and Radar Surveillance Integrated Avionics (2A9X2)
    '2A9X2': {
      duties: [
        'Maintained and repaired electronic warfare and radar surveillance systems on bomber and special aircraft',
        'Troubleshot complex electronic warfare and radar systems',
        'Performed system upgrades and preventive maintenance',
        'Documented electronic warfare maintenance and testing procedures'
      ]
    },
    // Bomber/Special Electronic Warfare and Radar Surveillance Integrated Avionics (2A9X3)
    '2A9X3': {
      duties: [
        'Maintained and repaired advanced electronic warfare and radar surveillance systems on bomber and special aircraft',
        'Troubleshot sophisticated electronic warfare and radar systems',
        'Performed system upgrades and software updates',
        'Documented advanced electronic warfare maintenance procedures'
      ]
    },
    // Fuels (2F0X1)
    '2F0X1': {
      duties: [
        'Managed and operated fuel storage and distribution systems',
        'Conducted fuel quality testing and contamination control',
        'Maintained fuel handling equipment and safety procedures',
        'Documented fuel operations and maintained inventory records'
      ]
    },
    // Logistics Plans (2G0X1)
    '2G0X1': {
      duties: [
        'Developed and coordinated logistics plans for military operations',
        'Analyzed supply chain requirements and transportation needs',
        'Coordinated with multiple agencies for logistics support',
        'Maintained logistics databases and planning documentation'
      ]
    },
    // Missile and Space Systems Electronic Maintenance (2M0X1)
    '2M0X1': {
      duties: [
        'Maintained and repaired electronic systems for missile and space systems',
        'Troubleshot complex electronic malfunctions and performed repairs',
        'Performed system upgrades and preventive maintenance',
        'Documented electronic maintenance actions and test results'
      ]
    },
    // Missile and Space Systems Maintenance (2M0X2)
    '2M0X2': {
      duties: [
        'Performed maintenance and repair on missile and space systems',
        'Conducted system inspections and preventive maintenance',
        'Troubleshot system malfunctions and performed repairs',
        'Maintained missile and space systems service records'
      ]
    },
    // Missile and Space Facilities (2M0X3)
    '2M0X3': {
      duties: [
        'Maintained and operated missile and space facilities',
        'Performed facility inspections and preventive maintenance',
        'Troubleshot facility system malfunctions and performed repairs',
        'Maintained facility service records and safety logs'
      ]
    },
    // Precision Measurement Equipment Laboratory (2P0X1)
    '2P0X1': {
      duties: [
        'Operated precision measurement equipment laboratory',
        'Calibrated and maintained measurement standards and equipment',
        'Performed precision measurements and quality control testing',
        'Documented calibration procedures and measurement results'
      ]
    },
    // Maintenance Management Analysis (2R0X1)
    '2R0X1': {
      duties: [
        'Analyzed maintenance data and performance metrics',
        'Developed maintenance management reports and recommendations',
        'Coordinated maintenance planning and resource allocation',
        'Maintained maintenance databases and analytical tools'
      ]
    },
    // Maintenance Management Production (2R1X1)
    '2R1X1': {
      duties: [
        'Managed maintenance production schedules and workflows',
        'Coordinated maintenance activities and resource utilization',
        'Monitored maintenance progress and quality control',
        'Maintained production records and performance metrics'
      ]
    },
    // Materiel Management (2S0X1)
    '2S0X1': {
      duties: [
        'Managed materiel inventory and supply chain operations',
        'Coordinated procurement and distribution of materials',
        'Maintained inventory records and conducted audits',
        'Provided materiel support for maintenance operations'
      ]
    },
    // Traffic Management (2T0X1)
    '2T0X1': {
      duties: [
        'Managed traffic operations and transportation planning',
        'Coordinated vehicle movements and route planning',
        'Maintained traffic control systems and equipment',
        'Documented traffic operations and safety procedures'
      ]
    },
    // Vehicle Operations (2T1X1)
    '2T1X1': {
      duties: [
        'Operated military vehicles for personnel and cargo transportation',
        'Maintained vehicle equipment and performed preventive maintenance',
        'Coordinated vehicle operations and route planning',
        'Provided vehicle support for military operations'
      ]
    },
    // Air Transportation (2T2X1)
    '2T2X1': {
      duties: [
        'Coordinated air transportation operations and logistics',
        'Managed cargo loading and unloading operations',
        'Maintained air transportation records and documentation',
        'Provided air transportation support for military operations'
      ]
    },
    // Mission Generation Vehicular Equipment Maintenance (2T3X1)
    '2T3X1': {
      duties: [
        'Maintained and repaired mission generation vehicular equipment',
        'Performed equipment inspections and preventive maintenance',
        'Troubleshot equipment malfunctions and performed repairs',
        'Maintained equipment service records and maintenance logs'
      ]
    },
    // Special Vehicle Maintenance (2T3X2)
    '2T3X2': {
      duties: [
        'Maintained and repaired special purpose vehicles',
        'Performed specialized vehicle inspections and maintenance',
        'Troubleshot special vehicle malfunctions and performed repairs',
        'Maintained special vehicle service records and maintenance logs'
      ]
    },
    // Vehicle Management and Analysis (2T3X7)
    '2T3X7': {
      duties: [
        'Analyzed vehicle fleet performance and maintenance data',
        'Developed vehicle management strategies and recommendations',
        'Coordinated vehicle fleet operations and resource allocation',
        'Maintained vehicle management databases and analytical tools'
      ]
    },
    // Munitions Systems (2W0X1)
    '2W0X1': {
      duties: [
        'Managed munitions systems and explosive ordnance',
        'Maintained munitions storage facilities and safety procedures',
        'Coordinated munitions distribution and inventory control',
        'Provided munitions support for military operations'
      ]
    },
    // Aircraft Armament Systems (2W1X1)
    '2W1X1': {
      duties: [
        'Maintained and repaired aircraft armament systems',
        'Performed armament system inspections and preventive maintenance',
        'Troubleshot armament system malfunctions and performed repairs',
        'Maintained armament system service records and safety logs'
      ]
    },
    // Nuclear Weapons (2W2X1)
    '2W2X1': {
      duties: [
        'Maintained and secured nuclear weapons systems',
        'Performed nuclear weapons inspections and safety procedures',
        'Coordinated nuclear weapons logistics and security protocols',
        'Maintained nuclear weapons service records and security logs'
      ]
    },
    // Health Services Management (4A0X1)
    '4A0X1': {
      duties: [
        'Managed health services operations and administrative functions',
        'Coordinated medical facility operations and patient care',
        'Maintained health services records and administrative systems',
        'Provided administrative support for medical operations'
      ]
    },
    // Medical Materiel (4A1X1)
    '4A1X1': {
      duties: [
        'Managed medical materiel inventory and supply chain operations',
        'Coordinated procurement and distribution of medical supplies',
        'Maintained medical inventory records and conducted audits',
        'Provided medical materiel support for healthcare operations'
      ]
    },
    // Biomedical Equipment (4A2X1)
    '4A2X1': {
      duties: [
        'Maintained and repaired biomedical equipment and medical devices',
        'Troubleshot medical equipment malfunctions and performed repairs',
        'Performed equipment inspections and preventive maintenance',
        'Maintained medical equipment service records and maintenance logs'
      ]
    },
    // Bioenvironmental Engineering (4B0X1)
    '4B0X1': {
      duties: [
        'Conducted environmental health assessments and monitoring',
        'Analyzed workplace hazards and environmental conditions',
        'Developed environmental health recommendations and protocols',
        'Maintained environmental health records and monitoring data'
      ]
    },
    // Diet Therapy (4D0X1)
    '4D0X1': {
      duties: [
        'Provided diet therapy and nutritional counseling services',
        'Developed and implemented therapeutic diet plans',
        'Coordinated with medical staff for patient nutrition care',
        'Maintained nutrition records and dietary documentation'
      ]
    },
    // Public Health (4E0X1)
    '4E0X1': {
      duties: [
        'Conducted public health assessments and disease prevention programs',
        'Coordinated public health initiatives and community outreach',
        'Maintained public health records and epidemiological data',
        'Provided public health support for military communities'
      ]
    },
    // Cardiopulmonary Laboratory (4H0X1)
    '4H0X1': {
      duties: [
        'Conducted cardiopulmonary diagnostic testing and procedures',
        'Operated cardiopulmonary laboratory equipment and systems',
        'Maintained laboratory equipment and performed quality control',
        'Documented test results and maintained patient records'
      ]
    },
    // Physical Medicine (4J0X2)
    '4J0X2': {
      duties: [
        'Provided physical medicine and rehabilitation services',
        'Conducted physical therapy assessments and treatments',
        'Maintained physical medicine equipment and facilities',
        'Coordinated with medical staff for patient rehabilitation care'
      ]
    },
    // Aerospace Medical Service (4N0X1)
    '4N0X1': {
      duties: [
        'Provided aerospace medical services and flight medicine support',
        'Conducted flight physical examinations and medical assessments',
        'Maintained aerospace medical records and documentation',
        'Coordinated with flight medicine teams for medical support'
      ]
    },
    // Pharmacy (4P0X1)
    '4P0X1': {
      duties: [
        'Assisted pharmacists in dispensing medications and pharmaceutical care',
        'Maintained pharmacy inventory and managed pharmaceutical supplies',
        'Prepared medication orders and maintained patient records',
        'Coordinated with medical staff for pharmaceutical support'
      ]
    },
    // Diagnostic Imaging (4R0X1)
    '4R0X1': {
      duties: [
        'Operated diagnostic imaging equipment and performed medical imaging',
        'Maintained imaging equipment and performed quality control',
        'Prepared imaging reports and maintained patient records',
        'Coordinated with medical staff for diagnostic imaging support'
      ]
    },
    // Medical Laboratory (4T0X1)
    '4T0X1': {
      duties: [
        'Conducted medical laboratory tests and analysis',
        'Maintained laboratory equipment and performed quality control',
        'Prepared laboratory reports and maintained patient records',
        'Coordinated with medical staff for laboratory support'
      ]
    },
    // Histopathology (4T0X2)
    '4T0X2': {
      duties: [
        'Conducted histopathological analysis and tissue examination',
        'Maintained histopathology laboratory equipment and procedures',
        'Prepared histopathology reports and maintained patient records',
        'Coordinated with medical staff for histopathology support'
      ]
    },
    // Ophthalmic (4V0X1)
    '4V0X1': {
      duties: [
        'Provided ophthalmic services and eye care support',
        'Conducted eye examinations and vision testing',
        'Maintained ophthalmic equipment and facilities',
        'Coordinated with medical staff for ophthalmic care'
      ]
    },
    // Dental Assistant (4Y0X1)
    '4Y0X1': {
      duties: [
        'Assisted dentists in providing oral health care to personnel',
        'Prepared patients and dental instruments for procedures',
        'Maintained dental records and managed supplies',
        'Supported dental readiness and preventive care programs'
      ]
    },
    // Dental Laboratory (4Y0X2)
    '4Y0X2': {
      duties: [
        'Fabricated dental prosthetics and laboratory restorations',
        'Maintained dental laboratory equipment and materials',
        'Performed dental laboratory procedures and quality control',
        'Coordinated with dental staff for laboratory support'
      ]
    },
    // Aviation Maintenance Technician (AMT)
    'AMT': {
      duties: [
        'Maintained and repaired aircraft systems and components',
        'Conducted aircraft inspections and preventive maintenance',
        'Troubleshot aircraft malfunctions and performed repairs',
        'Ensured aircraft operational readiness for Coast Guard missions'
      ]
    },
    // Avionics Electrical Technician (AET)
    'AET': {
      duties: [
        'Maintained and repaired aircraft avionics and electrical systems',
        'Troubleshot avionics malfunctions and performed repairs',
        'Conducted system inspections and preventive maintenance',
        'Ensured avionics system operational readiness'
      ]
    },
    // Aviation Survival Technician (AST)
    'AST': {
      duties: [
        'Provided search and rescue operations as helicopter crew member',
        'Conducted emergency medical care and recovery in maritime environments',
        'Maintained rescue equipment and survival gear',
        'Trained in advanced swimming and lifesaving techniques'
      ]
    },
    // Machinery Technician (MK)
    'MK': {
      duties: [
        'Maintained and repaired shipboard machinery and propulsion systems',
        'Conducted engine room operations and equipment maintenance',
        'Troubleshot machinery malfunctions and performed repairs',
        'Ensured vessel propulsion and auxiliary system readiness'
      ]
    },
    // Health Services Technician (HS)
    'HS': {
      duties: [
        'Provided medical care and health services to Coast Guard personnel',
        'Conducted medical examinations and preventive health programs',
        'Maintained medical records and managed medical supplies',
        'Supported Coast Guard medical readiness and health programs'
      ]
    },
    // Investigator (IV)
    'IV': {
      duties: [
        'Conducted criminal investigations and law enforcement operations',
        'Gathered evidence and interviewed witnesses for investigations',
        'Maintained investigative records and case documentation',
        'Supported Coast Guard law enforcement and security missions'
      ]
    },
    // Marine Science Technician (MST)
    'MST': {
      duties: [
        'Conducted marine environmental protection and pollution response',
        'Monitored marine safety and environmental compliance',
        'Maintained environmental monitoring equipment and procedures',
        'Supported Coast Guard environmental protection missions'
      ]
    },
    // Maritime Security Response Team (MSRT)
    'MSRT': {
      duties: [
        'Conducted maritime security and counter-terrorism operations',
        'Performed tactical law enforcement and security missions',
        'Maintained specialized security equipment and tactical skills',
        'Supported Coast Guard maritime security and protection missions'
      ]
    },
    // Tactical Law Enforcement Team (TACLET)
    'TACLET': {
      duties: [
        'Conducted tactical law enforcement operations in maritime environments',
        'Performed drug interdiction and maritime law enforcement',
        'Maintained tactical equipment and law enforcement skills',
        'Supported Coast Guard law enforcement and interdiction missions'
      ]
    },
    // Port Security Unit (PSU)
    'PSU': {
      duties: [
        'Provided port security and maritime protection operations',
        'Conducted security patrols and threat assessments',
        'Maintained security equipment and operational procedures',
        'Supported Coast Guard port security and protection missions'
      ]
    },
    // Maritime Safety and Security Team (MSST)
    'MSST': {
      duties: [
        'Conducted maritime safety and security operations',
        'Performed security assessments and protective operations',
        'Maintained security equipment and operational readiness',
        'Supported Coast Guard maritime safety and security missions'
      ]
    },
    // Deployable Specialized Forces (DSF)
    'DSF': {
      duties: [
        'Conducted specialized maritime operations and missions',
        'Performed tactical operations and specialized training',
        'Maintained specialized equipment and operational capabilities',
        'Supported Coast Guard specialized mission requirements'
      ]
    },
    // Helicopter Interdiction Tactical Squadron (HITRON)
    'HITRON': {
      duties: [
        'Conducted helicopter interdiction operations for law enforcement',
        'Performed aerial surveillance and interdiction missions',
        'Maintained helicopter systems and tactical equipment',
        'Supported Coast Guard aerial law enforcement operations'
      ]
    },
    // Patrol Forces Southwest Asia (PATFORSWA)
    'PATFORSWA': {
      duties: [
        'Conducted maritime patrol operations in Southwest Asia',
        'Performed security and law enforcement missions',
        'Maintained patrol vessel systems and operational readiness',
        'Supported Coast Guard international maritime operations'
      ]
    },
    // Information Technology - Cyber (IT-C)
    'IT-C': {
      duties: [
        'Conducted cybersecurity operations and cyber defense',
        'Managed cyber security systems and threat response',
        'Maintained cybersecurity policies and procedures',
        'Supported Coast Guard cyber security and information assurance'
      ]
    },
    // Information Technology - Information Assurance (IT-I)
    'IT-I': {
      duties: [
        'Ensured information assurance and security compliance',
        'Conducted security assessments and vulnerability analysis',
        'Maintained information security policies and procedures',
        'Supported Coast Guard information security and assurance'
      ]
    },
    // Information Technology - Network Specialist (IT-N)
    'IT-N': {
      duties: [
        'Maintained and operated Coast Guard network systems',
        'Troubleshot network connectivity and performance issues',
        'Managed network infrastructure and communication systems',
        'Supported Coast Guard information technology operations'
      ]
    },
    // Intelligence Specialist - Imagery (IS-I)
    'IS-I': {
      duties: [
        'Analyzed imagery intelligence for Coast Guard operations',
        'Processed and interpreted aerial and satellite imagery',
        'Maintained imagery analysis databases and tools',
        'Provided imagery intelligence support for Coast Guard missions'
      ]
    },
    // Intelligence Specialist - Cryptology (IS-C)
    'IS-C': {
      duties: [
        'Conducted cryptologic analysis for Coast Guard operations',
        'Processed and analyzed encrypted communications and signals',
        'Maintained cryptologic databases and analytical tools',
        'Provided cryptologic intelligence support for Coast Guard missions'
      ]
    }
  },
  marines: {
    // Infantry (0311)
    '0311': {
      duties: [
        'Conducted combat operations and tactical maneuvers in various environments',
        'Led fire team operations and coordinated small unit tactics',
        'Operated and maintained various infantry weapons systems',
        'Participated in specialized training and combat readiness exercises'
      ]
    },
    // Combat Engineer (1371)
    '1371': {
      duties: [
        'Constructed and maintained defensive positions and tactical obstacles',
        'Conducted route clearance operations and explosive hazard removal',
        'Performed demolition operations and breaching procedures',
        'Supported mobility and counter-mobility operations in combat zones'
      ]
    },
    // Aircraft Maintenance Engineer (6046)
    '6046': {
      duties: [
        'Performed scheduled and unscheduled maintenance on aircraft systems',
        'Diagnosed and repaired complex aircraft mechanical problems',
        'Maintained detailed maintenance records and documentation',
        'Coordinated with other maintenance personnel to ensure aircraft readiness'
      ]
    },
    // Intelligence Specialist (0231)
    '0231': {
      duties: [
        'Collected and analyzed military intelligence',
        'Prepared intelligence briefings and reports',
        'Maintained intelligence databases and files',
        'Supported mission planning with intelligence products'
      ]
    },
    // Communications Specialist (0621)
    '0621': {
      duties: [
        'Installed and operated tactical communication systems',
        'Maintained radio and satellite communication equipment',
        'Implemented communication security procedures',
        'Trained personnel in communication equipment operation'
      ]
    },
    // Logistics Specialist (0411)
    '0411': {
      duties: [
        'Managed military supply and logistics operations',
        'Coordinated transportation of personnel and equipment',
        'Maintained inventory control systems',
        'Processed logistics requests and tracked shipments'
      ]
    },
    // Financial Management Resource Analyst (3451)
    '3451': {
      duties: [
        'Analyzed financial data and prepared budget reports',
        'Managed accounting systems and financial records',
        'Processed financial transactions and payments',
        'Conducted internal audits and financial reviews'
      ]
    },
    // Combat Camera (4671)
    '4671': {
      duties: [
        'Documented military operations through photography and videography',
        'Edited and produced multimedia content',
        'Maintained imaging equipment and archives',
        'Supported public affairs and combat documentation missions'
      ]
    },
    // Chemical Biological Radiological Nuclear Defense (5711)
    '5711': {
      duties: [
        'Conducted CBRN reconnaissance and surveillance',
        'Performed decontamination operations',
        'Maintained CBRN detection and protective equipment',
        'Trained personnel in CBRN defense procedures'
      ]
    },
    // OFFICER RATES
    // Ground Intelligence Officer (0102)
    '0102': {
      duties: [
        'Led intelligence operations and managed intelligence collection activities',
        'Analyzed tactical intelligence and provided assessments to command',
        'Coordinated with other intelligence agencies and units',
        'Developed intelligence products and briefed senior leadership on threats'
      ]
    },
    // Adjutant (0180)
    '0180': {
      duties: [
        'Managed administrative operations and personnel services',
        'Coordinated staff functions and maintained command protocols',
        'Supervised administrative personnel and office operations',
        'Developed policies and procedures for administrative efficiency'
      ]
    },
    // Intelligence Officer (0202)
    '0202': {
      duties: [
        'Led intelligence units and coordinated intelligence operations',
        'Developed intelligence collection plans and managed analysis teams',
        'Prepared strategic intelligence assessments and briefings',
        'Coordinated with joint and coalition intelligence organizations'
      ]
    },
    // Infantry Officer (0302)
    '0302': {
      duties: [
        'Led infantry units in combat operations and tactical missions',
        'Developed tactical plans and coordinated with supporting units',
        'Managed personnel and equipment readiness for combat deployments',
        'Trained and mentored subordinate leaders in infantry tactics'
      ]
    },
    // Logistics Officer (0402)
    '0402': {
      duties: [
        'Led logistics operations and managed supply chain activities',
        'Coordinated transportation and distribution of supplies and equipment',
        'Developed logistics plans and managed resource allocation',
        'Supervised logistics personnel and maintained operational readiness'
      ]
    },
    // Communications Officer (0602)
    '0602': {
      duties: [
        'Led communications units and managed communication systems',
        'Developed communication plans and coordinated network operations',
        'Supervised communication equipment maintenance and operations',
        'Coordinated with other units to ensure communication connectivity'
      ]
    },
    // Field Artillery Officer (0802)
    '0802': {
      duties: [
        'Led artillery units and coordinated fire support operations',
        'Developed fire plans and managed artillery targeting procedures',
        'Coordinated with infantry and other units for integrated fire support',
        'Supervised artillery equipment maintenance and crew training'
      ]
    },
    // Combat Engineer Officer (1302)
    '1302': {
      duties: [
        'Led engineering units in construction and combat engineering operations',
        'Planned and supervised infrastructure projects and facility construction',
        'Coordinated explosive ordnance disposal and route clearance operations',
        'Managed engineering resources and equipment for mission success'
      ]
    },
    // Tank Officer (1802)
    '1802': {
      duties: [
        'Led armored units and coordinated tank operations',
        'Developed tactical plans for armored warfare and combined arms operations',
        'Supervised tank maintenance and crew training programs',
        'Coordinated with infantry and artillery for integrated combat operations'
      ]
    },
    // Aviation Ground Support Officer (7502)
    '7502': {
      duties: [
        'Led aviation ground support operations and managed maintenance activities',
        'Coordinated aircraft servicing and ground support equipment operations',
        'Supervised aviation logistics and supply chain management',
        'Developed procedures for aviation ground support and safety protocols'
      ]
    },
    // Pilot (7509)
    '7509': {
      duties: [
        'Piloted military aircraft in combat, training, and support missions',
        'Led flight operations and coordinated mission planning',
        'Conducted close air support and tactical aviation operations',
        'Trained junior pilots and maintained proficiency in flight procedures'
      ]
    },
    // Air Traffic Controller Officer (7563)
    '7563': {
      duties: [
        'Led air traffic control operations and managed airfield activities',
        'Coordinated aircraft movements and maintained flight safety',
        'Supervised air traffic control personnel and equipment',
        'Developed procedures for air traffic management and emergency response'
      ]
    },
    // LAV Crewman (0313)
    '0313': {
      duties: [
        'Operated and maintained Light Armored Vehicles (LAVs) in support of reconnaissance and combat operations',
        'Assisted in vehicle navigation, gunnery, and communications',
        'Conducted preventive maintenance and minor repairs on LAVs',
        'Supported unit mobility and firepower during missions'
      ]
    },
    // Reconnaissance Marine (0321)
    '0321': {
      duties: [
        'Conducted amphibious and ground reconnaissance operations',
        'Gathered intelligence and performed surveillance behind enemy lines',
        'Operated specialized reconnaissance equipment and weaponry',
        'Supported direct action and special operations missions'
      ]
    },
    // Machine Gunner (0331)
    '0331': {
      duties: [
        'Operated and maintained machine guns in support of infantry operations',
        'Provided suppressive fire and covered unit movements',
        'Conducted weapons maintenance and ammunition management',
        'Supported defensive and offensive combat operations'
      ]
    },
    // Mortarman (0341)
    '0341': {
      duties: [
        'Operated and maintained mortar systems for indirect fire support',
        'Calculated firing data and coordinated fire missions',
        'Conducted ammunition handling and safety procedures',
        'Supported infantry units with indirect fire during combat'
      ]
    },
    // Infantry Assault Marine (0351)
    '0351': {
      duties: [
        'Operated assault weapons and demolitions in support of infantry operations',
        'Conducted breaching, demolition, and anti-armor missions',
        'Maintained and employed specialized assault equipment',
        'Supported maneuver units in offensive and defensive operations'
      ]
    },
    // Antitank Missile Gunner (0352)
    '0352': {
      duties: [
        'Operated and maintained antitank missile systems',
        'Engaged and destroyed enemy armored vehicles and fortifications',
        'Conducted target acquisition and fire control operations',
        'Supported infantry units with anti-armor capabilities'
      ]
    },
    // Infantry Unit Leader (0369)
    '0369': {
      duties: [
        'Led and supervised infantry units in combat and training operations',
        'Coordinated tactical movements and fire support',
        'Managed personnel, logistics, and mission planning',
        'Ensured unit readiness and discipline during operations'
      ]
    },
    // Field Artillery Cannoneer (0811)
    '0811': {
      duties: [
        'Operated and maintained field artillery weapons and equipment',
        'Loaded, aimed, and fired artillery pieces during fire missions',
        'Conducted ammunition handling and safety procedures',
        'Supported fire support operations for maneuver units'
      ]
    },
    // Field Artillery Radar Operator (0842)
    '0842': {
      duties: [
        'Operated radar systems to detect and track artillery projectiles',
        'Provided targeting data for counter-battery fire',
        'Maintained and calibrated radar equipment',
        'Supported artillery units with technical fire support'
      ]
    },
    // Field Artillery Fire Control Marine (0844)
    '0844': {
      duties: [
        'Coordinated and executed fire control operations for artillery units',
        'Calculated firing data and managed fire direction centers',
        'Maintained fire control equipment and communication systems',
        'Supported accurate and timely artillery fire missions'
      ]
    },
    // Artillery Sensor Support Marine (0847)
    '0847': {
      duties: [
        'Operated and maintained artillery sensor systems and equipment',
        'Provided technical support for artillery fire control operations',
        'Maintained sensor calibration and system accuracy',
        'Supported artillery units with sensor data and technical expertise'
      ]
    },
    // Fire Support Marine (0861)
    '0861': {
      duties: [
        'Coordinated fire support operations for infantry and maneuver units',
        'Calculated firing data and coordinated with artillery units',
        'Maintained fire support equipment and communication systems',
        'Provided fire support planning and coordination during combat'
      ]
    },
    // Bulk Fuel Specialist (1391)
    '1391': {
      duties: [
        'Managed bulk fuel operations and distribution systems',
        'Conducted fuel quality testing and contamination control',
        'Maintained fuel storage facilities and safety procedures',
        'Provided fuel support for Marine Corps operations'
      ]
    },
    // M1A1 Tank Crewman (1812)
    '1812': {
      duties: [
        'Operated and maintained M1A1 tank systems and equipment',
        'Conducted tank operations in support of ground combat missions',
        'Performed tank maintenance and weapons system operations',
        'Supported armored operations and maneuver warfare'
      ]
    },
    // Assault Amphibious Vehicle (AAV) Crewmember (1833)
    '1833': {
      duties: [
        'Operated and maintained Assault Amphibious Vehicles (AAVs)',
        'Conducted amphibious operations and waterborne transport',
        'Performed vehicle maintenance and crew coordination',
        'Supported amphibious assault and transport operations'
      ]
    },
    // Individual Material Readiness List (IMRL) Asset Manager (6042)
    '6042': {
      duties: [
        'Managed Individual Material Readiness List (IMRL) assets and inventory',
        'Coordinated asset tracking and accountability procedures',
        'Maintained IMRL databases and reporting systems',
        'Provided asset management support for aviation operations'
      ]
    },
    // Flight Equipment Technician (6048)
    '6048': {
      duties: [
        'Maintained and repaired flight equipment and survival gear',
        'Conducted equipment inspections and safety testing',
        'Performed preventive maintenance on flight equipment',
        'Ensured flight equipment readiness for aviation operations'
      ]
    },
    // Aviation Meteorological Equipment Technician (6051)
    '6051': {
      duties: [
        'Maintained and operated aviation meteorological equipment',
        'Calibrated weather monitoring and forecasting systems',
        'Provided technical support for weather data collection',
        'Supported aviation operations with meteorological information'
      ]
    },
    // Helicopter/Tiltrotor Mechanic - Trainee (6111)
    '6111': {
      duties: [
        'Trained in helicopter and tiltrotor maintenance procedures',
        'Assisted experienced mechanics in aircraft maintenance tasks',
        'Learned aircraft systems and maintenance protocols',
        'Supported aviation maintenance operations under supervision'
      ]
    },
    // Helicopter Mechanic - CH-46 (6112)
    '6112': {
      duties: [
        'Maintained and repaired CH-46 helicopter systems and components',
        'Conducted aircraft inspections and preventive maintenance',
        'Troubleshot helicopter malfunctions and performed repairs',
        'Ensured CH-46 helicopter operational readiness'
      ]
    },
    // Helicopter Mechanic - CH-53 (6113)
    '6113': {
      duties: [
        'Maintained and repaired CH-53 helicopter systems and components',
        'Conducted aircraft inspections and preventive maintenance',
        'Troubleshot helicopter malfunctions and performed repairs',
        'Ensured CH-53 helicopter operational readiness'
      ]
    },
    // Helicopter Mechanic - UH-1 (6114)
    '6114': {
      duties: [
        'Maintained and repaired UH-1 helicopter systems and components',
        'Conducted aircraft inspections and preventive maintenance',
        'Troubleshot helicopter malfunctions and performed repairs',
        'Ensured UH-1 helicopter operational readiness'
      ]
    },
    // Tiltrotor Mechanic - MV-22 (6116)
    '6116': {
      duties: [
        'Maintained and repaired MV-22 tiltrotor systems and components',
        'Conducted aircraft inspections and preventive maintenance',
        'Troubleshot tiltrotor malfunctions and performed repairs',
        'Ensured MV-22 tiltrotor operational readiness'
      ]
    },
    // Helicopter Power Plants Mechanic - T58 (6122)
    '6122': {
      duties: [
        'Maintained and repaired T58 helicopter power plant systems',
        'Conducted engine inspections and preventive maintenance',
        'Troubleshot power plant malfunctions and performed repairs',
        'Ensured T58 engine operational readiness'
      ]
    },
    // Helicopter Power Plants Mechanic - T64 (6123)
    '6123': {
      duties: [
        'Maintained and repaired T64 helicopter power plant systems',
        'Conducted engine inspections and preventive maintenance',
        'Troubleshot power plant malfunctions and performed repairs',
        'Ensured T64 engine operational readiness'
      ]
    },
    // Helicopter Power Plants Mechanic - T400/T700 (6124)
    '6124': {
      duties: [
        'Maintained and repaired T400/T700 helicopter power plant systems',
        'Conducted engine inspections and preventive maintenance',
        'Troubleshot power plant malfunctions and performed repairs',
        'Ensured T400/T700 engine operational readiness'
      ]
    },
    // Helicopter/Tiltrotor Dynamic Components Mechanic (6132)
    '6132': {
      duties: [
        'Maintained and repaired helicopter and tiltrotor dynamic components',
        'Conducted rotor system inspections and maintenance',
        'Troubleshot dynamic component malfunctions and performed repairs',
        'Ensured rotor system operational readiness'
      ]
    },
    // Helicopter Airframe Mechanic - CH-46 (6152)
    '6152': {
      duties: [
        'Maintained and repaired CH-46 helicopter airframe systems',
        'Conducted airframe inspections and structural maintenance',
        'Troubleshot airframe malfunctions and performed repairs',
        'Ensured CH-46 airframe structural integrity'
      ]
    },
    // Helicopter Airframe Mechanic - CH-53 (6153)
    '6153': {
      duties: [
        'Maintained and repaired CH-53 helicopter airframe systems',
        'Conducted airframe inspections and structural maintenance',
        'Troubleshot airframe malfunctions and performed repairs',
        'Ensured CH-53 airframe structural integrity'
      ]
    },
    // Helicopter Airframe Mechanic - UH-1 (6154)
    '6154': {
      duties: [
        'Maintained and repaired UH-1 helicopter airframe systems',
        'Conducted airframe inspections and structural maintenance',
        'Troubleshot airframe malfunctions and performed repairs',
        'Ensured UH-1 airframe structural integrity'
      ]
    },
    // Tiltrotor Airframe Mechanic - MV-22 (6156)
    '6156': {
      duties: [
        'Maintained and repaired MV-22 tiltrotor airframe systems',
        'Conducted airframe inspections and structural maintenance',
        'Troubleshot airframe malfunctions and performed repairs',
        'Ensured MV-22 airframe structural integrity'
      ]
    },
    // Helicopter Crew Chief - CH-46 (6172)
    '6172': {
      duties: [
        'Served as crew chief for CH-46 helicopter operations',
        'Coordinated aircraft maintenance and crew activities',
        'Conducted preflight and postflight inspections',
        'Ensured CH-46 helicopter mission readiness'
      ]
    },
    // Helicopter Crew Chief - CH-53 (6173)
    '6173': {
      duties: [
        'Served as crew chief for CH-53 helicopter operations',
        'Coordinated aircraft maintenance and crew activities',
        'Conducted preflight and postflight inspections',
        'Ensured CH-53 helicopter mission readiness'
      ]
    },
    // Helicopter Crew Chief - UH-1 (6174)
    '6174': {
      duties: [
        'Served as crew chief for UH-1 helicopter operations',
        'Coordinated aircraft maintenance and crew activities',
        'Conducted preflight and postflight inspections',
        'Ensured UH-1 helicopter mission readiness'
      ]
    },
    // Tiltrotor Crew Chief - MV-22 (6176)
    '6176': {
      duties: [
        'Served as crew chief for MV-22 tiltrotor operations',
        'Coordinated aircraft maintenance and crew activities',
        'Conducted preflight and postflight inspections',
        'Ensured MV-22 tiltrotor mission readiness'
      ]
    },
    // Ground Mobile Forces Satellite Transmissions System Operator (0627)
    '0627': {
      duties: [
        'Operated ground mobile forces satellite transmission systems',
        'Maintained satellite communication equipment and networks',
        'Provided tactical satellite communications support',
        'Ensured reliable satellite communications for ground forces'
      ]
    },
    // Network Administrator (0631)
    '0631': {
      duties: [
        'Administered and maintained computer networks for Marine Corps operations',
        'Managed network security and user access controls',
        'Troubleshot network connectivity and performance issues',
        'Provided network support for command and control operations'
      ]
    },
    // Data Systems Administrator (0671)
    '0671': {
      duties: [
        'Administered and maintained data systems for Marine Corps operations',
        'Managed database systems and data integrity',
        'Troubleshot data system issues and performed maintenance',
        'Provided data system support for operational requirements'
      ]
    },
    // Information Assurance Technician (0689)
    '0689': {
      duties: [
        'Ensured information security and cybersecurity compliance',
        'Conducted security assessments and vulnerability analysis',
        'Maintained cybersecurity policies and procedures',
        'Provided information assurance support for Marine Corps systems'
      ]
    },
    // Imagery Analysis Specialist (0241)
    '0241': {
      duties: [
        'Analyzed imagery intelligence to support Marine Corps operations',
        'Processed and interpreted aerial and satellite imagery',
        'Maintained imagery analysis databases and tools',
        'Provided imagery intelligence support for mission planning'
      ]
    },
    // Geographic Intelligence Specialist (0261)
    '0261': {
      duties: [
        'Analyzed geographic intelligence to support Marine Corps operations',
        'Processed geospatial data and terrain analysis',
        'Maintained geographic intelligence databases and systems',
        'Provided geographic intelligence support for mission planning'
      ]
    },
    // Aviation Intelligence Specialist (0271)
    '0271': {
      duties: [
        'Analyzed aviation intelligence to support Marine Corps aviation operations',
        'Processed aviation-related intelligence data and information',
        'Maintained aviation intelligence databases and systems',
        'Provided aviation intelligence support for flight operations'
      ]
    },
    // Logistics/Embarkation Specialist (0431)
    '0431': {
      duties: [
        'Coordinated logistics and embarkation operations for Marine Corps units',
        'Managed cargo loading and transportation planning',
        'Maintained logistics databases and documentation',
        'Provided logistics support for deployment and sustainment operations'
      ]
    },
    // Landing Support Specialist (0481)
    '0481': {
      duties: [
        'Provided landing support for amphibious and air operations',
        'Coordinated cargo handling and equipment movement',
        'Maintained landing support equipment and facilities',
        'Supported amphibious assault and logistics operations'
      ]
    },
    // Warehouse Clerk (3051)
    '3051': {
      duties: [
        'Managed warehouse operations and inventory control',
        'Coordinated storage and distribution of supplies and equipment',
        'Maintained warehouse records and documentation',
        'Provided warehouse support for supply chain operations'
      ]
    },
    // Packaging Specialist (3052)
    '3052': {
      duties: [
        'Specialized in packaging and preservation of military equipment',
        'Coordinated packaging operations for storage and transportation',
        'Maintained packaging equipment and materials',
        'Provided packaging support for logistics operations'
      ]
    },
    // Automotive Maintenance Technician (3521)
    '3521': {
      duties: [
        'Maintained and repaired automotive vehicles and equipment',
        'Conducted vehicle inspections and preventive maintenance',
        'Troubleshot automotive malfunctions and performed repairs',
        'Ensured automotive equipment operational readiness'
      ]
    },
    // Motor Vehicle Operator (3531)
    '3531': {
      duties: [
        'Operated military vehicles for personnel and cargo transportation',
        'Maintained vehicle equipment and performed preventive maintenance',
        'Coordinated vehicle operations and route planning',
        'Provided vehicle support for Marine Corps operations'
      ]
    },
    // Motor Transport Operations Chief (3537)
    '3537': {
      duties: [
        'Led and supervised motor transport operations',
        'Coordinated vehicle fleet management and maintenance',
        'Managed motor transport personnel and resources',
        'Ensured motor transport operational readiness'
      ]
    },
    // Military Police (5811)
    '5811': {
      duties: [
        'Provided law enforcement and security services for Marine Corps installations',
        'Conducted patrols and security operations',
        'Investigated incidents and maintained order',
        'Supported force protection and security requirements'
      ]
    },
    // Correctional Specialist (5831)
    '5831': {
      duties: [
        'Managed correctional facilities and prisoner operations',
        'Maintained security and order in correctional environments',
        'Supervised prisoner activities and rehabilitation programs',
        'Ensured correctional facility security and compliance'
      ]
    },
    // Fixed-Wing Aircraft Mechanic - F/A-18 (6217)
    '6217': {
      duties: [
        'Maintained and repaired F/A-18 fixed-wing aircraft systems',
        'Conducted aircraft inspections and preventive maintenance',
        'Troubleshot aircraft malfunctions and performed repairs',
        'Ensured F/A-18 aircraft operational readiness'
      ]
    },
    // Fixed-Wing Aircraft Airframe Mechanic - F/A-18 (6257)
    '6257': {
      duties: [
        'Maintained and repaired F/A-18 aircraft airframe systems',
        'Conducted airframe inspections and structural maintenance',
        'Troubleshot airframe malfunctions and performed repairs',
        'Ensured F/A-18 airframe structural integrity'
      ]
    },
    // Fixed-Wing Aircraft Crew Chief - F/A-18 (6287)
    '6287': {
      duties: [
        'Served as crew chief for F/A-18 fixed-wing aircraft operations',
        'Coordinated aircraft maintenance and crew activities',
        'Conducted preflight and postflight inspections',
        'Ensured F/A-18 aircraft mission readiness'
      ]
    },
    // Aircraft Communications/Navigation/Radar Systems Technician - F/A-18 (6317)
    '6317': {
      duties: [
        'Maintained and repaired F/A-18 communications, navigation, and radar systems',
        'Troubleshot avionics malfunctions and performed repairs',
        'Conducted system inspections and preventive maintenance',
        'Ensured F/A-18 avionics system operational readiness'
      ]
    },
    // Aircraft Electronic Countermeasures Systems Technician - EA-6 (6337)
    '6337': {
      duties: [
        'Maintained and repaired EA-6 electronic countermeasures systems',
        'Troubleshot electronic warfare system malfunctions',
        'Conducted system inspections and preventive maintenance',
        'Ensured EA-6 electronic countermeasures system readiness'
      ]
    },
    // Aircraft Electronic Countermeasures Systems Technician - F/A-18 (6386)
    '6386': {
      duties: [
        'Maintained and repaired F/A-18 electronic countermeasures systems',
        'Troubleshot electronic warfare system malfunctions',
        'Conducted system inspections and preventive maintenance',
        'Ensured F/A-18 electronic countermeasures system readiness'
      ]
    },
    // Aircraft Ordnance Technician (6531)
    '6531': {
      duties: [
        'Maintained and handled aircraft ordnance and weapons systems',
        'Conducted ordnance loading and unloading operations',
        'Performed ordnance maintenance and safety procedures',
        'Ensured aircraft ordnance operational readiness'
      ]
    },
    // Aviation Ordnance Systems Technician (6541)
    '6541': {
      duties: [
        'Maintained and repaired aviation ordnance systems and equipment',
        'Troubleshot ordnance system malfunctions and performed repairs',
        'Conducted system inspections and preventive maintenance',
        'Ensured aviation ordnance system operational readiness'
      ]
    },
    // Meteorological and Oceanographic (METOC) Analyst Forecaster (6842)
    '6842': {
      duties: [
        'Analyzed meteorological and oceanographic data for operational support',
        'Provided weather and oceanographic forecasting services',
        'Maintained METOC databases and analytical tools',
        'Supported Marine Corps operations with environmental intelligence'
      ]
    },
    // Air Traffic Controller (7251)
    '7251': {
      duties: [
        'Provided air traffic control services for Marine Corps aviation operations',
        'Coordinated aircraft movements and flight operations',
        'Maintained air traffic control equipment and procedures',
        'Ensured safe and efficient air traffic management'
      ]
    },
    // Air Traffic Controller - Tower (7257)
    '7257': {
      duties: [
        'Provided tower air traffic control services for Marine Corps aviation',
        'Coordinated aircraft takeoffs, landings, and ground movements',
        'Maintained tower control equipment and procedures',
        'Ensured safe and efficient tower air traffic operations'
      ]
    },
    // Tactical Air Defense Controller (7236)
    '7236': {
      duties: [
        'Provided tactical air defense control for Marine Corps operations',
        'Coordinated air defense systems and missile operations',
        'Maintained air defense control equipment and procedures',
        'Ensured effective tactical air defense capabilities'
      ]
    },
    // Aircraft Rescue and Firefighting Specialist (7051)
    '7051': {
      duties: [
        'Provided aircraft rescue and firefighting services for aviation operations',
        'Conducted emergency response and fire suppression operations',
        'Maintained rescue and firefighting equipment and facilities',
        'Ensured aviation safety and emergency response capabilities'
      ]
    },
    // Aviation Maintenance Technician (AMT)
    'AMT': {
      duties: [
        'Maintained and repaired aircraft systems and components',
        'Conducted aircraft inspections and preventive maintenance',
        'Troubleshot aircraft malfunctions and performed repairs',
        'Ensured aircraft operational readiness for Coast Guard missions'
      ]
    },
    // Avionics Electrical Technician (AET)
    'AET': {
      duties: [
        'Maintained and repaired aircraft avionics and electrical systems',
        'Troubleshot avionics malfunctions and performed repairs',
        'Conducted system inspections and preventive maintenance',
        'Ensured avionics system operational readiness'
      ]
    },
    // Aviation Survival Technician (AST)
    'AST': {
      duties: [
        'Provided search and rescue operations as helicopter crew member',
        'Conducted emergency medical care and recovery in maritime environments',
        'Maintained rescue equipment and survival gear',
        'Trained in advanced swimming and lifesaving techniques'
      ]
    },
    // Machinery Technician (MK)
    'MK': {
      duties: [
        'Maintained and repaired shipboard machinery and propulsion systems',
        'Conducted engine room operations and equipment maintenance',
        'Troubleshot machinery malfunctions and performed repairs',
        'Ensured vessel propulsion and auxiliary system readiness'
      ]
    },
    // Health Services Technician (HS)
    'HS': {
      duties: [
        'Provided medical care and health services to Coast Guard personnel',
        'Conducted medical examinations and preventive health programs',
        'Maintained medical records and managed medical supplies',
        'Supported Coast Guard medical readiness and health programs'
      ]
    },
    // Investigator (IV)
    'IV': {
      duties: [
        'Conducted criminal investigations and law enforcement operations',
        'Gathered evidence and interviewed witnesses for investigations',
        'Maintained investigative records and case documentation',
        'Supported Coast Guard law enforcement and security missions'
      ]
    },
    // Marine Science Technician (MST)
    'MST': {
      duties: [
        'Conducted marine environmental protection and pollution response',
        'Monitored marine safety and environmental compliance',
        'Maintained environmental monitoring equipment and procedures',
        'Supported Coast Guard environmental protection missions'
      ]
    },
    // Maritime Security Response Team (MSRT)
    'MSRT': {
      duties: [
        'Conducted maritime security and counter-terrorism operations',
        'Performed tactical law enforcement and security missions',
        'Maintained specialized security equipment and tactical skills',
        'Supported Coast Guard maritime security and protection missions'
      ]
    },
    // Tactical Law Enforcement Team (TACLET)
    'TACLET': {
      duties: [
        'Conducted tactical law enforcement operations in maritime environments',
        'Performed drug interdiction and maritime law enforcement',
        'Maintained tactical equipment and law enforcement skills',
        'Supported Coast Guard law enforcement and interdiction missions'
      ]
    },
    // Port Security Unit (PSU)
    'PSU': {
      duties: [
        'Provided port security and maritime protection operations',
        'Conducted security patrols and threat assessments',
        'Maintained security equipment and operational procedures',
        'Supported Coast Guard port security and protection missions'
      ]
    },
    // Maritime Safety and Security Team (MSST)
    'MSST': {
      duties: [
        'Conducted maritime safety and security operations',
        'Performed security assessments and protective operations',
        'Maintained security equipment and operational readiness',
        'Supported Coast Guard maritime safety and security missions'
      ]
    },
    // Deployable Specialized Forces (DSF)
    'DSF': {
      duties: [
        'Conducted specialized maritime operations and missions',
        'Performed tactical operations and specialized training',
        'Maintained specialized equipment and operational capabilities',
        'Supported Coast Guard specialized mission requirements'
      ]
    },
    // Helicopter Interdiction Tactical Squadron (HITRON)
    'HITRON': {
      duties: [
        'Conducted helicopter interdiction operations for law enforcement',
        'Performed aerial surveillance and interdiction missions',
        'Maintained helicopter systems and tactical equipment',
        'Supported Coast Guard aerial law enforcement operations'
      ]
    },
    // Patrol Forces Southwest Asia (PATFORSWA)
    'PATFORSWA': {
      duties: [
        'Conducted maritime patrol operations in Southwest Asia',
        'Performed security and law enforcement missions',
        'Maintained patrol vessel systems and operational readiness',
        'Supported Coast Guard international maritime operations'
      ]
    },
    // Information Technology - Cyber (IT-C)
    'IT-C': {
      duties: [
        'Conducted cybersecurity operations and cyber defense',
        'Managed cyber security systems and threat response',
        'Maintained cybersecurity policies and procedures',
        'Supported Coast Guard cyber security and information assurance'
      ]
    },
    // Information Technology - Information Assurance (IT-I)
    'IT-I': {
      duties: [
        'Ensured information assurance and security compliance',
        'Conducted security assessments and vulnerability analysis',
        'Maintained information security policies and procedures',
        'Supported Coast Guard information security and assurance'
      ]
    },
    // Information Technology - Network Specialist (IT-N)
    'IT-N': {
      duties: [
        'Maintained and operated Coast Guard network systems',
        'Troubleshot network connectivity and performance issues',
        'Managed network infrastructure and communication systems',
        'Supported Coast Guard information technology operations'
      ]
    },
    // Intelligence Specialist - Imagery (IS-I)
    'IS-I': {
      duties: [
        'Analyzed imagery intelligence for Coast Guard operations',
        'Processed and interpreted aerial and satellite imagery',
        'Maintained imagery analysis databases and tools',
        'Provided imagery intelligence support for Coast Guard missions'
      ]
    },
    // Intelligence Specialist - Cryptology (IS-C)
    'IS-C': {
      duties: [
        'Conducted cryptologic analysis for Coast Guard operations',
        'Processed and analyzed encrypted communications and signals',
        'Maintained cryptologic databases and analytical tools',
        'Provided cryptologic intelligence support for Coast Guard missions'
      ]
    }
  },
  coastGuard: {
    // Maritime Enforcement Specialist (ME)
    'ME': {
      duties: [
        'Conducted maritime law enforcement operations and vessel boardings',
        'Performed anti-terrorism/force protection duties at ports and facilities',
        'Executed search and seizure operations on suspect vessels',
        'Maintained proficiency in tactical procedures and use of force protocols'
      ]
    },
    // Boatswain's Mate (BM)
    'BM': {
      duties: [
        'Operated and maintained various Coast Guard vessels and small boats',
        'Conducted search and rescue operations in maritime environments',
        'Managed deck operations and supervised deck department personnel',
        'Maintained navigation equipment and aids to navigation'
      ]
    },
    // Operations Specialist (OS)
    'OS': {
      duties: [
        'Operated sophisticated radar and navigation equipment',
        'Coordinated search and rescue operations from command centers',
        'Monitored vessel traffic and maintained maritime domain awareness',
        'Provided tactical information to response units during operations'
      ]
    },
    // Yeoman (YN)
    'YN': {
      duties: [
        'Managed administrative support and office operations',
        'Processed personnel actions and service records',
        'Prepared official correspondence and reports',
        'Coordinated travel and maintained command schedules'
      ]
    },
    // Food Service Specialist (FS)
    'FS': {
      duties: [
        'Prepared and served meals for Coast Guard personnel',
        'Managed galley operations and food service facilities',
        'Maintained food inventory and supply records',
        'Ensured compliance with food safety regulations'
      ]
    },
    // Public Affairs Specialist (PA)
    'PA': {
      duties: [
        'Managed public relations and media communications',
        'Created content for social media and publications',
        'Coordinated public outreach events',
        'Documented Coast Guard operations and missions'
      ]
    },
    // OFFICER RATES
    // Operations Specialty Chief Warrant Officer (CWO-OPS)
    'CWO-OPS': {
      duties: [
        'Led operational units and managed complex Coast Guard missions',
        'Coordinated search and rescue operations and maritime law enforcement',
        'Supervised operational personnel and maintained mission readiness',
        'Developed operational procedures and training programs'
      ]
    },
    // Engineering Specialty Chief Warrant Officer (CWO-ENG)
    'CWO-ENG': {
      duties: [
        'Led engineering operations and managed technical systems',
        'Supervised vessel maintenance and engineering department operations',
        'Coordinated with shipyards and contractors on major repairs',
        'Developed engineering procedures and safety protocols'
      ]
    },
    // Communications Specialty Chief Warrant Officer (CWO-COMMS)
    'CWO-COMMS': {
      duties: [
        'Led communications operations and managed communication systems',
        'Coordinated network operations and information technology services',
        'Supervised communications personnel and equipment maintenance',
        'Developed communication procedures and security protocols'
      ]
    },
    // Cryptology Specialty Chief Warrant Officer (CWO-CRYPTO)
    'CWO-CRYPTO': {
      duties: [
        'Led cryptologic operations and managed information security',
        'Coordinated signals intelligence and communication security operations',
        'Supervised cryptologic personnel and classified systems',
        'Developed security procedures and threat assessment protocols'
      ]
    },
    // Information Technology/Management Specialty Chief Warrant Officer (CWO-ITMS)
    'CWO-ITMS': {
      duties: [
        'Led information technology operations and managed IT systems',
        'Coordinated network administration and cybersecurity operations',
        'Supervised IT personnel and technology infrastructure',
        'Developed IT policies and system security procedures'
      ]
    },
    // Intelligence Systems Specialty Chief Warrant Officer (CWO-INTEL)
    'CWO-INTEL': {
      duties: [
        'Led intelligence operations and managed intelligence systems',
        'Coordinated intelligence collection and analysis activities',
        'Supervised intelligence personnel and classified operations',
        'Developed intelligence procedures and threat assessment protocols'
      ]
    },
    // Material Maintenance Specialty Chief Warrant Officer (CWO-MAT)
    'CWO-MAT': {
      duties: [
        'Led maintenance operations and managed logistics support',
        'Coordinated supply chain management and inventory control',
        'Supervised maintenance personnel and equipment readiness',
        'Developed maintenance procedures and quality control standards'
      ]
    },
    // Security Specialty Chief Warrant Officer (CWO-SEC)
    'CWO-SEC': {
      duties: [
        'Led security operations and managed force protection activities',
        'Coordinated physical security and access control systems',
        'Supervised security personnel and emergency response procedures',
        'Developed security policies and threat mitigation strategies'
      ]
    },
    // Weapons Specialty Chief Warrant Officer (CWO-WEPS)
    'CWO-WEPS': {
      duties: [
        'Led weapons operations and managed armament systems',
        'Coordinated weapons training and qualification programs',
        'Supervised weapons maintenance and ammunition management',
        'Developed weapons procedures and safety protocols'
      ]
    }
  },
  spaceForce: {
    // Officers
    // Space Operations Officer (13S)
    '13S': {
      duties: [
        'Directed space operations and managed satellite control networks',
        'Conducted orbital warfare operations and space domain awareness activities',
        'Coordinated space-based support for military operations',
        'Led space operations teams and maintained space situational awareness'
      ]
    },
    // Intelligence Officer (14N)
    '14N': {
      duties: [
        'Led intelligence operations and analyzed space-based threats',
        'Coordinated intelligence collection from space-based platforms',
        'Developed intelligence assessments for space operations',
        'Managed classified space intelligence systems and operations'
      ]
    },
    // Cyberspace Operations Officer (17S)
    '17S': {
      duties: [
        'Led cyber operations for space systems and satellite networks',
        'Coordinated cybersecurity for space-based assets and ground systems',
        'Developed cyber defense strategies for space operations',
        'Managed cyber incident response for space force networks'
      ]
    },
    // Developmental Engineer (62E)
    '62E': {
      duties: [
        'Led engineering development for space systems and technologies',
        'Coordinated with contractors on satellite and launch vehicle development',
        'Managed technical specifications and system testing for space assets',
        'Supervised engineering analysis and design validation for space programs'
      ]
    },
    // Acquisition Manager (63A)
    '63A': {
      duties: [
        'Managed acquisition programs for space systems and technologies',
        'Coordinated with defense contractors on space program development',
        'Supervised program management and cost control for space acquisitions',
        'Developed procurement strategies for space force capabilities'
      ]
    },

    // Space Operations (Enlisted)
    // Space Systems Operations (1C6)
    '1C6': {
      duties: [
        'Operated and maintained space systems and satellite ground control equipment',
        'Monitored satellite operations and orbital parameters',
        'Conducted space situational awareness and collision avoidance',
        'Supported space mission planning and execution'
      ]
    },
    // All Source Intelligence Analyst (1N0)
    '1N0': {
      duties: [
        'Analyzed intelligence from multiple sources to support space operations',
        'Conducted threat assessments and intelligence briefings',
        'Maintained intelligence databases and analytical tools',
        'Provided intelligence support for space mission planning'
      ]
    },
    // Geospatial Intelligence Analyst (1N1)
    '1N1': {
      duties: [
        'Analyzed geospatial intelligence data to support space operations',
        'Processed satellite imagery and geospatial information',
        'Maintained geospatial databases and analytical systems',
        'Provided geospatial intelligence support for space missions'
      ]
    },
    // Signals Intelligence Analyst (1N2)
    '1N2': {
      duties: [
        'Analyzed signals intelligence to support space operations',
        'Monitored and processed electronic signals and communications',
        'Maintained signals intelligence databases and analytical tools',
        'Provided signals intelligence support for space mission planning'
      ]
    },
    // Fusion Analyst (1N4)
    '1N4': {
      duties: [
        'Conducted multi-source intelligence fusion analysis for space operations',
        'Correlated intelligence from various sources to identify patterns',
        'Maintained fusion analysis databases and analytical systems',
        'Provided comprehensive intelligence support for space missions'
      ]
    },

    // Cyber Operations (Enlisted)
    // Cyberspace Operations (3D0)
    '3D0': {
      duties: [
        'Conducted cyberspace operations to support space mission objectives',
        'Managed cyber defense and offensive capabilities',
        'Maintained cybersecurity systems and protocols',
        'Provided cyber support for space operations and infrastructure'
      ]
    },
    // Client Systems (3D1)
    '3D1': {
      duties: [
        'Maintained and supported client systems for space operations',
        'Troubleshot and repaired computer systems and networks',
        'Provided technical support for space mission systems',
        'Ensured system reliability and cybersecurity compliance'
      ]
    },
    // Cyber Warfare Operations (1B4)
    '1B4': {
      duties: [
        'Conducted cyber warfare operations to protect space assets',
        'Developed and executed cyber defense and offensive strategies',
        'Maintained cyber warfare capabilities and tools',
        'Provided cyber warfare support for space mission security'
      ]
    },

    // Engineering (Enlisted)
    // Space Systems Engineering (5C0)
    '5C0': {
      duties: [
        'Provided engineering support for space systems and operations',
        'Conducted system analysis and engineering assessments',
        'Maintained engineering documentation and technical specifications',
        'Supported space system development and maintenance'
      ]
    },
    // Space Systems Maintenance (5C1)
    '5C1': {
      duties: [
        'Maintained and repaired space systems and ground equipment',
        'Conducted preventive maintenance and system inspections',
        'Troubleshot system malfunctions and performed repairs',
        'Ensured space system reliability and operational readiness'
      ]
    },

    // Command and Control (Enlisted)
    // Command and Control Operations (1C5)
    '1C5': {
      duties: [
        'Operated command and control systems for space operations',
        'Coordinated space mission planning and execution',
        'Maintained communication systems and operational procedures',
        'Supported space command and control mission requirements'
      ]
    },
    // Space Systems Operations (1C6X1)
    '1C6X1': {
      duties: [
        'Operated advanced space systems and satellite control equipment',
        'Monitored complex satellite operations and orbital dynamics',
        'Conducted advanced space situational awareness operations',
        'Supported sophisticated space mission planning and execution'
      ]
    },

    // Intelligence (Enlisted)
    // Operations Intelligence (1N0X1)
    '1N0X1': {
      duties: [
        'Provided operational intelligence support for space missions',
        'Conducted intelligence analysis for space operations planning',
        'Maintained operational intelligence databases and systems',
        'Supported space mission intelligence requirements'
      ]
    },
    // Geospatial Intelligence (1N1X1)
    '1N1X1': {
      duties: [
        'Provided geospatial intelligence support for space operations',
        'Analyzed satellite imagery and geospatial data',
        'Maintained geospatial intelligence systems and databases',
        'Supported space mission geospatial intelligence needs'
      ]
    },
    // Signals Intelligence Analysis (1N2X1)
    '1N2X1': {
      duties: [
        'Conducted signals intelligence analysis for space operations',
        'Processed and analyzed electronic signals and communications',
        'Maintained signals intelligence analysis systems',
        'Provided signals intelligence support for space missions'
      ]
    },

    // Communications (Enlisted)
    // Client Systems (3D1X1)
    '3D1X1': {
      duties: [
        'Maintained and supported client systems for space operations',
        'Provided technical support and troubleshooting for computer systems',
        'Ensured system reliability and cybersecurity for space missions',
        'Supported space mission information technology requirements'
      ]
    },
    // Cyber Transport Systems (3D1X2)
    '3D1X2': {
      duties: [
        'Maintained and operated cyber transport systems for space operations',
        'Managed network infrastructure and communication systems',
        'Troubleshot network connectivity and transport issues',
        'Supported space mission communication and data transport needs'
      ]
    },
    // Cyber Systems Operations (3D0X2)
    '3D0X2': {
      duties: [
        'Operated and maintained cyber systems for space operations',
        'Managed cybersecurity systems and network operations',
        'Conducted cyber system monitoring and incident response',
        'Supported space mission cyber security requirements'
      ]
    },
    // Cyber Surety (3D0X3)
    '3D0X3': {
      duties: [
        'Ensured cybersecurity compliance and risk management for space operations',
        'Conducted security assessments and vulnerability analysis',
        'Maintained cybersecurity policies and procedures',
        'Provided cyber security assurance for space mission systems'
      ]
    },

    // Acquisition and Engineering (Enlisted)
    // Materiel Management (2S0X1)
    '2S0X1': {
      duties: [
        'Managed materiel inventory and supply chain operations for space systems',
        'Coordinated procurement and distribution of space-related materials',
        'Maintained inventory records and conducted audits',
        'Provided materiel support for space operations'
      ]
    },
    // Contracting (6C0X1)
    '6C0X1': {
      duties: [
        'Managed contracting operations to support space mission requirements',
        'Developed and executed contracts for space systems and services',
        'Maintained contracting documentation and compliance procedures',
        'Provided contracting support for space mission procurement needs'
      ]
    }
  }
}; 