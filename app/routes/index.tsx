import { Box, Container, SimpleGrid, Text } from "@mantine/core";
import { LoaderFunction, useLoaderData } from "remix";
import CategoryCard from "~/components/CategoryCard";
import Layout from "~/components/Layout";
import PlantCard from "~/components/PlantCard";
import { commerce } from "~/utils/commerce";

export const loader: LoaderFunction = async () => {
  try {
    const categories = await commerce.categories.list({ limit: 3 });
    const plants = await commerce.products.list({ limit: 3 });

    return {
      categories,
      plants,
    };
  } catch (error) {
    console.log(error);
  }
};
export default function Index() {
  const { categories, plants } = useLoaderData();
  return (
    <Box>
      <Box my="xl">
        <Text component="h1" size="xl">
          Categories
        </Text>
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
          {categories.data?.map((category) => (
            <CategoryCard category={category} />
          ))}
        </SimpleGrid>
        {!categories.data && (
          <Box>
            <Text size="xl" weight="bolder" align="center">
              No Categories
            </Text>
          </Box>
        )}
      </Box>

      <Box my="xl">
        <Text component="h1" size="xl">
          Plants
        </Text>
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
            <PlantCard plant={plant} />
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
