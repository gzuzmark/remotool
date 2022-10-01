import {
  createStyles,
  Container,
  Group,
  ActionIcon,
  Text,
} from '@mantine/core';
import Link from 'next/link';
import { BrandGithub, BrandLinkedin } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export function Footer() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text size="md" weight="bolder">
          Remotool
        </Text>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <Link
            href="https://www.linkedin.com/in/jes%C3%BAs-alonso-m%C3%A1rquez-caballero-28148351/"
            passHref
          >
            <ActionIcon size="lg">
              <BrandGithub size={18} />
            </ActionIcon>
          </Link>
          <Link href="https://github.com/gzuzmark" passHref>
            <ActionIcon size="lg">
              <BrandLinkedin size={18} />
            </ActionIcon>
          </Link>
        </Group>
      </Container>
    </div>
  );
}
