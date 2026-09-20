import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('./src/remaining_tn_schemes.json', 'utf-8'));
const lines = raw.map((s, idx) => `${idx + 1}. [${s.schemeId}] ${s.titleEn} ||| ${s.deptEn}`);
fs.writeFileSync('./src/remaining_list.txt', lines.join('\n'), 'utf-8');
console.log('Successfully wrote UTF-8 remaining_list.txt with', lines.length, 'lines.');
