import { ChangeEvent, useEffect, useState } from 'react';

type IForm = string | number | File | undefined;

export default function useForm<T extends Record<string, IForm>>(initial: {
  [P in keyof T]: T[P];
}) {
  const [inputs, setInputs] = useState<T>(initial);

  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    // This function runs when the things we are watching change

    setInputs(initial);
  }, [initialValues]);

  function handleChange(
    e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement>
  ) {
    const { value, name, type } = e.target;

    let helperValue: IForm = type === 'number' ? parseFloat(value) : value;

    if (type === 'file') {
      const { target } = e;
      // eslint-disable-next-line prefer-destructuring
      [helperValue] = target?.files || [];
    }
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: helperValue,
    });
  }
  function resetForm(): void {
    setInputs(initial);
  }

  function clearForm(): void {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    ) as T;
    setInputs(blankState);
  }

  return { inputs, handleChange, resetForm, clearForm };
}
