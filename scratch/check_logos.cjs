const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = https.get({
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = new URL(redirectUrl, url).toString();
        }
        return fetchUrl(redirectUrl).then(resolve, reject);
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, data }));
    });
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.abort();
      reject(new Error('Timeout'));
    });
  });
}

async function run() {
  console.log('--- Checking Biswas IT Firm ---');
  try {
    const bit = await fetchUrl('https://www.biswasitfirm.com/');
    console.log('BIT status:', bit.statusCode, 'length:', bit.data.length);
    const bitMatches = bit.data.match(/https?:\/\/[^\s"'<>]+\.(?:png|svg|webp|jpg|ico)/gi) || [];
    console.log('BIT images found:', [...new Set(bitMatches)].slice(0, 15));
    const bitLogoMatches = bit.data.match(/[^\s"'<>]*(?:logo|brand)[^\s"'<>]*/gi) || [];
    console.log('BIT logo matches:', [...new Set(bitLogoMatches)].slice(0, 15));
  } catch (e) {
    console.log('BIT error:', e.message);
  }

  console.log('\n--- Checking CodeAlpha ---');
  try {
    const ca = await fetchUrl('https://www.codealpha.tech/');
    console.log('CA status:', ca.statusCode, 'length:', ca.data.length);
    const caMatches = ca.data.match(/https?:\/\/[^\s"'<>]+\.(?:png|svg|webp|jpg|ico)/gi) || [];
    console.log('CA images found:', [...new Set(caMatches)].slice(0, 15));
    const caLogoMatches = ca.data.match(/[^\s"'<>]*(?:logo|brand)[^\s"'<>]*/gi) || [];
    console.log('CA logo matches:', [...new Set(caLogoMatches)].slice(0, 15));
  } catch (e) {
    console.log('CA error:', e.message);
  }

  console.log('\n--- Checking Codeforces SVG ---');
  try {
    const cfDevicon = await fetchUrl('https://raw.githubusercontent.com/devicons/devicon/master/icons/codeforces/codeforces-original.svg');
    console.log('Devicon Codeforces status:', cfDevicon.statusCode, 'length:', cfDevicon.data.length);
    if (cfDevicon.statusCode === 200) {
      console.log('Devicon Codeforces sample:', cfDevicon.data.substring(0, 150));
    }
  } catch(e) {
    console.log('CF Devicon error:', e.message);
  }
}

run();
