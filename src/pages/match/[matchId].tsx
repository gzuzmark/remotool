import dynamic from 'next/dynamic';

import { Suspense } from 'react';

const VerifyLinkForm = dynamic(() => import('../../components/VerifyLink'), {
  ssr: false,
});

let render = 0;

const SingleMatchPage = () => {
  console.log(
    '🚀 ~ file: [matchId].tsx ~ line 10 ~ render SingleMatchPage',
    render++
  );
  return (
    <div>
      <Suspense>
        <VerifyLinkForm />
      </Suspense>
    </div>
  );
};

export default SingleMatchPage;
