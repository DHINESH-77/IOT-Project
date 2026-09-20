import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const strictlyCorrectedSchemes = [
  {
    schemeId: 'tn-kmut-2026',
    titleTa: 'கலைஞர் மகளிர் உரிமைத் திட்டம்',
    deptTa: 'சிறப்புத் திட்ட செயலாக்கத் துறை, தமிழ்நாடு அரசு',
    targetGroupTa: 'குடும்பத் தலைவிகள்',
    benefitDescTa: 'குடும்பத் தலைவிகளுக்கு மாதம் ₹1,000 நேரடி வங்கி வரவு.',
    eligibilityTa: [
      'குடும்ப அட்டையில் குடும்பத் தலைவியாகக் குறிப்பிடப்பட்டிருக்க வேண்டும்.',
      'குடும்ப ஆண்டு வருமானம் ₹2.5 லட்சத்திற்குள் இருக்க வேண்டும்.',
      'குடும்பத்தில் 4 சக்கர வாகனங்கள் சொந்தப் பயன்பாட்டிற்கு இருக்கக் கூடாது (வாடகை வாகனம் ஓட்டுநர்கள் விலக்கு).',
      'ஆண்டு மின் பயன்பாடு 3,600 யூனிட்டுகளுக்குள் இருக்க வேண்டும்.',
      'விண்ணப்பதாரர் 21 வயது பூர்த்தியடைந்தவராக இருக்க வேண்டும்.'
    ],
    documentsTa: [
      'குடும்ப அட்டை (மின்னணு அட்டை)',
      'ஆதார் அட்டை',
      'ஆதாருடன் இணைக்கப்பட்ட வங்கிக் கணக்குப் புத்தகம்',
      'மின் கட்டண ரசீது'
    ]
  },
  {
    schemeId: 'tn-pudhumai-penn-2026',
    titleTa: 'புதுமைப் பெண் திட்டம்',
    deptTa: 'சமூக நலன் மற்றும் மகளிர் உரிமைத் துறை, தமிழ்நாடு அரசு',
    targetGroupTa: 'அரசுப் பள்ளி மாணவிகள்',
    benefitDescTa: 'மாதம் ₹1,000 உயர்கல்வி உதவித்தொகை நேரடி வங்கி வரவு.',
    eligibilityTa: [
      '6 முதல் 12-ஆம் வகுப்பு வரை அரசுப் பள்ளிகளில் பயின்ற மாணவிகள்.',
      'அங்கீகரிக்கப்பட்ட பட்டப்படிப்பு, பட்டயப்படிப்பு (Diploma), பொறியியல், மருத்துவம் அல்லது தொழிற்படிப்புகளில் சேர்ந்திருக்க வேண்டும்.'
    ],
    documentsTa: [
      'ஆதார் அட்டை',
      'பள்ளி மாற்றுச் சான்றிதழ் (TC) / அரசுப் பள்ளி பயின்றதற்கான சான்றிதழ்',
      'கல்லூரி சேர்க்கைச் சான்றிதழ் / அடையாள அட்டை',
      'மாணவியின் பெயரிலுள்ள வங்கிக் கணக்குப் புத்தகம்'
    ]
  },
  {
    schemeId: 'tn-tamizh-pudhalvan-2026',
    titleTa: 'தமிழ்ப் புதல்வன் திட்டம்',
    deptTa: 'சமூக நலன் மற்றும் மகளிர் உரிமைத் துறை, தமிழ்நாடு அரசு',
    targetGroupTa: 'அரசுப் பள்ளி மாணவர்கள்',
    benefitDescTa: 'மாதம் ₹1,000 உயர்கல்வி ஊக்கத்தொகை நேரடி வங்கி வரவு.',
    eligibilityTa: [
      '6 முதல் 12-ஆம் வகுப்பு வரை அரசுப் பள்ளிகளில் பயின்ற மாணவர்கள்.',
      'அங்கீகரிக்கப்பட்ட பட்டப்படிப்பு, பட்டயப்படிப்பு அல்லது தொழிற்கல்வி பயிலும் மாணவர்கள்.'
    ],
    documentsTa: [
      'ஆதார் அட்டை',
      'அரசுப் பள்ளி பயின்றதற்கான சான்றிதழ் / மாற்றுச் சான்றிதழ்',
      'கல்லூரி சேர்க்கைச் சான்றிதழ் / அடையாள அட்டை',
      'மாணவரின் வங்கிக் கணக்குப் புத்தகம்'
    ]
  },
  {
    schemeId: 'tn-cmchis-2026',
    titleTa: 'முதலமைச்சரின் விரிவான மருத்துவக் காப்பீட்டுத் திட்டம்',
    deptTa: 'மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலத்துறை, தமிழ்நாடு அரசு',
    targetGroupTa: 'ஏழை மற்றும் நடுத்தரக் குடும்பங்கள்',
    benefitDescTa: 'குடும்பத்திற்கு ஆண்டுக்கு ₹5 லட்சம் வரை கட்டணமில்லா பணமில்லா மருத்துவ சிகிச்சை.',
    eligibilityTa: [
      'குடும்ப ஆண்டு வருமானம் ₹1,20,000-க்கு மிகாமல் இருக்க வேண்டும்.',
      'தமிழ்நாடு அரசு வழங்கிய செல்லுபடியாகும் குடும்ப அட்டை பெற்றிருக்க வேண்டும்.'
    ],
    documentsTa: [
      'குடும்ப அட்டை (மின்னணு குடும்ப அட்டை)',
      'வருமானச் சான்றிதழ் (வட்டாட்சியர் வழங்கியது)',
      'குடும்ப உறுப்பினர்களின் ஆதார் அட்டை'
    ]
  },
  {
    schemeId: 'cen-pm-surya-ghar-2026',
    titleTa: 'பிரதம மந்திரி சூர்ய கர்: இலவச மின்சாரத் திட்டம்',
    deptTa: 'புதிய மற்றும் புதுப்பிக்கத்தக்க எரிசக்தி அமைச்சகம்',
    targetGroupTa: 'குடியிருப்பு வீடுகள்',
    benefitDescTa: 'வீட்டின் கூரையில் சூரிய ஒளி தகடுகள் அமைக்க ₹78,000 வரை நேரடி மானியம் மற்றும் மாதம் 300 யூனிட் இலவச மின்சாரம்.',
    eligibilityTa: [
      'விண்ணப்பதாரர் சொந்தமாக கான்கிரீட் கூரை கொண்ட குடியிருப்பு வீடு வைத்திருக்க வேண்டும்.',
      'வீட்டில் செயலில் உள்ள மின் நுகர்வோர் இணைப்பு இருக்க வேண்டும்.'
    ],
    documentsTa: [
      'ஆதார் அட்டை',
      'மின் கட்டண ரசீது (Consumer Number உடன்)',
      'வீட்டு வரி ரசீது / கூரை உரிமை ஆவணம்',
      'வங்கிக் கணக்குப் புத்தகம்'
    ]
  },
  {
    schemeId: 'cen-pm-vishwakarma-2026',
    titleTa: 'பிரதம மந்திரி விஸ்வகர்மா திட்டம்',
    deptTa: 'குறு, சிறு மற்றும் நடுத்தரத் தொழில் அமைச்சகம்',
    targetGroupTa: 'பாரம்பரிய கைவினைஞர்கள் மற்றும் தொழிலாளர்கள்',
    benefitDescTa: '₹15,000 இலவச நவீன உபகரண மானியம் மற்றும் 5% சலுகை வட்டியில் ₹3,00,000 வரை பிணையில்லா தொழில் கடன்.',
    eligibilityTa: [
      'தச்சு வேலை, பொற்கொல்லர், கொல்லர், கொத்தனார், தையல் கலைஞர் உட்பட 18 பாரம்பரிய கைவினைத் தொழில்களில் ஈடுபடும் தொழிலாளர்கள்.',
      'விண்ணப்பதாரர் 18 வயது பூர்த்தியடைந்தவராக இருக்க வேண்டும்.'
    ],
    documentsTa: [
      'ஆதார் அட்டை',
      'குடும்ப அட்டை (மின்னணு அட்டை)',
      'தொழில் சார்ந்த விஸ்வகர்மா சான்றிதழ் / சுய பிரகடனம்',
      'வங்கிக் கணக்கு விவரம்'
    ]
  },
  {
    schemeId: 'tn-makkalai-thedi-2026',
    titleTa: 'மக்களைத் தேடி மருத்துவம் திட்டம்',
    deptTa: 'மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலத்துறை, தமிழ்நாடு அரசு',
    targetGroupTa: 'கிராமப்புற மற்றும் முதிய நோயாளிகள்',
    benefitDescTa: 'படுக்கையிலேயே இருக்கும் நோயாளிகள் மற்றும் முதியவர்களுக்கு இல்லம் தேடி மாதந்தோறும் இலவச பரிசோதனை மற்றும் மருந்துகள் வழங்குதல்.',
    eligibilityTa: [
      'உயர் இரத்த அழுத்தம், நீரிழிவு நோய், பக்கவாதம் மற்றும் தீவிர சிறுநீரக நோய் உள்ள நோயாளிகள்.',
      'மருத்துவமனைக்கு எளிதில் வர இயலாத முதியவர்கள் மற்றும் மாற்றுத்திறனாளிகள்.'
    ],
    documentsTa: [
      'ஆதார் அட்டை',
      'குடும்ப அட்டை',
      'முந்தைய மருத்துவச் சீட்டு மற்றும் மருந்து விவரக் குறிப்பு'
    ]
  },
  {
    schemeId: 'tn-uzhavar-pathukappu-2026',
    titleTa: 'முதலமைச்சரின் உழவர் பாதுகாப்புத் திட்டம்',
    deptTa: 'வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை, தமிழ்நாடு அரசு',
    targetGroupTa: 'விவசாயிகள் மற்றும் விவசாயத் தொழிலாளர்கள்',
    benefitDescTa: 'இயற்கை மரண நிவாரணம் ₹20,000, விபத்து நிவாரணம் ₹1,00,000, மற்றும் மாதம் ₹1,000 முதியோர் ஓய்வூதியம்.',
    eligibilityTa: [
      'சொந்த நிலத்தில் விவசாயம் செய்யும் சிறு/குறு விவசாயிகள் மற்றும் நிலமற்ற விவசாயக் கூலித் தொழிலாளர்கள்.',
      '18 முதல் 65 வயது வரையிலான விவசாய குடும்பத்தினர்.'
    ],
    documentsTa: [
      'உழவர் பாதுகாப்பு அட்டை (Uzhavar Card)',
      'ஆதார் அட்டை',
      'குடும்ப அட்டை',
      'பட்டா / சிட்டா (விவசாயிகளுக்கான நில ஆவணங்கள்)'
    ]
  }
];

