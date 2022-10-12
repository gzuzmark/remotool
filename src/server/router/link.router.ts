import { Prisma, CandidateRecruiterLink } from '@prisma/client';
import {
  createLinkSchema,
  verifyLinkSchema,
  verifyLinkUsageResponseSchema,
  verifyLinkUsageSchema,
} from '../../../schema/link.schema';
import { createRouter } from '../createRouterContext';

export const linkRouter = createRouter()
  .mutation('create-link', {
    input: createLinkSchema,
    async resolve({ ctx, input }) {
      const link = await ctx.prisma.candidateRecruiterLink.create({
        data: {
          minSalary: input.minSalary,
          isAnual: input.salaryPeriod === 'anual',
          isNetSalary: input.salaryType === 'net',
          currency: input.salaryCurrency,
          comment: input.comment,
        },
      });

      return link;
    },
  })
  .mutation('verify-link', {
    input: verifyLinkSchema,
    async resolve({ ctx, input }) {
      console.log('🚀 ~ file: link.router.ts ~ line 30 ~ resolve ~ input', {
        input,
      });

      const link = await ctx.prisma.candidateRecruiterLink.findFirst({
        where: {
          matchId: input.slug,
        },
      });

      console.log({ link });

      const maxSalary = new Prisma.Decimal(input.maxSalary);
      let isMatch = false;
      if (link) {
        await ctx.prisma.candidateRecruiterLink.update({
          where: {
            matchId: input.slug,
          },
          data: { maxSalary },
        });
        isMatch = maxSalary >= link.minSalary;
      }
      return {
        isMatch,
        maxSalary: input.maxSalary,
        minSalary: link?.minSalary || 0,
      };
    },
  })
  .query('verify-link-usage', {
    input: verifyLinkUsageSchema,
    async resolve({ ctx, input }) {
      const link = await ctx.prisma.candidateRecruiterLink.findFirst({
        where: {
          matchId: input.slug,
        },
      });

      console.log({ link });

      let alreadyUsed = false;
      if (link?.maxSalary) {
        alreadyUsed = true;
      }

      return {
        currency: link?.currency,
        salaryType: link?.isNetSalary ? 'Net' : 'Gross',
        salaryPeriod: link?.isAnual ? 'Anual' : 'Monthly',
        alreadyUsed,
      };
    },
  });
