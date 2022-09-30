// src/pages/_app.tsx
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';
import { SessionProvider } from 'next-auth/react';
import type { AppType } from 'next/dist/shared/lib/utils';
import superjson from 'superjson';
import { MantineProvider, createEmotionCache } from '@mantine/core';
import type { AppRouter } from '../server/router/app.router';
import '../styles/globals.css';

import AppContainer from '../components/AppContainer';

const myCache = createEmotionCache({
  key: 'mantine',
  prepend: false,
});

const MyApp: AppType = ({
  // eslint-disable-next-line react/prop-types
  Component,
  // eslint-disable-next-line react/prop-types
  pageProps: { session, ...pageProps },
}) => (
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  <SessionProvider session={session}>
    <MantineProvider
      emotionCache={myCache}
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: 'light' }}
    >
      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>
    </MantineProvider>
  </SessionProvider>
);

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({ url }),
      ],
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },

      // To use SSR properly you need to forward the client's headers to the server
      headers: () => {
        if (ctx?.req) {
          const headers = ctx?.req?.headers;
          delete headers?.connection;
          return {
            ...headers,
            'x-ssr': '1',
          };
        }
        return {};
      },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
