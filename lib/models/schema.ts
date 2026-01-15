import { z } from 'zod'
import { ObjectId } from 'mongodb'

// Helpers
const objectIdSchema = z.union([z.string(), z.instanceof(ObjectId)])
const statusSchema = z.enum(['draft', 'published', 'archived'])
const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
})

// --- Core Schemas ---

export const ServiceSchema = z.object({
  _id: objectIdSchema.optional(),
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  content: z.string(), // HTML or Markdown
  requirements: z.array(z.string()),
  timelineText: z.string(),
  coverImageUrl: z.string().url().nullish(),
  coverImageAlt: z.string().max(160).nullish(),
  featured: z.boolean().default(false),
  seo: seoSchema,
  status: statusSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CountrySchema = z.object({
  _id: objectIdSchema.optional(),
  name: z.string(),
  slug: z.string(),
  overview: z.string(),
  content: z.string().optional(), // HTML/Markdown for rich description
  supportedVisaTypes: z.array(z.string()),
  requirements: z.array(z.string()),
  processSteps: z.array(z.string()), // New: Step-by-step
  timelineText: z.string(),
  feesDisclaimer: z.string().optional(), // New
  coverImageUrl: z.string().url().nullish(),
  coverImageAlt: z.string().max(160).nullish(),
  featured: z.boolean().default(false), // New
  seo: seoSchema,
  status: statusSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const ArticleSchema = z.object({
  _id: objectIdSchema.optional(),
  title: z.string(),
  slug: z.string(),
  category: z.enum(['guides', 'process', 'countries', 'legal']),
  excerpt: z.string(),
  content: z.string(), // HTML/MDX
  coverImageUrl: z.string().nullish(),
  coverImageAlt: z.string().nullish(),
  coverImageCaption: z.string().nullish(),
  faq: z.array(z.object({ question: z.string(), answer: z.string() })),
  featured: z.boolean().default(false),
  authorName: z.string().nullish(),
  seo: seoSchema,
  status: statusSchema,
  lastUpdatedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const TeamMemberSchema = z.object({
  _id: objectIdSchema.optional(),
  name: z.string(),
  role: z.string(),
  photoUrl: z.string().nullish(),
  bio: z.string().optional(),
  order: z.number().int().default(0),
  featured: z.boolean().default(false),
  status: statusSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const TestimonialSchema = z.object({
  _id: objectIdSchema.optional(),
  quote: z.string(),
  authorName: z.string(),
  authorRole: z.string().nullish(),
  authorPhotoUrl: z.string().nullish(),
  country: z.string().nullish(),
  anonymized: z.boolean().default(false),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
  status: statusSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const LicenseSchema = z.object({
  _id: objectIdSchema.optional(),
  agencyLegalName: z.string(),
  licenseNumber: z.string(),
  issuingAuthority: z.string(),
  licenseScanUrl: z.string().nullable().optional(),
  verificationSteps: z.array(z.string()),
  officeAddress: z.string(),
  phone: z.string(),
  whatsapp: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  status: statusSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const EnquirySchema = z.object({
  _id: objectIdSchema.optional(),
  fullName: z.string(),
  phoneOrWhatsapp: z.string(),
  email: z.string().optional(),
  interestedServiceId: objectIdSchema.optional().nullable(),
  countryId: objectIdSchema.optional().nullable(),
  message: z.string(),
  preferredContactMethod: z.enum(['WhatsApp', 'Phone', 'Email']).optional().nullable(),
  source: z.enum(['contact_page', 'knowledge_article', 'other']).default('contact_page'),
  status: z.enum(['new', 'contacted', 'closed', 'spam']).default('new'),
  adminNotes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const SiteSettingsSchema = z.object({
  _id: objectIdSchema.optional(),
  siteName: z.string().default('Altayef Visa'),
  phone: z.string().default(''),
  whatsapp: z.string().default(''),
  email: z.string().email().optional().or(z.literal('')),
  logoMarkUrl: z.string().optional().or(z.literal('')),
  logoLockupUrl: z.string().optional().or(z.literal('')),
  address: z.string().default(''),
  mapUrl: z.string().optional().or(z.literal('')),
  socialLinks: z.object({
    facebook: z.string().optional().or(z.literal('')),
    instagram: z.string().optional().or(z.literal('')),
    youtube: z.string().optional().or(z.literal('')),
    tiktok: z.string().optional().or(z.literal('')),
    linkedin: z.string().optional().or(z.literal('')),
  }).optional().default({}),
  primaryCTA: z.string().default('Book Consultation'),
  footerText: z.string().optional().or(z.literal('')),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const AdminSchema = z.object({
  _id: objectIdSchema.optional(),
  email: z.string().email(),
  passwordHash: z.string(),
  role: z.enum(['superadmin', 'editor']),
  createdAt: z.date(),
  updatedAt: z.date(),
  lastLoginAt: z.date().optional(),
})

// --- Type Exports ---

export type Service = z.infer<typeof ServiceSchema>
export type Country = z.infer<typeof CountrySchema>
export type Article = z.infer<typeof ArticleSchema>
export type TeamMember = z.infer<typeof TeamMemberSchema>
export type Testimonial = z.infer<typeof TestimonialSchema>
export type License = z.infer<typeof LicenseSchema>
export type Enquiry = z.infer<typeof EnquirySchema>
export type SiteSettings = z.infer<typeof SiteSettingsSchema>
export type Admin = z.infer<typeof AdminSchema>
