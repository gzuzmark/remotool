import dynamic from 'next/dynamic';
import Error from 'next/error';
import { useRouter } from 'next/router';
import React, { Suspense } from 'react';

import { trpc } from '../../utils/trpc';

const CreateLinkForm = dynamic(() => import('../../components/CreateLink'), {
  ssr: false,
});

const SingleMatchPage = () => (
  <div>
    <Suspense>
      <CreateLinkForm />
    </Suspense>
  </div>
);

export default SingleMatchPage;
