import {
  Image,
  Badge,
  Box,
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
    <Box>
      <Box my={"lg"}>
        <Grid gutter={"xl"}>
          <Grid.Col xs={12} md={4}>
            <Image
              style={{ width: "100%", height: 300 }}
              src={category.assets[0].url}
              alt={category.name}
            />
          </Grid.Col>
          <Grid.Col xs={12} md={8}>
            <Group direction="column">
              <Text mt="xl" weight={600} size="lg">
                {category.name}
              </Text>
              <Text align="justify">{category.description}</Text>
              <Badge variant="filled" color="green">
                {category.products} Plants
              </Badge>
            </Group>
          </Grid.Col>
        </Grid>
      </Box>
      <Divider />

      <Box my="xl">
        <SimpleGrid
          cols={3}
          spacing="lg"
          breakpoints={[
            { maxWidth: "xl", cols: 3, spacing: "xl" },
            { maxWidth: "lg", cols: 3, spacing: "lg" },
            { maxWidth: "md", cols: 3, spacing: "md" },
            { maxWidth: "sm", cols: 2, spacing: "sm" },
            { maxWidth: "xs", cols: 1, spacing: "sm" },
          ]}
        >
          {plants.data?.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </SimpleGrid>
        {!plants.data && (
          <Box>
            <Text size="xl" weight="bolder" align="center">
              No Plants
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
