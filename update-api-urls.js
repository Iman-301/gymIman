// Script to update all API URLs in frontend files
// Usage: node update-api-urls.js <your-api-url>
// Example: node update-api-urls.js https://your-app.vercel.app/api

const fs = require('fs');
const path = require('path');

const newApiUrl = process.argv[2] || 'https://your-app.vercel.app/api';
const oldApiUrl = 'http://localhost:3000';

const filesToUpdate = [
  'frontend/common/registration_page.html',
  'frontend/common/login.html',
  'frontend/common/gym_reg.html',
  'frontend/owner/add.html',
  'frontend/user/gym_lst.html',
  'frontend/user/about_gym.html',
  'frontend/user/go_checkout.html',
  'frontend/user/log_out.html',
  'frontend/owner/logOut.html',
  'frontend/javasc/add.js'
];

console.log(`Updating API URLs from ${oldApiUrl} to ${newApiUrl}...\n`);

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Replace all occurrences
    content = content.replace(new RegExp(oldApiUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newApiUrl);
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Updated: ${file}`);
    } else {
      console.log(`- No changes: ${file}`);
    }
  } else {
    console.log(`✗ File not found: ${file}`);
  }
});

console.log('\nDone!');

