import z from 'zod';

export const createLinkSchema = z.object({
  minSalary: z.number().min(0),
  salaryType: z.enum(['gross', 'net']),
  salaryPeriod: z.enum(['anual', 'monthly']),
  salaryCurrency: z.enum(['USD', 'EUR', 'GBP']),
  comment: z.string(),
  slug: z.string(),
});

export type CreateLinkInput = z.TypeOf<typeof createLinkSchema>;

export const getSingleLinkSchema = z.object({
  linkId: z.string().cuid(),
});

// minSalary: 0,
// salaryType: 'gross',
// salaryPeriod: '',
// salaryCurrency: 'USD',
// comment: '',
