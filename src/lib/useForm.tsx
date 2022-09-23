import { ChangeEvent, useEffect, useState } from 'react';
import { useInputState } from '@mantine/hooks';

export default function useForm(
  initial: Record<string, string | number | readonly string[] | undefined>
) {
  // create a state object for our inputs
  const [inputs, setInputs] =
    useInputState<
      Record<string, string | number | readonly string[] | undefined>
    >(initial);
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    // This function runs when the things we are watching change
    console.log(
      '🚀 ~ file: useForm.tsx ~ line 19 ~ initialValues',
      initialValues
    );
    setInputs(initial);
    console.log(
      '🚀 ~ file: useForm.tsx ~ line 18 ~ useEffect ~ initial',
      initial
    );
  }, [initialValues]);

  // {
  //   name: 'wes',
  //   description: 'nice shoes',
  //   price: 1000
  // }

  function handleChange(e, b) {
    const { value, name, type } = e.target;
    console.log(
      '🚀 ~ file: useForm.tsx ~ line 28 ~ handleChange ~ { value, name, type }',
      { value, name, type }
    );

    let helperValue: string | number | File =
      type === 'number' ? parseFloat(value) : value;

    if (type === 'file') {
      const target = e.target as HTMLInputElement;
      // eslint-disable-next-line prefer-destructuring
      [helperValue] = target.files || '';
    }
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: helperValue as string | number | readonly string[] | undefined,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
