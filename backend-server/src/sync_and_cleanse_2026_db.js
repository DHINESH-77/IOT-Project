import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Scheme } from './models/Scheme.js';

// Ensure DNS works smoothly on Windows with Atlas
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envCandidate = path.resolve(__dirname, '../.env');
if (fs.existsSync(envCandidate)) {
  dotenv.config({ path: envCandidate });
} else {
  dotenv.config();
}

// 1. Missing or Landmark 2024-2026 Tamil Nadu & Central Flagship Schemes
const landmark2026Schemes = [
  {
    schemeId: 'tn-kmut-2026',
    category: 'welfare',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Women Heads of Eligible Households in Tamil Nadu',
    targetGroupTa: 'குடும்பத் தலைவிகள்',
    titleEn: 'Kalaignar Magalir Urimai Thittam (Women Rights Grant)',
    titleTa: 'கலைஞர் மகளிர் உரிமைத் திட்டம்',
    deptEn: 'Special Programme Implementation & Social Welfare Department, Govt of Tamil Nadu',
    deptTa: 'சிறப்பு திட்ட செயலாக்கத்துறை, தமிழ்நாடு அரசு',
    benefitAmount: '₹1,000 / month Direct Bank Transfer',
    benefitDescEn: 'Direct financial entitlement of ₹1,000 transferred on the 15th of every month directly into the bank accounts of women heads of families to ensure dignity, financial independence, and livelihood support.',
    benefitDescTa: 'குடும்பத் தலைவிகளுக்கு மாதம் ₹1,000 நேரடி வங்கி வரவு.',
    eligibilityEn: [
      'Applicant must be a woman family head listed in the Tamil Nadu Smart Ration Card.',
      'Annual household income must be less than ₹2.50 Lakhs.',
      'Family must not own four-wheelers for personal use (excluding commercial transport drivers).',
      'Annual household electricity consumption should be less than 3,600 units (300 units/month).',
      'Applicant should not be receiving other social security pensions (OAP, Widow, Differently Abled).',
      'Age must be 21 years or above.'
    ],
    eligibilityTa: [
      'குடும்ப அட்டையில் குடும்பத் தலைவியாக குறிப்பிடப்பட்டிருக்க வேண்டும்.',
      'குடும்ப ஆண்டு வருமானம் ₹2.5 லட்சத்திற்குள் இருக்க வேண்டும்.'
    ],
    documentsEn: [
      'Smart Family Card (Ration Card)',
      'Aadhaar Card of the woman applicant',
      'Active Bank Account Passbook seeded with Aadhaar',
      'Electricity Bill / Consumer Connection Number'
    ],
    documentsTa: ['குடும்ப அட்டை', 'ஆதார் அட்டை', 'வங்கி கணக்கு புத்தகம்'],
    applicationMode: 'e-Sevai Center / Special Revenue Camps / TNeGA Portal',
    officialUrl: 'https://kmut.tn.gov.in',
    activeOnTerminal: true,
    rank: 1,
    clicks: 0
  },
  {
    schemeId: 'tn-pudhumai-penn-2026',
    category: 'education',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Girl Students from Government Schools pursuing Higher Education',
    targetGroupTa: 'அரசுப் பள்ளி மாணவிகள்',
    titleEn: 'Moovalur Ramamirtham Ammaiyar Higher Education Assurance (Pudhumai Penn Thittam)',
    titleTa: 'புதுமைப் பெண் திட்டம்',
    deptEn: 'Social Welfare & Women Empowerment Department, Govt of Tamil Nadu',
    deptTa: 'சமூக நலன் மற்றும் மகளிர் உரிமைத்துறை',
    benefitAmount: '₹1,000 / month throughout Degree / Diploma Program',
    benefitDescEn: 'Monthly scholarship assistance of ₹1,000 credited directly into the bank accounts of female students who studied in government schools from Class 6 to 12 and enrolled in recognized undergraduate, diploma, or vocational programs.',
    benefitDescTa: 'மாதம் ₹1,000 உயர்கல்வி உதவித்தொகை.',
    eligibilityEn: [
      'Girl students who studied Classes 6 to 12 in Tamil Nadu Government Schools.',
      'Currently enrolled in recognized Undergraduate Degree, Engineering, Medicine, Diploma, or ITI course.',
      'Eligible even if student is receiving other merit-based academic scholarships.'
    ],
    eligibilityTa: [
      '6 முதல் 12-ஆம் வகுப்பு வரை அரசுப் பள்ளியில் பயின்ற மாணவிகள்.'
    ],
    documentsEn: [
      'Aadhaar Card',
      'School Transfer Certificate / Bonafide Certificate proving 6th to 12th in Govt School',
      'College Admission Letter / ID Card',
      'Bank Account Passbook in student name'
    ],
    documentsTa: ['ஆதார் அட்டை', 'பள்ளி மாற்றுச் சான்றிதழ்', 'கல்லூரி சேர்க்கை சான்றிதழ்'],
    applicationMode: 'College Nodal Officer / Penkalvi TNeGA Portal',
    officialUrl: 'https://www.pudhumaipenn.tn.gov.in',
    activeOnTerminal: true,
    rank: 2,
    clicks: 0
  },
  {
    schemeId: 'tn-tamizh-pudhalvan-2026',
    category: 'education',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Boy Students from Government Schools pursuing Higher Education',
    targetGroupTa: 'அரசுப் பள்ளி மாணவர்கள்',
    titleEn: 'Tamizh Pudhalvan Thittam (Higher Education Incentive Scheme for Boys)',
    titleTa: 'தமிழ்ப் புதல்வன் திட்டம்',
    deptEn: 'Social Welfare & Women Empowerment Department, Govt of Tamil Nadu',
    deptTa: 'சமூக நலத்துறை, தமிழ்நாடு அரசு',
    benefitAmount: '₹1,000 / month throughout Undergraduate Course',
    benefitDescEn: 'Provides ₹1,000 per month financial grant directly into bank accounts for male students who completed Class 6 to 12 in Tamil Nadu Government schools, helping purchase study materials, textbooks, and cover academic expenses.',
    benefitDescTa: 'மாதம் ₹1,000 மாணவர்களுக்கான உயர்கல்வி ஊக்கத்தொகை.',
    eligibilityEn: [
      'Male students who completed education from Class 6 to Class 12 in Tamil Nadu Government Schools.',
      'Admitted to accredited Degree, Polytechnic, Engineering, Arts & Science, or ITI programs in Tamil Nadu.',
      'Active student status verified by institution nodal officer.'
    ],
    eligibilityTa: [
      'அரசுப் பள்ளியில் 6 முதல் 12 வரை படித்த மாணவர்கள்.'
    ],
    documentsEn: [
      'Aadhaar Card',
      'Government School 6th-12th Bonafide Study Certificate',
      'College Bonafide / Enrollment Verification',
      'Aadhaar-seeded Bank Account Passbook'
    ],
    documentsTa: ['ஆதார் அட்டை', 'பள்ளி சான்றிதழ்', 'கல்லூரி அனுமதி அட்டை'],
    applicationMode: 'Online College Portal / Directorate of Collegiate Education',
    officialUrl: 'https://tamizhpudhalvan.tn.gov.in',
    activeOnTerminal: true,
    rank: 3,
    clicks: 0
  },
  {
    schemeId: 'tn-cmchis-2026',
    category: 'health',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Low-income Families in Tamil Nadu',
    targetGroupTa: 'ஏழை மற்றும் நடுத்தர குடும்பங்கள்',
    titleEn: "Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS - Rev 2026)",
    titleTa: 'முதலமைச்சரின் விரிவான மருத்துவக் காப்பீட்டுத் திட்டம்',
    deptEn: 'Health & Family Welfare Department, Govt of Tamil Nadu',
    deptTa: 'மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலத்துறை',
    benefitAmount: 'Up to ₹5,00,000 / year Cashless Hospitalization',
    benefitDescEn: 'Provides comprehensive cashless medical and surgical coverage up to ₹5 Lakhs per family per year across 1,000+ empanelled government and private hospitals for 1,500+ procedures, organ transplants, and emergency treatments.',
    benefitDescTa: 'ஆண்டுக்கு ₹5 லட்சம் வரை கட்டணமில்லா மருத்துவ சிகிச்சை.',
    eligibilityEn: [
      'Family must be resident of Tamil Nadu with valid Smart Family Card.',
      'Annual family income should be below ₹1,20,000 (verified by VAO / Tahsildar).',
      'Automatic inclusion for orphan children, registered Sri Lankan refugees, and destitute senior citizens.'
    ],
    eligibilityTa: [
      'குடும்ப ஆண்டு வருமானம் ₹1,20,000-க்கு மிகாமல் இருக்க வேண்டும்.'
    ],
    documentsEn: [
      'Smart Ration Card (Family Card)',
      'Income Certificate issued by Revenue Authority / VAO',
      'Aadhaar Cards of all family members',
      'Passport size photographs'
    ],
    documentsTa: ['ரேஷன் கார்டு', 'வருமானச் சான்றிதழ்', 'ஆதார் அட்டை'],
    applicationMode: 'District Collectorate CMCHIS Kiosk / e-Sevai Center',
    officialUrl: 'https://www.cmchistn.com',
    activeOnTerminal: true,
    rank: 4,
    clicks: 0
  },
  {
    schemeId: 'cen-pm-surya-ghar-2026',
    category: 'housing',
    scope: 'Central',
    targetGroupEn: 'Rural & Urban Residential Households',
    targetGroupTa: 'குடியிருப்பு வீடுகள்',
    titleEn: 'PM Surya Ghar: Muft Bijli Yojana (Rooftop Solar Subsidy)',
    titleTa: 'பிரதமர் சூர்ய கர்: இலவச மின்சாரத் திட்டம்',
    deptEn: 'Ministry of New and Renewable Energy, Govt of India',
    deptTa: 'புதிய மற்றும் புதுப்பிக்கத்தக்க எரிசக்தி அமைச்சகம்',
    benefitAmount: 'Up to ₹78,000 Direct Subsidy + 300 Units Free Electricity',
    benefitDescEn: 'Provides up to ₹30,000/kW subsidy for rooftop solar systems (up to ₹78,000 for 3kW), reducing household electricity expenditure to zero and allowing surplus power sale back to DISCOMs (TANGEDCO).',
    benefitDescTa: '₹78,000 வரை நேரடி மானியம் மற்றும் இலவச மின்சாரம்.',
    eligibilityEn: [
      'Applicant must be an Indian citizen owning a residential house with a suitable roof.',
      'Household must possess an active domestic electricity connection in the applicant name.',
      'Applicant should not have availed any previous central solar subsidy for the same premises.'
    ],
    eligibilityTa: ['சொந்த வீடு மற்றும் மின் இணைப்பு கொண்ட குடும்பங்கள்.'],
    documentsEn: [
      'Aadhaar Card',
      'Recent Electricity Bill (TANGEDCO Consumer Number)',
      'Proof of House Ownership / Property Tax Receipt',
      'Bank Account Passbook (Canceled Cheque)'
    ],
    documentsTa: ['ஆதார் அட்டை', 'மின் கட்டண ரசீது', 'வீட்டு வரி ரசீது'],
    applicationMode: 'National Rooftop Solar Portal / PM Surya Ghar App / e-Sevai',
    officialUrl: 'https://pmsuryaghar.gov.in',
    activeOnTerminal: true,
    rank: 5,
    clicks: 0
  },
  {
    schemeId: 'cen-pm-vishwakarma-2026',
    category: 'welfare',
    scope: 'Central',
    targetGroupEn: 'Traditional Artisans and Craftsmen across 18 Trades',
    targetGroupTa: 'பாரம்பரிய கைவினைஞர்கள்',
    titleEn: 'PM Vishwakarma Yojana (Artisan & Craftsman Support Scheme)',
    titleTa: 'பிரதமர் விஸ்வகர்மா திட்டம்',
    deptEn: 'Ministry of Micro, Small and Medium Enterprises, Govt of India',
    deptTa: 'குறு, சிறு மற்றும் நடுத்தர தொழில் அமைச்சகம்',
    benefitAmount: '₹15,000 Toolkit Grant + Collateral-Free Loans at 5% Interest',
    benefitDescEn: 'Comprehensive end-to-end support for 18 traditional trades (carpenters, blacksmiths, potters, masons, tailors, etc.) including skill verification, ₹500/day training stipend, ₹15,000 toolkit voucher, and collateral-free enterprise loans up to ₹3,00,000.',
    benefitDescTa: '₹15,000 உபகரண மானியம் மற்றும் குறைந்த வட்டி தொழில் கடன்.',
    eligibilityEn: [
      'Artisan or craftsman engaged in one of the 18 recognized traditional family-based trades.',
      'Minimum age of 18 years on date of application.',
      'Applicant should not have availed similar loans under PMEGP or PM SVANidhi in the last 5 years.',
      'Limited to one member per family.'
    ],
    eligibilityTa: ['18 பாரம்பரிய கைவினைத் தொழில்களில் ஈடுபடும் தொழிலாளர்கள்.'],
    documentsEn: [
      'Aadhaar Card (Mobile Linked)',
      'Ration Card / Family Proof',
      'Bank Account Details',
      'Trade Skill Self-Declaration'
    ],
    documentsTa: ['ஆதார் அட்டை', 'குடும்ப அட்டை', 'வங்கி கணக்கு விவரம்'],
    applicationMode: 'Common Service Centers (CSC) / e-Sevai / Gram Panchayat Verification',
    officialUrl: 'https://pmvishwakarma.gov.in',
    activeOnTerminal: true,
    rank: 6,
    clicks: 0
  },
  {
    schemeId: 'tn-makkalai-thedi-2026',
    category: 'health',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Rural & Urban Citizens needing Chronic Disease Management',
    targetGroupTa: 'கிராமப்புற நோயாளிகள்',
    titleEn: 'Makkalai Thedi Maruthuvam (Doorstep Healthcare Delivery)',
    titleTa: 'மக்களைத் தேடி மருத்துவம்',
    deptEn: 'Health and Family Welfare Department, Govt of Tamil Nadu',
    deptTa: 'மக்கள் நல்வாழ்வுத்துறை, தமிழ்நாடு அரசு',
    benefitAmount: '100% Free Doorstep Medication & Diagnostics',
    benefitDescEn: 'Community health workers and nursing teams visit village doorsteps to screen for non-communicable diseases (hypertension, diabetes), deliver monthly maintenance medicine boxes directly to senior citizens, and provide palliative care.',
    benefitDescTa: 'இல்லம் தேடி இலவச மருத்துவ சிகிச்சை மற்றும் மருந்துகள்.',
    eligibilityEn: [
      'All residents of Tamil Nadu diagnosed with Hypertension, Diabetes Mellitus, or chronic conditions.',
      'Senior citizens (60+) with reduced mobility.',
      'Patients requiring palliative and dialysis support at home.'
    ],
    eligibilityTa: ['நீரிழிவு, இரத்த அழுத்தம் மற்றும் இயலாமை கொண்ட முதியவர்கள்.'],
    documentsEn: [
      'Aadhaar Card',
      'Previous Medical Prescription / Hospital Case Sheet (if available)',
      'Smart Family Ration Card'
    ],
    documentsTa: ['ஆதார் அட்டை', 'மருத்துவ சீட்டு'],
    applicationMode: 'Village Health Nurse (VHN) Visit / Primary Health Centre (PHC) Registration',
    officialUrl: 'https://tnhealth.tn.gov.in',
    activeOnTerminal: true,
    rank: 7,
    clicks: 0
  },
  {
    schemeId: 'tn-uzhavar-pathukappu-2026',
    category: 'agriculture',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Small, Marginal Farmers & Agricultural Laborers',
    targetGroupTa: 'விவசாயிகள் மற்றும் விவசாயத் தொழிலாளர்கள்',
    titleEn: 'Tamil Nadu Farmers Social Security Scheme (Uzhavar Pathukappu Thittam)',
    titleTa: 'முதலமைச்சரின் உழவர் பாதுகாப்புத் திட்டம்',
    deptEn: 'Revenue and Disaster Management Department, Govt of Tamil Nadu',
    deptTa: 'வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை',
    benefitAmount: 'Financial Assistance up to ₹1,00,000 + Monthly Pension ₹1,000',
    benefitDescEn: 'Comprehensive social security covering accidental death relief (₹1,00,000), permanent disability aid, natural death assistance (₹20,000), funeral expenses (₹5,000), education assistance for children, and old age pension (₹1,000/month).',
    benefitDescTa: 'விபத்து நிவாரணம் ₹1,00,000 மற்றும் முதியோர் ஓய்வூதியம் ₹1,000.',
    eligibilityEn: [
      'Small and marginal farmers cultivating up to 2.5 acres of wetland or 5 acres of dryland.',
      'Agricultural laborers engaged in farm work without land ownership.',
      'Age between 18 and 65 years at time of member registration.'
    ],
    eligibilityTa: ['சிறு, குறு விவசாயிகள் மற்றும் விவசாய கூலித் தொழிலாளர்கள்.'],
    documentsEn: [
      'Uzhavar Pathukappu Member Card / Passbook',
      'Aadhaar Card',
      'Patta / Chitta (for farmers) or Agricultural Laborer Certificate from VAO',
      'Bank Account Passbook'
    ],
    documentsTa: ['உழவர் பாதுகாப்பு அட்டை', 'ஆதார் அட்டை', 'பட்டா / சிட்டா'],
    applicationMode: 'Special Tahsildar (Social Security Scheme) / e-Sevai Center',
    officialUrl: 'https://www.tn.gov.in/scheme/data_view/6864',
    activeOnTerminal: true,
    rank: 8,
    clicks: 0
  }
];

