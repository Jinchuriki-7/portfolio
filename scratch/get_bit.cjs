const https = require('https');
const fs = require('fs');

https.get('https://biswasitfirm.vercel.app/', { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('HTML size:', d.length);
    fs.writeFileSync('scratch/bit.html', d);
    const imgs = d.match(/<img[^>]+>/gi) || [];
    console.log('Images in bit.html:', imgs);
    const assets = d.match(/[^\s"'<>`\\]+\.(?:png|svg|webp|ico|jpg)/gi) || [];
    console.log('Asset matches:', [...new Set(assets)].slice(0, 20));
  });
}).on('error', e => console.error(e));
