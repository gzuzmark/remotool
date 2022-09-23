import { AppShell, Footer, Group, Header, Text } from '@mantine/core';

const AppContainer = ({ children }) => (
  <AppShell
    styles={{
      main: {
        background: '#FFFFFF',
        width: '100vw',
        height: '100vh',
        paddongLeft: '0px',
      },
    }}
    fixed
    footer={
      <Footer height={60} p="md">
        <Group position="apart" spacing="xl">
          <Text size="sm">
            <span style={{ fontWeight: 'bolder' }} />
          </Text>
          <Text size="sm">
            <span style={{ fontWeight: 'bolder' }} />
          </Text>
        </Group>
      </Footer>
    }
    header={
      <Header height={10} p="md">
        <div className="flex items-center h-full">
          <Text size="lg" weight="bolder">
            Remotool
          </Text>
        </div>
      </Header>
    }
  >
    {children}
  </AppShell>
);

export default AppContainer;
