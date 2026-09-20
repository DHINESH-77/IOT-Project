import os
import csv
import json
import re

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
CSV_PATH = os.path.join(DATA_DIR, 'Schemes.csv')
OUTPUT_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '../backend-server/src/myscheme_dataset.json'))

def clean_text(t):
    if not t:
        return ''
    # Remove HTML tags
    t = re.sub(r'<[^>]+>', ' ', t)
    # Remove markdown bold/italic
    t = re.sub(r'[*_#`]', '', t)
    # Normalize whitespace
    t = re.sub(r'\s+', ' ', t).strip()
    return t

def parse_bullets(text):
    if not text:
        return []
    # Split on newlines, bullets, or semicolons
    raw_lines = re.split(r'[\r\n•\-\*]+|(?<=\.)\s+(?=[A-Z0-9])', text)
    cleaned = []
    for line in raw_lines:
        c = clean_text(line)
        if len(c) > 10 and c not in cleaned:
            cleaned.append(c)
    return cleaned[:10] if cleaned else [clean_text(text)[:300]]

def map_category(cat_str, title_str):
    combined = (cat_str + ' ' + title_str).lower()
    if any(k in combined for k in ['agri', 'crop', 'farmer', 'krishi', 'kisan', 'horticulture', 'fertilizer', 'fisher', 'matsya', 'livestock', 'dairy', 'poultry', 'pashu', 'seed', 'irrigation']):
        return 'agriculture'
    if any(k in combined for k in ['hous', 'awas', 'shelter', 'sanitation', 'swachh', 'tap water', 'jal jeevan', 'toilet', 'electricity', 'saubhagya', 'ujala', 'urban development']):
        return 'housing'
    if any(k in combined for k in ['health', 'medic', 'ayushman', 'aarogya', 'hospital', 'wellness', 'maternal', 'swasthya', 'dialysis', 'doctor', 'disease', 'immuniz']):
        return 'health'
    if any(k in combined for k in ['edu', 'learn', 'school', 'scholar', 'student', 'shiksha', 'college', 'fellowship', 'vidya', 'university', 'tuition', 'academic', 'degree']):
        return 'education'
    return 'welfare'

def extract_benefit_amount(benefit_text):
    if not benefit_text:
        return 'Government Financial Grant / Welfare Subsidy'
    # Look for currency pattern like ₹1,000 or Rs. 50,000 or 100% or 5 Lakh
    m = re.search(r'(?:₹|Rs\.?|INR)\s*[\d,]+(?:\s*(?:Lakh|Crore|Cr|per|year|month|day))?', benefit_text, re.IGNORECASE)
    if m:
        return m.group(0).strip()
    # Or percentage
    m2 = re.search(r'\d+%\s*(?:subsidy|assistance|grant|cover)?', benefit_text, re.IGNORECASE)
    if m2:
        return m2.group(0).strip().capitalize()
    return clean_text(benefit_text)[:60]

def main():
    if not os.path.exists(CSV_PATH):
        print(f"Error: CSV not found at {CSV_PATH}")
        return

    schemes = []
    seen_ids = set()

    with open(CSV_PATH, mode='r', encoding='utf-8', errors='ignore') as f:
        reader = csv.DictReader(f)
        for idx, row in enumerate(reader):
            state = (row.get('state') or '').strip()
            elig_state = (row.get('eligibility_state') or '').strip()
            
            is_tn = 'tamil nadu' in state.lower() or 'tamil nadu' in elig_state.lower()
            is_central = state.lower() == 'central' or 'all' in elig_state.lower() or not state
            
            if not (is_tn or is_central):
                continue

            slug = (row.get('slug') or '').strip()
            if not slug or slug in seen_ids:
                slug = f"SCH-GOV-{len(schemes)+1:04d}"
            seen_ids.add(slug)

            name = clean_text(row.get('name') or '')
            if not name or len(name) < 3:
                continue

            category = map_category(row.get('category') or '', name)
            scope = 'Tamil Nadu' if is_tn and not is_central else 'Central'
            
            ministry = clean_text(row.get('ministry') or '')
            department = clean_text(row.get('department') or '')
            dept = department if department else (ministry if ministry else 'Government of India')

            benefits_raw = clean_text(row.get('benefits') or '')
            benefit_amount = extract_benefit_amount(benefits_raw)
            
            eligibility_list = parse_bullets(row.get('eligibility_text') or '')
            docs_list = parse_bullets(row.get('documents_required') or '')
            if not docs_list:
                docs_list = ['Aadhaar Card', 'Ration Card / Family Card', 'Active Bank Passbook with IFSC', 'Passport Size Photo']

            app_proc = clean_text(row.get('application_process') or '')
            if not app_proc or len(app_proc) < 5:
                app_proc = 'e-Sevai Kiosk / Online Portal / Respective District Office'

            official_url = (row.get('official_url') or '').strip()
            apply_url = (row.get('apply_url') or '').strip()
            dest_url = official_url if official_url.startswith('http') else (apply_url if apply_url.startswith('http') else f"https://www.myscheme.gov.in/schemes/{slug}")

            beneficiary = clean_text(row.get('beneficiary_type') or '')
            if not beneficiary:
                beneficiary = 'Eligible Citizens & Families'

            scheme_obj = {
                'schemeId': slug,
                'category': category,
                'scope': scope,
                'targetGroupEn': beneficiary[:100],
                'targetGroupTa': '',
                'titleEn': name,
                'titleTa': '',
                'deptEn': dept[:120],
                'deptTa': '',
                'benefitAmount': benefit_amount[:80],
                'benefitDescEn': benefits_raw if benefits_raw else 'Official government grant as per ministry guidelines.',
                'benefitDescTa': '',
                'eligibilityEn': eligibility_list,
                'eligibilityTa': [],
                'documentsEn': docs_list[:8],
                'applicationMode': app_proc[:150],
                'officialUrl': dest_url,
                'activeOnTerminal': len(schemes) < 15, # First 15 active on terminal initially
                'rank': len(schemes) + 1,
                'clicks': 0
            }
            schemes.append(scheme_obj)

    print(f"Total authentic Central & Tamil Nadu schemes processed: {len(schemes)}")
    cats = {}
    for s in schemes:
        cats[s['category']] = cats.get(s['category'], 0) + 1
    scopes = {}
    for s in schemes:
        scopes[s['scope']] = scopes.get(s['scope'], 0) + 1
        
    print("Category Breakdown:", cats)
    print("Scope Breakdown:", scopes)

    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(schemes, f, ensure_ascii=False, indent=2)

    print(f"Exported clean dataset to: {OUTPUT_PATH} ({os.path.getsize(OUTPUT_PATH)/(1024*1024):.2f} MB)")

if __name__ == '__main__':
    main()
