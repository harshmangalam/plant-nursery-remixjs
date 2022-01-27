import {
  ActionIcon,
  AppShell,
  Box,
  Button,
  ColorScheme,
  ColorSchemeProvider,
  Container,
  Group,
  Header,
  MantineProvider,
  MediaQuery,
  Title,
} from "@mantine/core";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useState } from "react";
import { Link } from "remix";
import MobileMenu from "./MobileMenu";
import Cart from "./Cart";

export default function Layout({ children }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = () =>
    setColorScheme(colorScheme === "dark" ? "light" : "dark");

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ colorScheme }}>
        <AppShell
          padding={0}
          navbarOffsetBreakpoint="sm"
          fixed
          header={
            <Header height={60} padding="sm">
              <Box
                component={Container}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Title order={2}>Nursery</Title>

                <MediaQuery smallerThan={"xs"} styles={{ display: "none" }}>
                  <Group>
                    <Button
                      component={Link}
                      to="/"
                      variant="light"
                      color="green"
                      compact
                    >
                      Home
                    </Button>
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
                </MediaQuery>

                <Group>
                  <ActionIcon
                    size={"xl"}
                    variant="transparent"
                    onClick={toggleColorScheme}
                  >
                    {colorScheme === "dark" ? (
                      <BsFillSunFill size={"20px"} />
                    ) : (
                      <BsFillMoonStarsFill size={"20px"} />
                    )}
                  </ActionIcon>
                  <Cart />
                  <MobileMenu />
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
          <Container>
            <Box my="xl">{children}</Box>
          </Container>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
