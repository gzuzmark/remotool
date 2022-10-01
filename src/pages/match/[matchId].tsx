import dynamic from 'next/dynamic';

import { Suspense } from 'react';

const VerifyLinkForm = dynamic(() => import('../../components/VerifyLink'), {
  ssr: false,
});

const SingleMatchPage = () => (
  <div>
    <Suspense>
      <VerifyLinkForm />
    </Suspense>
  </div>
);

export default SingleMatchPage;
