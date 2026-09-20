import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Scheme } from './models/Scheme.js';

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

export const seedSchemes = [
  // =========================================================================
  // 1. AGRICULTURE & ALLIED LIVELIHOODS (15 OFFICIAL SCHEMES)
  // =========================================================================
  {
    schemeId: 'SCH-AGRI-01',
    category: 'agriculture',
    scope: 'Central',
    targetGroupEn: 'Small & Marginal Farmers',
    titleEn: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    deptEn: 'Ministry of Agriculture & Farmers Welfare, GoI',
    benefitAmount: '₹6,000 / year',
    benefitDescEn: 'Direct income support of ₹6,000 per year paid in 3 equal four-monthly installments of ₹2,000 directly into the bank accounts of farmers via Direct Benefit Transfer (DBT).',
    eligibilityEn: [
      'Small and marginal farmer families holding cultivable agricultural land up to 2 hectares in their name',
      'Citizens with verified landholding records in state revenue databases',
      'Must have Aadhaar-linked active savings bank account with e-KYC completed'
    ],
    documentsEn: ['Aadhaar Card', 'Land Patta / Chitta', 'Bank Account Passbook with IFSC', 'Smart Ration Card'],
    applicationMode: 'e-Sevai Kiosk / PM Kisan Portal / Village Agri Officer',
    officialUrl: 'https://pmkisan.gov.in',
    activeOnTerminal: true,
    rank: 1,
  },
  {
    schemeId: 'SCH-AGRI-02',
    category: 'agriculture',
    scope: 'Central',
    targetGroupEn: 'All Farmers Growing Notified Crops',
    titleEn: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    deptEn: 'Ministry of Agriculture & Farmers Welfare, GoI',
    benefitAmount: 'Comprehensive Crop Insurance Cover',
    benefitDescEn: 'Comprehensive insurance cover against crop loss or yield damage arising from non-preventable natural calamities such as drought, floods, inundation, pests, and unseasonal rains at minimal premium rates (1.5% to 2%).',
    eligibilityEn: [
      'All farmers cultivating notified food crops, oilseeds, and annual horticultural crops in notified revenue areas',
      'Available to both owner-farmers and verified tenant / sharecropper farmers',
      'Mandatory registration prior to the notified seasonal cut-off date'
    ],
    documentsEn: ['Aadhaar Card', 'Land Ownership Patta or Tenant Agreement', 'VAO Sowing Certificate / Adangal', 'Bank Passbook'],
    applicationMode: 'Primary Agricultural Co-operative Credit Societies (PACCS) / e-Sevai / Portal',
    officialUrl: 'https://pmfby.gov.in',
    activeOnTerminal: true,
    rank: 2,
  },
  {
    schemeId: 'SCH-AGRI-03',
    category: 'agriculture',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Farming Families in Village Panchayats',
    titleEn: 'Kalaignar All Village Integrated Agriculture Development Scheme',
    deptEn: 'Department of Agriculture & Farmers Welfare, Govt of Tamil Nadu',
    benefitAmount: 'Free Farm Inputs & Subsidized Solar Units',
    benefitDescEn: 'Holistic agricultural transformation providing free coconut saplings, horticulture fruit plants, sprayers, tarpaulins, micro-irrigation subsidies, and community water harvesting in selected Gram Panchayats.',
    eligibilityEn: [
      'All resident farmers possessing agricultural land in the selected Gram Panchayats for the current phase',
      'Special focus on Small & Marginal Farmers, SC/ST farmers, and women farmers',
      'Farmers with active registration on the Tamil Nadu AgriNet portal'
    ],
    documentsEn: ['Tamil Nadu Smart Ration Card', 'Aadhaar Card', 'Land Record (Patta / Chitta)', 'Uzhavan App Registration ID'],
    applicationMode: 'Assistant Agricultural Officer (AAO) / Block Agriculture Office',
    officialUrl: 'https://tnagrisnet.tn.gov.in',
    activeOnTerminal: true,
    rank: 3,
  },
  {
    schemeId: 'SCH-AGRI-04',
    category: 'agriculture',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Agricultural Landholders with Pump Sets',
    titleEn: 'Tamil Nadu Free Electricity for Agriculture Scheme',
    deptEn: 'Energy Department & TANGEDCO, Govt of Tamil Nadu',
    benefitAmount: '100% Free Power for Farm Irrigation',
    benefitDescEn: 'Continuous free unmetered electrical power supply for agricultural pump sets to reduce the cost of cultivation and ensure reliable irrigation across rural Tamil Nadu.',
    eligibilityEn: [
      'Farmers holding registered agricultural land with authorized borewell or open well irrigation systems',
      'Connection must be utilized exclusively for agricultural cultivation and farm operations',
      'Applicant must not possess unpaid commercial service arrears'
    ],
    documentsEn: ['Land Ownership Document (Patta and Adangal)', 'TANGEDCO Agricultural Service Application', 'Aadhaar Card of landowner', 'VAO Well Certificate'],
    applicationMode: 'TANGEDCO Section Office / Online Portal',
    officialUrl: 'https://tangedco.org',
    activeOnTerminal: true,
    rank: 4,
  },
  {
    schemeId: 'SCH-AGRI-05',
    category: 'agriculture',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Delta Paddy Cultivators',
    titleEn: 'Kuruvai Cultivation Special Package Scheme',
    deptEn: 'Agriculture & Farmers Welfare Department, Govt of Tamil Nadu',
    benefitAmount: 'Subsidized Seeds & Fertilizers',
    benefitDescEn: 'Special cultivation package providing 100% subsidized certified paddy seeds, chemical fertilizers (Urea, DAP, Potash), and micro-nutrient kits to support early kuruvai season sowing.',
    eligibilityEn: [
      'Paddy farmers possessing cultivable lands in the Cauvery delta districts (Thanjavur, Tiruvarur, Nagapattinam, Mayiladuthurai, etc.)',
      'Farmers utilizing canal irrigation or authorized filter point tube wells',
      'Priority given to small and marginal farmers'
    ],
    documentsEn: ['Smart Family Ration Card', 'Aadhaar Card', 'Revenue Patta / Chitta', 'VAO Kuruvai Sowing Verification Certificate'],
    applicationMode: 'Agricultural Extension Centers (AEC) / Uzhavan App',
    officialUrl: 'https://tnagrisnet.tn.gov.in',
    activeOnTerminal: true,
    rank: 5,
  },
  {
    schemeId: 'SCH-AGRI-06',
    category: 'agriculture',
    scope: 'Central',
    targetGroupEn: 'Farmers & Farmer Producer Organizations (FPOs)',
    titleEn: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    deptEn: 'Ministry of Agriculture & Farmers Welfare, GoI',
    benefitAmount: '40% to 50% Machinery Subsidy',
    benefitDescEn: 'Capital financial subsidy ranging from 40% to 50% on the purchase of modern agricultural machinery including tractors, power tillers, rotavators, paddy transplanters, and combine harvesters.',
    eligibilityEn: [
      'Individual farmers holding operational landholdings',
      'Preference and higher subsidy rate (50%) for SC, ST, Small & Marginal farmers, and women farmers',
      'Farmer Producer Organizations (FPOs) and Custom Hiring Centers (CHCs)'
    ],
    documentsEn: ['Aadhaar Card', 'Land Record (Patta / Chitta)', 'Dealer Quotation of Agricultural Machinery', 'Bank Account Passbook'],
    applicationMode: 'Agricultural Engineering Department / e-Sevai / Agricoop Portal',
    officialUrl: 'https://agrimachinery.nic.in',
    activeOnTerminal: true,
    rank: 6,
  },
  {
    schemeId: 'SCH-AGRI-07',
    category: 'agriculture',
    scope: 'Central',
    targetGroupEn: 'All Agricultural Landholders',
    titleEn: 'Soil Health Card Scheme',
    deptEn: 'Department of Agriculture, Cooperation & Farmers Welfare, GoI',
    benefitAmount: 'Free Soil Nutrient Testing & Advisory',
    benefitDescEn: 'Periodic issuance of customized Soil Health Cards carrying crop-wise nutrient status and dosage recommendations for 12 major soil parameters to optimize fertilizer usage.',
    eligibilityEn: [
      'All farmers holding agricultural land in rural villages',
      'Conducted cyclically every 2 years across all revenue village blocks',
      'Both land-owning farmers and tenant farmers are covered'
    ],
    documentsEn: ['Aadhaar Card', 'Land Survey Number / Revenue Adangal Details'],
    applicationMode: 'Soil Testing Laboratories (STL) / Village Agriculture Assistant',
    officialUrl: 'https://soilhealth.dac.gov.in',
    activeOnTerminal: true,
    rank: 7,
  },
  {
    schemeId: 'SCH-AGRI-08',
    category: 'agriculture',
    scope: 'Central',
    targetGroupEn: 'Organic Farming Farmer Clusters',
    titleEn: 'Paramparagat Krishi Vikas Yojana (PKVY)',
    deptEn: 'Ministry of Agriculture & Farmers Welfare, GoI',
    benefitAmount: '₹50,000 / hectare Financial Support',
    benefitDescEn: 'Financial assistance of ₹50,000 per hectare over 3 years for cluster-based organic farming, participatory organic certification, on-farm bio-inputs, and direct market linkages.',
    eligibilityEn: [
      'Farmer clusters comprising at least 20 to 50 farmers holding contiguous land of 50 acres',
      'Commitment to adopt chemical-free traditional organic farming methods',
      'Participation in Participatory Guarantee System (PGS-India) certification'
    ],
    documentsEn: ['Cluster Member Aadhaar Cards', 'Land Ownership Records', 'Cluster Formation Resolution', 'Bank Passbook'],
    applicationMode: 'Block Agriculture Extension Office / PKVY Portal',
    officialUrl: 'https://pgsindia-ncof.gov.in',
    activeOnTerminal: true,
    rank: 8,
  },
  {
    schemeId: 'SCH-AGRI-09',
    category: 'agriculture',
    scope: 'Central',
    targetGroupEn: 'Farmers Adopting Micro-Irrigation',
    titleEn: 'Pradhan Mantri Krishi Sinchayee Yojana (Per Drop More Crop)',
    deptEn: 'Ministry of Agriculture & Farmers Welfare & TN Agri Engineering',
    benefitAmount: '100% Subsidy for Small Farmers',
    benefitDescEn: '100% subsidy for small and marginal farmers (75% for other farmers) for installation of precision drip and sprinkler irrigation systems to conserve water and increase yields.',
    eligibilityEn: [
      'Farmers with verified agricultural land holding assured water source (well, borewell, or farm pond)',
      'Water testing report confirming water suitability for micro-irrigation',
      'No prior micro-irrigation subsidy claimed on the same land parcel in past 7 years'
    ],
    documentsEn: ['Land Patta, Chitta, and FMB Map', 'Aadhaar Card', 'Water & Electricity Connection Proof', 'Bank Account Passbook'],
    applicationMode: 'Department of Horticulture / Agriculture Engineering / e-Sevai',
    officialUrl: 'https://pmksy.gov.in',
    activeOnTerminal: true,
    rank: 9,
  },
  {
    schemeId: 'SCH-AGRI-10',
    category: 'agriculture',
    scope: 'Central',
    targetGroupEn: 'Farmers & Allied Sector Workers',
    titleEn: 'Kisan Credit Card (KCC) Scheme',
    deptEn: 'Department of Agriculture & Reserve Bank of India (RBI)',
    benefitAmount: 'Concessional Crop Loan up to ₹3,00,000 at 4%',
    benefitDescEn: 'Adequate and timely credit from the banking system under a single window with simplified procedures for crop production, post-harvest expenses, and animal husbandry at an effective 4% interest rate with prompt repayment incentive.',
    eligibilityEn: [
      'All owner cultivators, tenant farmers, oral lessees, and sharecroppers',
      'Self Help Groups (SHGs) or Joint Liability Groups (JLGs) of farmers',
      'Animal husbandry and fisheries farmers requiring working capital'
    ],
    documentsEn: ['Aadhaar Card', 'Land Record Documents (Patta / Lease Agreement)', 'Crop Cultivation Details from VAO', 'Passport photograph'],
    applicationMode: 'Commercial Banks / Regional Rural Banks / PACCS',
    officialUrl: 'https://myscheme.gov.in',
    activeOnTerminal: true,
    rank: 10,
  },
  {
    schemeId: 'SCH-AGRI-11',
    category: 'agriculture',
    scope: 'Central',
    targetGroupEn: 'Horticulture Growers & Nursery Operators',
    titleEn: 'Mission for Integrated Development of Horticulture (MIDH)',
    deptEn: 'Department of Agriculture, Cooperation & Farmers Welfare, GoI',
    benefitAmount: '40% to 50% Capital Grant for Protected Cultivation',
    benefitDescEn: 'Subsidies for polyhouses, shade net houses, post-harvest pack houses, cold storage units, and establishment of high-density fruit orchards (Mango, Guava, Banana, Papaya).',
    eligibilityEn: [
      'Individual farmers, farmer groups, SHGs, and cooperatives',
      'Adequate land with assured irrigation facility',
      'Adherence to technical layout standards prescribed by the Horticulture Department'
    ],
    documentsEn: ['Land Record (Patta / Chitta)', 'Aadhaar Card', 'Project Quotation / Technical Blueprint', 'Bank Account Passbook'],
    applicationMode: 'District Assistant Director of Horticulture Office / e-Sevai',
    officialUrl: 'https://midh.gov.in',
    activeOnTerminal: true,
    rank: 11,
  },
  {
    schemeId: 'SCH-AGRI-12',
    category: 'agriculture',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Rainfed Dryland Cultivators',
    titleEn: 'Tamil Nadu Mission on Sustainable Dryland Agriculture (MSDA)',
    deptEn: 'Agriculture Department, Govt of Tamil Nadu',
    benefitAmount: 'Free Seed Packets & Summer Ploughing Grants',
    benefitDescEn: 'Comprehensive package to improve soil health, conserve moisture, promote summer ploughing, and provide free drought-tolerant certified seeds of millets, pulses, and oilseeds for rainfed lands.',
    eligibilityEn: [
      'Farmers holding rainfed dryland with no access to canal or well irrigation',
      'Cluster formation of dryland farmers across contiguous village tracts',
      'Farmers participating in community watershed activities'
    ],
    documentsEn: ['Smart Family Card', 'Aadhaar Card', 'Dryland Patta / Revenue Adangal', 'Bank Account Details'],
    applicationMode: 'Agricultural Extension Center (AEC) / Uzhavan App',
    officialUrl: 'https://tnagrisnet.tn.gov.in',
    activeOnTerminal: true,
    rank: 12,
  },
  {
    schemeId: 'SCH-AGRI-13',
    category: 'agriculture',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Rural Women & Landless Poor',
    titleEn: 'Free Distribution of Milch Cows & Goats/Sheep Scheme',
    deptEn: 'Animal Husbandry, Dairying and Fisheries Department, Tamil Nadu',
    benefitAmount: '1 Free Cow or 4 Free Goats/Sheep per Family',
    benefitDescEn: 'Distribution of one lactating milch cow or 4 quality goats/sheep (1 buck/ram + 3 does/ewes) free of cost to poor rural women headed households to establish sustainable dairy and livestock livelihood.',
    eligibilityEn: [
      'Landless agricultural labor women living below the poverty line (BPL) in rural village panchayats',
      'Priority given to widows, destitute deserted women, and SC/ST women heads of families',
      'Beneficiary family must not own any existing cattle or operational land'
    ],
    documentsEn: ['Smart Ration Card', 'Aadhaar Card', 'VAO Landless and BPL Verification Certificate', 'Bank Account Passbook'],
    applicationMode: 'Grama Sabha Selection / Veterinary Assistant Surgeon Office',
    officialUrl: 'https://tn.gov.in',
    activeOnTerminal: true,
    rank: 13,
  },
  {
    schemeId: 'SCH-AGRI-14',
    category: 'agriculture',
    scope: 'Central',
    targetGroupEn: 'Fishermen, Fish Farmers & Coastal Workers',
    titleEn: 'Pradhan Mantri Matsya Sampada Yojana (PMMSY)',
    deptEn: 'Department of Fisheries, Ministry of Fisheries, Animal Husbandry & Dairying',
    benefitAmount: '40% to 60% Subsidy on Boats, Ponds & Cold Storage',
    benefitDescEn: 'Comprehensive scheme for fisheries sector development providing 40% subsidy (60% for women and SC/ST) for constructing new fish ponds, motorized fishing crafts, biofloc units, and ice plants.',
    eligibilityEn: [
      'Fishers, fish farmers, fish workers, and fisheries cooperatives',
      'Self Help Groups (SHGs) and Joint Liability Groups (JLGs) in fisheries sector',
      'Possession of suitable freshwater land or coastal fishing registration'
    ],
    documentsEn: ['Fisherman Identity Card / Biometric Card', 'Aadhaar Card', 'Land Ownership or Lease Record for Aquaculture', 'Bank Account Passbook'],
    applicationMode: 'District Fisheries Department / e-Sevai Kiosk',
    officialUrl: 'https://pmmsy.dof.gov.in',
    activeOnTerminal: true,
    rank: 14,
  },
  {
    schemeId: 'SCH-AGRI-15',
    category: 'agriculture',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Marine Fisherfolk Families',
    titleEn: 'Special Relief Allowance during Fishing Ban Period',
    deptEn: 'Department of Fisheries & Fishermen Welfare, Tamil Nadu',
    benefitAmount: '₹8,000 Cash Relief during Annual Ban',
    benefitDescEn: 'Direct financial assistance of ₹8,000 credited into the accounts of marine fishermen families during the 61-day annual fishing ban period on East and West coasts to support family subsistence.',
    eligibilityEn: [
      'Traditional marine fishermen engaged in mechanized or motorized sea fishing',
      'Enrolled as an active member of the Tamil Nadu Fishermen Welfare Board',
      'Residing in notified coastal fishing hamlets of Tamil Nadu'
    ],
    documentsEn: ['Fishermen Welfare Board Membership Card', 'Marine Fishing Biometric ID', 'Aadhaar Card', 'Aadhaar-linked Bank Account'],
    applicationMode: 'Through Local Fishermen Cooperative Societies / Fisheries Inspector',
    officialUrl: 'https://fisheries.tn.gov.in',
    activeOnTerminal: true,
    rank: 15,
  },

  // =========================================================================
  // 2. SOCIAL WELFARE, WOMEN & LIVELIHOOD (15 OFFICIAL SCHEMES)
  // =========================================================================
  {
    schemeId: 'SCH-WELF-01',
    category: 'welfare',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Women Heads of Eligible Households',
    titleEn: 'Kalaignar Magalir Urimai Thittam',
    deptEn: 'Special Programme Implementation Department, Govt of Tamil Nadu',
    benefitAmount: '₹1,000 / month',
    benefitDescEn: 'Direct economic entitlement of ₹1,000 per month credited directly into the bank accounts of women heads of households to recognize unpaid domestic labor and improve financial independence.',
    eligibilityEn: [
      'Woman head of household named on the Tamil Nadu Smart Family Card (age 21+)',
      'Annual household income must be below ₹2.5 Lakh per annum',
      'Annual household electricity consumption must be below 3,600 units',
      'Family must not hold more than 5 acres of wetland or 10 acres of dryland'
    ],
    documentsEn: ['Tamil Nadu Smart Family Ration Card', 'Aadhaar Card of the woman applicant', 'Aadhaar-linked Bank Account Passbook', 'Electricity Consumer Service Number'],
    applicationMode: 'Special Village Camps / e-Sevai Kiosks',
    officialUrl: 'https://kmut.tn.gov.in',
    activeOnTerminal: true,
    rank: 16,
  },
  {
    schemeId: 'SCH-WELF-02',
    category: 'welfare',
    scope: 'Central',
    targetGroupEn: 'Rural Adult Manual Laborers',
    titleEn: 'Mahatma Gandhi National Rural Employment Guarantee Scheme (MGNREGA)',
    deptEn: 'Ministry of Rural Development, GoI',
    benefitAmount: '100 Days Guaranteed Wage Employment',
    benefitDescEn: 'Statutory guarantee of at least 100 days of wage employment in every financial year to rural households whose adult members volunteer for unskilled manual work at notified daily wage rates (₹319/day in TN).',
    eligibilityEn: [
      'Adult members (aged 18 years or above) of rural households',
      'Must reside within the Gram Panchayat boundary where application is made',
      'Willingness to perform unskilled manual public works'
    ],
    documentsEn: ['Aadhaar Card', 'Ration Card / Smart Card', 'Passport size photograph', 'Bank or Post Office Savings Account Passbook'],
    applicationMode: 'Gram Panchayat Office / Village Administrative Center',
    officialUrl: 'https://nrega.nic.in',
    activeOnTerminal: true,
    rank: 17,
  },
  {
    schemeId: 'SCH-WELF-03',
    category: 'welfare',
    scope: 'Central',
    targetGroupEn: 'Traditional Artisans & Craftspeople',
    titleEn: 'PM Vishwakarma Scheme',
    deptEn: 'Ministry of Micro, Small and Medium Enterprises (MSME), GoI',
    benefitAmount: '₹15,000 Tool Voucher + 5% Collateral-free Loan',
    benefitDescEn: 'Comprehensive end-to-end support for traditional artisans across 18 family-based trades: PM Vishwakarma Certificate, 5-7 days basic skill training with ₹500/day stipend, ₹15,000 toolkit voucher, and collateral-free enterprise loans up to ₹3,00,000 at 5% interest.',
    eligibilityEn: [
      'Artisan or craftsperson working with hands and tools in one of 18 traditional family trades (Carpenter, Blacksmith, Potter, Mason, Barber, Tailor, Cobbler, etc.)',
      'Minimum age of 18 years on the date of registration',
      'Only one member per family is eligible for benefits under the scheme'
    ],
    documentsEn: ['Aadhaar Card', 'Mobile Number linked to Aadhaar', 'Bank Account Passbook', 'Smart Family Card / Ration Card'],
    applicationMode: 'Common Services Centers (CSC) / Village e-Sevai / Portal',
    officialUrl: 'https://pmvishwakarma.gov.in',
    activeOnTerminal: true,
    rank: 18,
  },
  {
    schemeId: 'SCH-WELF-04',
    category: 'welfare',
    scope: 'Central',
    targetGroupEn: 'Elderly Citizens Living Below Poverty Line',
    titleEn: 'Indira Gandhi National Old Age Pension Scheme (IGNOAPS)',
    deptEn: 'Revenue and Disaster Management Department, Govt of Tamil Nadu',
    benefitAmount: '₹1,000 / month',
    benefitDescEn: 'Monthly social security financial pension of ₹1,000 credited directly into the savings bank account of indigent senior citizens who lack family breadwinners or livelihood assets.',
    eligibilityEn: [
      'Senior citizens aged 60 years or above',
      'Must belong to a household identified as Below Poverty Line (BPL)',
      'Applicant must not have earning adult sons or substantial immovable financial assets'
    ],
    documentsEn: ['Age Proof (Aadhaar Card / Voter ID)', 'Smart Family Ration Card', 'VAO Indigent Verification Certificate', 'Bank Account Passbook'],
    applicationMode: 'e-Sevai Kiosk / Taluk Tahsildar Social Security Office',
    officialUrl: 'https://tn.gov.in',
    activeOnTerminal: true,
    rank: 19,
  },
  {
    schemeId: 'SCH-WELF-05',
    category: 'welfare',
    scope: 'Central',
    targetGroupEn: 'Widowed Women in BPL Families',
    titleEn: 'Indira Gandhi National Widow Pension Scheme (IGNWPS)',
    deptEn: 'Ministry of Rural Development & Social Security Dept, TN',
    benefitAmount: '₹1,000 / month',
    benefitDescEn: 'Monthly cash social pension of ₹1,000 directly credited to widowed women living below the poverty line to prevent destitution.',
    eligibilityEn: [
      'Widowed women aged 40 to 79 years',
      'Belonging to a household below the poverty line (BPL)',
      'Resident of the village panchayat for minimum 3 years'
    ],
    documentsEn: ['Husband Death Certificate', 'Aadhaar Card', 'Smart Family Card', 'VAO BPL Certificate', 'Bank Passbook'],
    applicationMode: 'e-Sevai Center / Taluk Office',
    officialUrl: 'https://nsap.nic.in',
    activeOnTerminal: true,
    rank: 20,
  },
  {
    schemeId: 'SCH-WELF-06',
    category: 'welfare',
    scope: 'Central',
    targetGroupEn: 'Persons with Severe Disabilities',
    titleEn: 'Indira Gandhi National Disability Pension Scheme (IGNDPS)',
    deptEn: 'Ministry of Rural Development & Differently Abled Dept, TN',
    benefitAmount: '₹1,000 / month',
    benefitDescEn: 'Monthly pension of ₹1,000 credited directly to persons with severe or multiple disabilities belonging to BPL households.',
    eligibilityEn: [
      'Persons aged 18 years and above',
      'Possessing severe or multiple disability of 80% or greater verified by Medical Board',
      'Household belongs to Below Poverty Line (BPL) category'
    ],
    documentsEn: ['National Disability Identity Card (UDID)', 'Disability Medical Certificate', 'Aadhaar Card', 'Smart Ration Card', 'Bank Passbook'],
    applicationMode: 'District Differently Abled Welfare Office / e-Sevai',
    officialUrl: 'https://nsap.nic.in',
    activeOnTerminal: true,
    rank: 21,
  },
  {
    schemeId: 'SCH-WELF-07',
    category: 'welfare',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Destitute Widows in Rural Areas',
    titleEn: 'Tamil Nadu Destitute Widow Pension Scheme',
    deptEn: 'Social Welfare & Women Empowerment Department, Govt of Tamil Nadu',
    benefitAmount: '₹1,000 / month + Free Rice & Textiles',
    benefitDescEn: 'Monthly pension of ₹1,000 along with free rice under public distribution and free annual sarees during Pongal and Diwali to support vulnerable widows with dignified subsistence.',
    eligibilityEn: [
      'Widow residing in Tamil Nadu with total family annual income not exceeding ₹1,00,000',
      'Applicant must not be remarried',
      'Must not own immovable property exceeding prescribed ceiling'
    ],
    documentsEn: ['Husband Death Certificate', 'Legal Heirship Certificate', 'VAO Destitute Certificate', 'Aadhaar Card and Smart Ration Card'],
    applicationMode: 'e-Sevai Center / Taluk Office',
    officialUrl: 'https://tnega.tn.gov.in',
    activeOnTerminal: true,
    rank: 22,
  },
  {
    schemeId: 'SCH-WELF-08',
    category: 'welfare',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Abandoned & Deserted Wives',
    titleEn: 'Tamil Nadu Destitute Deserted Wives Pension Scheme',
    deptEn: 'Revenue & Social Welfare Department, Govt of Tamil Nadu',
    benefitAmount: '₹1,000 / month + Free PDS Rice',
    benefitDescEn: 'Monthly financial assistance of ₹1,000 for women deserted or abandoned by their spouses for over 5 years or legally divorced without maintenance support.',
    eligibilityEn: [
      'Women aged 30 years or above deserted by spouse for more than 5 years (or legally divorced)',
      'Annual household income must not exceed ₹1,00,000',
      'Applicant must not possess significant landed property or regular family income'
    ],
    documentsEn: ['Desertion Certificate issued by Tahsildar or Court Divorce Decree', 'Aadhaar Card', 'Smart Ration Card', 'Bank Account Passbook'],
    applicationMode: 'Taluk Office / e-Sevai Kiosk',
    officialUrl: 'https://tn.gov.in',
    activeOnTerminal: true,
    rank: 23,
  },
  {
    schemeId: 'SCH-WELF-09',
    category: 'welfare',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Differently Abled Persons (75%+ Disability)',
    titleEn: 'Tamil Nadu Differently Abled Maintenance Allowance Scheme',
    deptEn: 'Welfare of Differently Abled Persons Department, Tamil Nadu',
    benefitAmount: '₹2,000 / month',
    benefitDescEn: 'Enhanced monthly maintenance allowance of ₹2,000 credited directly to persons with severe physical disability, muscular dystrophy, spinal cord injury, or intellectual disability.',
    eligibilityEn: [
      'Persons with benchmark disability of 75% and above (or any percentage for muscular dystrophy / autism)',
      'Permanent resident of Tamil Nadu',
      'No age restriction'
    ],
    documentsEn: ['Unique Disability ID (UDID) Card', 'Medical Board Disability Certificate', 'Aadhaar Card', 'Smart Family Card', 'Bank Passbook'],
    applicationMode: 'District Differently Abled Welfare Office (DDAWO) / e-Sevai',
    officialUrl: 'https://scd.tn.gov.in',
    activeOnTerminal: true,
    rank: 24,
  },
  {
    schemeId: 'SCH-WELF-10',
    category: 'welfare',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Registered Agricultural Laborers',
    titleEn: 'Chief Minister’s Uzhavar Pathukappu Thittam (Farmers Social Security)',
    deptEn: 'Revenue Administration & Agricultural Labourers Welfare Board, TN',
    benefitAmount: 'Comprehensive Financial & Accident Relief',
    benefitDescEn: 'Social security umbrella for landless agricultural laborers providing up to ₹1,00,000 accidental death relief, marriage assistance for children, educational grants, natural death relief (₹20,000), and funeral expenses.',
    eligibilityEn: [
      'Small and marginal farmers or agricultural laborers aged 18 to 65 years',
      'Registered as an active member of the Tamil Nadu Agricultural Labourers Welfare Board',
      'Working predominantly in agricultural and allied rural occupations'
    ],
    documentsEn: ['Welfare Board Member Identity Card', 'Smart Family Ration Card', 'Aadhaar Card', 'Bank Account Passbook with IFSC'],
    applicationMode: 'Special Tahsildar (Social Security Scheme) / e-Sevai Kiosk',
    officialUrl: 'https://tn.gov.in',
    activeOnTerminal: true,
    rank: 25,
  },
  {
    schemeId: 'SCH-WELF-11',
    category: 'welfare',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Brides from Poor Families',
    titleEn: 'Moovalur Ramamirtham Ammaiyar Ninaivu Marriage Assistance Scheme',
    deptEn: 'Social Welfare & Women Empowerment Department, Govt of Tamil Nadu',
    benefitAmount: '₹25,000 to ₹50,000 + 8g Sovereign Gold Coin',
    benefitDescEn: 'Financial grant of ₹25,000 (Class 10 completed) or ₹50,000 (Degree/Diploma holders) along with one 8-gram (1 sovereign) 22-carat pure gold coin for the thirumangalyam of poor brides.',
    eligibilityEn: [
      'Bride must be 18 years of age and groom 21 years of age at marriage',
      'Family annual income must not exceed ₹72,000',
      'Only one daughter per family can avail the scheme'
    ],
    documentsEn: ['Marriage Invitation & Marriage Certificate', 'Bride Education Marksheet (10th/12th/Degree)', 'Aadhaar Card', 'VAO Income & Residence Certificate'],
    applicationMode: 'e-Sevai Center / District Social Welfare Office',
    officialUrl: 'https://tnega.tn.gov.in',
    activeOnTerminal: true,
    rank: 26,
  },
  {
    schemeId: 'SCH-WELF-12',
    category: 'welfare',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Widows Daughters Marriage',
    titleEn: 'EVR Maniammaiyar Memorial Poor Widows Daughters Marriage Scheme',
    deptEn: 'Social Welfare Department, Govt of Tamil Nadu',
    benefitAmount: '₹25,000 to ₹50,000 + 8g Gold Coin',
    benefitDescEn: 'Targeted marriage financial assistance providing cash grant of ₹25,000 to ₹50,000 plus an 8-gram pure gold coin to assist poor widows with marrying off their daughters without entering debt traps.',
    eligibilityEn: [
      'Mother must be a verified poor widow',
      'Family annual income must not exceed ₹72,000 per annum',
      'Bride must have attained minimum age of 18 years'
    ],
    documentsEn: ['Mother’s Widow Certificate', 'Father’s Death Certificate', 'Bride’s Age & Education Certificate', 'Smart Ration Card', 'Marriage Invitation'],
    applicationMode: 'e-Sevai Kiosk / District Social Welfare Officer',
    officialUrl: 'https://tn.gov.in',
    activeOnTerminal: true,
    rank: 27,
  },
  {
    schemeId: 'SCH-WELF-13',
    category: 'welfare',
    scope: 'Central',
    targetGroupEn: 'Urban & Rural Street Vendors',
    titleEn: 'PM Street Vendor’s AtmaNirbhar Nidhi (PM SVANidhi)',
    deptEn: 'Ministry of Housing and Urban Affairs, GoI',
    benefitAmount: 'Collateral-free Micro-Credit ₹10,000 to ₹50,000',
    benefitDescEn: 'Micro-credit working capital facility providing an initial collateral-free loan of ₹10,000, with enhanced tranches of ₹20,000 and ₹50,000 upon timely repayment, along with 7% interest subsidy and cashback on digital transactions.',
    eligibilityEn: [
      'Street vendors engaged in vending before March 24, 2020 (or holding Vending Certificate/ID)',
      'Operating in peri-urban or rural panchayat town areas',
      'Possession of active mobile-linked Aadhaar card'
    ],
    documentsEn: ['Certificate of Vending / Letter of Recommendation (LoR)', 'Aadhaar Card', 'Bank Account Passbook'],
    applicationMode: 'Common Services Center (CSC) / Scheduled Commercial Banks / Portal',
    officialUrl: 'https://pmsvanidhi.mohua.gov.in',
    activeOnTerminal: true,
    rank: 28,
  },
  {
    schemeId: 'SCH-WELF-14',
    category: 'welfare',
    scope: 'Central',
    targetGroupEn: 'Rural Women Self Help Groups (SHGs)',
    titleEn: 'Deendayal Antyodaya Yojana - National Rural Livelihoods Mission (DAY-NRLM)',
    deptEn: 'Ministry of Rural Development & TNCDW, Govt of Tamil Nadu',
    benefitAmount: 'Revolving Fund + Interest-Subsidized Bank Credit',
    benefitDescEn: 'Provides revolving funds of ₹15,000 to ₹20,000, Community Investment Funds (CIF) up to ₹1,50,000, and institutional bank credit linkage at 7% interest rate for rural women SHGs to establish micro-enterprises.',
    eligibilityEn: [
      'Women Self Help Groups adhering to the Panchasutra principles (regular meetings, savings, inter-loaning, timely repayment, book-keeping)',
      'At least 70% members belonging to rural BPL or vulnerable households',
      'Active for at least 3 months with verified grading'
    ],
    documentsEn: ['SHG Bank Account Details', 'Panchayat Level Federation (PLF) Resolution', 'Member Aadhaar Copies', 'SHG Resolution Register'],
    applicationMode: 'Panchayat Level Federation (PLF) / Block Mission Management Unit',
    officialUrl: 'https://aajeevika.gov.in',
    activeOnTerminal: true,
    rank: 29,
  },
  {
    schemeId: 'SCH-WELF-15',
    category: 'welfare',
    scope: 'Central & Tamil Nadu',
    targetGroupEn: 'Poorest of the Poor Rural Families',
    titleEn: 'Antyodaya Anna Yojana (AAY / Red Ration Card)',
    deptEn: 'Food, Civil Supplies and Consumer Protection Department, Tamil Nadu',
    benefitAmount: '35 kg Free Foodgrains per Month',
    benefitDescEn: 'Assures food security by providing 35 kilograms of foodgrains (free rice in Tamil Nadu) per family per month to the poorest strata of rural society without charges.',
    eligibilityEn: [
      'Landless agricultural laborers, marginal farmers, rural artisans, and primitive tribal households',
      'Households headed by terminally ill persons, disabled persons, or widows without societal support',
      'Annual family income significantly below rural poverty line'
    ],
    documentsEn: ['Smart Family Card (AAY Category)', 'Aadhaar Card of all family members', 'Revenue VAO Deprivation Verification'],
    applicationMode: 'Taluk Supply Officer (TSO) / Fair Price Shops (Ration Shops)',
    officialUrl: 'https://tnpds.gov.in',
    activeOnTerminal: true,
    rank: 30,
  },

  // =========================================================================
  // 3. HOUSING & RURAL INFRASTRUCTURE (10 OFFICIAL SCHEMES)
  // =========================================================================
  {
    schemeId: 'SCH-HOUS-01',
    category: 'housing',
    scope: 'Central',
    targetGroupEn: 'Homeless & Kutcha House Households',
    titleEn: 'Pradhan Mantri Awas Yojana - Gramin (PMAY-G)',
    deptEn: 'Ministry of Rural Development, GoI',
    benefitAmount: '₹1,20,000 Grant + 90 Days MGNREGA Wages',
    benefitDescEn: 'Direct non-repayable capital assistance of ₹1.20 Lakh in plain areas plus 90 person-days of unskilled labor wages (₹28,710) and ₹12,000 toilet incentive under SBM-G to construct a durable pucca house with basic amenities.',
    eligibilityEn: [
      'Rural households living in zero-room, one-room, or two-room houses with kutcha roof and kutcha wall',
      'Households listed under the SECC 2011 deprivation list or verified Awas+ survey list',
      'Family must not possess any existing pucca concrete house in any part of India'
    ],
    documentsEn: ['Aadhaar Card of all adult family members', 'House Site Patta or Registered Land Deed', 'Smart Family Ration Card', 'MGNREGA Job Card', 'Bank Account Passbook'],
    applicationMode: 'Gram Panchayat Office / Block Development Office (BDO)',
    officialUrl: 'https://pmayg.nic.in',
    activeOnTerminal: true,
    rank: 31,
  },
  {
    schemeId: 'SCH-HOUS-02',
    category: 'housing',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Rural Thatched Hut Dwellers',
    titleEn: 'Kalaignar Kanavu Illam (Dream House Scheme)',
    deptEn: 'Rural Development and Panchayat Raj Department, Govt of Tamil Nadu',
    benefitAmount: '₹3,50,000 Assistance per Unit',
    benefitDescEn: 'State government initiative providing financial assistance of ₹3,50,000 per unit to systematically reconstruct and replace all existing thatched huts in rural villages with permanent, climate-resilient concrete houses.',
    eligibilityEn: [
      'Rural families currently residing in huts with thatched or temporary non-durable roofs',
      'Must possess lawful ownership of house site or valid government house site patta',
      'Must be enrolled on the official Rural Development Thatched Hut Survey database'
    ],
    documentsEn: ['House Site Patta / Title Deed', 'Smart Family Ration Card', 'Aadhaar Card of head of family', 'Geo-tagged photograph of existing hut', 'Bank Account Passbook'],
    applicationMode: 'Village Panchayat Secretary / Block BDO Office',
    officialUrl: 'https://tnrd.tn.gov.in',
    activeOnTerminal: true,
    rank: 32,
  },
  {
    schemeId: 'SCH-HOUS-03',
    category: 'housing',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Rural BPL Families with Rooftop Solar',
    titleEn: 'Chief Minister’s Solar Powered Green Housing Scheme (CMSPGHS)',
    deptEn: 'Rural Development and Panchayat Raj Department, Tamil Nadu',
    benefitAmount: '300 sq.ft Concrete House with Free Solar Power System',
    benefitDescEn: 'Construction of 300 square feet green concrete houses equipped with rooftop solar home lighting systems, built-in toilet, rainwater harvesting, and complete electricity connection for poor rural families.',
    eligibilityEn: [
      'Rural poor families living below poverty line holding valid house site patta',
      'Beneficiary family must not own any pucca house in the village or elsewhere',
      'Preference given to differently abled persons, widows, and primitive tribal families'
    ],
    documentsEn: ['House Site Patta', 'Smart Family Card', 'Aadhaar Card', 'VAO BPL Certificate', 'Bank Account Passbook'],
    applicationMode: 'Gram Panchayat Office / Block Development Officer',
    officialUrl: 'https://tnrd.tn.gov.in',
    activeOnTerminal: true,
    rank: 33,
  },
  {
    schemeId: 'SCH-HOUS-04',
    category: 'housing',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Landless Rural Poor Families',
    titleEn: 'Tamil Nadu Free House Site Patta Scheme',
    deptEn: 'Revenue and Disaster Management Department, Govt of Tamil Nadu',
    benefitAmount: 'Free 2 to 3 Cents House Site Patta',
    benefitDescEn: 'Free assignment of 2 to 3 cents of government poramboke or acquired land as legal house site patta to ensure every rural poor family has secure land title to build their permanent home.',
    eligibilityEn: [
      'Landless rural families residing below the poverty line (BPL)',
      'Continuous residence in the rural panchayat area for a minimum of 5 years',
      'Annual family income must not exceed ₹1,00,000 per annum'
    ],
    documentsEn: ['Smart Family Ration Card', 'Aadhaar Card', 'VAO Landless and Residence Verification Certificate', 'Income Certificate issued by Tahsildar'],
    applicationMode: 'e-Sevai Kiosk / Revenue Taluk Office / Jamabandi Camp',
    officialUrl: 'https://tnega.tn.gov.in',
    activeOnTerminal: true,
    rank: 34,
  },
  {
    schemeId: 'SCH-HOUS-05',
    category: 'housing',
    scope: 'Central & Tamil Nadu',
    targetGroupEn: 'Rural Households Lacking Sanitary Latrines',
    titleEn: 'Swachh Bharat Mission - Gramin (Individual Household Toilet)',
    deptEn: 'Department of Drinking Water & Sanitation & TN RDPR',
    benefitAmount: '₹12,000 Direct Financial Incentive',
    benefitDescEn: 'Direct financial incentive of ₹12,000 paid to individual rural households to construct a pour-flush sanitary twin-pit household latrine to eliminate open defecation.',
    eligibilityEn: [
      'Rural households lacking an individual household sanitary latrine',
      'All BPL households, and identified APL households (SC/ST, small/marginal farmers, women-headed, physically disabled)',
      'Must construct and geo-tag functional toilet unit'
    ],
    documentsEn: ['Aadhaar Card', 'Smart Family Ration Card', 'Photograph of completed toilet unit', 'Bank Account Passbook with IFSC'],
    applicationMode: 'Village Panchayat Office / Swachh Bharat Gramin Portal',
    officialUrl: 'https://sbm.gov.in',
    activeOnTerminal: true,
    rank: 35,
  },
  {
    schemeId: 'SCH-HOUS-06',
    category: 'housing',
    scope: 'Central & Tamil Nadu',
    targetGroupEn: 'Every Rural Household',
    titleEn: 'Jal Jeevan Mission (Har Ghar Jal)',
    deptEn: 'Department of Drinking Water and Sanitation & TWAD Board, TN',
    benefitAmount: 'Functional Household Tap Water Connection (55 lpcd)',
    benefitDescEn: 'Provides safe and adequate drinking water through individual household tap connections (FHTC) at a minimum service level of 55 liters per capita per day directly to every rural household.',
    eligibilityEn: [
      'All resident households in rural village panchayats and habitations',
      'Universal saturation coverage (every household covered without income cut-off)',
      'No capital installation charge levied on consumer'
    ],
    documentsEn: ['Smart Family Card / Property Tax Assessment receipt', 'Aadhaar Card'],
    applicationMode: 'Automatic Habitation Saturation by Gram Panchayat & TWAD Board',
    officialUrl: 'https://jaljeevanmission.gov.in',
    activeOnTerminal: true,
    rank: 36,
  },
  {
    schemeId: 'SCH-HOUS-07',
    category: 'housing',
    scope: 'Central',
    targetGroupEn: 'All Unconnected Rural Habitations',
    titleEn: 'Pradhan Mantri Gram Sadak Yojana (PMGSY)',
    deptEn: 'Ministry of Rural Development & TN Rural Roads Department',
    benefitAmount: 'All-Weather Bitumen Paved Road Connectivity',
    benefitDescEn: 'Provides durable, all-weather single connectivity with culverts and black-topped bitumen roads to all unconnected rural habitations with population of 500+ (250+ in tribal/hills).',
    eligibilityEn: [
      'Rural habitations lacking all-weather road connectivity to market centers or primary roads',
      'Habitations designated on core rural road network master plan',
      'Public community benefit (not for individual private pathways)'
    ],
    documentsEn: ['Panchayat Council Resolution requesting connectivity'],
    applicationMode: 'Through District Panchayat / Rural Development Engineering Wing',
    officialUrl: 'https://pmgsy.nic.in',
    activeOnTerminal: true,
    rank: 37,
  },
  {
    schemeId: 'SCH-HOUS-08',
    category: 'housing',
    scope: 'Central',
    targetGroupEn: 'Residential Electricity Consumers',
    titleEn: 'PM-Surya Ghar: Muft Bijli Yojana',
    deptEn: 'Ministry of New and Renewable Energy (MNRE), GoI',
    benefitAmount: 'Up to ₹78,000 Direct Subsidy for Rooftop Solar',
    benefitDescEn: 'Central government capital subsidy of ₹30,000 for 1 kW, ₹60,000 for 2 kW, and ₹78,000 for 3 kW and above rooftop solar installations to provide up to 300 units of free electricity every month.',
    eligibilityEn: [
      'Residential households holding valid consumer service electricity connection in their name',
      'Must possess shadow-free rooftop area suitable for solar PV module installation',
      'Grid-connected solar system with net-metering installed through registered vendor'
    ],
    documentsEn: ['Electricity Consumer Bill', 'Aadhaar Card', 'Roof Ownership Proof / House Tax Receipt', 'Bank Passbook'],
    applicationMode: 'National Rooftop Solar Portal / TANGEDCO Net Metering Portal',
    officialUrl: 'https://pmsuryaghar.gov.in',
    activeOnTerminal: true,
    rank: 38,
  },
  {
    schemeId: 'SCH-HOUS-09',
    category: 'housing',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Handloom Weavers & Rural Artisans',
    titleEn: 'Workshed-cum-Housing Scheme for Handloom Weavers',
    deptEn: 'Handlooms, Handicrafts, Textiles and Khadi Department, Tamil Nadu',
    benefitAmount: 'Financial Assistance for Ventilated Workshed',
    benefitDescEn: 'Financial assistance to rural handloom weavers to construct a hygienic, well-lit, and properly ventilated work shed attached to their dwelling to accommodate modernized looms.',
    eligibilityEn: [
      'Active weavers enrolled in recognized Primary Handloom Weavers Cooperative Societies',
      'Must possess own house site or legally allotted workshed space',
      'Operating at least one functional handloom'
    ],
    documentsEn: ['Weaver Cooperative Society Membership ID', 'Land / House Ownership Document', 'Aadhaar Card', 'Bank Passbook'],
    applicationMode: 'Through Respective Handloom Weavers Cooperative Society / Assistant Director Office',
    officialUrl: 'https://tn.gov.in',
    activeOnTerminal: true,
    rank: 39,
  },
  {
    schemeId: 'SCH-HOUS-10',
    category: 'housing',
    scope: 'Central',
    targetGroupEn: 'Low Income Rural Earners',
    titleEn: 'Credit Linked Subsidy Scheme for Rural Housing',
    deptEn: 'Ministry of Rural Development & National Housing Bank (NHB)',
    benefitAmount: '3% Upfront Interest Subsidy on Housing Loan',
    benefitDescEn: 'Interest subsidy of 3% per annum on housing loans up to ₹2,00,000 for construction, expansion, or pucca renovation of rural houses through scheduled banks and housing finance corporations.',
    eligibilityEn: [
      'Rural households not covered under PMAY-G beneficiary lists',
      'Constructing or adding pucca concrete rooms to existing rural homes',
      'Must be borrowing through participating primary lending institutions'
    ],
    documentsEn: ['Approved Building Plan / Panchayat NOC', 'Aadhaar Card', 'Income Statement / Self-Declaration', 'Land Ownership Patta'],
    applicationMode: 'Commercial Banks / Regional Rural Banks / Housing Finance Companies',
    officialUrl: 'https://myscheme.gov.in',
    activeOnTerminal: true,
    rank: 40,
  },

  // =========================================================================
  // 4. EDUCATION & YOUTH EMPOWERMENT (10 OFFICIAL SCHEMES)
  // =========================================================================
  {
    schemeId: 'SCH-EDU-01',
    category: 'education',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Girl Students in Colleges & Universities',
    titleEn: 'Moovalur Ramamirtham Ammaiyar Pudhumai Penn Scheme',
    deptEn: 'Social Welfare & Women Empowerment Department, Govt of Tamil Nadu',
    benefitAmount: '₹1,000 / month',
    benefitDescEn: 'Direct monthly financial incentive of ₹1,000 credited into the student’s bank account to encourage girl students from government schools to pursue higher education without financial discontinuation.',
    eligibilityEn: [
      'Girl students who completed Class 6 to Class 12 continuously in Tamil Nadu Government schools',
      'Currently enrolled in recognized undergraduate degree, diploma, ITI, or professional degree courses',
      'Verified through the Higher Education department student portal'
    ],
    documentsEn: ['School Transfer Certificate (TC) certifying 6th to 12th Govt study', '10th and 12th Marksheets', 'Aadhaar Card', 'College Bonafide Certificate', 'Student Bank Passbook'],
    applicationMode: 'College Administration Portal / Pudhumai Penn Portal',
    officialUrl: 'https://pudhumaipenn.tn.gov.in',
    activeOnTerminal: true,
    rank: 41,
  },
  {
    schemeId: 'SCH-EDU-02',
    category: 'education',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Boy Students in Collegiate Education',
    titleEn: 'Tamil Pudhalvan Scheme',
    deptEn: 'Higher Education Department, Govt of Tamil Nadu',
    benefitAmount: '₹1,000 / month',
    benefitDescEn: 'Monthly assistance of ₹1,000 credited directly into the bank accounts of male collegiate students to cover textbooks, academic tools, and public transport expenses.',
    eligibilityEn: [
      'Boy students who studied from Class 6 to Class 12 in Tamil Nadu Government schools',
      'Currently pursuing undergraduate higher education courses in recognized colleges, polytechnics, or ITIs',
      'Continuous enrollment verified through institutional database'
    ],
    documentsEn: ['Government School EMIS Study Certificate', 'Class 12 Higher Secondary Marksheet', 'Student Aadhaar Card', 'College Bonafide Certificate', 'Aadhaar-linked Bank Passbook'],
    applicationMode: 'College Portal / Higher Education Department',
    officialUrl: 'https://tn.gov.in',
    activeOnTerminal: true,
    rank: 42,
  },
  {
    schemeId: 'SCH-EDU-03',
    category: 'education',
    scope: 'Central & Tamil Nadu',
    targetGroupEn: 'SC, ST & Converted Christian Students',
    titleEn: 'Post-Matric Scholarship for SC & ST Students',
    deptEn: 'Adi Dravidar and Tribal Welfare Department, Govt of Tamil Nadu',
    benefitAmount: '100% Tuition Fee Waiver + Maintenance Grant',
    benefitDescEn: 'Complete exemption from compulsory non-refundable college tuition fees and annual maintenance allowance up to ₹13,500 for students pursuing polytechnic, arts, science, engineering, and medical degrees.',
    eligibilityEn: [
      'Students belonging to Scheduled Caste (SC), Scheduled Tribe (ST), or SC Converted Christians',
      'Annual parental income from all sources must not exceed ₹2,50,000',
      'Must be pursuing recognized post-matriculation courses'
    ],
    documentsEn: ['Permanent Community Certificate with QR code', 'Annual Income Certificate issued by Tahsildar', 'Previous Exam Marksheet', 'College Fee Structure', 'Student Bank Passbook'],
    applicationMode: 'National Scholarship Portal (NSP) / State Portal',
    officialUrl: 'https://scholarships.gov.in',
    activeOnTerminal: true,
    rank: 43,
  },
  {
    schemeId: 'SCH-EDU-04',
    category: 'education',
    scope: 'Tamil Nadu',
    targetGroupEn: 'BC, MBC and DNC College Students',
    titleEn: 'Post-Matric Scholarship for BC, MBC & DNC Students',
    deptEn: 'Backward Classes, Most Backward Classes and Minorities Welfare Department, TN',
    benefitAmount: 'Tuition Fee Reimbursement + Hostel Allowance',
    benefitDescEn: 'Reimbursement of tuition fees and specialized hostel maintenance allowance for students pursuing undergraduate, postgraduate, and polytechnic education in government and aided institutions.',
    eligibilityEn: [
      'Students belonging to Backward Classes (BC), Most Backward Classes (MBC), or De-notified Communities (DNC)',
      'Annual parental income must not exceed ₹2,50,000',
      'Regular attendance and bona fide admission in recognized collegiate institution'
    ],
    documentsEn: ['BC / MBC / DNC Community Certificate', 'Income Certificate', 'College Bonafide Certificate & Fee Slip', 'Aadhaar Card', 'Student Bank Account'],
    applicationMode: 'Through Respective College Scholarship Office / e-Sevai',
    officialUrl: 'https://bcmbcmw.tn.gov.in',
    activeOnTerminal: true,
    rank: 44,
  },
  {
    schemeId: 'SCH-EDU-05',
    category: 'education',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Primary School Children (Classes 1 to 5)',
    titleEn: 'Chief Minister’s Breakfast Scheme',
    deptEn: 'Social Welfare & Nutritious Meal Programme Department, TN',
    benefitAmount: 'Nutritious Free Daily Breakfast',
    benefitDescEn: 'Provides hot, wholesome, freshly cooked breakfast on all working school days to ensure children attend school without morning hunger, preventing malnutrition and improving concentration.',
    eligibilityEn: [
      'Children enrolled and studying in Classes 1 to 5 in Tamil Nadu Government primary schools',
      'Applies to all rural panchayat union schools, tribal schools, and urban local body schools',
      'Universal coverage without any income or caste criteria'
    ],
    documentsEn: ['Automatic enrollment via School EMIS Student Registry (No document submission required)'],
    applicationMode: 'Automatic via School Enrollment',
    officialUrl: 'https://tn.gov.in',
    activeOnTerminal: true,
    rank: 45,
  },
  {
    schemeId: 'SCH-EDU-06',
    category: 'education',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Class 12 & College Entrants',
    titleEn: 'Free Laptop Scheme for Students',
    deptEn: 'Special Programme Implementation & School Education, Govt of Tamil Nadu',
    benefitAmount: 'Free Modern Laptop Computer',
    benefitDescEn: 'Distribution of brand-new laptops equipped with open-source and educational operating software to equip rural students with modern digital skills and computational competence.',
    eligibilityEn: [
      'Students completing Class 12 in Tamil Nadu Government and Government-aided schools',
      'Admitted to approved undergraduate collegiate or technical diploma programs',
      'Regular attendance verified by school and college authorities'
    ],
    documentsEn: ['School Student ID Card / EMIS Number', 'Class 12 Passing Marksheet', 'Aadhaar Card of the student', 'College Admission Fee Slip'],
    applicationMode: 'Through Respective Schools & Colleges (ELCOT Distribution)',
    officialUrl: 'https://elcot.in',
    activeOnTerminal: true,
    rank: 46,
  },
  {
    schemeId: 'SCH-EDU-07',
    category: 'education',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Class 11 Government School Students',
    titleEn: 'Free Bicycle Scheme for Students',
    deptEn: 'School Education & BC/MBC Welfare Department, Tamil Nadu',
    benefitAmount: 'Free Branded Bicycle',
    benefitDescEn: 'Distribution of free bicycles to girl and boy students studying in Class 11 of Government and Government-aided schools to overcome transportation barriers and prevent high school dropouts.',
    eligibilityEn: [
      'Students enrolled in Class 11 in Tamil Nadu Government or Government-aided higher secondary schools',
      'Universal distribution to all enrolled students regardless of community or family income'
    ],
    documentsEn: ['School Identity Card', 'EMIS Student Registry Confirmation'],
    applicationMode: 'Direct Distribution at Respective Government Higher Secondary Schools',
    officialUrl: 'https://tn.gov.in',
    activeOnTerminal: true,
    rank: 47,
  },
  {
    schemeId: 'SCH-EDU-08',
    category: 'education',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Meritorious Govt School Students',
    titleEn: '7.5% Preferential Reservation with Complete Fee Exemption',
    deptEn: 'Higher Education & Health Department, Govt of Tamil Nadu',
    benefitAmount: '100% Engineering, Medical & Law College Fees Paid by Govt',
    benefitDescEn: '7.5% horizontal reservation in professional courses (MBBS, BDS, Engineering, Agriculture, Veterinary, Law) for government school students, with 100% tuition fee, hostel fee, and counseling fees borne by the government.',
    eligibilityEn: [
      'Students who studied from Class 6 to Class 12 continuously in Tamil Nadu Government schools',
      'Secured admission into professional colleges through single-window counseling under the 7.5% quota',
      'Verification through Chief Educational Officer (CEO) school bonafide'
    ],
    documentsEn: ['6th to 12th Govt School Study Certificate issued by Headmaster and countersigned by CEO', 'NEET / TNEA Allotment Order', 'Aadhaar Card'],
    applicationMode: 'Single Window Professional Counseling (TNEA / TN Medical Selection)',
    officialUrl: 'https://tneaonline.org',
    activeOnTerminal: true,
    rank: 48,
  },
  {
    schemeId: 'SCH-EDU-09',
    category: 'education',
    scope: 'Central',
    targetGroupEn: 'Meritorious Rural Middle School Students',
    titleEn: 'National Means-cum-Merit Scholarship Scheme (NMMSS)',
    deptEn: 'Department of School Education & Literacy, Ministry of Education, GoI',
    benefitAmount: '₹12,000 / year (Class 9 to 12)',
    benefitDescEn: 'Scholarship of ₹12,000 per annum credited directly into student bank accounts to support meritorious students from economically weaker sections and reduce dropout rates at Class 8 level.',
    eligibilityEn: [
      'Students studying in Class 8 in Government, Local Body, and Government-aided schools with at least 55% marks',
      'Parental annual income from all sources must not exceed ₹3,50,000',
      'Must qualify the State-level NMMSS Mental Ability Test (MAT) and Scholastic Aptitude Test (SAT)'
    ],
    documentsEn: ['Class 7 Marksheet', 'Parental Income Certificate', 'Aadhaar Card', 'Student Bank Account Details'],
    applicationMode: 'National Scholarship Portal (NSP) / State Examination Directorate',
    officialUrl: 'https://scholarships.gov.in',
    activeOnTerminal: true,
    rank: 49,
  },
  {
    schemeId: 'SCH-EDU-10',
    category: 'education',
    scope: 'Tamil Nadu',
    targetGroupEn: 'College Students & Unemployed Youth',
    titleEn: 'Naan Mudhalvan Scheme (Statewide Skill Upgradation)',
    deptEn: 'Tamil Nadu Skill Development Corporation (TNSDC), Govt of Tamil Nadu',
    benefitAmount: 'Free Cutting-Edge Technical Training & Placements',
    benefitDescEn: 'Massive skill empowerment providing specialized industry-aligned training in Artificial Intelligence, Machine Learning, Robotics, Coding, Digital Marketing, and Electric Vehicles along with direct campus placement drives.',
    eligibilityEn: [
      'Students enrolled in engineering, arts, science, and polytechnic colleges across Tamil Nadu',
      'Young jobseekers looking to acquire high-demand digital and industrial competencies'
    ],
    documentsEn: ['College Student ID', 'Aadhaar Card', 'Naan Mudhalvan Portal Registration'],
    applicationMode: 'Naan Mudhalvan College Spoke / Online Portal',
    officialUrl: 'https://naanmudhalvan.tn.gov.in',
    activeOnTerminal: true,
    rank: 50,
  },

  // =========================================================================
  // 5. HEALTHCARE, MATERNITY & ACCIDENT COVER (10 OFFICIAL SCHEMES)
  // =========================================================================
  {
    schemeId: 'SCH-HLTH-01',
    category: 'health',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Low & Moderate Income Families',
    titleEn: 'Chief Minister’s Comprehensive Health Insurance Scheme (CMCHIS)',
    deptEn: 'Health and Family Welfare Department, Govt of Tamil Nadu',
    benefitAmount: '₹5,00,000 / year Cashless Hospitalization',
    benefitDescEn: 'Comprehensive cashless medical treatment and surgical cover up to ₹5,00,000 per family per year across 1,090+ empaneled government and private hospitals covering 1,513 medical and surgical procedures.',
    eligibilityEn: [
      'Members whose names are enrolled on a valid Tamil Nadu Smart Family Card',
      'Family annual income must be below ₹1,20,000 per annum',
      'No income ceiling for registered unorganized welfare board workers and Sri Lankan Tamil camp residents'
    ],
    documentsEn: ['Tamil Nadu Smart Family Ration Card', 'Aadhaar Card of all family members', 'VAO Income Certificate', 'Existing CMCHIS Card (for renewals)'],
    applicationMode: 'District Collectorate CMCHIS Kiosk / e-Sevai Center',
    officialUrl: 'https://cmchistn.com',
    activeOnTerminal: true,
    rank: 51,
  },
  {
    schemeId: 'SCH-HLTH-02',
    category: 'health',
    scope: 'Central',
    targetGroupEn: 'Vulnerable Rural Poor Families',
    titleEn: 'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)',
    deptEn: 'National Health Authority (NHA), Ministry of Health & Family Welfare, GoI',
    benefitAmount: '₹5,00,000 / family / year Secondary & Tertiary Care',
    benefitDescEn: 'World’s largest health assurance scheme providing secondary and tertiary care hospitalization coverage up to ₹5 Lakhs per family per year on a completely cashless basis in empaneled hospitals across India.',
    eligibilityEn: [
      'Families identified under the rural SECC 2011 deprivation criteria (deprivation categories D1, D2, D3, D4, D5, D7)',
      'Families without any adult earning male member or landless manual casual laborers',
      'Active Ayushman Bharat Golden Card holder'
    ],
    documentsEn: ['Aadhaar Card', 'Ration Card / Smart Card', 'PM-JAY Family Letter / Ayushman Card'],
    applicationMode: 'Empaneled Hospital Ayushman Mitra Kiosk / e-Sevai',
    officialUrl: 'https://pmjay.gov.in',
    activeOnTerminal: true,
    rank: 52,
  },
  {
    schemeId: 'SCH-HLTH-03',
    category: 'health',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Pregnant Women & New Mothers',
    titleEn: 'Dr. Muthulakshmi Reddy Maternity Benefit Scheme (MRMBS)',
    deptEn: 'Directorate of Public Health and Preventive Medicine, Govt of Tamil Nadu',
    benefitAmount: '₹18,000 (Cash Assistance + Amma Nutrition Kits)',
    benefitDescEn: 'Comprehensive maternal health incentive of ₹18,000 provided in 5 conditional DBT installments (₹14,000 cash) and 2 Amma Maternity Nutrition Kits (valued at ₹4,000) to ensure nutritional security and eliminate infant mortality.',
    eligibilityEn: [
      'Pregnant women aged 19 years and above belonging to BPL families',
      'Limited to the first two deliveries',
      'Must register early with Village Health Nurse (VHN) before the 12th week of pregnancy'
    ],
    documentsEn: ['PICME (Pregnancy and Infant Cohort Monitoring and Evaluation) 12-digit Number', 'Mother’s Aadhaar Card', 'Smart Family Ration Card', 'MCP RCH Card', 'Bank Account Passbook'],
    applicationMode: 'Primary Health Center (PHC) / Village Health Nurse (VHN)',
    officialUrl: 'https://picme.tn.gov.in',
    activeOnTerminal: true,
    rank: 53,
  },
  {
    schemeId: 'SCH-HLTH-04',
    category: 'health',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Elderly, Bedridden & Chronic Disease Patients',
    titleEn: 'Makkalai Thedi Maruthuvam (Healthcare at Doorsteps)',
    deptEn: 'Department of Health & Family Welfare, Govt of Tamil Nadu',
    benefitAmount: 'Free Doorstep Delivery of Medicines & Diagnostic Care',
    benefitDescEn: 'Doorstep clinical screening, hypertension and diabetes drug delivery, peritoneal dialysis bag distribution, and palliative care directly at village doorsteps by trained Women Health Volunteers (WHVs).',
    eligibilityEn: [
      'Citizens aged 45 years and above in village panchayats screened for hypertension and diabetes',
      'Bedridden patients, stroke survivors, and individuals requiring continuous palliative care',
      'Patients undergoing home peritoneal dialysis'
    ],
    documentsEn: ['Doctor Prescription / Hospital Treatment Record', 'Aadhaar Card', 'Smart Family Ration Card'],
    applicationMode: 'Doorstep Visit by Women Health Volunteer / Local PHC',
    officialUrl: 'https://tn.gov.in',
    activeOnTerminal: true,
    rank: 54,
  },
  {
    schemeId: 'SCH-HLTH-05',
    category: 'health',
    scope: 'Central',
    targetGroupEn: 'Pregnant Women for Institutional Delivery',
    titleEn: 'Janani Suraksha Yojana (JSY)',
    deptEn: 'Ministry of Health and Family Welfare, GoI',
    benefitAmount: 'Direct Cash Assistance for Safe Institutional Delivery',
    benefitDescEn: 'Conditional cash transfer of ₹1,400 for rural mothers who opt for delivery in government health institutions (PHCs, CHCs, District Headquarters Hospitals) to minimize maternal and infant mortality.',
    eligibilityEn: [
      'All pregnant women delivering in public health institutions in rural areas',
      'Women from SC, ST, and BPL households delivering in accredited facilities',
      'Registration on national maternal tracking portal'
    ],
    documentsEn: ['Mother and Child Protection (MCP) Card', 'Aadhaar Card', 'Institutional Delivery Discharge Summary', 'Bank Passbook with IFSC'],
    applicationMode: 'Government Hospital / Primary Health Center (PHC)',
    officialUrl: 'https://nhm.gov.in',
    activeOnTerminal: true,
    rank: 55,
  },
  {
    schemeId: 'SCH-HLTH-06',
    category: 'health',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Road Accident Victims in Tamil Nadu',
    titleEn: 'Innuyir Kaappom - Nammai Kaakkum 48 Scheme',
    deptEn: 'Health & Family Welfare Department, Govt of Tamil Nadu',
    benefitAmount: 'First 48 Hours Cashless Emergency Care up to ₹1,00,000',
    benefitDescEn: 'Covers the critical emergency medical treatment expenses up to ₹1,00,000 during the first 48 hours for any road accident victim across 680+ government and private network hospitals across Tamil Nadu.',
    eligibilityEn: [
      'Any road accident victim injured on roads within Tamil Nadu geographical territory',
      'Applies universally to Tamil Nadu residents, tourists, and other state citizens',
      'No income, domicile, or nationality barrier'
    ],
    documentsEn: ['Hospital Accident Trauma Registry (Immediate emergency admission without upfront documents)'],
    applicationMode: 'Immediate Emergency Care at Network Hospital / Dial 108',
    officialUrl: 'https://tn.gov.in',
    activeOnTerminal: true,
    rank: 56,
  },
  {
    schemeId: 'SCH-HLTH-07',
    category: 'health',
    scope: 'Central',
    targetGroupEn: 'Pregnant Women Across Trimesters',
    titleEn: 'Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)',
    deptEn: 'Ministry of Health and Family Welfare, GoI',
    benefitAmount: 'Free Assured Antenatal Clinical Care on 9th of Every Month',
    benefitDescEn: 'Guarantees free, comprehensive, and quality antenatal checkups by medical specialists/gynecologists on the 9th day of every month to detect high-risk pregnancies and prevent complications.',
    eligibilityEn: [
      'All pregnant women in their 2nd and 3rd trimesters of pregnancy',
      'Visiting designated public healthcare facilities (PHCs, CHCs, Sub-Divisional Hospitals)',
      'Free diagnostics including blood pressure, hemoglobin, ultrasound, and urine albumin'
    ],
    documentsEn: ['Mother and Child Protection (MCP) Card', 'Aadhaar Card'],
    applicationMode: 'Government Health Facilities on the 9th of Every Month',
    officialUrl: 'https://pmsma.nhp.gov.in',
    activeOnTerminal: true,
    rank: 57,
  },
  {
    schemeId: 'SCH-HLTH-08',
    category: 'health',
    scope: 'Central',
    targetGroupEn: 'Tuberculosis (TB) Patients',
    titleEn: 'Nikshay Poshan Yojana (NTEP)',
    deptEn: 'Central TB Division, Ministry of Health & Family Welfare, GoI',
    benefitAmount: '₹500 / month Direct Nutritional Assistance',
    benefitDescEn: 'Direct financial incentive of ₹500 per month credited directly into the bank accounts of all notified TB patients throughout the entire duration of anti-TB treatment to meet nutritional expenses.',
    eligibilityEn: [
      'All tuberculosis patients notified on the national NIKSHAY portal',
      'Receiving DOTS treatment through government health facilities or registered private practitioners',
      'Active bank account linked to NIKSHAY beneficiary ID'
    ],
    documentsEn: ['Nikshay Patient ID Card', 'Aadhaar Card', 'Bank Account Passbook with IFSC', 'TB Medical Treatment Card'],
    applicationMode: 'Through Government DOTS Center / Designated Microscopy Center (DMC)',
    officialUrl: 'https://nikshay.in',
    activeOnTerminal: true,
    rank: 58,
  },
  {
    schemeId: 'SCH-HLTH-09',
    category: 'health',
    scope: 'Tamil Nadu',
    targetGroupEn: 'Newborn Infants Born in Government Hospitals',
    titleEn: 'Amma Baby Care Kit Scheme',
    deptEn: 'Health and Family Welfare Department, Govt of Tamil Nadu',
    benefitAmount: '16-Item Comprehensive Baby Care Kit (Value: ₹1,000)',
    benefitDescEn: 'Provides a beautiful box kit containing 16 essential baby care and hygiene items (baby mattress, towel, dress, mosquito net, baby oil, soap, shampoo, rattle toy, hand sanitizer, sowbhagya lehyam for mother).',
    eligibilityEn: [
      'All mothers delivering live newborn infants in Tamil Nadu Government hospitals and Primary Health Centers',
      'Universal distribution at the time of postnatal hospital discharge',
      'No income or ration card restriction'
    ],
    documentsEn: ['Hospital Delivery Discharge Summary'],
    applicationMode: 'Direct Distribution at Government Hospital Ward upon Delivery',
    officialUrl: 'https://tn.gov.in',
    activeOnTerminal: true,
    rank: 59,
  },
  {
    schemeId: 'SCH-HLTH-10',
    category: 'health',
    scope: 'Central',
    targetGroupEn: 'All Citizens in Need of Affordable Medicines',
    titleEn: 'Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP)',
    deptEn: 'Department of Pharmaceuticals, Ministry of Chemicals & Fertilizers, GoI',
    benefitAmount: 'Quality Generic Medicines at 50% to 90% Lower Cost',
    benefitDescEn: 'Dedicated Jan Aushadhi Kendras providing high-quality WHO-GMP certified generic medicines, surgical items, and nutraceuticals at 50% to 90% cheaper prices compared to branded market alternatives.',
    eligibilityEn: [
      'Universal civic access for all citizens, rural families, and outpatients',
      'Doctor’s prescription for schedule drugs (OTC items available directly)',
      'Available across 10,000+ Jan Aushadhi outlets nationwide'
    ],
    documentsEn: ['Doctor Prescription (for prescription medications)'],
    applicationMode: 'Nearest Pradhan Mantri Jan Aushadhi Kendra',
    officialUrl: 'https://janaushadhi.gov.in',
    activeOnTerminal: true,
    rank: 60,
  }
];

