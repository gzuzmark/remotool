import type { NextPage } from 'next';
import Head from 'next/head';
import { Group, useMantineTheme } from '@mantine/core';

import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CreateLinkForm = dynamic(() => import('../../components/CreateLink'), {
  ssr: false,
});

const Home: NextPage = () => {
  const { query } = useRouter();
  const theme = useMantineTheme();

  return (
    // <Group dir="column">
    //   <Group
    //     style={{
    //       background: theme?.colors?.gray?.[0],
    //       width: '80%',
    //       height: '100vh',
    //       flexDirection: 'column',
    //     }}
    //     mx="auto"
    //   >
    <div>
      <Suspense>
        <CreateLinkForm />
      </Suspense>
    </div>
    //   </Group>
    // </Group>
  );
};

export default Home;
