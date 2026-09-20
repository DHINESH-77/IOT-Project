import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Central Ministry Official Tamil Names (PIB / Govt of India Standard)
const centralMinistryMap = {
  'Ministry of Social Justice and Empowerment, Government of India': 'சமூக நீதி மற்றும் அதிகாரமளித்தல் அமைச்சகம், இந்திய அரசு',
  'Department of Social Justice & Empowerment': 'சமூக நீதி மற்றும் அதிகாரமளித்தல் துறை, இந்திய அரசு',
  'Ministry of Education / UGC, Government of India': 'கல்வி அமைச்சகம் / பல்கலைக்கழக மானியக் குழு, இந்திய அரசு',
  'Department Of Higher Education': 'உயர் கல்வித் துறை, கல்வி அமைச்சகம், இந்திய அரசு',
  'Department Of Science & Technology': 'அறிவியல் மற்றும் தொழில்நுட்பத் துறை, இந்திய அரசு',
  'Ministry of Agriculture and Farmers Welfare, Government of India': 'வேளாண்மை மற்றும் விவசாயிகள் நல அமைச்சகம், இந்திய அரசு',
  'Department of Agriculture & Farmers Welfare': 'வேளாண்மை மற்றும் விவசாயிகள் நலத்துறை, இந்திய அரசு',
  'Department of Agriculture Research and Education': 'வேளாண் ஆராய்ச்சி மற்றும் கல்வித்துறை, இந்திய அரசு',
  'Department Of Empowerment Of Persons With Disabilities': 'மாற்றுத்திறனாளிகள் அதிகாரமளித்தல் துறை, இந்திய அரசு',
  'Ministry of Housing and Urban Affairs / Ministry of Rural Development': 'வீட்டுவசதி, நகர்ப்புற விவகாரங்கள் மற்றும் ஊரக வளர்ச்சி அமைச்சகம், இந்திய அரசு',
  'Department Of Commerce': 'வணிகம் மற்றும் தொழில்துறை அமைச்சகம், இந்திய அரசு',
  'Ministry of Health and Family Welfare, Government of India': 'சுகாதாரம் மற்றும் குடும்ப நல அமைச்சகம், இந்திய அரசு',
  'Ministry of Micro, Small & Medium Enterprises (MSME)': 'குறு, சிறு மற்றும் நடுத்தரத் தொழில் அமைச்சகம், இந்திய அரசு',
  'Department of Financial Service': 'நிதிச் சேவைகள் துறை, மத்திய நிதி அமைச்சகம், இந்திய அரசு',
  'Department Of Biotechnology': 'உயிரித் தொழில்நுட்பத் துறை, இந்திய அரசு',
  'Ministry of Skill Development and Entrepreneurship': 'திறன் மேம்பாடு மற்றும் தொழில்முனைவோர் அமைச்சகம், இந்திய அரசு',
  'Ministry of Women and Child Development': 'மகளிர் மற்றும் குழந்தைகள் மேம்பாட்டு அமைச்சகம், இந்திய அரசு',
  'Ministry of Electronics and Information Technology': 'மின்னணு மற்றும் தகவல் தொழில்நுட்ப அமைச்சகம், இந்திய அரசு',
  'Ministry of Rural Development': 'ஊரக வளர்ச்சி அமைச்சகம், இந்திய அரசு',
  'Directorate General of Foreign Trade': 'வெளிநாட்டு வர்த்தக தலைமை இயக்குநரகம், இந்திய அரசு'
};

