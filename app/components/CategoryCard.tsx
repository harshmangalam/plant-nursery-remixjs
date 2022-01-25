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

export default function CategoryCard({ category }) {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <Card
      component={Link}
      to={`/categories/${category.slug}`}
      shadow="sm"
      padding="xl"
    >
      <Card.Section>
        <Image src={category.assets[0].url} height={160} alt="Norway" />
      </Card.Section>

      <Text weight={600} size="lg" align="center" mt={"lg"}>
        {category.name}
      </Text>
    </Card>
  );
}
