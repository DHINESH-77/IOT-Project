import requests
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Referer': 'https://www.myscheme.gov.in/search',
}

def test_endpoints():
    test_urls = [
        'https://api.myscheme.gov.in/api/v1/schemes',
        'https://www.myscheme.gov.in/api/v1/schemes',
        'https://api.myscheme.in/api/v1/schemes',
        'https://www.myscheme.gov.in/_next/data',
    ]
    for url in test_urls:
        try:
            r = requests.get(url, headers=headers, timeout=5)
            print(f"{url} -> Status: {r.status_code}")
        except Exception as e:
            print(f"{url} -> Error: {e}")

if __name__ == '__main__':
    test_endpoints()
