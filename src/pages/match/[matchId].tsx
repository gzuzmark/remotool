import Error from 'next/error';
import { useRouter } from 'next/router';
import React from 'react';
import { trpc } from '../../utils/trpc';

const SingleMatchPage = () => {
  const { query } = useRouter();
  console.log('🚀 ~ file: [matchId].tsx ~ line 8 ~ SingleMatchPage ~ query', {
    query,
  });

  if (!query.matchId) {
    return (
      <div>
        <p>Sorry you must supply slug</p>
      </div>
    );
  }

  return (
    <div>
      <p>hi</p>{' '}
    </div>
  );
};

export default SingleMatchPage;
