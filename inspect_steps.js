const fs = require('fs');
const readline = require('readline');

async function inspectTranscript() {
  const fileStream = fs.createReadStream('C:/Users/DHINESH/.gemini/antigravity-ide/brain/72a79289-381e-4c43-8f9a-17f9fc7abd7f/.system_generated/logs/transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (line.includes('"step_index":382') || line.includes('"step_index":303') || line.includes('"step_index":416') || line.includes('"step_index":430')) {
      try {
        const obj = JSON.parse(line);
        console.log(`=== STEP ${obj.step_index} (${obj.type}) ===`);
        if (typeof obj.content === 'string') {
          console.log(obj.content.slice(0, 500));
          fs.writeFileSync(`step_${obj.step_index}.txt`, obj.content);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
}
inspectTranscript();
