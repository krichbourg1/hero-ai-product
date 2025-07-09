const fs = require('fs');
const path = require('path');

// Read the military data file
const militaryDataPath = path.join(__dirname, 'src/data/military-data.ts');
const jobDescriptionsPath = path.join(__dirname, 'src/data/military-job-descriptions.ts');

const militaryDataContent = fs.readFileSync(militaryDataPath, 'utf8');
const jobDescriptionsContent = fs.readFileSync(jobDescriptionsPath, 'utf8');

// Extract MOS/Rates from military data
const mosRatesRegex = /{ id: '([^']+)', title: '([^']+)', isOfficer: (true|false) }/g;
const militaryData = {};
let match;

while ((match = mosRatesRegex.exec(militaryDataContent)) !== null) {
  const id = match[1];
  const title = match[2];
  const isOfficer = match[3] === 'true';
  
  // Determine branch from context (this is a simplified approach)
  if (militaryDataContent.includes(`army: [`) && militaryDataContent.indexOf(match[0]) < militaryDataContent.indexOf('navy: [')) {
    if (!militaryData.army) militaryData.army = [];
    militaryData.army.push({ id, title, isOfficer });
  } else if (militaryDataContent.includes(`navy: [`) && militaryDataContent.indexOf(match[0]) < militaryDataContent.indexOf('airForce: [')) {
    if (!militaryData.navy) militaryData.navy = [];
    militaryData.navy.push({ id, title, isOfficer });
  } else if (militaryDataContent.includes(`airForce: [`) && militaryDataContent.indexOf(match[0]) < militaryDataContent.indexOf('marines: [')) {
    if (!militaryData.airForce) militaryData.airForce = [];
    militaryData.airForce.push({ id, title, isOfficer });
  } else if (militaryDataContent.includes(`marines: [`) && militaryDataContent.indexOf(match[0]) < militaryDataContent.indexOf('coastGuard: [')) {
    if (!militaryData.marines) militaryData.marines = [];
    militaryData.marines.push({ id, title, isOfficer });
  } else if (militaryDataContent.includes(`coastGuard: [`) && militaryDataContent.indexOf(match[0]) < militaryDataContent.indexOf('spaceForce: [')) {
    if (!militaryData.coastGuard) militaryData.coastGuard = [];
    militaryData.coastGuard.push({ id, title, isOfficer });
  } else if (militaryDataContent.includes(`spaceForce: [`)) {
    if (!militaryData.spaceForce) militaryData.spaceForce = [];
    militaryData.spaceForce.push({ id, title, isOfficer });
  }
}

// Extract job descriptions
const jobDescRegex = /'([^']+)':\s*{\s*duties:\s*\[/g;
const jobDescriptions = {};
let branch = '';

// Parse job descriptions by branch
const lines = jobDescriptionsContent.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.includes('navy: {')) {
    branch = 'navy';
    jobDescriptions[branch] = [];
  } else if (line.includes('army: {')) {
    branch = 'army';
    jobDescriptions[branch] = [];
  } else if (line.includes('airForce: {')) {
    branch = 'airForce';
    jobDescriptions[branch] = [];
  } else if (line.includes('marines: {')) {
    branch = 'marines';
    jobDescriptions[branch] = [];
  } else if (line.includes('coastGuard: {')) {
    branch = 'coastGuard';
    jobDescriptions[branch] = [];
  } else if (line.includes('spaceForce: {')) {
    branch = 'spaceForce';
    jobDescriptions[branch] = [];
  }
  
  if (branch && line.match(/^'[^']+':\s*{$/)) {
    const rateMatch = line.match(/^'([^']+)':\s*{$/);
    if (rateMatch) {
      jobDescriptions[branch].push(rateMatch[1]);
    }
  }
}

// Check for missing job descriptions
console.log('=== MISSING JOB DESCRIPTIONS ===\n');

Object.keys(militaryData).forEach(branch => {
  console.log(`\n${branch.toUpperCase()}:`);
  console.log('='.repeat(branch.length + 1));
  
  const missing = [];
  const existing = [];
  
  militaryData[branch].forEach(mos => {
    if (jobDescriptions[branch] && jobDescriptions[branch].includes(mos.id)) {
      existing.push(mos.id);
    } else {
      missing.push(mos);
    }
  });
  
  if (missing.length > 0) {
    console.log(`\nMISSING (${missing.length}):`);
    missing.forEach(mos => {
      console.log(`  ${mos.id} - ${mos.title} ${mos.isOfficer ? '(Officer)' : '(Enlisted)'}`);
    });
  } else {
    console.log('\n✅ All MOS/Rates have job descriptions!');
  }
  
  if (existing.length > 0) {
    console.log(`\nEXISTING (${existing.length}):`);
    existing.forEach(id => {
      console.log(`  ✅ ${id}`);
    });
  }
  
  console.log(`\nTotal ${branch}: ${militaryData[branch].length}`);
  console.log(`Missing: ${missing.length}`);
  console.log(`Existing: ${existing.length}`);
});

console.log('\n=== SUMMARY ===');
Object.keys(militaryData).forEach(branch => {
  const total = militaryData[branch].length;
  const existing = jobDescriptions[branch] ? jobDescriptions[branch].length : 0;
  const missing = total - existing;
  console.log(`${branch}: ${existing}/${total} (${missing} missing)`);
}); 