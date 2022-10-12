import * as z from 'zod';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Decimal } from 'decimal.js';

// Helper schema for Decimal fields
z.instanceof(Decimal)
  .or(z.string())
  .or(z.number())
  .refine((value) => {
    try {
      return new Decimal(value);
    } catch (error) {
      return false;
    }
  })
  .transform((value) => new Decimal(value));

export const CandidateRecruiterLinkModel = z.object({
  id: z.number().int(),
  matchId: z.string(),
  createdAt: z.date(),
  minSalary: z.number(),
  maxSalary: z.number().nullish(),
  isNetSalary: z.boolean(),
  isAnual: z.boolean(),
  currency: z.string(),
  comment: z.string(),
  url: z.string().nullish(),
  slug: z.string().nullish(),
});
