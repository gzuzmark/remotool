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
        <Suspense>
          <CreateLinkForm />
        </Suspense>
      </Group>
    </Group>
  );
};

export default Home;

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const TechnologyCard = ({
  name,
  description,
  documentation,
}: TechnologyCardProps) => (
  <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
    <h2 className="text-lg text-gray-700">{name}</h2>
    <p className="text-sm text-gray-600">{description}</p>
    <a
      className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
      href={documentation}
      target="_blank"
      rel="noreferrer"
    >
      Documentation
    </a>
  </section>
);
