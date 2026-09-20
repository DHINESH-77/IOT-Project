import https from 'https';
import fs from 'fs';
import readline from 'readline';

const url = 'https://huggingface.co/datasets/smartduketech/indian-government-schemes-2025/resolve/main/Schemes.csv';

console.log('Fetching header and first few lines of Schemes.csv...');

https.get(url, (res) => {
  if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
    console.log('Redirecting to:', res.headers.location);
    https.get(res.headers.location, handleStream);
  } else {
    handleStream(res);
  }
});

function handleStream(stream) {
  const rl = readline.createInterface({ input: stream });
  let count = 0;
  rl.on('line', (line) => {
    count++;
    if (count <= 5) {
      console.log(`Line ${count}:`, line.slice(0, 150));
    } else {
      rl.close();
      console.log('Successfully connected and read first lines.');
      process.exit(0);
    }
  });
}
