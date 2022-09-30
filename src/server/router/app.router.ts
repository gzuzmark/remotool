// src/server/router/index.ts

import { createRouter } from '../createRouterContext';

import { linkRouter } from './link.router';
// import { protectedExampleRouter } from './protected-example-router';

export const appRouter = createRouter().merge('link.', linkRouter);
// .merge('auth.', protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
