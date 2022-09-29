import {
  Container,
  Image,
  Title,
  Text,
  List,
  ThemeIcon,
  Group,
  Button,
  Badge,
  Transition,
} from '@mantine/core';

import AOS from 'aos';
import CandidateForm from './CandidateForm';
import RecruiterForm from './RecruiterForm';
import useHeroStyles from './styles/Hero';

import 'aos/dist/aos.css';
import { useEffect } from 'react';

type CreateLinkProps = {
  slug?: string;
};

export const FormSection = ({ slug }) => (
  <div>{slug ? <RecruiterForm slug={slug} /> : <CandidateForm />}</div>
);

const CreateLinkForm = ({ slug }: CreateLinkProps) => {
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
            <Text color="dimmed" mt="md">
              Fill your salary expectations and share the link with recruiters
              so both can easily see if the expectations and the offer could
              match and safe as much time as possible.
            </Text>
            <Group>
              <FormSection slug={slug} />
            </Group>

            {/* <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <Check size={12} strokeWidth={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>TypeScript based</b> – build type safe applications, all
                components and hooks export types
              </List.Item>
              <List.Item>
                <b>Free and open source</b> – all packages have MIT license, you
                can use Mantine in any project
              </List.Item>
              <List.Item>
                <b>No annoying focus ring</b> – focus ring will appear only when
                user navigates with keyboard
              </List.Item>
            </List> */}

            {/* <Group mt={30}>
              <Button radius="xl" size="md" className={classes.control}>
                Get started
              </Button>
              <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
              >
                Source code
              </Button>
            </Group> */}
          </div>

          <Image data-aos="fade-up" src="/work-from-home.svg" />
        </div>
      </Container>
    </div>
  );
};

export default CreateLinkForm;
