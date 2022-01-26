import {
  AppShell,
  Box,
  Button,
  Container,
  Group,
  Header,
  Title,
} from "@mantine/core";
import { Link } from "remix";

export default function Layout({ children }) {
  return (
    <AppShell
      fixed
      header={
        <Header height={60} padding="sm">
          <Box component={Container} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Title order={2}>Nursery</Title>
            <Group>
              <Button
                component={Link}
                to="/categories"
                variant="light"
                color="green"
                compact
              >
                Categories
              </Button>
              <Button
                component={Link}
                to="/plants"
                variant="light"
                color="green"
                compact
              >
                Plants
              </Button>
            </Group>
          </Box>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Container>{children}</Container>
    </AppShell>
  );
}
