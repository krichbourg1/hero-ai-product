const fs = require('fs');
const path = require('path');

// Read military data
const militaryDataPath = path.join(__dirname, 'src/data/military-data.ts');
const militaryDataContent = fs.readFileSync(militaryDataPath, 'utf8');

// Read job descriptions
const jobDescPath = path.join(__dirname, 'src/data/military-job-descriptions.ts');
const jobDescContent = fs.readFileSync(jobDescPath, 'utf8');

// Define branches
const branches = ['navy', 'army', 'airForce', 'marines', 'coastGuard', 'spaceForce'];

console.log('=== CHECKING MISSING JOB DESCRIPTIONS ===\n');

branches.forEach(branch => {
  console.log(`\n--- ${branch.toUpperCase()} ---`);
  
  // Extract rates from military data
  const branchMatch = militaryDataContent.match(new RegExp(`${branch}:\\s*\\[([\\s\\S]*?)\\]`, 'i'));
  if (!branchMatch) {
    console.log(`Could not find ${branch} section in military data`);
    return;
  }
  
  const branchSection = branchMatch[1];
  const branchRates = [];
  const rateMatches = branchSection.matchAll(/\{\s*id:\s*'([^']+)'/g);
  for (const match of rateMatches) {
    branchRates.push(match[1]);
  }
  
  // Extract job descriptions
  const jobMatch = jobDescContent.match(new RegExp(`${branch}:\\s*\\{([\\s\\S]*?)\\s*\\},`, 'i'));
  if (!jobMatch) {
    console.log(`Could not find ${branch} section in job descriptions`);
    return;
  }
  
  const jobSection = jobMatch[1];
  const jobRates = [];
  const jobRateMatches = jobSection.matchAll(/'([^']+)':\s*\{/g);
  for (const match of jobRateMatches) {
    jobRates.push(match[1]);
  }
  
  // Find missing rates
  const missingRates = branchRates.filter(rate => !jobRates.includes(rate));
  const extraRates = jobRates.filter(rate => !branchRates.includes(rate));
  
  console.log(`Total rates in military data: ${branchRates.length}`);
  console.log(`Total rates in job descriptions: ${jobRates.length}`);
  
  if (missingRates.length > 0) {
    console.log(`❌ Missing job descriptions for ${missingRates.length} rates:`);
    missingRates.forEach(rate => console.log(`   - ${rate}`));
  } else {
    console.log(`✅ All rates have job descriptions`);
  }
  
  if (extraRates.length > 0) {
    console.log(`⚠️  Extra job descriptions (not in military data): ${extraRates.length}`);
    extraRates.forEach(rate => console.log(`   - ${rate}`));
  }
});

console.log('\n=== SUMMARY ===');
console.log('Check the output above for any missing job descriptions.');
console.log('If rates are missing, they need to be added to the military-job-descriptions.ts file.'); 