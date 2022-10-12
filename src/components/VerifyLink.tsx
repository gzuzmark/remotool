import { Badge, Loader } from '@mantine/core';

import { useRouter } from 'next/router';

import RecruiterForm, { LinkFromServer } from './RecruiterForm';

import 'aos/dist/aos.css';

import { trpc } from '../utils/trpc';
import HeroSection from './HeroSection';
import { FeaturesCards } from './FeatureSection';
import { Footer } from './FooterSection';

const VerifyLinkForm = () => {
  const { query } = useRouter();
  const slug = query.matchId as string;

  console.log('VerifyLinkForm Render');

  const { data, isLoading } = trpc.useQuery(
    ['link.verify-link-usage', { slug }],
    {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    // <div className={classes.wrapper}>
    //   {slug ? <RecruiterForm slug={slug} /> : <CandidateForm />}
    // </div>
    <>
      <HeroSection>
        <>
          {isLoading && <Loader />}
          {!isLoading && data?.alreadyUsed && (
            <Badge size="lg" radius="xl" color="yellow">
              You already checked the match with this candidate!
            </Badge>
          )}
          {!isLoading && !data?.alreadyUsed && (
            <RecruiterForm key={slug} slug={slug} link={data!} />
          )}
        </>
      </HeroSection>
      <FeaturesCards />
    </>
  );
};

export default VerifyLinkForm;