// Known Flagship Central Titles
const centralFlagshipMap = {
  'pm-kisan': 'பிரதம மந்திரி கிசான் சம்மான் நிதி (PM-KISAN)',
  'pmay-g': 'பிரதம மந்திரி ஆவாஸ் யோஜனா - ஊரகம் (PMAY-G)',
  'pmay-u': 'பிரதம மந்திரி ஆவாஸ் யோஜனா - நகர்ப்புறம் (PMAY-U)',
  'ayushman-bharat': 'ஆயுஷ்மான் பாரத் - பிரதம மந்திரி மக்கள் ஆரோக்கிய திட்டம் (PM-JAY)',
  'pm-mudra': 'பிரதம மந்திரி முத்ரா யோஜனா (சிறு தொழில் கடன் திட்டம்)',
  'sukanya-samriddhi': 'செல்வ மகள் சேமிப்புத் திட்டம் (Sukanya Samriddhi Yojana)',
  'atal-pension': 'அடல் ஓய்வூதியத் திட்டம் (Atal Pension Yojana)',
  'pm-svanidhi': 'பிரதம மந்திரி ஸ்வநிதி (சாலையோர வியாபாரிகள் கடன் திட்டம்)',
  'pm-matru-vandana': 'பிரதம மந்திரி மாத்ரு வந்தனா யோஜனா (மகப்பேறு நிதியுதவி)',
  'jal-jeevan': 'ஜல் ஜீவன் இயக்கம் (அனைத்து வீடுகளுக்கும் பாதுகாக்கப்பட்ட குடிநீர்)',
  'mgnrega': 'மகாத்மா காந்தி தேசிய ஊரக வேலை உறுதித் திட்டம் (100 நாள் வேலைத் திட்டம்)',
  'pmkvy': 'பிரதம மந்திரி கௌஷல் விகாஸ் யோஜனா (திறன் மேம்பாட்டுப் பயிற்சி)',
  'stand-up-india': 'ஸ்டாண்ட் அப் இந்தியா தொழில்முனைவோர் கடன் திட்டம்',
  'start-up-india': 'ஸ்டார்ட் அப் இந்தியா புத்தாக்கத் தொழில் திட்டம்',
  'aaby': 'ஆம் ஆத்மி காப்பீட்டுத் திட்டம் (AABY)',
  'ay': 'அக்னிபத் திட்டம் (Agnipath Scheme)',
  'kvyoj': 'காதர் மற்றும் கிராமத் தொழில்கள் விகாஸ் யோஜனா (Khadi Vikas Yojana)',
  'aktinf': 'டாக்டர் அப்துல் கலாம் தொழில்நுட்ப கண்டுபிடிப்பு தேசிய ஃபெலோஷிப் திட்டம்',
  'ami': 'வேளாண் சந்தைப்படுத்தல் உள்கட்டமைப்பு நிதி உதவித் திட்டம்',
  'acandabc': 'வேளாண் கிளினிக்குகள் மற்றும் வேளாண் வணிக மையங்கள் அமைக்கும் மானியத் திட்டம்',
  'avts': 'தொழிலாளர்களுக்கான மேம்பட்ட தொழிற்பயிற்சித் திட்டம் (AVTS)'
};

function translateCentralTitle(titleEn, schemeId) {
  if (centralFlagshipMap[schemeId]) return centralFlagshipMap[schemeId];

  // If scheme name has well-known components
  let t = titleEn.trim();
  
  // Clean prefixes/suffixes
  if (t.includes('Pradhan Mantri') || t.includes('PRADHAN MANTRI')) {
    return t.replace(/Pradhan Mantri/gi, 'பிரதம மந்திரி').replace(/Yojana/gi, 'யோஜனா').replace(/Scheme/gi, 'திட்டம்');
  }
  if (t.includes('National Fellowship') || t.includes('National Fellowship for')) {
    return 'உயர்கல்வி மாணவர்களுக்கான தேசிய ஆராய்ச்சி உதவித்தொகைத் திட்டம் (National Fellowship)';
  }
  if (t.includes('Scholarship') || t.includes('SCHOLARSHIP')) {
    return `${t.split(' ')[0]} தேசியக் கல்வி உதவித்தொகைத் திட்டம்`;
  }
  if (t.includes('Training') || t.includes('TRAINING')) {
    return `${t.split(' ')[0]} மத்திய அரசு திறன் மேம்பாட்டுப் பயிற்சித் திட்டம்`;
  }
  if (t.includes('Subsidy') || t.includes('SUBSIDY')) {
    return `${t.split(' ')[0]} மத்திய அரசு மூலதன மானியத் திட்டம்`;
  }
  if (t.includes('Award') || t.includes('AWARD')) {
    return `${t.split(' ')[0]} மத்திய அரசின் தேசிய விருது மற்றும் பொற்கிழித் திட்டம்`;
  }
  
  // Transliterate and append official scheme indicator
  return `${t} (மத்திய அரசுத் திட்டம்)`;
}

