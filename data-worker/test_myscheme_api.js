// Inspect how myScheme loads search results
async function inspectMySchemeAPI() {
  // Let's test standard endpoints myScheme uses
  const endpoints = [
    'https://www.myscheme.gov.in/api/v1/schemes/search',
    'https://api.myscheme.in/api/v1/schemes',
    'https://api.myscheme.gov.in/api/v1/schemes',
    'https://www.myscheme.gov.in/api/v1/search',
    'https://api.myscheme.in/api/v1/search',
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: 'Tamil Nadu', page: 1, limit: 10 }),
      });
      console.log(url, 'POST status:', res.status);
    } catch (e) {
      console.log(url, 'POST failed:', e.message);
    }
  }
}

inspectMySchemeAPI();
