import os
import csv
import json
import urllib.request

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
os.makedirs(DATA_DIR, exist_ok=True)
CSV_PATH = os.path.join(DATA_DIR, 'Schemes.csv')
CSV_URL = 'https://huggingface.co/datasets/smartduketech/indian-government-schemes-2025/resolve/main/Schemes.csv'

def download_csv():
    if not os.path.exists(CSV_PATH) or os.path.getsize(CSV_PATH) < 1000000:
        print(f"Downloading official Schemes.csv from {CSV_URL} ...")
        # Handle redirect
        req = urllib.request.Request(CSV_URL, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp, open(CSV_PATH, 'wb') as out_file:
            out_file.write(resp.read())
        print(f"Downloaded Schemes.csv ({os.path.getsize(CSV_PATH) / (1024*1024):.2f} MB)")
    else:
        print(f"Using cached Schemes.csv ({os.path.getsize(CSV_PATH) / (1024*1024):.2f} MB)")

def analyze_schemes():
    download_csv()
    
    total = 0
    tn_schemes = []
    central_schemes = []
    
    with open(CSV_PATH, mode='r', encoding='utf-8', errors='ignore') as f:
        reader = csv.DictReader(f)
        for row in reader:
            total += 1
            state = (row.get('state') or '').strip()
            elig_state = (row.get('eligibility_state') or '').strip()
            
            is_tn = 'tamil nadu' in state.lower() or 'tamil nadu' in elig_state.lower()
            is_central = state.lower() == 'central' or 'all' in elig_state.lower() or not state
            
            if is_tn:
                tn_schemes.append(row)
            elif is_central:
                central_schemes.append(row)
                
    print("\n==================================================")
    print(f"Total schemes in dataset:       {total}")
    print(f"Tamil Nadu state schemes:       {len(tn_schemes)}")
    print(f"Central schemes:                {len(central_schemes)}")
    print(f"Combined Central + TN schemes:  {len(tn_schemes) + len(central_schemes)}")
    print("==================================================\n")

if __name__ == '__main__':
    analyze_schemes()
