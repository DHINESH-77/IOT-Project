import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema(
  {
    schemeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['agriculture', 'welfare', 'housing', 'education', 'health'],
      index: true,
    },
    scope: {
      type: String,
      required: true,
      enum: ['Central', 'Tamil Nadu', 'Central & Tamil Nadu'],
      default: 'Central',
      index: true,
    },
    targetGroupEn: {
      type: String,
      default: 'General Rural Beneficiary',
    },
    targetGroupTa: {
      type: String,
      default: '',
    },
    // Titles & Departments
    titleEn: {
      type: String,
      required: true,
      trim: true,
    },
    titleTa: {
      type: String,
      default: '',
      trim: true,
    },
    deptEn: {
      type: String,
      required: true,
    },
    deptTa: {
      type: String,
      default: '',
    },
    // Benefit Details
    benefitAmount: {
      type: String,
      required: true,
    },
    benefitDescEn: {
      type: String,
      required: true,
    },
    benefitDescTa: {
      type: String,
      default: '',
    },
    // Eligibility Criteria
    eligibilityEn: {
      type: [String],
      default: [],
    },
    eligibilityTa: {
      type: [String],
      default: [],
    },
    // Required Documentation
    documentsEn: {
      type: [String],
      default: [],
    },
    documentsTa: {
      type: [String],
      default: [],
    },
    // Civic Access Points
    applicationMode: {
      type: String,
      default: 'e-Sevai / Gram Panchayat',
    },
    officialUrl: {
      type: String,
      default: '',
    },
    // Terminal & Kiosk Control
    activeOnTerminal: {
      type: Boolean,
      default: true,
      index: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for high-speed category and scope filtering
schemeSchema.index({ category: 1, scope: 1, activeOnTerminal: 1 });

export const Scheme = mongoose.model('Scheme', schemeSchema);
