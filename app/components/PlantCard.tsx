import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "remix";

export default function CategoryCard({ plant }) {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <Card
      component={Link}
      to={`/plants/${plant.id}`}
      shadow="sm"
      padding="xl"
    >
      <Card.Section>
        <Image src={plant.image.url} height={160} alt="Norway" />
      </Card.Section>

      <Group direction="column" align={"center"} spacing={"sm"}>
        <Text weight={500}>{plant.name}</Text>
        <Text weight={600}>{plant.price.formatted_with_symbol}</Text>
        {plant.active ? (
          <Badge color="green" variant="light">
            Available
          </Badge>
        ) : (
          <Badge color="red" variant="light">
            Out Of Stock
          </Badge>
        )}
      </Group>
    </Card>
  );
}
