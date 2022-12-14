// src/server/router/context.ts
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { Session } from 'next-auth';
import superjson from 'superjson';
import { getServerAuthSession } from './common/get-server-auth-session';
import { prisma } from './db/client';

type CreateContextOptions = {
  session: Session | null;
};

/** Use this helper for:
 * - testing, where we dont have to Mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * */
export const createContextInner = (opts: CreateContextOptions) => ({
  session: opts.session,
  prisma,
});

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 * */
export const createContext = (opts: trpcNext.CreateNextContextOptions) => {
  const { req, res } = opts;

  // Get the session from the server using the unstable_getServerSession wrapper function
  // const session = await getServerAuthSession({ req, res });

  return { req, res, prisma };
  // return createContextInner({
  //   session,
  // });
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>().transformer(superjson);

/**
 * Creates a tRPC router that asserts all queries and mutations are from an authorized user. Will throw an unauthorized error if a user is not signed in.
 * */
// export function createProtectedRouter() {
//   return createRouter().middleware(({ ctx, next }) => {
//     if (!ctx.session || !ctx.session.user) {
//       throw new trpc.TRPCError({ code: 'UNAUTHORIZED' });
//     }
//     return next({
//       ctx: {
//         ...ctx,
//         // infers that `session` is non-nullable to downstream resolvers
//         session: { ...ctx.session, user: ctx.session.user },
//       },
//     });
//   });
// }
