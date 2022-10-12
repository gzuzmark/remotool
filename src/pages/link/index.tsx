import type { NextPage } from 'next';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Center, Loader } from '@mantine/core';

const CreateLinkForm = dynamic(() => import('../../components/CreateLink'), {
  ssr: false,
  loading: () => (
    <Center style={{ width: '100vh', height: '100vh' }}>
      <Loader variant="bars" />
    </Center>
  ),
});

let render = 0;

const Home: NextPage = () => {
  // eslint-disable-next-line no-plusplus
  console.log('🚀 ~ file: index.tsx ~ line 11 ~ render Home', render++);
  return (
    <div>
      <Suspense>
        <CreateLinkForm />
      </Suspense>
    </div>
  );
};

export default Home;
