import {
  Container,
  Image,
  Title,
  Text,
  Group,
  MediaQuery,
} from '@mantine/core';
import { useEffect } from 'react';

import AOS from 'aos';

import useHeroStyles from './styles/Hero';

import 'aos/dist/aos.css';

type HeroSectionProps = {
  children: React.ReactElement;
};

const HeroSection = ({ children }: HeroSectionProps) => {
  const { classes } = useHeroStyles();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    // <div className={classes.wrapper}>
    //   {slug ? <RecruiterForm slug={slug} /> : <CandidateForm />}
    // </div>
    <div>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Share your <span className={classes.highlight}>salary</span>{' '}
              expectations and see
              <br /> if you could be a match
            </Title>
            <Text color="dimmed" mt="md" mb="md">
              Fill your salary expectations and share the link with recruiters
              so both can easily see if the expectations and the offer could
              match and safe as much time as possible.
            </Text>
            <Group align="center" position="center">
              {children}
            </Group>
          </div>
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Image data-aos="fade-up" src="/work-from-home.svg" />
          </MediaQuery>
        </div>
      </Container>
    </div>
  );
};

export default HeroSection;
