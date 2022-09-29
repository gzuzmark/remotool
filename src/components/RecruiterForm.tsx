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
} from '@mantine/core';
import { useEventListener } from '@mantine/hooks';
import { nanoid } from 'nanoid';
import { FormEvent } from 'react';

import { CreateLinkInput } from '../../schema/link.schema';
import useForm from '../lib/useForm';
import { trpc } from '../utils/trpc';
import useFormStyles from './styles/Form';

type RecruiterFormProps = {
  slug: string;
};

const RecruiterForm = ({ slug }: RecruiterFormProps) => {
  const { classes } = useFormStyles();
  const { inputs, handleChange, resetForm } = useForm<CreateLinkInput>({
    minSalary: 0,
    salaryType: 'gross',
    salaryPeriod: 'monthly',
    salaryCurrency: 'USD',
    comment: '',
    slug: '',
  });
  const url = window.location.origin;

  const { data: linkData, isLoading: initialIsLoading } = trpc.useQuery([
    'link.verify-link-usage',
    { slug },
  ]);

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

  const ref = useEventListener('change', handleChange);
  return (
    <>
      {isSuccess && (
        <Group>
          <Text>Share the link with the recruiter</Text>

          <Text>
            max:{data.maxSalary} min:{data.minSalary}
          </Text>

          {linkData.alreadyUsed && (
            <Badge sx={{ paddingLeft: 0 }} size="lg" radius="xl" color="yellow">
              ¡Ya has comprobado si hay match con este candidato!
            </Badge>
          )}

          {!linkData.alreadyUsed && data.isMatch ? (
            <Badge sx={{ paddingLeft: 0 }} size="lg" radius="xl" color="teal">
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
