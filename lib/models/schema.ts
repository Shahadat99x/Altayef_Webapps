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
  details: z.string(), // HTML or Markdown
  requirements: z.array(z.string()),
  timelineText: z.string(),
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
  visaTypes: z.array(z.string()),
  requirements: z.array(z.string()),
  timelineText: z.string(),
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
  faq: z.array(z.object({ question: z.string(), answer: z.string() })),
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
  photoUrl: z.string().optional(),
  bio: z.string(),
  order: z.number().int(),
  active: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const TestimonialSchema = z.object({
  _id: objectIdSchema.optional(),
  nameOrInitials: z.string(),
  serviceOrCountry: z.string().optional(),
  text: z.string(),
  date: z.date(),
  featured: z.boolean(),
  status: statusSchema,
  anonymized: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const LicenseSchema = z.object({
  _id: objectIdSchema.optional(),
  licenseNumber: z.string(),
  issuingAuthority: z.string(),
  scanUrl: z.string().optional(),
  verificationSteps: z.array(z.string()),
  validFrom: z.date(),
  validTo: z.date().optional(),
  status: statusSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const EnquirySchema = z.object({
  _id: objectIdSchema.optional(),
  name: z.string(),
  phone: z.string(),
  countrySlug: z.string().optional(),
  serviceSlug: z.string().optional(),
  message: z.string(),
  status: z.enum(['new', 'contacted', 'closed']),
  notes: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const SiteSettingsSchema = z.object({
  _id: objectIdSchema.optional(),
  siteName: z.string(),
  phone: z.string(),
  whatsapp: z.string(),
  address: z.string(),
  mapUrl: z.string().optional(),
  socialLinks: z.record(z.string()), // e.g. { facebook: "url" }
  primaryCTA: z.string(),
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
