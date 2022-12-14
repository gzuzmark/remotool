import {
  createStyles,
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
} from '@mantine/core';
import { Gauge, User, Cookie } from 'tabler-icons-react';

const mockdata = [
  {
    title: 'Fast match',
    description:
      'Check quickly if salary expecations match beetween candidates and companies',
    icon: Gauge,
  },
  {
    title: 'Privacy focused',
    description: 'Mantain privacy beetween the parts',
    icon: User,
  },
  {
    title: 'Single place',
    description: 'Handle all the recruitment procesess in one place',
    icon: Cookie,
  },
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 34,
    fontWeight: 900,
    [theme.fn.smallerThan('sm')]: {
      fontSize: 24,
    },
  },

  description: {
    maxWidth: 600,
    margin: 'auto',

    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  card: {
    border: `1px solid ${
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      theme.colorScheme === 'dark'
        ? theme?.colors?.dark?.[5]
        : theme?.colors?.gray?.[2]
    }`,
  },

  cardTitle: {
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
    },
  },
}));

export function FeaturesCards() {
  const { classes, theme } = useStyles();
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      p="xl"
    >
      <feature.icon size={50} color={theme.fn.primaryColor()} />
      <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text size="sm" color="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));
  return (
    <Container size="lg" py="xl">
      <Group position="center">
        <Badge variant="filled" size="lg">
          Benefits of salary link
        </Badge>
      </Group>

      <Title order={2} className={classes.title} align="center" mt="sm">
        Communicate quickly your rates and see the match
      </Title>

      <Text
        color="dimmed"
        className={classes.description}
        align="center"
        mt="md"
      >
        This tools helps you share salary expectations and see if there's a
        match between candidates and recruiters about how one of them can offer
        and the expectation.
      </Text>

      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: 'md', cols: 1 }]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}
