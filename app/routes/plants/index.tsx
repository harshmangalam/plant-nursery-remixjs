import { Box, Container, SimpleGrid, Text } from "@mantine/core";
import { LoaderFunction, useLoaderData } from "remix";
import PlantCard from "~/components/PlantCard";
import { commerce } from "~/utils/commerce";

export let loader: LoaderFunction = async () => {
  try {
    const plants = await commerce.products.list();
    return plants;
  } catch (error) {
    console.log(error);
  }
};
export default function Categories() {
  const plants = useLoaderData();

  return (
    <Container>
      <Text component="h1" size="xl">
        Plants
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
    </Container>
  );
}
