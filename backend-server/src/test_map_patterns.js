import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('./src/remaining_tn_schemes.json', 'utf-8'));
console.log('Total schemes to map:', raw.length);

// Check common patterns in titles
const titleSamples = raw.map(s => `[${s.schemeId}] ${s.titleEn} (${s.deptEn})`);
console.log('\nFirst 25 schemes:');
titleSamples.slice(0, 25).forEach(s => console.log(s));