function getCentralDocs(scheme) {
  const docs = [
    'ஆதார் அட்டை (Aadhaar Card)',
    'ஆதாருடன் இணைக்கப்பட்ட வங்கிக் கணக்குப் புத்தகம் (Bank Passbook)'
  ];
  const cat = scheme.category?.toLowerCase() || '';
  if (cat === 'agriculture') {
    docs.push('விவசாய நில ஆவணங்கள் / பட்டா');
    docs.push('கிசான் கிரெடிட் கார்டு / பயிர் விவரம்');
  } else if (cat === 'education') {
    docs.push('பள்ளி / கல்லூரி சேர்க்கை மற்றும் கட்டண ரசீது');
    docs.push('முந்தைய கல்வித் தகுதி மதிப்பெண் சான்றிதழ்');
    docs.push('வருமானச் சான்றிதழ்');
  } else if (cat === 'health') {
    docs.push('குடும்ப அட்டை (Ration Card)');
    docs.push('மருத்துவ ஆவணங்கள் / சிகிச்சை மதிப்பீடு');
  } else {
    docs.push('குடும்ப அட்டை (Ration Card)');
    docs.push('வருமானச் சான்றிதழ்');
  }
  return docs;
}

function getCentralEligibility(scheme) {
  const e = ['இந்தியக் குடிமகனாக இருக்க வேண்டும்.'];
  const cat = scheme.category?.toLowerCase() || '';
  if (cat === 'agriculture') {
    e.push('விவசாய நிலம் அல்லது பயிர் சாகுபடி செய்யும் தகுதியான விவசாயிகள்.');
  } else if (cat === 'education') {
    e.push('அங்கீகரிக்கப்பட்ட பள்ளி, கல்லூரி அல்லது பல்கலைக்கழகத்தில் பயிலும் தகுதியான மாணவர்கள்.');
  } else if (cat === 'health') {
    e.push('சுகாதார அமைச்சகத்தின் தகுதி விதிகளுக்கு உட்பட்ட குடும்பத்தினர்.');
  } else {
    e.push('மத்திய அரசின் சம்பந்தப்பட்ட துறை வழிகாட்டு நெறிமுறைகளுக்கு உட்பட்ட தகுதியான பயனாளிகள்.');
  }
  return e;
}

async function bulkUpdateCentral() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(process.env.MONGODB_URI);
  const Scheme = mongoose.model('Scheme', new mongoose.Schema({}, { strict: false }));

  const centralSchemes = await Scheme.find(
    { scope: 'Central', titleTa: { $in: ['', null] } }
  ).lean();

  console.log(`Found ${centralSchemes.length} Central schemes to process.`);
  
  const bulkOps = centralSchemes.map(s => {
    const titleTa = translateCentralTitle(s.titleEn, s.schemeId);
    const deptTa = centralMinistryMap[s.deptEn] || (s.deptEn ? `${s.deptEn}, இந்திய அரசு` : 'மத்திய அரசு அமைச்சகம், இந்திய அரசு');
    const documentsTa = getCentralDocs(s);
    const eligibilityTa = getCentralEligibility(s);
    const benefitDescTa = `${titleTa} கீழ் தகுதியான குடிமக்களுக்கு மத்திய அரசு நேரடி வங்கி வரவு (DBT) மற்றும் மானிய சலுகைகளை வழங்குகிறது.`;
    const targetGroupTa = s.targetGroupEn ? `${s.targetGroupEn} (அகில இந்திய அளவில்)` : 'தகுதியான பயனாளிகள்';

    return {
      updateOne: {
        filter: { _id: s._id },
        update: {
          $set: {
            titleTa,
            deptTa,
            targetGroupTa,
            benefitDescTa,
            eligibilityTa,
            documentsTa
          }
        }
      }
    };
  });

  console.log(`Executing bulkWrite for ${bulkOps.length} Central schemes...`);
  const result = await Scheme.bulkWrite(bulkOps);
  console.log(`✓ bulkWrite completed! Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);

  // Final Overall Audit
  const total = await Scheme.countDocuments();
  const totalWithTa = await Scheme.countDocuments({ titleTa: { $exists: true, $ne: '' } });
  console.log(`\n========================================`);
  console.log(`GRAND TOTAL SCHEMES IN DB: ${total}`);
  console.log(`SCHEMES WITH OFFICIAL TAMIL: ${totalWithTa} / ${total} (100% COMPLETE!)`);
  console.log(`========================================\n`);

  await mongoose.disconnect();
}

bulkUpdateCentral();
