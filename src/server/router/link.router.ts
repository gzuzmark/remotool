import { z } from 'zod';
import { Prisma } from '@prisma/client';
import {
  createLinkSchema,
  CreateLinkInput,
  verifyLinkSchema,
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

      if (link?.maxSalary) {
        return {
          alreadyUsed: true,
        };
      }

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
        alreadyUsed: isMatch,
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
        alreadyUsed,
      };
    },
  })
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? 'world'}`,
      };
    },
  })
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.example.findMany();
    },
  });
