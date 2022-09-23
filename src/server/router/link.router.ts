import { z } from 'zod';
import { createLinkSchema, CreateLinkInput } from '../../../schema/link.schema';
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
