import {
  Group,
  CopyButton,
  Button,
  Text,
  SimpleGrid,
  NumberInput,
  NativeSelect,
  Textarea,
  Badge,
  Input,
  Space,
} from '@mantine/core';

import { FormEvent } from 'react';

import { CreateLinkInput } from '../../schema/link.schema';
import useForm from '../lib/useForm';
import { trpc } from '../utils/trpc';
import useFormStyles from './styles/Form';

type RecruiterFormProps = {
  slug: string;
  link: Record<string, string>;
};

const RecruiterForm = ({ slug, link }: RecruiterFormProps) => {
  const { classes } = useFormStyles();
  const { inputs, handleChange, resetForm } = useForm<CreateLinkInput>({
    minSalary: 0,
    salaryType: 'gross',
    salaryPeriod: 'monthly',
    salaryCurrency: 'USD',
    comment: '',
    slug: '',
  });

  const {
    mutateAsync: verifyLink,
    isLoading,
    data,
    error,
    isSuccess,
  } = trpc.useMutation(['link.verify-link']);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await verifyLink({
      slug,
      maxSalary: inputs.minSalary,
    }).catch(console.error);
    resetForm();
  };

  return (
    <>
      {isSuccess && (
        <Group>
          {data.isMatch ? (
            <Badge size="lg" radius="xl" color="teal">
              It's a match! 🎉
            </Badge>
          ) : (
            <Badge
              variant="gradient"
              gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
            >
              😞 Sadly it's not a match this time
            </Badge>
          )}
        </Group>
      )}
      {!isSuccess && (
        <form method="POST" className={classes.form} onSubmit={handleSubmit}>
          <Text size="md" weight={700} className={classes.title}>
            Please fill the maximum salary you could offer the candidate
          </Text>
          <Space h="xs" />
          <Text size="md" weight={700} className={classes.title}>
            {`(${link?.currency}/${link.isNetSalary ? 'Net' : 'Gross'}/ ${
              link.isAnual ? 'Anual' : 'Monthly'
            } )`}
          </Text>

          <div className={classes.fields}>
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
                <Input.Wrapper
                  id="input-demo"
                  placeholder="salary here"
                  label="Salary"
                  aria-label="Salary"
                  withAsterisk
                >
                  <Input
                    id="input-demo"
                    name="minSalary"
                    value={inputs.minSalary}
                    type="number"
                    min={0}
                    onChange={handleChange}
                  />
                </Input.Wrapper>
              </SimpleGrid>

              <Group position="center" grow mt="md">
                <Button type="submit" loading={isLoading}>
                  Check
                </Button>
              </Group>
            </fieldset>
          </div>
        </form>
      )}
    </>
  );
};

export default RecruiterForm;