const syncAndCleanseDB = async () => {
  console.log('\n===============================================================');
  console.log('  CRIVERA - MongoDB Existing Database 2026 Cleansing & Sync');
  console.log('===============================================================\n');

  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not configured in backend-server/.env');
    }

    console.log(`Connecting to existing MongoDB database...`);
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
    console.log(`✅ Connected to: ${mongoose.connection.host}/${mongoose.connection.name}`);

    // Load authentic MyScheme dataset
    const datasetPath = path.resolve(__dirname, 'myscheme_dataset.json');
    if (!fs.existsSync(datasetPath)) {
      throw new Error(`myscheme_dataset.json not found at ${datasetPath}`);
    }

    const rawData = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
    console.log(`Loaded ${rawData.length} raw schemes from myscheme_dataset.json`);

    // 1. Identify and purge expired/temporary schemes
    const expiredKeywords = [
      'covid-19', 'fighting covid', 'discontinued', 'valid up to 2020', 
      'valid up to 2021', 'valid up to 2022', 'closed on', 'temporary package'
    ];

    const isExpired = (s) => {
      const full = (s.titleEn + ' ' + (s.benefitDescEn || '') + ' ' + (s.deptEn || '')).toLowerCase();
      return expiredKeywords.some(kw => full.includes(kw));
    };

    // 2. Build unique, deduplicated map of schemes
    const cleanMap = new Map();

    // First: insert the verified 2026 landmark schemes
    for (const s of landmark2026Schemes) {
      const normKey = s.titleEn.toLowerCase().replace(/[^a-z0-9]/g, '');
      cleanMap.set(normKey, s);
    }

    let purgedCount = 0;
    let duplicateCount = 0;

    // Second: process the authentic dataset, filtering expired and duplicate schemes
    for (const s of rawData) {
      if (isExpired(s)) {
        purgedCount++;
        continue;
      }

      const normKey = s.titleEn.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (cleanMap.has(normKey)) {
        duplicateCount++;
        continue;
      }

      // Clean up fields to ensure valid structure
      const cleaned = {
        schemeId: s.schemeId,
        category: s.category || 'welfare',
        scope: s.scope === 'Tamil Nadu' ? 'Tamil Nadu' : 'Central',
        targetGroupEn: s.targetGroupEn || 'Eligible Citizens & Families',
        targetGroupTa: s.targetGroupTa || '',
        titleEn: s.titleEn.trim(),
        titleTa: s.titleTa || '',
        deptEn: s.deptEn || 'Government of India',
        deptTa: s.deptTa || '',
        benefitAmount: s.benefitAmount || 'Government Welfare Benefit / Financial Grant',
        benefitDescEn: s.benefitDescEn || 'Official government welfare benefit as per guidelines.',
        benefitDescTa: s.benefitDescTa || '',
        eligibilityEn: Array.isArray(s.eligibilityEn) && s.eligibilityEn.length > 0 ? s.eligibilityEn : ['Valid resident proof and citizenship.', 'Meets departmental income and community criteria.'],
        eligibilityTa: s.eligibilityTa || [],
        documentsEn: Array.isArray(s.documentsEn) && s.documentsEn.length > 0 ? s.documentsEn : ['Aadhaar Card', 'Ration Card / Family Card', 'Bank Account Passbook with IFSC'],
        documentsTa: s.documentsTa || [],
        applicationMode: s.applicationMode || 'e-Sevai Center / Online Portal / District Office',
        officialUrl: s.officialUrl || 'https://www.myscheme.gov.in',
        activeOnTerminal: s.activeOnTerminal ?? (cleanMap.size < 20),
        rank: cleanMap.size + 1,
        clicks: s.clicks || 0
      };

      cleanMap.set(normKey, cleaned);
    }

    const finalSchemes = Array.from(cleanMap.values());
    console.log(`\nCleansing Summary:`);
    console.log(`- Expired / Discontinued Filtered Out: ${purgedCount}`);
    console.log(`- Duplicates Removed:                ${duplicateCount}`);
    console.log(`- Total High-Quality Unique Schemes:  ${finalSchemes.length}`);

    // Category breakdown
    const catCounts = {};
    const scopeCounts = {};
    finalSchemes.forEach(s => {
      catCounts[s.category] = (catCounts[s.category] || 0) + 1;
      scopeCounts[s.scope] = (scopeCounts[s.scope] || 0) + 1;
    });

    console.log(`\nCategory Breakdown:`, catCounts);
    console.log(`Scope Breakdown:   `, scopeCounts);

    // 3. Update existing MongoDB schemes collection cleanly
    console.log(`\nSynchronizing records with existing MongoDB Atlas schemes collection...`);
    
    // Clear out existing collection and insert sanitized, deduplicated, verified schemes
    await Scheme.deleteMany({});
    console.log(`Cleared existing outdated records from schemes collection.`);

    const insertResult = await Scheme.insertMany(finalSchemes, { ordered: false });
    console.log(`✅ Successfully inserted ${insertResult.length} verified schemes into existing crivera_db!`);

    // Verify final count
    const count = await Scheme.countDocuments();
    console.log(`\nFinal verified schemes in MongoDB collection: ${count}`);

    await mongoose.disconnect();
    console.log('MongoDB connection closed successfully.\n');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error during sync and cleansing:', error);
    process.exit(1);
  }
};

syncAndCleanseDB();
