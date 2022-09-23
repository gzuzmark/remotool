import type { NextPage } from 'next';
import Head from 'next/head';
import { Group, useMantineTheme } from '@mantine/core';

import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc';
import CreateLinkForm from '../../components/CreateLink';

const MatchPage: NextPage = () => {
  const { query } = useRouter();
  console.log('🚀 ~ file: match.tsx ~ line 11 ~ query', query);
  const theme = useMantineTheme();

  return (
    <Group dir="column">
      <Group
        style={{
          background: theme?.colors?.gray?.[0],
          width: '80%',
          height: '100vh',
          flexDirection: 'column',
        }}
        mx="auto"
      >
        <p>match</p>
      </Group>
    </Group>
  );
};

export default MatchPage;
