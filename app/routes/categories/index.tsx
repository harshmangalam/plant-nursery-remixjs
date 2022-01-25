import { Container, SimpleGrid } from "@mantine/core";
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
  console.log(categories);
  return (
    <Container>
      <SimpleGrid cols={3}>
        {categories.data.map((category) => (
          <CategoryCard category={category} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