const runSeed = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI is not defined in .env');
      process.exit(1);
    }
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to: ${mongoose.connection.host}/${mongoose.connection.name}`);

    console.log('Clearing existing schemes collection...');
    await Scheme.deleteMany({});

    console.log(`Inserting ${seedSchemes.length} verified Central & Tamil Nadu schemes...`);
    const inserted = await Scheme.insertMany(seedSchemes);

    console.log(`\n======================================================`);
    console.log(`✅ SUCCESS: Populated MongoDB Atlas with ${inserted.length} schemes!`);
    console.log(`   - Agriculture:     ${seedSchemes.filter(s => s.category === 'agriculture').length}`);
    console.log(`   - Social Welfare:  ${seedSchemes.filter(s => s.category === 'welfare').length}`);
    console.log(`   - Housing:         ${seedSchemes.filter(s => s.category === 'housing').length}`);
    console.log(`   - Education:       ${seedSchemes.filter(s => s.category === 'education').length}`);
    console.log(`   - Healthcare:      ${seedSchemes.filter(s => s.category === 'health').length}`);
    console.log(`   - Central Schemes: ${seedSchemes.filter(s => s.scope === 'Central').length}`);
    console.log(`   - TN State Schemes:${seedSchemes.filter(s => s.scope === 'Tamil Nadu').length}`);
    console.log(`======================================================\n`);

    await mongoose.disconnect();
    console.log('Database connection closed cleanly.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

if (process.argv[1].endsWith('seed.js')) {
  runSeed();
}
