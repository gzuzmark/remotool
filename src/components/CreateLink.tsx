import {
  Container,
  TextInput,
  ActionIcon,
  Box,
  Button,
  Group,
  Text,
  Title,
  UnstyledButton,
  NumberInput,
  SegmentedControl,
  NativeSelect,
  Textarea,
  Space,
  SimpleGrid,
  createStyles,
  keyframes,
  LoadingOverlay,
  CopyButton,
} from '@mantine/core';
// import { useEventListener } from '@mantine/hooks';
import { NextPage } from 'next';
import { FormEvent, useCallback } from 'react';
import { Gradienter, Settings, TruckLoading } from 'tabler-icons-react';
import { nanoid } from 'nanoid';
import { useEventListener } from '@mantine/hooks';
import useForm from '../lib/useForm';
import { trpc } from '../utils/trpc';
import { CreateLinkInput } from '../../schema/link.schema';

const loading = keyframes({
  from: {
    backgroundPosition: '0 0',
    /* rotate: 0; */
  },

  to: {
    backgroundPosition: '100% 100%',
    /* rotate: 360deg; */
  },
});

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan('sm');

  return {
    wrapper: {
      display: 'flex',
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      borderRadius: theme.radius.lg,
      padding: 4,
      border: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[2]
      }`,

      [BREAKPOINT]: {
        flexDirection: 'column',
      },
    },

    form: {
      boxSizing: 'border-box',
      flex: 1,
      padding: theme.spacing.xl,
      paddingLeft: theme.spacing.xl * 2,
      borderLeft: 0,

      [BREAKPOINT]: {
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md,
      },
    },

    fields: {
      marginTop: -12,
    },

    fieldSet: {
      border: 0,
      padding: 0,

      '&[disabled]': {
        opacity: 0.5,
      },

      '&::before': {
        height: theme.spacing.md,
        content: '""',
        display: 'block',
        backgroundImage: theme.fn.linearGradient(
          90,
          `${theme?.colors?.blue[4]} 0%`,
          `${theme?.colors?.blue[0]} 50%`,
          `${theme?.colors?.blue[4]} 100%`
        ),
      },

      '&[aria-busy="true"]::before': {
        backgroundSize: '50% auto',
        animation: `${loading} 0.5s linear infinte`,
      },
    },

    title: {
      marginBottom: theme.spacing.xl * 1.5,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl,
      },
    },

    control: {
      [BREAKPOINT]: {
        flex: 1,
      },
    },
  };
});

const CreateLinkForm: NextPage = () => {
  const { classes } = useStyles();
  const { inputs, handleChange, resetForm } = useForm<CreateLinkInput>({
    minSalary: 0,
    salaryType: 'gross',
    salaryPeriod: 'monthly',
    salaryCurrency: 'USD',
    comment: '',
    slug: '',
  });
  const url = window.location.origin;

  const {
    mutateAsync: createLink,
    isLoading,
    data,
    error,
    status,
    isSuccess,
  } = trpc.useMutation(['link.create-link']);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createLink({ ...inputs, slug: nanoid() }).catch(
      console.error
    );
    resetForm();
  };

  const ref = useEventListener('change', handleChange);

  console.log('🚀 ~ file: create-link.tsx ~ line 65 ~ status', {
    status,
    isLoading,
    data,
  });

  return (
    <div className={classes.wrapper}>
      {isSuccess && (
        <Group>
          <Text>Share the link with the recruiter</Text>

          <Text size="lg" weight={700} className={classes.title}>
            {`${url}/${data?.matchId}`}
          </Text>

          <CopyButton value={`${url}/${data.matchId}`}>
            {({ copied, copy }) => (
              <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
                {copied ? 'Copied url' : 'Copy url'}
              </Button>
            )}
          </CopyButton>
        </Group>
      )}
      {!isSuccess && (
        <form method="POST" className={classes.form} onSubmit={handleSubmit}>
          <Text size="lg" weight={700} className={classes.title}>
            Please fill as candidate the the info of your salary expectations
          </Text>

          <div className={classes.fields}>
            <p>{JSON.stringify(error)}</p>
            {/* <LoadingOverlay visible={isLoading} overlayBlur={2} /> */}
            <fieldset
              className={classes.fieldSet}
              disabled={isLoading}
              aria-busy={isLoading}
            >
              <SimpleGrid
                cols={2}
                mt="xl"
                breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
              >
                <NumberInput
                  ref={ref}
                  name="minSalary"
                  value={inputs.minSalary}
                  type="number"
                  placeholder="salary here"
                  label="Salary"
                  aria-label="Salary"
                  withAsterisk
                  min={0}
                />
                <NativeSelect
                  name="salaryType"
                  value={inputs.salaryType}
                  label="Gross or net?"
                  aria-label="gross or net salary"
                  onChange={handleChange}
                  data={[
                    { label: 'Gross', value: 'gross' },
                    { label: 'Net', value: 'net' },
                  ]}
                />
              </SimpleGrid>
              <NativeSelect
                mt="md"
                label="Period"
                name="salaryPeriod"
                aria-label="anual or montly salary"
                value={inputs.salaryPeriod}
                onChange={handleChange}
                data={[
                  { value: 'monthly', label: 'Monttly' },
                  { value: 'anual', label: 'anual' },
                ]}
              />

              <NativeSelect
                mt="md"
                label="Currency"
                name="salaryCurrency"
                value={inputs.salaryCurrency}
                onChange={handleChange}
                data={[
                  { value: 'USD', label: 'USD' },
                  { value: 'EUR', label: 'EUR' },
                  { value: 'GBP', label: 'GBP' },
                ]}
              />

              <Textarea
                minRows={3}
                mt="md"
                name="comment"
                value={inputs.comment}
                placeholder="Something that you want to let the recruiter know"
                label="Your comment"
                aria-label="Comment to the recruiter"
                onChange={handleChange}
              />
              <Group position="center" grow mt="md">
                <Button type="submit" loading={isLoading}>
                  Create link
                </Button>
              </Group>
            </fieldset>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateLinkForm;
