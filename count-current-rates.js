const fs = require('fs');
const jobDescContent = fs.readFileSync('src/data/military-job-descriptions.ts', 'utf8');

const branches = ['navy', 'army', 'airForce', 'marines', 'coastGuard', 'spaceForce'];

branches.forEach(branch => {
  // Look for the branch section
  const branchPattern = new RegExp(`${branch}:\\s*\\{([\\s\\S]*?)\\s*\\},`, 'i');
  const jobMatch = jobDescContent.match(branchPattern);
  
  if (jobMatch) {
    const jobSection = jobMatch[1];
    // Count the rate entries by looking for the pattern: 'RATE': {
    const rateMatches = jobSection.match(/'([^']+)':\s*\{/g);
    const count = rateMatches ? rateMatches.length : 0;
    console.log(`${branch}: ${count} job descriptions`);
  } else {
    console.log(`${branch}: 0 job descriptions`);
  }
}); 