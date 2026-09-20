// Test myScheme search API endpoint
async function testMyScheme() {
  const urls = [
    'https://www.myscheme.gov.in/_next/data/',
    'https://api.myscheme.in/',
    'https://api.myscheme.gov.in/',
  ];

  try {
    const res = await fetch('https://www.myscheme.gov.in/search');
    const html = await res.text();
    
    // Look for buildId in Next.js script
    const buildIdMatch = html.match(/"buildId":"([^"]+)"/);
    if (buildIdMatch) {
      const buildId = buildIdMatch[1];
      console.log('Found Next.js buildId:', buildId);
      
      const dataUrl = `https://www.myscheme.gov.in/_next/data/${buildId}/search.json`;
      console.log('Fetching:', dataUrl);
      const dataRes = await fetch(dataUrl);
      if (dataRes.ok) {
        const json = await dataRes.json();
        console.log('Keys in search data:', Object.keys(json));
        if (json.pageProps) {
          console.log('pageProps keys:', Object.keys(json.pageProps));
        }
      } else {
        console.log('Data fetch status:', dataRes.status);
      }
    } else {
      console.log('buildId not found in HTML.');
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testMyScheme();
