// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from '@trpc/server/adapters/next';
import { env } from '../../../env/server.mjs';
import { appRouter } from '../../../server/router/app.router';
import { createContext } from '../../../server/createRouterContext';

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    env.NODE_ENV === 'development'
      ? ({ path, error }) => {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          console.error(`❌ tRPC failed on ${path as string}: ${error}`);
        }
      : undefined,
});
