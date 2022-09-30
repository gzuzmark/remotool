import { createStyles, keyframes } from '@mantine/core';

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

const useFormStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan('sm');

  return {
    wrapper: {
      display: 'flex',
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme?.colors?.dark?.[8] || ''
          : theme.white,
      borderRadius: theme.radius.lg,
      padding: 4,
      border: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme?.colors?.dark?.[8] || ''
          : theme?.colors?.gray?.[2] || ''
      }`,

      [BREAKPOINT]: {
        flexDirection: 'column',
      },
    },

    form: {
      boxSizing: 'border-box',
      flex: 1,
      //   padding: theme.spacing.xl,
      //   paddingLeft: theme.spacing.xl * 2,
      //   borderLeft: 0,

      //   [BREAKPOINT]: {
      //     padding: theme.spacing.md,
      //     paddingLeft: theme.spacing.md,
      //   },
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
    },

    title: {
      marginBottom: theme.spacing.xl * 1.5,
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      fontFamily: `Greycliff CF, ${theme?.fontFamily}`,

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

export default useFormStyles;
