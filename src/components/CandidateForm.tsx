import {
  Button,
  CopyButton,
  Group,
  Input,
  Text,
  NativeSelect,
  NumberInput,
  SimpleGrid,
  Textarea,
  Progress,
} from '@mantine/core';
import { useEventListener } from '@mantine/hooks';
import { nanoid } from 'nanoid';
import { FormEvent } from 'react';
import { CreateLinkInput } from '../../schema/link.schema';
import useForm from '../lib/useForm';
import { trpc } from '../utils/trpc';
import useFormStyles from './styles/Form';

const CandidateForm = () => {
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

  // const ref = useEventListener('change', handleChange);
  return (
    <>
      {isSuccess && (
        <Group>
          <Text>Share the link with the recruiter</Text>

          <Text size="lg" weight={700} className={classes.title}>
            {`${url}/${data.matchId}`}
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
          <Text size="md" weight={700} className={classes.title}>
            Please fill as candidate the the info of your salary expectations
          </Text>

          <div className={classes.fields}>
            {isLoading && <Progress animate={isLoading} striped value={100} />}
            {/* <p>{JSON.stringify(error)}</p> */}
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
                {/* <NumberInput
                  ref={ref}
                  name="minSalary"
                  value={inputs.minSalary}
                  type="number"
                  placeholder="salary here"
                  label="Salary"
                  aria-label="Salary"
                  withAsterisk
                  min={0}
                /> */}
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
    </>
  );
};

export default CandidateForm;
