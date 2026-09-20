import fs from 'fs';

async function test() {
  const url = 'https://www.myscheme.gov.in/ta/schemes/bbsi';
  console.log('Fetching', url);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  const html = await res.text();
  const apis = html.match(/\/api\/[a-zA-Z0-9_\-\.\/]+/g) || [];
  console.log('Unique APIs found:', Array.from(new Set(apis)));
  
  // Also check script files
  const scripts = html.match(/src="([^"]+\.js)"/g) || [];
  console.log('Scripts count:', scripts.length);
  if (scripts.length > 0) {
    console.log('Sample script:', scripts[0]);
  }
}

test();
