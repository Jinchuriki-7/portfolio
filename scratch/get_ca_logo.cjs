const https = require('https');
const fs = require('fs');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function run() {
  try {
    const js = (await fetch('https://codealpha.tech/assets/index-Ds4wJybz.js')).toString('utf8');
    fs.writeFileSync('scratch/ca.js', js);
    console.log('Saved scratch/ca.js, size:', js.length);
    
    // Search for logo or navbar branding in ca.js
    const brandMatches = js.match(/(?:Logo|Brand|codealpha)[^;{}]*?(?:svg|png|jsx?)/gi) || [];
    console.log('Brand matches:', brandMatches.slice(0, 10));

    // Look for JSX / SVG rendering for the navbar logo:
    // e.g. text or SVG for CodeAlpha
    const navbarMatch = js.indexOf('CodeAlpha');
    console.log('CodeAlpha index in JS:', navbarMatch);
    if (navbarMatch !== -1) {
      console.log('Context around CodeAlpha:', js.substring(navbarMatch - 200, navbarMatch + 200));
    }
  } catch (e) {
    console.error('Error:', e.message);
  }
}
run();