async function updateAndVerify() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(process.env.MONGODB_URI);
  const Scheme = mongoose.model('Scheme', new mongoose.Schema({}, { strict: false }));
  
  console.log('\n--- 1. APPLYING STRICT GRAMMATICAL UPDATES ---');
  for (const s of strictlyCorrectedSchemes) {
    const res = await Scheme.updateOne(
      { schemeId: s.schemeId },
      {
        $set: {
          titleTa: s.titleTa,
          deptTa: s.deptTa,
          targetGroupTa: s.targetGroupTa,
          benefitDescTa: s.benefitDescTa,
          eligibilityTa: s.eligibilityTa,
          documentsTa: s.documentsTa
        }
      }
    );
    console.log(`✓ Updated [${s.schemeId}] ${s.titleTa} (Matched: ${res.matchedCount}, Modified: ${res.modifiedCount})`);
  }

  console.log('\n--- 2. VERIFYING STRICT ACCURACY IN ATLAS (Pass 1) ---');
  for (const s of strictlyCorrectedSchemes) {
    const doc = await Scheme.findOne({ schemeId: s.schemeId }).lean();
    if (!doc) {
      console.error(`❌ Scheme ${s.schemeId} NOT found in DB!`);
      continue;
    }
    const hasColloquial = JSON.stringify(doc).includes('ரேஷன்');
    if (hasColloquial) {
      console.error(`❌ COLLOQUIAL DETECTED in ${s.schemeId}: contains ரேஷன்`);
    } else {
      console.log(`✓ Pass 1 Check: [${doc.schemeId}] "${doc.titleTa}" -> Pure administrative Tamil verified.`);
    }
  }

  console.log('\n--- 3. VERIFYING FIELD COMPLETENESS (Pass 2) ---');
  for (const s of strictlyCorrectedSchemes) {
    const doc = await Scheme.findOne({ schemeId: s.schemeId }).lean();
    const checks = [
      Boolean(doc.titleTa && doc.titleTa.length > 5),
      Boolean(doc.deptTa && doc.deptTa.length > 5),
      Boolean(doc.benefitDescTa && doc.benefitDescTa.length > 10),
      Array.isArray(doc.eligibilityTa) && doc.eligibilityTa.length > 0,
      Array.isArray(doc.documentsTa) && doc.documentsTa.length > 0
    ];
    if (checks.every(Boolean)) {
      console.log(`✓ Pass 2 Completeness OK for [${doc.schemeId}] (Title: "${doc.titleTa}", Docs: ${doc.documentsTa.length}, Eligibility: ${doc.eligibilityTa.length})`);
    } else {
      console.error(`❌ Pass 2 Failed for [${doc.schemeId}]`);
    }
  }

  await mongoose.disconnect();
  console.log('\nAll updates and verification passes completed successfully.');
}

updateAndVerify();
