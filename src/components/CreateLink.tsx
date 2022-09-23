import {
  Container,
  TextInput,
  ActionIcon,
  Box,
  Group,
  Text,
  Title,
  UnstyledButton,
  NumberInput,
  SegmentedControl,
  NativeSelect,
  Textarea,
} from '@mantine/core';
// import { useEventListener } from '@mantine/hooks';
import { NextPage } from 'next';
import { FormEvent, useCallback } from 'react';
import { Settings, TruckLoading } from 'tabler-icons-react';
import { nanoid } from 'nanoid';
import copy from 'copy-to-clipboard';
import { useEventListener } from '@mantine/hooks';
import useForm from '../lib/useForm';
import { trpc } from '../utils/trpc';

const CreateLinkForm: NextPage = () => {
  const { inputs, handleChange, resetForm } = useForm({
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
  } = trpc.useMutation(['link.create-link']);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createLink({ ...inputs, slug: nanoid() }).catch(
      console.error
    );
    resetForm();
  };

  const ref = useEventListener('change', handleChange);

  if (isLoading) {
    return (
      <Group position="apart" style={{ width: '100%' }}>
        <ActionIcon color="gray" size="xl" m="sm" variant="transparent">
          <TruckLoading />
        </ActionIcon>
      </Group>
    );
  }
  console.log('🚀 ~ file: create-link.tsx ~ line 65 ~ status', {
    status,
    isLoading,
    data,
  });
  if (status === 'success') {
    return (
      <>
        <Group position="apart" style={{ width: '100%' }}>
          <ActionIcon color="gray" size="xl" m="sm" variant="transparent">
            <Settings />
          </ActionIcon>
        </Group>
        <Group spacing="none" mt="sm" mx="auto" dir="column">
          <Title>{`${url}/${data?.matchId}`}</Title>
          <input
            type="button"
            value="Copy Link"
            className="rounded border-r-indigo-500 py-1.5 px-1 font-bold cursor-pointer ml-2"
            onClick={() => {
              copy(`${url}/${data.matchId}`);
            }}
          />
        </Group>
      </>
    );
  }

  return (
    <>
      <Group position="apart" style={{ width: '100%' }}>
        <ActionIcon color="gray" size="xl" m="sm" variant="transparent">
          <Settings />
        </ActionIcon>
      </Group>
      <Group spacing="none" mt="sm" mx="auto" dir="column">
        <form onSubmit={handleSubmit}>
          <NumberInput
            ref={ref}
            name="minSalary"
            value={inputs.minSalary as number}
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
          <NativeSelect
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
            name="comment"
            value={inputs.comment}
            placeholder="Something that you want to let the recruiter know"
            label="Your comment"
            aria-label="Comment to the recruiter"
            onChange={handleChange}
          />

          <button type="submit">Create link</button>
        </form>
      </Group>
    </>
  );
};

export default CreateLinkForm;
