async function inspectBundle() {
  try {
    const url = 'https://cdn.myscheme.in/_next/static/chunks/pages/search-5b98b1cf61ee5ed1.js';
    const res = await fetch(url);
    const text = await res.text();
    
    // Find api endpoints or URLs
    const matches = text.match(/https?:\/\/[^"'\s)]+|api\/[a-zA-Z0-9_\/]+/g);
    console.log('Matches found in search bundle:', Array.from(new Set(matches)).slice(0, 30));
  } catch (err) {
    console.error(err);
  }
}

inspectBundle();
