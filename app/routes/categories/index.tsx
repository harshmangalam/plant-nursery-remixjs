import { Box, SimpleGrid, Text } from "@mantine/core";
import { LoaderFunction, useLoaderData } from "remix";
import CategoryCard from "~/components/CategoryCard";
import { commerce } from "~/utils/commerce";

export let loader: LoaderFunction = async () => {
  try {
    const categories = await commerce.categories.list();
    return categories;
  } catch (error) {
    console.log(error);
  }
};
export default function Categories() {
  const categories = useLoaderData();

  return (
    <Box>
      <Text component="h1" size="xl">
        Categories
      </Text>
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
          {categories.data?.map((category) => (
            <CategoryCard key={category.id} category={category} />
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
    </Box>
  );
}
