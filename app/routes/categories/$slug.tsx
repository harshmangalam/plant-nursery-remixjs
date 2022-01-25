import {
  Avatar,
  Badge,
  Box,
  Container,
  Divider,
  Grid,
  Group,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { LoaderFunction, useLoaderData } from "remix";
import { commerce } from "~/utils/commerce";
import PlantCard from "~/components/PlantCard";

export const loader: LoaderFunction = async ({ params }) => {
  const categorySlug = params.slug as string;
  try {
    const category = await commerce.categories.retrieve(categorySlug, {
      type: "slug",
    });
    const plants = await commerce.products.list({
      category_slug: categorySlug,
    });
    return {
      category,
      plants,
    };
  } catch (error) {
    console.log(error);
  }
};

export default function Category() {
  const { category, plants } = useLoaderData();

  return (
    <Container>
      <Box my={"lg"}>
        <Grid>
          <Grid.Col span={4}>
            <Avatar
              style={{ width: "100%", height: "100%" }}
              src={category.assets[0].url}
              alt={category.name}
            />
          </Grid.Col>
          <Grid.Col span={8}>
            <Group direction="column">
              <Text>{category.name}</Text>
              <Text>{category.description}</Text>
              <Badge variant="filled">{category.products} Products</Badge>
            </Group>
          </Grid.Col>
        </Grid>
      </Box>
      <Divider />

      <SimpleGrid cols={3} my={"lg"}>
        {plants.data.map((plant) => (
          <PlantCard plant={plant} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
